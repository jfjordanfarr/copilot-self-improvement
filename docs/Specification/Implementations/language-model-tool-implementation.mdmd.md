<!-- filepath: d:\\Projects\\copilot-self-improvement\\docs\\Specification\\Implementations\\language-model-tool-implementation.mdmd.md -->
::: {unit}
id: "impl-instruction-tool"
title: "InstructionTool TypeScript Module (Single Tool)"
unit-type: "typescript-module-definition"
language: "typescript"
status: "stable"
version: "1.2" # Incremented for alignment with 5-field model
brief: "Defines the TypeScript module and class that implement the single vscode.LanguageModelTool for providing instruction file metadata and conventions."
source-ref: "src/instructionTool.ts"
see-also: ["[[copilot-integration-architecture]]", "[[file-handler-implementation]]", "[[core-functionality-requirement]]", "[[meta-knowledge-requirement]]"]

This module contains the `InstructionTool` class, which implements the `vscode.LanguageModelTool` interface. It provides the single tool `copilotSelfImprovement-getInstructionsAndConventions`.

**`InstructionTool` Class:**

```typescript
import * as vscode from 'vscode';
import { readAllInstructionFiles, InstructionFileEntry } from './fileHandler'; // Ref: [[file-handler-implementation]]

// Output type for the single tool, matches [[copilot-integration-architecture]]
interface InstructionsAndConventionsOutput {
  instructionFiles: InstructionFileEntry[]; // Array of metadata for each instruction file
  conventions: string; // String detailing how Copilot should create/manage these files
}

export class InstructionTool implements vscode.LanguageModelTool<InstructionsAndConventionsOutput, any> {

    public readonly name = 'copilotSelfImprovement-getInstructionsAndConventions';
    public readonly description = "Lists existing instruction files (*.selfImprovement.instructions.md) metadata and provides conventions for their creation/management. Copilot uses this to understand existing guidance and how to create new instructions itself.";

    private getConventionDetails(): string {
        // This string fulfills [[meta-knowledge-requirement]]
        // It details the 5-field model: applyTo, purpose (frontmatter by Copilot) and filePath, lastModified, title (measured/derived by tool)
        return `
## Conventions for *.selfImprovement.instructions.md Files

**Purpose:**
These files provide project-specific guidance to GitHub Copilot to enhance its assistance within this workspace. They allow you to define coding patterns, preferred libraries, architectural constraints, and other contextual information.

**Location:**
Files MUST be placed in the \`{workspaceRoot}/.github/instructions/\` directory.

**Naming Convention:**
Files MUST use the suffix \`*.selfImprovement.instructions.md\`.
Example: \`react-component-guidelines.selfImprovement.instructions.md\`

**Format:**
Files are Markdown documents with YAML frontmatter.

**YAML Frontmatter Fields (to be written by GitHub Copilot):**
---
applyTo: string # REQUIRED. Glob pattern (e.g., "src/components/**/*.tsx", "**/*" for all files) that specifies which files this instruction set applies to. The instruction content is automatically shown to Copilot when files matching this glob are being handled.
purpose: string # REQUIRED. A brief, one-sentence description of the objective or goal of this instruction file.
# title: string # OPTIONAL. If provided, this will be used as the primary source for the 'title' metadata. Otherwise, title is derived.
---

**Metadata Provided by the Tool (for each file listed):**
In addition to any frontmatter you write, the tool will provide the following metadata for each instruction file:
- \`filePath: string\` (Full absolute path to the file)
- \`lastModified: string\` (ISO 8601 timestamp of last modification)
- \`title: string\` (Derived title: uses frontmatter \`title\` if present, then first H1, then first content line, then filename)
- \`name: string\` (The filename)
- \`uri: string\` (The stringified URI of the file)

**Markdown Body (Content - to be written by GitHub Copilot):**
The main body of the file (after the frontmatter) contains the actual natural language instructions for GitHub Copilot, written in standard Markdown.

**Example File (to be created by Copilot - \`example.selfImprovement.instructions.md\`):**
---
applyTo: "src/utils/**/*.ts"
purpose: "Guidelines for creating utility functions in TypeScript."
---

## Utility Function Guidelines

- All utility functions should be pure functions where possible.
- Document each function with JSDoc comments.
- Prefer arrow functions for concise utilities.

**Role of \`applyTo\`:**
- The \`applyTo\` glob pattern is crucial. Instructions are only automatically applied by Copilot when it is working on files matching this pattern.

Remember: You (GitHub Copilot) are responsible for reading the full content of these files if needed, and for creating or modifying them based on user requests, including the \`applyTo\` and \`purpose\` frontmatter. This tool only lists them and tells you the rules for the frontmatter you need to write and the metadata it will provide.
        `;
    }

    async invoke(
        options: vscode.LanguageModelToolInvocationOptions<any>,
        progress: vscode.Progress<vscode.LanguageModelToolResponsePart<InstructionsAndConventionsOutput>>,
        token: vscode.CancellationToken
    ): Promise<vscode.LanguageModelToolResponse<InstructionsAndConventionsOutput>> {
        progress.report({ message: 'Accessing project instruction files and conventions...' });

        const files = await readAllInstructionFiles(); // Ref: [[file-handler-implementation]]
        const conventions = this.getConventionDetails();

        if (token.isCancellationRequested) {
            throw new vscode.CancellationError();
        }

        return {
            result: {
                instructionFiles: files,
                conventions: conventions
            }
        };
    }

    async prepareInvocation(
        options: vscode.LanguageModelToolInvocationPrepareOptions<any>,
        token: vscode.CancellationToken
    ): Promise<vscode.LanguageModelToolInvocationPreparation> {
        const confirmationMessage = {
            title: 'Access Self-Improvement Instructions & Conventions',
            message: new vscode.MarkdownString(
                `Allow 'Copilot Self-Improvement' to list instruction files from your '.github/instructions/' directory and provide conventions for their use? This helps Copilot align with project standards.`
            ),
        };
        return {
            confirmationMessages: confirmationMessage,
        };
    }
}
```

This implementation directly supports `[[core-functionality-requirement]]` by providing the single tool that lists file metadata and provides conventions, and `[[meta-knowledge-requirement]]` through the detailed convention string (explaining the 5-field model: `applyTo`, `purpose` written by Copilot; `filePath`, `lastModified`, `title` measured/derived by the tool, plus `name` and `uri`). It uses `[[file-handler-implementation]]` for acquiring the `InstructionFileEntry` data.
:::