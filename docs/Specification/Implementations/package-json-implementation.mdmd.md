::: {unit}
id: "impl-package-json"
title: "package.json Configuration"
unit-type: "configuration-file-definition"
status: "stable"
version: "1.3" # Incremented for alignment with final tool description and 5-field model context
brief: "Specifies `package.json` for the extension, focusing on the single Language Model Tool contribution for listing instruction metadata and conventions."
source-ref: "package.json"
see-also: ["[[main-architecture]]", "[[copilot-integration-architecture]]"]

This document defines the necessary configurations within `package.json` to enable the extension's functionality, particularly its integration with GitHub Copilot through a single Language Model Tool.

**Key Sections:**

1.  **`name`**: `copilot-self-improvement`
2.  **`displayName`**: "Copilot Self-Improvement (Instruction Lister & Teacher)"
3.  **`description`**: "A VS Code extension that lists project-specific self-improvement instructions (`.github/instructions/*.selfImprovement.instructions.md`) metadata and teaches GitHub Copilot the conventions for their use (including the 5-field model: `applyTo`, `purpose` for Copilot to write; `filePath`, `lastModified`, `title` measured/derived by the tool). Copilot handles all full file reading/writing."
4.  **`activationEvents`**:
    *   `workspaceContains:.github/instructions/*.selfImprovement.instructions.md` (Activates if instruction files are present, good for discovery)
    *   `onChatParticipant:githubdev.copilot-chat` (To ensure tool is available to Copilot Chat)
    *   `onLanguageModelTool:copilotSelfImprovement-getInstructionsAndConventions` (Primary activation for the tool)

5.  **`contributes`**:
    *   **`commands`**:
        *   This section will be EMPTY, as there are no user-facing commands in the ultra-minimalist version.
    *   **`languageModelTools`**:
        *   An array defining the single tool exposed to GitHub Copilot.
        ```json
        "languageModelTools": [
          {
            "name": "copilotSelfImprovement-getInstructionsAndConventions",
            "description": "Lists metadata for existing `*.selfImprovement.instructions.md` files from the `.github/instructions/` directory (providing name, uri, filePath, applyTo, purpose, title, lastModified) AND provides detailed conventions for creating/managing these files, including the frontmatter fields Copilot should write (applyTo, purpose). Copilot should use this information to be aware of current instructions and to create or modify instruction files itself if requested by the user.",
            "inputSchema": {
              "type": "object",
              "properties": {}
            }
            // Output schema is implicitly defined by the tool's implementation (InstructionFileEntry[] and conventions string).
          }
        ]
        ```

**Dependencies (`dependencies`, `devDependencies`):**
*   `dependencies`:
    *   `yaml-front-matter`: For parsing minimal frontmatter from instruction files.
    *   `@types/yaml-front-matter`
*   `devDependencies`: (Standard, ensure these are up-to-date)
    *   `@types/vscode`
    *   `@types/mocha`
    *   `@types/sinon`
    *   `typescript`
    *   `ts-loader`
    *   `webpack`, `webpack-cli`
    *   `eslint`
    *   `@vscode/test-electron`
    *   `sinon`
    *   `glob` // Note: `glob` was listed but might not be directly used by the extension if `vscode.workspace.fs.readDirectory` is sufficient.

**Scripts:**
*   Standard scripts for `vscode:prepublish`, `compile`, `watch`, `lint`, `test`.

This configuration ensures the extension activates appropriately and correctly exposes its single, combined instructional tool to GitHub Copilot, clearly communicating the expected frontmatter and provided metadata.
:::