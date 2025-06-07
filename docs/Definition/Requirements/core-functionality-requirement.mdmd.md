::: {unit}
id: "req-core-functionality"
title: "Core Functional Requirements"
unit-type: "functional-requirement-set"
status: "stable"
version: "1.0"
brief: "Defines the primary functionalities of the Copilot Self-Improvement extension."
see-also: ["[[csi-project-vision]]", "[[arch-main]]"]

This unit specifies the essential workflow and capabilities the extension must provide to fulfill the project vision.

```markdown
1.  **Instruction File Creation**: The extension MUST provide a user-invokable command to create a new, templated instruction file.
2.  **Strict File Convention**: The extension MUST enforce that all instruction files are named `[name].selfImprovement.instructions.md` and are located within the `{workspaceRoot}/.github/instructions/` directory. The extension must create this directory if it doesn't exist.
3.  **Copilot Agent Mode Interaction**:
    *   The extension MUST register a Language Model Tool that is discoverable by GitHub Copilot Agent Mode.
    *   When invoked by Copilot, this tool MUST read, process, and return the content of all relevant and active `.selfImprovement.instructions.md` files.
4.  **Context Augmentation**: The data returned by the tool MUST be structured to augment Copilot's context, leading to generated outputs (code, explanations, etc.) that are more closely aligned with the project-specific directives.
```
:::