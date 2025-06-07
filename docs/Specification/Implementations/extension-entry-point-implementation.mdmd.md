::: {unit}
id: "impl-extension-ts"
title: "Extension Entry Point (extension.ts) Implementation"
unit-type: "typescript-module"
language: "typescript"
status: "draft"
version: "1.0"
brief: "Specifies the implementation of the main extension entry point."
source-ref: "./src/extension.ts"
see-also: ["[[arch-main]]", "[[impl-lm-tool-class]]"]

This module contains the `activate` function, which is the main entry point for the extension. It is responsible for registering all commands and the Language Model Tool.

```typescript
import * as vscode from 'vscode';
import { InstructionTool } from './instructionTool'; // Ref: [[impl-lm-tool-class]]
import { createInstructionFileCommand } from './fileHandler'; // Ref: [[impl-file-handler]]

// This function is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {

    // Register the command to create a new instruction file
    const createCommand = vscode.commands.registerCommand(
        'copilot-self-improvement.createInstructionFile',
        createInstructionFileCommand
    );

    // Register the Language Model Tool
    const instructionTool = new InstructionTool();
    const toolRegistration = vscode.lm.registerTool(
        instructionTool.name,
        instructionTool
    );

    // Add disposables to the context for cleanup
    context.subscriptions.push(createCommand, toolRegistration);
}

// This function is called when the extension is deactivated
export function deactivate() {}
```
:::