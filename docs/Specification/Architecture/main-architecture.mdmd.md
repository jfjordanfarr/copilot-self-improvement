::: {composition}
id: "arch-main"
title: "Main System Architecture"
composition-type: "system-architecture"
status: "stable"
version: "1.3" # Incremented version for alignment
brief: "Defines the overall architecture of the ultra-minimalist, read-only, instructional VS Code extension with a single Language Model Tool, detailing the InstructionFileEntry structure."
see-also: ["[[csi-project-vision]]", "[[req-core-functionality]]", "[[req-security]]", "[[impl-instruction-tool]]", "[[impl-file-handler]]"]

This document outlines the primary components and their interactions within the "Copilot Self-Improvement" VS Code extension, now refactored for an ultra-minimalist, read-only, instructional purpose with a single Language Model Tool.

```mermaid
graph TD
    subgraph VSCode_Extension [VS Code Extension]
        A[extension.ts] --> B{Language Model Tool (Single)};
        B --> C[InstructionTool.ts];
        C --> D[FileHandler.ts];
        D -- lists from --> E{{.github/instructions/*.selfImprovement.instructions.md}};
    end

    subgraph User_Interactions
        F[User/GitHub Copilot] -- invokes tool --> B;
    end

    %% Relationships
    A -.-> F; %% Extension activates and registers the tool for Copilot
    C -.-> B; %% InstructionTool provides the single tool implementation
    D -.-> C; %% FileHandler is used by InstructionTool to list files

    %% Styling
    classDef component fill:#f9f,stroke:#333,stroke-width:2px;
    classDef file fill:#ccf,stroke:#333,stroke-width:2px;
    class A,B,C,D component;
    class E file;
    class F actor;
```

**Components:**

1.  **`extension.ts` ([[impl-extension-main]]):**
    *   **Responsibilities:**
        *   Activates the extension.
        *   Registers the single Language Model Tool (`copilotSelfImprovement-getInstructionsAndConventions`) provided by `InstructionTool.ts` with VS Code.
    *   **Satisfies:** `[[req-core-functionality]]` (by enabling tool access)

2.  **`InstructionTool.ts` ([[impl-instruction-tool]]):**
    *   **Responsibilities:**
        *   Implements the logic for the single Language Model Tool:
            *   `copilotSelfImprovement-getInstructionsAndConventions`: Lists available instruction files (as `InstructionFileEntry[]`) and provides meta-knowledge about instruction file conventions (as a `string`).
        *   Uses `FileHandler.ts` to list instruction files from the file system in a read-only manner.
        *   Returns a JSON stringified object: `{ instructionFiles: InstructionFileEntry[], conventions: string }`.
    *   **Satisfies:** `[[req-core-functionality]]`, `[[req-meta-knowledge]]`

3.  **`FileHandler.ts` ([[impl-file-handler]]):**
    *   **Responsibilities:**
        *   Provides utilities for listing instruction files from the designated `.github/instructions/` directory.
        *   Key functions: `getWorkspaceRootUri`, `getInstructionsDirUri`, `readAllInstructionFiles` (returns `Promise<InstructionFileEntry[]>`).
        *   `InstructionFileEntry` structure:
            *   `name: string`
            *   `uri: string`
            *   `filePath: string`
            *   `applyTo: string` (from frontmatter, defaults to `'**/*'`)
            *   `purpose?: string` (from frontmatter)
            *   `title: string` (derived)
            *   `lastModified: string` (ISO 8601 timestamp)
        *   Strictly enforces read-only access and directory scoping.
        *   Parses minimal frontmatter (`applyTo`, `purpose`) and derives `title`.
    *   **Satisfies:** `[[req-core-functionality]]`, `[[req-security]]`

4.  **`.github/instructions/*.selfImprovement.instructions.md` (Instruction Files):**
    *   **Nature:** User/Copilot-managed Markdown files with YAML frontmatter.
    *   **Role:** Contain directives and context for GitHub Copilot.
    *   **Frontmatter (created by Copilot):** `applyTo`, `purpose`.
    *   The extension lists these files (parsing specified frontmatter and deriving other fields for `InstructionFileEntry`) but does not read their full content or modify them. Copilot handles full reading and all writing.

**Interactions:**

*   GitHub Copilot (or a user interacting with Copilot) invokes the single registered Language Model Tool.
*   `InstructionTool.ts` processes this request, utilizing `FileHandler.ts` to get a list of `InstructionFileEntry` objects and combining this with the predefined convention information.
*   The combined result (JSON string of `{ instructionFiles, conventions }`) is returned to Copilot.
*   Copilot uses this information to be aware of existing instructions (including their `applyTo` and `purpose`) and to understand how to create/modify instruction files using its own capabilities (by creating files with `applyTo` and `purpose` frontmatter).

This architecture ensures the extension acts as a secure, ultra-minimalist, read-only provider of information, empowering Copilot without the extension itself performing extensive file operations.
:::