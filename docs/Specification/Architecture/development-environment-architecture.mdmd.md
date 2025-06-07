::: {composition}
id: "arch-dev-environment"
title: "Development Environment Architecture"
composition-type: "development-process-definition"
status: "stable"
version: "1.0"
brief: "Defines the setup for the development repository, Codespaces, and project scaffolding."
see-also: ["[[arch-main]]", "[[impl-package-json]]"]

A consistent and efficient development environment is crucial. This architecture specifies the use of standard, modern tooling.

1.  **GitHub Repository**: A standard GitHub repository will be used, containing a `.gitignore` for Node.js projects and an MIT `LICENSE`.
2.  **GitHub Codespaces**: A `devcontainer.json` will be configured to provide a cloud-based development environment. It will specify a current Node.js version (e.g., >=18.x) and pre-install essential extensions like ESLint, Prettier, and GitHub Copilot itself for in-environment testing.
3.  **Project Scaffolding**: The project structure will be created using the official Yeoman generator for VS Code (`yo code`), selecting the "New Extension (TypeScript)" option. This provides a standard setup for building, debugging, and testing. The resulting `package.json` contract is specified in `[[impl-package-json]]`.
:::