::: {unit}
id: "req-security"
title: "Security Requirements"
unit-type: "non-functional-requirement"
status: "stable"
version: "1.0"
brief: "Defines the security constraints for file system operations and API usage."
see-also: ["[[csi-project-vision]]", "[[arch-main]]"]

The extension must be designed with security as a primary concern, ensuring user trust and workspace integrity.

```markdown
1.  **Directory Confinement**: All file system operations (read, write) MUST be programmatically and rigorously confined to the `{workspaceRoot}/.github/instructions/` subdirectory. The extension must never allow file paths to escape this boundary.
2.  **Safe Path Construction**: All file paths MUST be constructed and manipulated using the `vscode.Uri` API to prevent platform-specific issues and path injection vulnerabilities.
3.  **Principle of Least Privilege**: The extension's code and its manifest MUST only request and use permissions necessary for its core function. It must not attempt arbitrary file system access.
4.  **User Consent for Tool Invocation**: The integration with Copilot MUST leverage the `prepareInvocation` method of the Language Model Tool API to present a clear, user-facing confirmation dialog before the tool reads project files to inform Copilot.
```
:::