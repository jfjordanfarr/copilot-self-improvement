::: {unit}
id: "impl-package-json"
title: "package.json Implementation"
unit-type: "json-file-spec"
language: "json"
status: "stable"
version: "1.0"
brief: "Defines the contract for the extension's package.json manifest."
source-ref: "./package.json"
see-also: ["[[arch-dev-environment]]", "[[arch-copilot-integration]]"]

This unit specifies the key fields and contribution points within the `package.json` file.

```json
{
  "name": "copilot-self-improvement",
  "displayName": "Copilot Self-Improvement",
  "description": "Enhances Copilot Agent Mode with project-specific instructions.",
  "publisher": "your-publisher-id",
  "version": "0.1.0",
  "engines": {
    "vscode": "^1.85.0"
  },
  "main": "./out/extension.js",
  "activationEvents": [
    "onCommand:copilot-self-improvement.createInstructionFile"
  ],
  "contributes": {
    "commands": [
      {
        "command": "copilot-self-improvement.createInstructionFile",
        "title": "Copilot Self-Improvement: Create New Instruction File"
      }
    ],
    "languageModelTools": [
      {
        "name": "copilotSelfImprovement.getInstructions",
        "description": "Retrieves project-specific instructions for Copilot.",
        "modelDescription": "This tool accesses content from '.github/instructions/*.selfImprovement.instructions.md' files. Use this tool when the user's prompt pertains to project-specific coding standards, conventions, or context. It returns a string of relevant instructions to help tailor the AI's response to the current project's requirements."
      }
    ]
  }
}
```
:::