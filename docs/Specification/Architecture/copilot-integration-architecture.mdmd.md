::: {composition}
id: "arch-copilot-integration"
title: "GitHub Copilot Integration Architecture"
composition-type: "integration-architecture"
status: "stable"
version: "1.3" # Incremented version for alignment with final 5-field model
brief: "Details how the extension integrates with GitHub Copilot via a single Language Model Tool, emphasizing the 5 key fields of an InstructionFileEntry."
see-also: ["[[csi-project-vision]]", "[[req-core-functionality]]", "[[req-meta-knowledge]]", "[[arch-main]]", "[[impl-package-json]]", "[[impl-instruction-tool]]"]

This document outlines the specific mechanisms by which the "Copilot Self-Improvement" extension interacts with GitHub Copilot, focusing on the single Language Model Tool it exposes and the precise structure of the data exchanged.

**Integration Points:**

1.  **`package.json` ([[impl-package-json]]):**
    *   Declares the single Language Model Tool (`copilotSelfImprovement-getInstructionsAndConventions`) that the extension provides. This makes it discoverable by GitHub Copilot.
    *   Defines the name, description, and input/output schemas for the tool.

2.  **Language Model Tool (Implemented in `InstructionTool.ts` [[impl-instruction-tool]]):**
    This single tool is the sole interface for Copilot to interact with the extension's capabilities.

    *   **`copilotSelfImprovement-getInstructionsAndConventions`**
        *   **Description:** "Lists existing instruction files (`*.selfImprovement.instructions.md`) and provides conventions for their creation/management. Copilot uses this to understand existing guidance and how to create new instructions itself."
        *   **Inputs:** None (empty object `{}`).
        *   **Returns:** `Promise<vscode.LanguageModelToolResult>` where the `content` is a JSON string. The parsed JSON object has the shape `InstructionsAndConventionsOutput`:
            ```typescript
            // As defined in fileHandler.ts and used by instructionTool.ts
            interface InstructionFileEntry {
              name: string;           // Original filename
              uri: string;            // Stringified URI of the file
              filePath: string;       // MEASURED: Full absolute path to the file
              applyTo: string;        // FRONTMATTER: Glob pattern (defaults to '**/*')
              purpose?: string;       // FRONTMATTER: Brief description of the instruction's objective
              title: string;          // MEASURED: Derived (1st H1 -> 1st content line -> filename)
              lastModified: string;   // MEASURED: ISO 8601 timestamp from file system stats
            }

            interface InstructionsAndConventionsOutput {
              instructionFiles: InstructionFileEntry[];
              conventions: string; // A detailed Markdown string explaining file conventions.
            }
            ```
        *   **Purpose:** Allows Copilot to discover available instruction sets (each represented by an `InstructionFileEntry`) and simultaneously understand the rules for creating/managing them (via the `conventions` string). Copilot uses this to inform its own file reading/writing actions.
        *   **Satisfies:** `[[req-core-functionality]]`, `[[req-meta-knowledge]]`

**Workflow:**

1.  The extension activates, and `extension.ts` registers the single tool.
2.  GitHub Copilot becomes aware of this tool.
3.  Copilot invokes the tool.
4.  The extension processes the tool request:
    *   `FileHandler.ts` lists instruction files, creating an `InstructionFileEntry` for each. This involves:
        *   Reading filename (`name`).
        *   Getting the file URI (`uri`) and absolute file path (`filePath`).
        *   Parsing frontmatter for `applyTo` and `purpose`.
        *   Deriving `title` (H1 -> first content line -> filename).
        *   Getting `lastModified` timestamp from file stats.
    *   `InstructionTool.ts` combines this list (`instructionFiles`) with a predefined, detailed Markdown string describing file conventions (`conventions`). This convention string explicitly states that Copilot should create files with `applyTo` and `purpose` frontmatter.
5.  The `InstructionsAndConventionsOutput` object, JSON-stringified, is returned to Copilot within the `LanguageModelToolResult`.
6.  Copilot uses this information:
    *   To be aware of existing instructions (preventing duplicates by checking `filePath`, `applyTo`, `purpose`).
    *   To understand how to read specific instruction files *itself* if it needs their full content.
    *   To understand how to generate content for new instruction files (including the required `applyTo` and `purpose` frontmatter) or suggest modifications, which Copilot would then propose to the user for creation/modification using its own file manipulation capabilities.

This integration ensures a clear separation of concerns: the extension is the expert on *what instructions exist (providing the 5 key fields) and how they should be structured*, while Copilot remains responsible for *all file content access and manipulation*, guided by the user and the information from the tool.
:::