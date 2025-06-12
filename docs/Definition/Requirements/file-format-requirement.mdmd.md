::: {unit}
id: "req-file-format"
title: "Instruction File Format Requirement"
unit-type: "data-structure-definition"
status: "stable"
version: "1.1" # Aligned with 5-field model
brief: "Defines the required structure for *.selfImprovement.instructions.md files, focusing on `applyTo` and `purpose` frontmatter."
see-also: ["[[req-core-functionality]]", "[[impl-file-handler]]", "[[req-meta-knowledge]]"]

All instruction files created by GitHub Copilot MUST adhere to a two-part structure to ensure proper parsing and programmatic use by the extension. This structure separates machine-readable metadata (frontmatter) from human- and AI-readable natural language instructions (Markdown body).

### 1. YAML Frontmatter (to be created by Copilot)

A block of valid YAML, delimited by `---`, at the beginning of the file.

```yaml
# The frontmatter MUST contain these key-value pairs for configuration by Copilot.
applyTo: string # REQUIRED. Glob pattern specifying which files this instruction set applies to (e.g., "src/components/**/*.tsx").
purpose: string # REQUIRED. A brief, one-sentence description of the instruction's objective or what it helps achieve.

# Note: The 'title' field, if present in frontmatter, will be used by the tool for the 'title' metadata.
# However, Copilot is not required to create a 'title' in the frontmatter, as the tool has a fallback mechanism.
# Other fields like lastModified, filePath, uri, and name are measured/derived by the tool and should NOT be set by Copilot.
```

### 2. Markdown Body (Content for Copilot)

The section following the frontmatter containing the actual natural language instructions for GitHub Copilot. This section MUST use standard Markdown formatting.

**Example File (to be created by Copilot):**
```markdown
---
applyTo: "src/services/**/*.ts"
purpose: "Guidelines for implementing service classes, including dependency injection and error handling."
---

## Service Class Implementation Guide

- All services should be injectable and registered with the DI container.
- Ensure robust error handling and logging within service methods.
- Define clear interfaces for each service contract.
```

**Tool-Provided Metadata (Not part of the file format Copilot writes, but what the tool returns):**

When the extension's tool lists these files, it will provide an `InstructionFileEntry` object for each, containing:
*   `name: string` (filename)
*   `uri: string` (file URI)
*   `filePath: string` (absolute path)
*   `applyTo: string` (from frontmatter, defaults to `'**/*'`)
*   `purpose?: string` (from frontmatter)
*   `title: string` (derived: frontmatter `title` -> 1st H1 -> 1st content line -> filename)
*   `lastModified: string` (ISO 8601 timestamp)
:::