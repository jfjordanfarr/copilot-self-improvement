::: {unit}
id: "impl-lm-tool-class"
title: "Language Model Tool Class Implementation"
unit-type: "typescript-class-definition"
language: "typescript"
status: "draft"
version: "1.0"
brief: "Defines the TypeScript class that implements the vscode.LanguageModelTool interface."
source-ref: "./src/instructionTool.ts"
see-also: ["[[arch-copilot-integration]]", "[[impl-file-handler]]"]

This class is the core of the Copilot integration, providing the logic that is executed when Copilot invokes the tool.

```typescript
import * as vscode from 'vscode';
import { readAndProcessInstructions } from './fileHandler'; // Ref: [[impl-file-handler]]

interface IInstructionToolOutput {
    instructions: string;
}

export class InstructionTool implements vscode.LanguageModelTool<IInstructionToolOutput, any> {

    public readonly name = 'copilotSelfImprovement.getInstructions';
    public readonly description = 'Retrieves project-specific instructions for Copilot.';

    async invoke(
        options: vscode.LanguageModelToolInvocationOptions<any>,
        progress: vscode.Progress<vscode.LanguageModelToolResponsePart<IInstructionToolOutput>>,
        token: vscode.CancellationToken
    ): Promise<vscode.LanguageModelToolResponse<IInstructionToolOutput>> {
        progress.report({ message: 'Accessing project instructions...' });

        const combinedInstructions = await readAndProcessInstructions();

        if (token.isCancellationRequested) {
            throw new vscode.CancellationError();
        }

        return {
            result: {
                instructions: combinedInstructions
            }
        };
    }

    async prepareInvocation(
        options: vscode.LanguageModelToolInvocationPrepareOptions<any>,
        token: vscode.CancellationToken
    ): Promise<vscode.LanguageModelToolInvocationPreparation> {
        // Fulfills [[req-security]] by providing a clear user confirmation
        const confirmationMessage = {
            title: 'Access Project Instructions',
            message: new vscode.MarkdownString(
                `Allow 'Copilot Self-Improvement' to read from your '.github/instructions/' directory to provide tailored assistance?`
            ),
        };
        return {
            confirmationMessages: confirmationMessage,
        };
    }
}
```
:::