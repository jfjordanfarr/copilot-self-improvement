::: {unit}
id: "req-security"
title: "Security Requirements"
unit-type: "non-functional-requirement-set"
status: "stable"
version: "1.2" # Updated for ultra-minimalist scope
brief: "Defines strict security constraints: read-only access, limited to a specific directory and specific frontmatter fields."
see-also: ["[[csi-project-vision]]", "[[arch-main]]", "[[impl-file-handler]]"]

This unit outlines the critical security measures and constraints for the extension, ensuring it operates with the minimum necessary privileges.

```markdown
1.  **Strictly Read-Only Operations**:
    *   The extension MUST NOT perform any write, create, or delete operations on the file system.
    *   All interactions with instruction files MUST be strictly limited to reading existing files.

2.  **Scoped and Limited File Access**:
    *   File system reading MUST be strictly limited to the `{workspaceRoot}/.github/instructions/` directory.
    *   The extension MUST NOT attempt to list or read files from any other location.
    *   When reading files from the allowed directory, the extension MUST only parse the YAML frontmatter to extract `applyTo`, `purpose`, and optionally `title` (for title derivation). It MUST NOT read or process the full Markdown body content of the files for its own operations. GitHub Copilot is responsible for reading the full content if needed.

3.  **No Arbitrary Code Execution**: The extension MUST NOT execute any code or commands based on the content of instruction files. Its functionality is solely to list files and provide conventions.

4.  **No User Input for File Paths**: The Language Model Tool provided by the extension does not accept file paths or patterns as input from the LLM, preventing any form of path traversal or broader file system access attempts via tool arguments.
```
:::