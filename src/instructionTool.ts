import * as vscode from 'vscode';
import { readAllInstructionFiles, InstructionFileEntry, getWorkspaceRootUri } from './fileHandler';
import { TextDecoder } from 'util';

interface InstructionsAndConventionsOutput {
  instructionFiles: InstructionFileEntry[];
  conventions: string; 
}

interface NoToolInput {}

export class InstructionTool {
    private readonly extensionUri: vscode.Uri;

    constructor(extensionUri: vscode.Uri) {
        this.extensionUri = extensionUri;
    }

    public readonly name = 'copilotSelfImprovement-getInstructionsAndConventions';
    
    // THIS IS THE CORRECT LOCATION FOR THE PROMPT ENGINEERING
    public readonly description = "This is GitHub Copilot's essential tool for understanding and managing its own custom operational instructions (`*.selfImprovement.instructions.md` files). **USE THIS TOOL WHENEVER YOU (Github Copilot):** 1) Make the same mistake repeatedly, 2) Inform the user that you will modify your behavior going forward ('I will note that you prefer __'), or 3) are explicitly asked by the user to change instructions files. Returns a JSON object with an array (of `InstructionFileEntry` objects: `name`, `uri`, `filePath`, `applyTo`, `purpose`, `title`, `lastModified`) and the `conventions` string. Utilizes no network requests and only reads local files in the configured instructions file directories.";
    
    public readonly inputSchema = { type: "object", properties: {} };

    private async getConventionDetails(): Promise<string> {
        // The path needs to be correctly resolved from the extension's install directory
        const conventionsUri = vscode.Uri.joinPath(this.extensionUri, 'out', 'assets', 'CONVENTIONS.md');
        try {
            const uint8Array = await vscode.workspace.fs.readFile(conventionsUri);
            return new TextDecoder().decode(uint8Array);
        } catch (error) {
            console.error("Error reading CONVENTIONS.md:", error);
            throw new vscode.LanguageModelError("Failed to load convention details. The CONVENTIONS.md file might be missing or corrupted.");
        }
    }

    async invoke(
        options: vscode.LanguageModelToolInvocationOptions<NoToolInput>,
        token: vscode.CancellationToken
    ): Promise<vscode.LanguageModelToolResult> {
        if (token.isCancellationRequested) {
            throw new vscode.LanguageModelError("Operation cancelled.");
        }

        const workspaceRootUri = getWorkspaceRootUri();
        if (!workspaceRootUri) {
            throw new vscode.LanguageModelError("No workspace root found. Cannot retrieve instructions.");
        }

        try {
            const files = await readAllInstructionFiles(workspaceRootUri);
            const conventions = await this.getConventionDetails();

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
                throw error;
            }
            console.error("Error during InstructionTool.invoke:", error);
            throw new vscode.LanguageModelError(error.message ?? "An unexpected error occurred in InstructionTool.");
        }
    }
}