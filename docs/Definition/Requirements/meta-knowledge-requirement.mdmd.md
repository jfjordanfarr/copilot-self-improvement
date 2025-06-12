::: {unit}
id: "req-meta-knowledge"
title: "Meta-Knowledge Provision Requirement"
unit-type: "functional-requirement"
status: "stable"
version: "1.2" # Incremented version for alignment
brief: "Requires the extension's single tool to provide comprehensive information about instruction file conventions, focusing on `applyTo` and `purpose` for Copilot-authored frontmatter."
see-also: ["[[csi-project-vision]]", "[[req-core-functionality]]", "[[arch-copilot-integration]]", "[[impl-instruction-tool]]"]

This unit specifies that the extension's single Language Model Tool must be able to "teach" or inform the LLM (and potentially the user) about how to create and manage `*.selfImprovement.instructions.md` files.

```markdown
1.  **Convention Articulation (as part of the single tool output)**: The single Language Model Tool (`copilotSelfImprovement-getInstructionsAndConventions`) MUST clearly articulate:
    *   The purpose of `*.selfImprovement.instructions.md` files.
    *   The designated storage location: `{workspaceRoot}/.github/instructions/`.
    *   The naming convention: `*.selfImprovement.instructions.md`.
    *   The expected file format (Markdown with YAML frontmatter).
    *   **Required YAML Frontmatter Fields (for Copilot to create):**
        *   `applyTo: string` (Glob pattern for applicability, defaults to `'**/*'` if missing/empty when read by the tool).
        *   `purpose: string` (A brief, one-sentence description of the instruction's objective).
    *   **Information Provided by the Tool (derived/read by the tool for existing files):**
        *   `name: string`
        *   `uri: string`
        *   `filePath: string`
        *   `title: string` (Derived: 1st H1, then 1st content line, then filename).
        *   `lastModified: string` (ISO 8601 timestamp).
    *   The role of the `applyTo` glob pattern in matching instructions to workspace files.
    *   An example of a well-formed instruction file, demonstrating the use of `applyTo` and `purpose` in the frontmatter.
2.  **Accessibility**: This meta-knowledge MUST be easily accessible to GitHub Copilot as part of the single tool's response, within the `conventions` string property of the JSON output.
```

This requirement ensures that Copilot can be guided by the extension to understand *how* to create or suggest valid instruction files (using `applyTo` and `purpose`), which Copilot will then perform using its own file manipulation capabilities.
:::
