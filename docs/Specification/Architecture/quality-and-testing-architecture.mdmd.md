---
id: quality-and-testing-architecture
title: Quality and Testing Architecture (Ultra-Minimalist)
status: stable # Updated from draft
version: 1.2 # Incremented for minimalist pivot
date: 2025-06-09 # Updated date
authors:
  - AI Assistant
  - User
see-also:
  - "[[main-architecture]]"
  - "[[unit-testing-requirement]]"
  - "[[security-requirement]]"
  - "[[development-environment-architecture]]"
---
::: {composition}
id: "arch-quality-and-testing"
title: "Code Quality and Testing Architecture (Ultra-Minimalist)"
composition-type: "quality-assurance-plan"
status: "stable"
version: "1.1" # Updated for minimalist pivot
brief: "Defines the strategies for ensuring the minimalist extension is robust, secure, and maintainable, focusing on its single tool and limited scope."
see-also: ["[[main-architecture]]", "[[unit-testing-requirement]]"]

## 1. Code Quality

*   **Linter/Formatter**: The project uses ESLint for static analysis (config: `eslint.config.mjs`) and Prettier (implicitly, or could be added) for automated code formatting to maintain a consistent style. (Status: Implemented for ESLint)
*   **TypeScript Strict Mode**: The `tsconfig.json` has `strict: true` enabled, leveraging TypeScript's full type-checking capabilities. (Status: Implemented)
*   **Disposable Management**: All disposable resources (e.g., the Language Model Tool registration) are managed via the `context.subscriptions` array in `src/extension.ts` to prevent memory leaks. (Status: Implemented)
*   **Focused Scope**: Code quality is inherently supported by the ultra-minimalist design, reducing complexity and potential for errors. The extension has a very small codebase.

## 2. Testing Strategy (Ultra-Minimalist)

Given the extension's single tool and read-only nature, the testing strategy is focused and primarily relies on unit tests for the core logic.

*   **Unit Testing**: This is the cornerstone of the testing strategy, satisfying `[[unit-testing-requirement]]`.
    *   **`src/fileHandler.ts`**: Unit tests (`src/test/fileHandler.test.ts`) rigorously verify:
        *   Correct discovery of `*.selfImprovement.instructions.md` files in `.github/instructions/`.
        *   Accurate parsing of frontmatter fields (`applyTo`, `purpose`, optional `title`).
        *   Correct derivation of the `title` metadata based on the defined fallback logic (frontmatter, H1, first content line, filename).
        *   Accurate retrieval of `lastModified` timestamps (mocking `vscode.workspace.fs.stat`).
        *   Correct population of all fields in the `InstructionFileEntry` object (`name`, `uri`, `filePath`, `applyTo`, `purpose`, `title`, `lastModified`).
        *   Handling of edge cases (e.g., missing frontmatter, empty files, files not matching the pattern).
    *   **`src/instructionTool.ts`**: Unit tests (`src/test/instructionTool.test.ts`) ensure:
        *   The `copilotSelfImprovement-getInstructionsAndConventions` tool correctly invokes `readAllInstructionFiles` from `fileHandler.ts`.
        *   The `conventions` string accurately reflects the 5-field model (`applyTo`, `purpose` for Copilot; `filePath`, `lastModified`, `title` from tool) and other necessary details for Copilot.
        *   The tool returns the expected combined JSON output: `{ instructionFiles: InstructionFileEntry[], conventions: string }`.
    *   **`src/extension.ts`**: Unit tests (`src/test/extension.test.ts`) verify:
        *   The extension activates correctly.
        *   The single Language Model Tool (`copilotSelfImprovement-getInstructionsAndConventions`) is registered with `vscode.lm.registerTool`.
        *   No other commands or tools are registered.
*   **VS Code API Mocking**: Tests utilize `sinon` for mocking `vscode` API parts like `vscode.workspace.fs` (for `stat`, `readDirectory`, `readFile`), `vscode.Uri.joinPath`, `vscode.Uri.file`, and `vscode.lm.registerTool` to isolate the logic under test.
*   **Manual/Exploratory Testing**: 
    *   Performed using the **Extension Development Host** (launched with F5).
    *   Focuses on verifying that Copilot Chat correctly lists the tool and that invoking the tool (e.g., by asking Copilot about instructions) produces the expected JSON output (list of `InstructionFileEntry` and the `conventions` string) in the Copilot trace/debug views.
    *   Verifying activation events in `package.json` work as expected.
*   **No Integration Tests for File I/O by Copilot**: Since Copilot is responsible for all file reading (full content) and writing, the extension itself does not require integration tests for these aspects. The extension's responsibility ends with providing metadata and conventions.

## 3. Test Execution and CI/CD

*   **NPM Scripts**: `package.json` includes `npm test` to run all automated unit tests. (Status: Implemented)
*   **CI Integration (Recommended)**: Ideally, tests would be automatically executed in a CI pipeline (e.g., GitHub Actions) on every push/PR. (Status: Not currently implemented, but recommended for future robustness)
*   **Test Coverage (Recommended)**: Tools like `c8` or `nyc` could be used to measure test coverage. (Status: Not currently implemented)

This focused testing approach ensures the core functionalities of the ultra-minimalist extension are reliable and correct, aligning with its limited scope and strong emphasis on security (`[[security-requirement]]`).
:::