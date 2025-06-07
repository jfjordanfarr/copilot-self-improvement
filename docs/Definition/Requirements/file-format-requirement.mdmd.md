::: {unit}
id: "req-file-format"
title: "Instruction File Format Requirement"
unit-type: "data-structure-definition"
status: "stable"
version: "1.0"
brief: "Defines the required structure for *.selfImprovement.instructions.md files."
see-also: ["[[req-core-functionality]]", "[[impl-file-handler]]"]

All instruction files must adhere to a two-part structure to ensure proper parsing and programmatic use. This structure separates machine-readable metadata from human- and AI-readable natural language instructions.

### 1. YAML Frontmatter

A block of valid YAML, delimited by `---`, at the beginning of the file.

```yaml
# The frontmatter must contain key-value pairs for configuration.
title: string # A human-readable title for the instruction set.
description: string # A brief explanation of the instruction's purpose.
targetScope: string | string[] # (Optional) Area of Copilot interaction this applies to (e.g., "function_generation", "test_writing").
priority: number # (Optional) A numeric value to help resolve conflicts if multiple instruction files are relevant.
active: boolean # A flag to easily enable or disable an instruction set without deleting the file.
tags: string[] # (Optional) An array of keywords for filtering or categorization.
```

### 2. Markdown Body

The section following the frontmatter containing the actual natural language instructions for GitHub Copilot. This section MUST use standard Markdown formatting.

```markdown
---
title: "Guidelines for Asynchronous Operations"
active: true
priority: 100
---

## Asynchronous Operations

- Always use `async/await` for promise-based asynchronous operations.
- For error handling in async functions, prefer `try/catch` blocks.
- **AVOID**: Using `.then()` and `.catch()` chains for complex flows.
```
:::