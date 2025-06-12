::: {unit}
id: "req-usability"
title: "Usability Requirements (for Copilot Tooling)"
unit-type: "non-functional-requirement"
status: "stable"
version: "1.1" # Significant simplification due to pivot
brief: "Defines usability aspects for the extension's interaction with GitHub Copilot."
see-also: ["[[project-vision]]", "[[copilot-integration-architecture]]"] # Updated links

With the pivot to an ultra-minimalist design where GitHub Copilot handles all file I/O and the extension provides a single tool, usability focuses on the clarity and effectiveness of this tool for Copilot.

```markdown
1.  **Tool Clarity for Copilot**: 
    *   The single Language Model Tool (`copilotSelfImprovement-getInstructionsAndConventions`) MUST have a clear and comprehensive `description` in `package.json` that accurately conveys its dual purpose: listing instruction file metadata and providing conventions for their creation/management by Copilot.
    *   The `conventions` string provided by the tool MUST be unambiguous and clearly detail the expected frontmatter fields (`applyTo`, `purpose`) to be written by Copilot, and the metadata fields (`filePath`, `lastModified`, `title`, `name`, `uri`) that the tool will provide.
2.  **Minimal User Interaction**: 
    *   The extension itself will have NO direct user-facing commands or UI elements (e.g., Command Palette entries for creation/validation are removed).
    *   User interaction for creating, modifying, or reading instruction files will be mediated entirely through GitHub Copilot, based on the information provided by the extension's tool.
3.  **Activation & Availability**: 
    *   The tool MUST activate reliably when Copilot needs it (e.g., `onChatParticipant:githubdev.copilot-chat`, `onLanguageModelTool:copilotSelfImprovement-getInstructionsAndConventions`).
    *   The `workspaceContains:.github/instructions/*.selfImprovement.instructions.md` activation event ensures the tool is available if instruction files already exist, promoting discoverability by Copilot.
```

This revised requirement reflects that the primary "user" of the extension's direct output is GitHub Copilot, and usability is about making that interaction seamless and effective.
:::