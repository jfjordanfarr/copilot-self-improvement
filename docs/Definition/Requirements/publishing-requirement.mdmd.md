<!-- filepath: d:\\Projects\\copilot-self-improvement\\docs\\Definition\\Requirements\\publishing-requirement.mdmd.md -->
::: {unit}
id: "req-publishing"
title: "Marketplace Publishing Requirements"
unit-type: "process-requirement"
status: "stable"
version: "1.1" # Minor update to reflect minimalist scope
brief: "Defines the requirements for packaging and publishing the minimalist VS Code extension."
see-also: ["[[project-vision]]"] # Updated link

The final product, even in its minimalist form, must be suitable for public distribution via the Visual Studio Marketplace.

```markdown
1.  **Packaging**: The extension MUST be packageable into a `.vsix` file using the standard `vsce` tool.
2.  **Marketplace Metadata**: The project MUST include high-quality metadata for its Marketplace page:
    *   A comprehensive `README.md` accurately describing the extension's single tool, its purpose (listing instruction file metadata and providing conventions), the 5-field model (`applyTo`, `purpose` for Copilot; `filePath`, `lastModified`, `title` from tool), and the fact that Copilot handles all file I/O.
    *   A `LICENSE` file.
    *   A `CHANGELOG.md` detailing changes, especially the pivot to the ultra-minimalist design.
    *   A 128x128 pixel icon.
3.  **Compliance**: The extension MUST adhere to all relevant Marketplace guidelines, including the Microsoft AI Tools and Practices Guidelines and the GitHub Copilot Extensibility Acceptable Use Policy.
```
:::