<!-- filepath: d:\\Projects\\copilot-self-improvement\\docs\\Definition\\Vision\\project-vision.mdmd.md -->
::: {composition}
id: "project-vision" # Simplified ID
title: "Copilot Self-Improvement Project Vision (Ultra-Minimalist)"
composition-type: "project-vision-overview"
status: "stable"
version: "1.1" # Updated for ultra-minimalist pivot
brief: "To empower GitHub Copilot with project-specific intelligence via an ultra-secure, minimalist VS Code extension that only lists instruction file metadata and teaches conventions."

## 1. Vision Statement (Ultra-Minimalist)

The vision is to provide a **radically simple and secure** mechanism for developers to imbue GitHub Copilot with project-specific context and guidance. The "Copilot Self-Improvement" extension achieves this by doing one thing and one thing only: listing metadata of instruction files found in a designated project directory (`.github/instructions/*.selfImprovement.instructions.md`) and clearly communicating the conventions for these files to Copilot.

This "self-improvement" is an **emergent property** arising from Copilot itself understanding and utilizing these instructions. The extension acts as a passive, read-only information provider, empowering Copilot to read, interpret, and even create or modify these instruction files based on user interaction and the conventions taught by the extension.

Our goal is an extension so transparently safe and minimal that it can be adopted universally, even in the most security-conscious enterprise environments. **It does nothing but list file metadata from one specific, project-local directory and explain a simple 5-field data model (2 fields authored by Copilot via frontmatter, 3 derived by the tool).**

## 2. Core Principles (Ultra-Minimalist)

*   **Radical Simplicity & Security**: 
    *   The extension has **NO internet access**.
    *   The extension has **NO file write privileges**.
    *   The extension only performs **read-only operations** (listing files, reading minimal frontmatter, getting file stats) strictly within the `.github/instructions/` directory.
    *   It runs **NO heavy programs** or complex background processes.
    *   This adheres to the strictest interpretation of `[[security-requirement]]`.
*   **Empowering Copilot, Not Replacing It**: The extension provides metadata and conventions; GitHub Copilot is responsible for all substantive actions (reading full file content, creating files, modifying files).
*   **Seamless Integration via a Single Tool**: Interaction occurs through one `vscode.LanguageModelTool` (`copilotSelfImprovement-getInstructionsAndConventions`), making it a natural part of the Copilot ecosystem. See `[[copilot-integration-architecture]]`.
*   **Clarity of Convention**: The 5-field model for `InstructionFileEntry` (`filePath`, `lastModified`, `title` derived by tool; `applyTo`, `purpose` authored by Copilot in frontmatter) is clearly communicated to Copilot. See `[[meta-knowledge-requirement]]` and `[[file-format-requirement]]`.

## 3. Realization (Ultra-Minimalist)

This vision is realized by:
*   A single Language Model Tool fulfilling `[[core-functionality-requirement]]`.
*   Strict adherence to the defined file format and metadata conventions (`[[file-format-requirement]]`, `[[meta-knowledge-requirement]]`).
*   A commitment to the security principles outlined (`[[security-requirement]]`).
*   The extension being publishable to the VS Code Marketplace (`[[publishing-requirement]]`), with its minimalist nature being a key feature.
*   The overall system architecture detailed in `[[main-architecture]]` reflects this minimalism.
*   Usability is focused on the clarity of the tool for Copilot (`[[usability-requirement]]`).
:::