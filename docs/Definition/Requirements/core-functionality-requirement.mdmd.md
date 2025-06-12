::: {unit}
id: "req-core-functionality"
title: "Core Functional Requirements"
unit-type: "functional-requirement-set"
status: "stable"
version: "1.3" # Incremented version for alignment with final implementation
brief: "Defines the single, combined instructional functionality of the extension, focusing on providing instruction metadata and conventions to Copilot."
see-also: ["[[csi-project-vision]]", "[[arch-main]]", "[[req-meta-knowledge]]", "[[impl-instruction-tool]]", "[[impl-file-handler]]"]

This unit specifies the essential workflow and capabilities the extension must provide to fulfill the revised, ultra-minimalist project vision.

```markdown
1.  **Combined Instruction File Listing and Convention Provision**:
    *   The extension MUST provide a SINGLE Language Model Tool (`copilotSelfImprovement-getInstructionsAndConventions`).
    *   This tool MUST list all `*.selfImprovement.instructions.md` files within the `{workspaceRoot}/.github/instructions/` directory. The listing for each file (an `InstructionFileEntry`) MUST include:
        *   `name: string` (original filename)
        *   `uri: string` (stringified URI of the file)
        *   `filePath: string` (full absolute path)
        *   `applyTo: string` (glob pattern from frontmatter, defaulting to `'**/*'` if missing/empty)
        *   `purpose?: string` (purpose string from frontmatter)
        *   `title: string` (derived: 1st H1, then 1st content line, then filename)
        *   `lastModified: string` (ISO 8601 timestamp from file system stats)
    *   This tool MUST ALSO return a detailed, human- and AI-readable description of the instruction file format, naming conventions, location, required frontmatter (`applyTo`, `purpose`), and an example of a well-formed instruction file. This fulfills `[[req-meta-knowledge]]`.
2.  **Context Augmentation**: The combined data returned by the tool (list of `InstructionFileEntry` objects and the conventions string) MUST be structured to effectively inform GitHub Copilot, enabling it to:
    *   Be aware of existing instructions and their specific applicability (`applyTo`) and intent (`purpose`).
    *   Understand how to create new instructions (using `applyTo` and `purpose` in frontmatter) or suggest modifications to existing ones, which Copilot would then perform using its own file manipulation capabilities if requested by the user.
    *   Avoid creating redundant instruction files by checking existing `purpose` and `applyTo` fields.
3.  **Read-Only Nature**: The extension itself MUST NOT read the full content of instruction files beyond what's needed for parsing frontmatter (`applyTo`, `purpose`) and deriving the `title`. GitHub Copilot is responsible for reading full file content if needed.
```
:::