---
id: file-handler-implementation
title: File Handler Implementation
status: implemented
version: 1.3 # Incremented due to significant refactor for minimalist pivot
date: 2025-06-09 # Updated date
authors:
  - AI Assistant
source-ref: "../../../src/fileHandler.ts"
see-also:
  - "[[core-functionality-requirement]]"
  - "[[file-format-requirement]]"
  - "[[security-requirement]]"
  - "[[main-architecture]]"
---
{unit unit-type="typescript-module" id="file-handler-module"}

# File Handler (`fileHandler.ts`)

This module is responsible for discovering, parsing, and providing metadata for instruction files (`*.selfImprovement.instructions.md`) located within the workspace's `.github/instructions/` directory. It does **not** read the full content of the files for its own operations but rather extracts specific frontmatter and file system information.

## Key Responsibilities & Functionality

*   **Discovering Instruction Files:**
    *   Scans the `.github/instructions/` directory for files matching the `*.selfImprovement.instructions.md` pattern.
*   **Parsing Frontmatter and Deriving Metadata:**
    *   For each discovered file, it parses the YAML frontmatter to extract `applyTo` and `purpose` fields.
    *   It derives a `title` for the instruction using a fallback strategy: frontmatter `title` field (if present) -> first H1 markdown header -> first non-empty line of content (requires minimal content read) -> filename.
    *   It retrieves the `lastModified` timestamp from the file system.
    *   It records the `filePath` (absolute path) and a stringified `uri`.
*   **Constructing `InstructionFileEntry` Objects:**
    *   Aggregates the gathered information into an `InstructionFileEntry` object for each file. The structure is:
        ```typescript
        export interface InstructionFileEntry {
            name: string;           // Original filename
            uri: string;            // Stringified URI of the file
            filePath: string;       // MEASURED: Full absolute path
            applyTo: string;        // FRONTMATTER: Glob pattern (defaults to '**/*')
            purpose?: string;       // FRONTMATTER: Brief description
            title: string;          // MEASURED: Derived (frontmatter 'title' -> 1st H1 -> 1st content line -> filename)
            lastModified: string;   // MEASURED: ISO 8601 timestamp
        }
        ```
*   **Providing Data to `instructionTool.ts`:**
    *   The primary function `readAllInstructionFiles()` returns a promise resolving to an array of `InstructionFileEntry` objects.

## Adherence to Requirements

This implementation directly supports:
*   `[[core-functionality-requirement]]` by providing the mechanism to list and process metadata from instruction files.
*   `[[file-format-requirement]]` by correctly parsing the specified frontmatter (`applyTo`, `purpose`, optional `title`) and deriving other metadata fields as defined.
*   `[[security-requirement]]` by restricting file operations to the `.github/instructions/` directory and only parsing necessary frontmatter, not exposing full file content to the extension's internal logic (full content reading is deferred to Copilot itself).

It is a key component of the `[[main-architecture]]`.
{/unit}