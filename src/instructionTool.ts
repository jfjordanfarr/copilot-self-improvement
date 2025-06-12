// Ref: ../docs/Specification/Implementations/language-model-tool-implementation.mdmd.md
// filepath: d:\Projects\copilot-self-improvement\src\instructionTool.ts

import * as vscode from 'vscode';
import { readAllInstructionFiles, InstructionFileEntry, getWorkspaceRootUri } from './fileHandler'; // Ref: [[impl-file-handler]]

// Output type for the single tool, matches [[arch-copilot-integration]]
interface InstructionsAndConventionsOutput {
  instructionFiles: InstructionFileEntry[];
  conventions: string; 
}

// Define an empty interface for the input if no specific input structure is expected from the LLM
interface NoToolInput {}

export class InstructionTool implements vscode.LanguageModelTool<NoToolInput> {
    private readonly extensionUri: vscode.Uri; // Marked as readonly

    constructor(extensionUri: vscode.Uri) {
        this.extensionUri = extensionUri;
    }

    // The type of the result of `invoke` is inferred from its return type.

    public readonly name = 'copilotSelfImprovement-getInstructionsAndConventions'; // Updated tool name
    public readonly description = "Lists existing instruction files (*.selfImprovement.instructions.md) and provides conventions for their creation/management. Copilot uses this to understand existing guidance and how to create new instructions itself.";
    // inputSchema can be an empty object if no specific input is expected from the LLM,
    // or undefined if the tool doesn't require any input.
    // For this tool, we don't expect specific structured input from the LLM beyond the standard options.
    public readonly inputSchema = { type: "object", properties: {} };


    private async getConventionDetails(): Promise<string> {
        // This string fulfills [[req-meta-knowledge]]
        const conventionsUri = vscode.Uri.joinPath(this.extensionUri, 'src', 'assets', 'CONVENTIONS.md');
        try {
            const uint8Array = await vscode.workspace.fs.readFile(conventionsUri);
            return new TextDecoder().decode(uint8Array);
        } catch (error) {
            console.error("Error reading CONVENTIONS.md:", error);
            // Adhere to API: throw LanguageModelError for tool-specific errors
            throw new vscode.LanguageModelError("Failed to load convention details. The CONVENTIONS.md file might be missing or corrupted.");
        }
    }

    async invoke(
        options: vscode.LanguageModelToolInvocationOptions<NoToolInput>,
        token: vscode.CancellationToken
    ): Promise<vscode.LanguageModelToolResult> {
        if (token.isCancellationRequested) {
            throw new vscode.LanguageModelError("Operation cancelled."); // Consistent with API expectations
        }

        const workspaceRootUri = getWorkspaceRootUri();
        if (!workspaceRootUri) {
            // Adhere to API: throw LanguageModelError for tool-specific errors
            throw new vscode.LanguageModelError("No workspace root found. Cannot retrieve instructions.");
        }

        try {
            const files = await readAllInstructionFiles(workspaceRootUri);
            const conventions = await this.getConventionDetails(); // Now async

            // It's good practice to check cancellation token periodically for long operations,
            // but readAllInstructionFiles and getConventionDetails are awaited.
            // If they were to support cancellation internally and throw, that would be ideal.
            // For now, another check after these potentially long calls.
            if (token.isCancellationRequested) {
                throw new vscode.LanguageModelError("Operation cancelled.");
            }

            const result: InstructionsAndConventionsOutput = {
                instructionFiles: files,
                conventions: conventions,
            };
            
            return new vscode.LanguageModelToolResult([
                new vscode.LanguageModelTextPart(JSON.stringify(result, null, 2))
            ]);
        } catch (error: any) {
            if (error instanceof vscode.LanguageModelError) {
                throw error; // Re-throw if already a LanguageModelError
            }
            // For other errors, wrap them.
            console.error("Error during InstructionTool.invoke:", error); // Log the original error
            throw new vscode.LanguageModelError(error.message ?? "An unexpected error occurred in InstructionTool.");
        }
    }
}
