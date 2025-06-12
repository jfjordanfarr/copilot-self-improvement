::: {unit}
id: "impl-extension-ts"
title: "Extension Entry Point (extension.ts) Implementation (Ultra-Minimalist)"
unit-type: "typescript-module"
language: "typescript"
status: "stable" # Updated from draft
version: "1.1" # Incremented for minimalist pivot
brief: "Specifies the implementation of the main extension entry point, which now only registers a single Language Model Tool."
source-ref: "../../../src/extension.ts" # Corrected source-ref path
see-also: ["[[main-architecture]]", "[[language-model-tool-implementation]]", "[[copilot-integration-architecture]]"]

This module contains the `activate` function, which is the main entry point for the extension. In the ultra-minimalist design, its sole responsibility is to instantiate and register the single Language Model Tool (`copilotSelfImprovement-getInstructionsAndConventions`).

```typescript
import * as vscode from 'vscode';
import { InstructionTool } from './instructionTool'; // Ref: [[language-model-tool-implementation]]

// This function is called when the extension is activated
// See [[main-architecture]] and [[copilot-integration-architecture]]
export function activate(context: vscode.ExtensionContext) {

    // Instantiate the Language Model Tool
    const instructionTool = new InstructionTool();

    // Register the Language Model Tool with VS Code
    const toolRegistration = vscode.lm.registerTool(
        instructionTool.name, // This is 'copilotSelfImprovement-getInstructionsAndConventions'
        instructionTool
    );

    // Add the tool registration to the context's subscriptions for cleanup on deactivation
    context.subscriptions.push(toolRegistration);

    // No other commands or UI elements are registered, aligning with the minimalist vision.
}

// This function is called when the extension is deactivated
export function deactivate() {
    // Any necessary cleanup would go here, though for this simple extension,
    // the disposal of subscriptions handled by VS Code is usually sufficient.
}
```

This implementation ensures that only the essential `InstructionTool` is made available to GitHub Copilot, adhering to the principle of minimal functionality.
:::