::: {unit}
id: "unit-testing-requirement"
title: "Unit Testing Requirements"
unit-type: "non-functional-requirement"
status: "stable" # Finalized for current scope
version: "1.2" # Aligned with minimalist pivot
brief: "Mandates unit testing for core logic, focusing on `fileHandler.ts` and `instructionTool.ts` to ensure correct listing, parsing, and convention provision."
see-also: ["[[csi-project-vision]]", "[[arch-quality-and-testing]]", "[[impl-file-handler]]", "[[impl-instruction-tool]]"]

The project must implement a unit testing strategy to ensure code quality, maintainability, and correctness of the VS Code extension's core functionalities, specifically the listing of instruction files and the provision of conventions.

**Key Requirements:**

1.  **High Coverage for Core Logic:** All core logic within `fileHandler.ts` (related to `readAllInstructionFiles` and `processSingleFile`, including frontmatter parsing for `applyTo`, `purpose`, `title` derivation, and `lastModified` statting) and `instructionTool.ts` (related to `invoke` and `getConventionDetails`) MUST be covered by unit tests.
2.  **Test-Driven Development (TDD) Encouraged:** Development should, where practical, follow TDD principles.
3.  **Maintainable and Non-Brittle Tests:**
    *   Tests MUST be robust and avoid brittleness.
    *   Assertions should not rely on "magic strings" prone to change. The `conventions` string in `instructionTool.ts` is an exception but should be tested for exactness as it's a contract with the LLM.
    *   Tests should focus on behavior and contract adherence (e.g., correct `InstructionFileEntry` structure, correct `conventions` string).
4.  **VS Code API Mocking:** Effective strategies for mocking the `vscode` API (e.g., `vscode.workspace.fs.readDirectory`, `vscode.workspace.fs.readFile`, `vscode.workspace.fs.stat`, `vscode.Uri`, `vscode.workspace.workspaceFolders`) MUST be used to isolate units under test.
5.  **Automated Execution:** Unit tests MUST be executable via `npm test`.
6.  **Clarity and Readability:** Test code should be clear, readable, and well-organized.

This requirement aims to build confidence in the extension's stability and ensure that the data provided to GitHub Copilot is accurate and conforms to the defined `InstructionFileEntry` and conventions contract.
:::
