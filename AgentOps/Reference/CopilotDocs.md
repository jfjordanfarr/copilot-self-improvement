# Code Dump: copilot

*Generated on: copilot-self-improvement*

## ai-powered-suggestions.md

```markdown
---
ContentId: 7ab2cd6c-45fd-4278-a6e8-1c9e060593ea
DateApproved: 06/12/2025
MetaDescription: Enhance your coding with AI-powered code completions from GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Code completions with GitHub Copilot in VS Code

GitHub Copilot acts as an AI-powered pair programmer, automatically offering suggestions to complete your code, comments, tests, and more. It provides these suggestions directly in the editor while you write your code, and it can work with a broad range of programming languages and frameworks.

Copilot provides two kinds of suggestions:

* **Code completions** - Start typing in the editor, and Copilot provides code suggestions that match your coding style and take your existing code into account.

* **Next edit suggestions** - Predict your next code edit with Copilot next edit suggestions, aka Copilot NES. Based on the edits you're making, NES both predicts the location of the next edit you'll want to make and what that edit should be.

## Getting started

1. Install the GitHub Copilot extensions.

    > <a class="install-extension-btn" href="vscode:extension/GitHub.copilot?referrer=docs-copilot-ai-powered-suggestions">Install the GitHub Copilot extensions</a>

1. Sign in with your GitHub account to use Copilot.

    > [!TIP]
    > If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

1. Discover the key features of Copilot in VS Code with our [Copilot Quickstart](/docs/copilot/getting-started.md).

## Inline suggestions

Copilot offers code suggestions as you type: sometimes the completion of the current line, sometimes a whole new block of code. You can accept all, or part of a suggestion, or you can keep typing and ignore the suggestions.

Notice in the following example how Copilot suggests an implementation of the `calculateDaysBetweenDates` JavaScript function by using dimmed *ghost text*:

![JavaScript ghost text suggestion.](images/inline-suggestions/js-suggest.png)

When you're presented with an inline suggestion, you can accept it with the `kbstyle(Tab)` key.

Copilot tries to apply the same coding style for the code suggestions that you already have in your code. Notice in the following example that Copilot applies the same input parameter naming scheme from the `add` method for the suggested `subtract` method.

![JavaScript ghost text suggestion.](images/inline-suggestions/ts-suggest-parameter-names.png)

### Partially accepting suggestions

You might not want to accept an entire suggestion from GitHub Copilot. You can use the `kb(editor.action.inlineSuggest.acceptNextWord)` keyboard shortcut to accept either the next word of a suggestion, or the next line.

### Alternative suggestions

For any given input, Copilot might offer multiple, alternative suggestions. You can hover over the suggestion to any of the other suggestions.

![Hovering over inline suggestions enables you to select from multiple suggestions](images/inline-suggestions/copilot-hover-highlight.png)

### Generate suggestions from code comments

Instead of relying on Copilot to provide suggestions, you can provide hints about what code you expect by using code comments. For example, you could specify a type of algorithm or concept to use (for example, "use recursion" or "use a singleton pattern"), or which methods and properties to add to a class.

The following example shows how to instruct Copilot to create a class in TypeScript to represent a student, providing information about methods and properties:

![Use code comments to let Copilot generate a Student class in TypeScript with properties and methods.](images/inline-suggestions/ts-suggest-code-comment.png)

## Next Edit Suggestions

Inline suggestions are great at autocompleting a section of code. But since most coding activity is editing existing code, it's a natural evolution of Copilot code completions to also help with edits, both at the cursor and further away. Edits are often not made in isolation - there's a logical flow of what edits need to be made in different scenarios. Copilot next edit suggestions (Copilot NES) is this evolution.

<video src="./images/inline-suggestions/nes-video.mp4" title="Copilot NES video" controls poster="./images/inline-suggestions/point3d.png"></video>

Based on the edits you're making, Copilot NES both predicts the location of the next edit you'll want to make and what that edit should be. Copilot NES helps you stay in the flow, suggesting future changes relevant to your current work, and you can simply `kbstyle(Tab)` to quickly navigate and accept Copilot's suggestions. Suggestions may span a single symbol, an entire line, or multiple lines, depending on the scope of the potential change.

To get started with Copilot NES, enable the VS Code setting `setting(github.copilot.nextEditSuggestions.enabled)`.

### Navigate and accept edit suggestions

You can quickly navigate to suggested code changes with the `kbstyle(Tab)` key, saving you time to find the next relevant edit (no manual searching through files or references required). You can then accept a suggestion with the `kbstyle(Tab)` key again.

An arrow in the gutter indicates if there is an edit suggestion available. You can hover over the arrow to explore the edit suggestion menu, which includes keyboard shortcuts and settings configuration:

![Copilot NES gutter menu expanded](./images/inline-suggestions/gutter-menu-highlighted-updated.png)

If an edit suggestion is below the current editor view, the arrow will point down instead of right:

![Copilot NES with arrow directions changing](./images/inline-suggestions/nes-arrow-directions.gif)

> [!IMPORTANT]
> If you are a [VS Code vim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) user, please use the latest version of the extension to avoid any conflicts in keybindings with NES.

### Reduce distractions by edit suggestions

By default, edit suggestions are indicated by the gutter arrow and the code changes are shown in the editor. If you prefer to reduce distractions, you can disable showing the code changes in the editor until you press the `kbstyle(Tab)` key to navigate to the suggestion or until you hover over the gutter arrow.

To disable showing the code changes in the editor, enable the `setting(editor.inlineSuggest.edits.showCollapsed)` setting in the Settings editor. Alternatively, hover over the gutter arrow and select the **Show Collapsed** option from the menu. To re-enable showing the code changes, disable the setting or select **Show Expanded** from the gutter arrow menu.

### Use cases for next edit suggestions

**Catching and correcting mistakes**

* **Copilot helps with simple mistakes like typos.** It'll suggest fixes where letters are missing or swapped, like `cont x = 5` or `conts x = 5`, which should've been `const x = 5`.

    ![Copilot NES fixing a typo from "conts" to "const"](./images/inline-suggestions/nes-typo.gif)

* **Copilot can also help with more challenging mistakes in logic**, like an inverted ternary expression:

    ![Copilot NES fixing a fibonacci logic mistake](./images/inline-suggestions/nes-fib-logic.gif)

    Or a comparison that should've used `&&` instead of `||`:

    ![Copilot NES fixing an if statement mistake](./images/inline-suggestions/nes-de-morgan.gif)

**Changing intent**

* **Copilot suggests changes to the rest of your code that match a new change in intent.** For example, when changing a class from `Point` to `Point3D`, Copilot will suggest to add a `z` variable to the class definition. After accepting the change, Copilot NES next recommends adding `z` to the distance calculation:

    ![Copilot NES gif for updating Point to Point3D](./images/inline-suggestions/nes-point.gif)
    <!-- ![Copilot NES for updating Point to Point3D](./images/inline-suggestions/point3d.png)

    ![Copilot NES for adding z to distance calculation of Point3D](./images/inline-suggestions/point3d-distance.png) -->

**Adding new variables or logic**

* **Using newly added arguments, variables, or functions**. Copilot helps you use new code you just added. This may be a small change, like calling a new method parameter in the actual method.

    It could also be more complex: if you added a new command to your VS Code extension's `extension.ts`, Copilot will first suggest to clean up the command in `extension.ts`. Then when you open `package.json`, Copilot suggests registering that command as well:

    ![Updating extension.ts and package.json with a new command](./images/inline-suggestions/nes-extension-and-package.gif)

    <!-- ![Add command in package.json](./images/inline-suggestions/add-disposable.png)
    ![Add command in package.json](./images/inline-suggestions/call-disposable-full.png) -->

**Refactoring**

* **Rename a variable once in a file, and Copilot will suggest to update it everywhere else.** If you use a new name or naming pattern, Copilot suggests to update subsequent code similarly.

    ![Copilot NES suggesting change after updating function name](./images/inline-suggestions/nes-gutter.gif)

* **Matching code style**. After copy-pasting some code, Copilot will suggest how to adjust it to match the current code where the paste happened.

## Enable or disable code completions

You can enable or disable code completions either for all languages, or for specific languages only.

* To enable or disable code completions, select the Copilot menu in the Status Bar, and then check or uncheck the options to enable or disable code completions.

    ![Screenshot of the Copilot menu in the Status Bar with checkboxes to enabled or disable code completions and NES.](images/inline-suggestions/copilot-menu-status-bar.png)

* Alternatively, modify the `setting(github.copilot.enable)` setting in the Settings editor.

    Add an entry for each language you want to enable or disable code completions for. To enable or disable code completions for all languages, set the value for `*` to `true` or `false`.

## Change the AI model for completions

Different Large Language Models (LLMs) are trained on different types of data and might have different capabilities and strengths. Learn more about how to [choose between different AI language models](/docs/copilot/language-models.md) in VS Code.

To change the language model that is used for generating code completions in the editor:

1. Open the Command Palette (`kbstyle(F1)`).

1. Type **change completions model** and select the **GitHub Copilot: Change Completions Model** command.

1. In the dropdown menu, select the model you want to use.

Alternatively, if Command Center is enabled, you can click the Copilot menu in the VS Code title bar, then click **Configure Code Completions** in the dropdown menu. Then choose **Change Completions Model...** in the dropdown menu and select the model you want to use.

> [!NOTE]
> The list of available models might vary and change over time. The model picker may not always show more than one model, and preview models and additional code completion models will become available there if/when we release them. If you are a Copilot Business or Enterprise user, your Administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) on GitHub.com.

## Tips & tricks

### Context

To give you relevant inline suggestions, Copilot looks at the current and open files in your editor to analyze the context and create appropriate suggestions. Having related files open in VS Code while using Copilot helps set this context and lets Copilot get a bigger picture of your project.

## Settings

### Code completions settings

* `setting(github.copilot.enable)` - enable or disable inline completions for all or specific languages.

* `setting(editor.inlineSuggest.fontFamily)` - configure the font for the inline completions.

* `setting(editor.inlineSuggest.showToolbar)` - enable or disable the toolbar that appears for inline completions.

* `setting(editor.inlineSuggest.syntaxHighlightingEnabled)` - enable or disable syntax highlighting for inline completions.

### Next edit suggestions settings

* `setting(github.copilot.nextEditSuggestions.enabled)` - enable Copilot next edit suggestions (Copilot NES).

* `setting(editor.inlineSuggest.edits.allowCodeShifting)` - configure if Copilot NES is able to shift your code to show a suggestion.

* `setting(editor.inlineSuggest.edits.renderSideBySide)` - configure if Copilot NES can show larger suggestions side-by-side if possible, or if Copilot NES should always show larger suggestions below the relevant code.

     * **auto (default)**: show larger edit suggestions side-by-side if there is enough space in the viewport, otherwise the suggestions are shown below the relevant code.
     * **never**: never show suggestions side-by-side, always show suggestions below the relevant code.

## Next steps

* Discover the key features with the [Copilot Quickstart](/docs/copilot/chat/getting-started-chat.md).

* Use AI chat conversations with [Copilot Chat](/docs/copilot/chat/copilot-chat.md).

* Watch the videos in our [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube.

```

## copilot-customization.md

```markdown
---
ContentId: 16c73175-a606-4aab-8ae5-a507fe8947eb
DateApproved: 06/12/2025
MetaDescription: Learn how to customize GitHub Copilot Chat with custom instructions and reusable prompt files to align AI responses with your coding practices and project requirements.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Customize AI responses in VS Code

Chat in Visual Studio Code can give you responses and generate code that matches your coding practices and project requirements, if you give it the right context. Instead of repeatedly adding this information in every chat prompt, you can store this context in files and automatically include it in every chat request. In this article, you learn how to use custom instructions and prompt files to customize AI responses in VS Code.

There are three main ways to customize AI responses in Visual Studio Code:

* **Custom instructions**: Define common guidelines or rules for tasks like generating code, performing code reviews, or generating commit messages. Custom instructions describe the conditions in which the AI should perform operate (_how_ a task should be done). Learn how to [define custom instructions](#custom-instructions).

    <details>
    <summary>Example scenarios</summary>

    * Specify coding practices, preferred technologies, or project requirements, so generated code follows your standards.
    * Set rules for code reviews, such as checking for security vulnerabilities or performance issues.
    * Provide instructions for generating commit messages or pull request titles and descriptions.

    </details>

* **Prompt files**: Define reusable prompts for common tasks like generating code or performing a code review. Prompt files are standalone prompts that you can run directly in chat. They describe the task to be performed (_what_ should be done). Optionally, you can include tasks-specific guidelines about how the task should be performed, or you can reference custom instructions in the prompt file. Learn how to [create prompt files](#prompt-files-experimental).

    <details>
    <summary>Example scenarios</summary>

    * Create reusable prompts for common coding tasks, such as scaffolding a new component, API route, or generating tests.
    * Define prompts for performing code reviews, such as checking for code quality, security vulnerabilities, or performance issues.
    * Create step-by-step guides for complex processes or project-specific patterns.
    * Define prompts for generating implementation plans, architectural designs, or migration strategies.

    </details>

* **Custom chat modes**: Define how chat operates, which tools it can use, and how it interacts with the codebase. Each chat prompt is run within the boundaries of the chat mode, without having to configure tools and instructions for every request.

    <details>
    <summary>Example scenarios</summary>

    * Create a chat mode for planning, where the AI has read-only access to the codebase and can only generate implementation plans.
    * Define a research chat mode, where the AI can reach out to external resources to explore new technologies or gather information.
    * Create a front-end developer chat mode, where the AI can only generate and modify code related to front-end development.

    </details>

## Custom instructions

Custom instructions enable you to describe common guidelines or rules to get responses that match your specific coding practices and tech stack. Instead of manually including this context in every chat query, custom instructions automatically incorporate this information with every chat request.

> [!NOTE]
> Custom instructions are not taken into account for [code completions](/docs/copilot/ai-powered-suggestions.md).

### Types of custom instructions

VS Code supports multiple ways to define custom instructions:

| Custom instructions type | Description |
|--------------------------|-------------|
| `.github/copilot-instructions.md` file | <ul><li>Describe code-generation instructions in Markdown.</li><li>All instructions are combined in a single file, stored within the workspace.</li><li>Instructions are automatically included in every chat request.</li><li>Supported across all editors and IDEs that support Copilot.</li><li>Use this file to define general coding practices, preferred technologies, and project requirements that apply to all code-generation tasks.</li></ul> |
| `.instructions.md` files | <ul><li>Describe code-generation instructions in Markdown.</li><li>Create one or more instructions files, stored in the workspace or your user profile.</li><li>Use glob patterns to automatically include instructions for all requests or for specific files.</li><li>Supported in VS Code.</li><li>Use these files if you want to have task-specific code-generation instructions, and to have more control over when to include instructions with your chat prompt.</li></ul> |
| VS Code settings | <ul><li>Specify instructions in VS Code user or workspace settings.</li><li>Define instructions in settings values or in one or more files.</li><li>Supported in VS Code.</li><li>Supports instructions for code generation, test generation, commit messages, code review, and PR titles and descriptions.</li><li>Use this option to define instructions for tasks other than code-generation.</li></ul> |

You can use a combination of these approaches to define custom instructions and the instructions are all included in the chat request. No particular order or priority is applied to the instructions, so make sure to avoid conflicting instructions in the files.

### Custom instructions examples

The following examples demonstrates how to use custom instructions:

<details>
<summary>Example: general coding guidelines</summary>

```markdown
---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
```

</details>

<details>
<summary>Example: TypeScript and React coding guidelines</summary>

Notice how these instructions reference the general coding guidelines file. You can separate the instructions into multiple files to keep them organized and focused on specific topics.

```markdown
---
applyTo: "**/*.ts,**/*.tsx"
---
# Project coding standards for TypeScript and React

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

## TypeScript Guidelines
- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators

## React Guidelines
- Use functional components with hooks
- Follow the React hooks rules (no conditional hooks)
- Use React.FC type for components with children
- Keep components small and focused
- Use CSS modules for component styling
```

</details>

### Use a `.github/copilot-instructions.md` file

You can store custom instructions in your workspace or repository in a `.github/copilot-instructions.md` file and describe your coding practices, preferred technologies, and project requirements by using Markdown. These instructions only apply to the workspace where the file is located.

VS Code automatically includes the instructions from the `.github/copilot-instructions.md` file in every chat request and applies them for generating code.

To use a `.github/copilot-instructions.md` file:

1. Set the `setting(github.copilot.chat.codeGeneration.useInstructionFiles)` setting to `true` to instruct VS Code to use the custom instructions file.

1. Create a `.github/copilot-instructions.md` file at the root of your workspace. If needed, create a `.github` directory first.

1. Describe your instructions by using natural language and in Markdown format.

    Whitespace between instructions is ignored, so the instructions can be written as a single paragraph, each on a new line, or separated by blank lines for legibility.

> [!NOTE]
> GitHub Copilot in Visual Studio and GitHub.com also detect the `.github/copilot-instructions.md` file. If you have a workspace that you use in both VS Code and Visual Studio, you can use the same file to define custom instructions for both editors.

### Use `.instructions.md` files

You can also create one or more `.instructions.md` files to store custom instructions for specific tasks. For example, you can create instruction files for different programming languages, frameworks, or project types.

VS Code can automatically add instructions files to all chat requests, or you can specify for which files the instructions should be applied automatically. Alternatively, you can manually attach instructions files to a chat prompt.

VS Code supports two types of scopes for instruction files:

* **Workspace instructions files**: are only available within the workspace and are stored in the `.github/instructions` folder of the workspace.
* **User instruction files**: are available across multiple workspaces and are stored in the current [VS Code profile](/docs/configure/profiles.md).

#### Instructions file structure

An instructions file is a Markdown file with the `.instructions.md` file suffix. The instructions file consists of two sections:

* (Optional) Header with metadata (Front Matter syntax)

    * `description`: A brief description of the instructions file. This description is displayed when you hover the instructions file in the Chat view.
    * `applyTo`: Specify a glob pattern for files to which the instructions are automatically applied. To always include the custom instructions, use the `**` pattern.

        For example, the following instructions file is always applied:

        ```markdown
        ---
        applyTo: "**"
        ---
        Add a comment at the end of the file: 'Contains AI-generated edits.'
        ```

* Body with the instruction content

    Specify the custom instructions in natural language by using Markdown formatting. You can use headings, lists, and code blocks to structure the instructions.

    You can reference other instruction files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the instruction file.

#### Create an instructions file

To create an instructions file:

1. Run the **Chat: New Instructions File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the instruction file should be created.

    User instruction files are stored in the [current profile folder](/docs/configure/profiles.md). You can sync your user instruction files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md). Make sure to configure the **Prompts and Instructions** setting in the **Settings Sync: Configure** command.

    By default, workspace instruction files are stored in the `.github/instructions` folder of your workspace. Add more instruction folders for your workspace with the `setting(chat.instructionsFilesLocations)` setting.

1. Enter a name for your instruction file.

1. Author the custom instructions by using Markdown formatting.

    Reference additional workspace files as Markdown links (`[index](../index.ts)`), or as `#index.ts` references within the instructions file.

Use the **Chat: Configure Instructions** command from the Command Palette to select and edit an existing instructions file. This command opens the instruction file in the editor, where you can edit the instructions and metadata.

#### Use an instructions file in chat

To manually attach an instructions file to a chat prompt:

* In the Chat view, select **Add Context** > **Instructions** and select the instruction file from the Quick Pick.

* Run the **Chat: Attach Instructions** command from the Command Palette (`kb(workbench.action.showCommands)`) and select the instruction file from the Quick Pick.

To automatically apply instructions files, specify the `applyTo` metadata property in the instructions file:

* `**`: Apply the instructions for all chat requests.
* `<glob pattern>`: Apply the instructions based on the types of files that are in the chat context.

### Specify custom instructions in settings

You can configure custom instructions in your user or workspace settings. This is useful to specify custom instructions for scenarios other than code generation. VS Code automatically applies the custom instructions from settings to the chat requests or to the specific tasks.

There are specific settings for different scenarios. The following table lists the settings for each type of custom instruction.

| Type of instruction | Setting name |
|----------------------|--------------|
| Code generation | `setting(github.copilot.chat.codeGeneration.instructions)` |
| Test generation | `setting(github.copilot.chat.testGeneration.instructions)` |
| Code review | `setting(github.copilot.chat.reviewSelection.instructions)` |
| Commit message generation | `setting(github.copilot.chat.commitMessageGeneration.instructions)` |
| Pull request title and description generation | `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` |

You can define the custom instructions as text in the settings value (`text` property) or reference an external file (`file` property) in your workspace.

The following code snippet shows how to define a set of instructions in the `settings.json` file.

```json
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "text": "Always add a comment: 'Generated by Copilot'."
    },
    {
      "text": "In TypeScript always use underscore for private field names."
    },
    {
      "file": "general.instructions.md" // import instructions from file `general.instructions.md`
    },
    {
      "file": "db.instructions.md" // import instructions from file `db.instructions.md`
    }
  ],
```

### Tips for defining custom instructions

* Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.

* Don't refer to external resources in the instructions, such as specific coding standards.

* Split instructions into multiple files. This approach is useful for organizing instructions by topic or type of task.

* Make it easy to share custom instructions with your team or across projects by storing your instructions in instruction files. You can also version control the files to track changes over time.

* Use the `applyTo` property in the instruction file header to automatically apply the instructions to specific files or folders.

* Reference custom instructions in your prompt files to keep your prompts clean and focused, and to avoid duplicating instructions for different tasks.

## Prompt files (experimental)

Prompt files are reusable prompts for common tasks like generating code or performing a code review. You define the prompt content in a Markdown file. A prompt file is a standalone prompt that you can run directly in chat. Optionally, you can also include guidelines about how the task should be performed.

> [!TIP]
> Prompt files can take advantage of instruction files to reuse common guidelines and have task-specific instructions included in the prompt. For example, a security review prompt file can reference a custom instructions that describe general security practices, while also including specific instructions on how to report the findings of the review.

VS Code supports two types of scopes for prompt files:

* **Workspace prompt files**: Are only available within the workspace and are stored in the `.github/prompts` folder of the workspace.
* **User prompt files**: Are available across multiple workspaces and are stored in the current [VS Code profile](/docs/configure/profiles.md).

### Prompt file examples

The following examples demonstrate how to use prompt files:

<details>
<summary>Example: generate a React form component</summary>

```markdown
---
mode: 'agent'
tools: ['githubRepo', 'codebase']
description: 'Generate a new React form component'
---
Your goal is to generate a new React form component based on the templates in #githubRepo contoso/react-templates.

Ask for the form name and fields if not provided.

Requirements for the form:
* Use form design system components: [design-system/Form.md](../docs/design-system/Form.md)
* Use `react-hook-form` for form state management:
* Always define TypeScript types for your form data
* Prefer *uncontrolled* components using register
* Use `defaultValues` to prevent unnecessary rerenders
* Use `yup` for validation:
* Create reusable validation schemas in separate files
* Use TypeScript types to ensure type safety
* Customize UX-friendly validation rules
```

</details>

<details>
<summary>Example: perform a security review of a REST API</summary>

```markdown
---
mode: 'edit'
description: 'Perform a REST API security review'
---
Perform a REST API security review:

* Ensure all endpoints are protected by authentication and authorization
* Validate all user inputs and sanitize data
* Implement rate limiting and throttling
* Implement logging and monitoring for security events
```

</details>

### Prompt file structure

A prompt file is a Markdown file with the `.prompt.md` file suffix. It has the following two main sections:

* (Optional) Header with metadata (Front Matter syntax)

    * `mode`: The chat mode to use when running the prompt: `ask`, `edit`, or `agent` (default).
    * `tools`: Array of tool (set) names to indicate which tools (sets) can be used in agent mode. Select **Configure Tools** to select the tools from the list of available tools in your workspace. If a given tool (set) is not available when running the prompt, it is ignored.
    * `description`: A short description of the prompt.

* Body with the prompt content

    Prompt files mimic the format of writing prompts in chat. This allows blending natural language instructions, additional context, and even linking to other prompt files as dependencies. You can use Markdown formatting to structure the prompt content, including headings, lists, and code blocks.

You can reference other workspace files, prompt files, or instructions files by using Markdown links. Use relative paths to reference these files, and ensure that the paths are correct based on the location of the prompt file.

Within a prompt file, you can reference variables by using the `${variableName}` syntax. You can reference the following variables:

* Workspace variables - `${workspaceFolder}`, `${workspaceFolderBasename}`
* Selection variables - `${selection}`, `${selectedText}`
* File context variables - `${file}`, `${fileBasename}`, `${fileDirname}`, `${fileBasenameNoExtension}`
* Input variables - `${input:variableName}`, `${input:variableName:placeholder}` (pass values to the prompt from the chat input field)

### Create a workspace prompt file

Workspace prompt files are stored in your workspace and are only available in that workspace.

By default, prompt files are located in the `.github/prompts` directory of your workspace. You can specify additional prompt file locations with the `setting(chat.promptFilesLocations)` setting.

To create a workspace prompt file:

1. Run the **Chat: New Prompt File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the prompt file should be created.

    By default, only the `.github/prompts` folder is available. Add more prompt folders for your workspace with the `setting(chat.promptFilesLocations)` setting.

1. Enter a name for your prompt file.

    Alternatively, you can directly create a `.prompt.md` file in the prompts folder of your workspace.

1. Author the chat prompt by using Markdown formatting.

    Within a prompt file, reference additional workspace files as Markdown links (`[index](../index.ts)`), or as `#index.ts` references within the prompt file.

    You can also reference other `.prompt.md` files to create a hierarchy of prompts. You can also reference [instructions files](#custom-instructions) in the same way.

### Create a user prompt file

User prompt files are stored in your [user profile](/docs/configure/profiles.md). With user prompt files, you can share reusable prompts across multiple workspaces.

To create a user prompt file:

1. Select the **Chat: New Prompt File** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **User Data Folder** as the location for the prompt file.

    If you use multiple [VS Code profiles](/docs/configure/profiles.md), the prompt file is created in the current profile's user data folder.

1. Enter a name for your prompt file.

1. Author the chat prompt by using Markdown formatting.

    You can also reference other user prompt files or user instruction files.

### Use a prompt file in chat

You have multiple options to run a prompt file:

* Run the **Chat: Run Prompt** command from the Command Palette (`kb(workbench.action.showCommands)`) and select a prompt file from the Quick Pick.

* In the Chat view, type `/` followed by the prompt file name in the chat input field.

    This option enables you to pass additional information in the chat input field. For example, `/create-react-form` or `/create-react-form: formName=MyForm`.

* Open the prompt file in the editor, and press the play button in the editor title area. You can choose to run the prompt in the current chat session or open a new chat session.

    This option is useful for quickly testing and iterating on your prompt files.

### Sync user prompt files across devices

VS Code can sync your user prompt files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

To sync your user prompt files, enable Settings Sync for prompt and instruction files:

1. Make sure you have [Settings Sync](/docs/configure/settings-sync.md) enabled.

1. Run **Settings Sync: Configure** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select **Prompts and Instructions** from the list of settings to sync.

## Centrally manage instructions and prompt files in VS Code

Enable or disable instructions and prompt files in VS Code with the `setting(chat.promptFiles)` setting.

To centrally enable or disable this setting within your organization, check [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

## Settings

<details>
<summary>Custom instructions settings</summary>

* `setting(chat.promptFiles)` _(Experimental)_: enable reusable prompt and instruction files.

* `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`: controls whether code instructions from `.github/copilot-instructions.md` are added to Copilot requests.

* `setting(chat.instructionsFilesLocations)` _(Experimental)_: a list of folders where instruction files are located. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.

    | Setting value | Description |
    |---------------|-------------|
    | `["/path/to/folder"]` | Enable instruction files for a specific path. Specify one or more folders where instruction files are located. Relative paths are resolved from the root folder(s) of your workspace.<br/>By default, `.github/copilot-instructions` is added but disabled. |

* `setting(github.copilot.chat.codeGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate code.
* `setting(github.copilot.chat.testGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate tests.
* `setting(github.copilot.chat.reviewSelection.instructions)` _(Preview)_: set of instructions that will be added to Copilot requests for reviewing the current editor selection.
* `setting(github.copilot.chat.commitMessageGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate commit messages.
* `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` _(Experimental)_: set of instructions that will be added to Copilot requests that generate pull request titles and descriptions.

</details>

<details>
<summary>Prompt files settings</summary>

* `setting(chat.promptFiles)` _(Experimental)_: enable reusable prompt and instruction files.

* `setting(chat.promptFilesLocations)` _(Experimental)_: a list of folders where prompt files are located. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.

    | Setting value | Description |
    |---------------|-------------|
    | `["/path/to/folder"]` | Enable prompt files for a specific path. Specify one or more folders where prompt files are located. Relative paths are resolved from the root folder(s) of your workspace.<br/>By default, `.github/prompts` is added but disabled. |

</details>

## Related content

* [Create custom chat modes](/docs/copilot/chat/chat-modes.md)
* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Configure tools in chat](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)

```

## copilot-extensibility-overview.md

```markdown
---
ContentId: e375ec2a-43d3-4670-96e5-fd25a6aed272
DateApproved: 06/12/2025
MetaDescription: Overview of how to extend the AI features in your Visual Studio Code extension by using the Chat API or Language Model API.
MetaSocialImage: images/shared/github-copilot-social.png
---
# AI extensibility in VS Code

Visual Studio Code has many AI features to improve your coding experience, such as code completions, or natural language chat. You can further extend the built-in capabilities, for example by contributing tools for [agent mode](/docs/copilot/chat/chat-agent-mode.md), or adding AI-powered features to your VS Code extension.

Depending on your use case, you have the following options for extending AI in your VS Code extension:

- **Agent mode tool**: use the [Language Model Tool API](/api/extension-guides/tools.md) to contribute a tool for [agent mode](/docs/copilot/chat/chat-agent-mode.md) that is invoked automatically based on the user's prompt. Integrate deeply in VS Code by using other extension APIs in your tool.

- **MCP tool**: automatically register external [MCP tools](/docs/copilot/chat/mcp-servers.md) that can then be used in [agent mode](/docs/copilot/chat/chat-agent-mode.md). As an extension developer, you can [register an MCP tool](/api/extension-guides/mcp.md) as part of your extension. MCP tools run outside of the VS Code extension host and don't have access to the VS Code extension APIs.

- **Chat participant**: use the [Chat](/api/extension-guides/chat.md) and [Language Model](/api/extension-guides/language-model.md) APIs to create a chat participant for [ask mode](/docs/copilot/chat/chat-ask-mode.md) that enables users to ask domain-specific questions by using natural language.

- **Use AI model**: use the [Language Model API](/api/extension-guides/language-model.md) and the [VS Code extension APIs](/api/extension-guides/overview.md) to build custom AI-powered features into your extension and enhance editor-specific interactions.

Alternatively, you can also build a GitHub Copilot Extension, implemented as a GitHub App with additional capabilities. Copilot Extensions work across all supported IDEs and GitHub, but don't have access to functionalities specific to VS Code. Get more info about [Copilot Extensions](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions) in the GitHub documentation.

## Use cases

Here are some examples of how you can use AI in your VS Code extension:

- **Docs querying**: use Retrieval-Augmented Generation (RAG) to query a third-party documentation service and generate responses based on the retrieved information.

- **AI-assisted coding**: use the AI model to provide editor annotations to provide coding suggestions.

- **AI-powered reviews**: use the AI model to review your code for security vulnerabilities or performance improvements.

- **Data retrieval**: query a database or third-party data service to retrieve information about a specific topic.

- **Enterprise coding assistant**: get chat responses that are grounded in the data of your enterprise and are aware of the specific coding guidelines your company follows.

- **Enhance extensions**: use the Language Model API to add AI-powered features to your existing VS Code extensions.

There are several examples already available in the Visual Studio Marketplace that extend AI in VS Code:

- Agent mode tools: Go to the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Alanguage-model-tools&target=VSCode&category=All%20categories&sortBy=Relevance) or search for the `language-model-tools` tag in the [Extensions view](/docs/getstarted/extensions.md).

- Chat participants: Go to the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Achat-participant&target=VSCode&category=All%20categories&sortBy=Relevance) or search for the `chat-participant` tag in the [Extensions view](/docs/getstarted/extensions.md).

## Get started with AI extensibility in VS Code

To get started with extending AI in your VS Code extension, explore the following resources:

- [**Chat sample**](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample): sample code for building a VS Code extension that contributes an agent mode tool and chat participant.

- [**MCP extension sample**](https://github.com/microsoft/vscode-extension-samples/blob/main/mcp-extension-sample): sample code for building a VS Code extension that registers an MCP tool.

- [**Tutorial: AI-powered code annotations**](/api/extension-guides/language-model-tutorial.md): step-by-step guide to implement a VS Code extension that uses the Language Model API to generate code annotations in the editor to help improve your code.

- [**Tutorial: Code tutor chat participant**](/api/extension-guides/chat-tutorial.md): step-by-step guide to implement a code tutor chat participant that enables users to ask for explaining a technical topic by using natural language in the Chat view in VS Code.

- **Extension guides**: Learn how to use the [Tools API](/api/extension-guides/tools.md) [Chat API](/api/extension-guides/chat.md) and [Language Model API](/api/extension-guides/language-model.md).

```

## copilot-smart-actions.md

```markdown
---
ContentId: f0f31de2-a344-4ee6-8d5b-d3ac4e11e149
DateApproved: 06/12/2025
MetaDescription: Access your GitHub Copilot subscription and set up GitHub Copilot in Visual Studio.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Copilot smart actions in Visual Studio Code

For several common scenarios, you can use _smart actions_ to get help from Copilot without having to write a prompt. Examples of these smart actions are generating commit messages, generating documentation, explaining or fixing code, or performing a code review. These smart actions are available throughout the VS Code UI.

## Generate a commit message and PR information

Copilot can help generate commit messages and the PR title and description based on the code changes in a commit or the changes in a pull request. Use the _sparkle_ icon in the Source Control view or GitHub PR extension to generate a title and description that summarizes your changes.

![Hover over Source Control input box sparkle buttons shows Generate Commit Message](images/copilot-smart-actions/generate-commit-message.png)

## Rename symbols

When you rename a symbol in your code, Copilot suggests a new name based on the context of the symbol and the codebase.

![Inline chat suggesting a new name for a symbol in a Python file](images/copilot-smart-actions/copilot-inline-chat-rename-suggestion.png)

## Generate alt text for images in Markdown

Use AI to generate or update alt text for images in Markdown files. To generate alt text:

1. Open a Markdown file.
1. Put the cursor on an image link.
1. Select the Code Action (lightbulb) icon and select **Generate alt text**.

    ![Screenshot that shows a Code Action menu with Generate alt text option for a Markdown image link.](images/copilot-smart-actions/generate-alt-text.png)

1. If you already have an alt text, select the Code Action, and select **Refine alt text**.

## Generate documentation

Use Copilot to generate code documentation for multiple languages.

1. Open your application code file.
1. Optionally, select the code you want to document.
1. Right-click and select **Copilot** > **Generate Docs**.

    ![Inline chat /doc example to generate documentation code comments for a calculator class](images/copilot-smart-actions/inline-chat-doc-example.png)

## Generate tests

To generate tests for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Optionally, select the code you want to test.
1. Right-click and select **Copilot** > **Generate Tests**.

    Copilot generates test code in an existing test file, or creates a new test file if one doesn't exist.

1. Optionally, refine the generated tests by providing additional context in the Inline Chat prompt.

## Explain code

Copilot can help with explaining a piece of code.

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Copilot** > **Explain**.

    Copilot provides an explanation of the selected block of code.

## Fix coding errors

To fix coding issues for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Copilot** > **Fix**.

    Copilot provides a code suggestion to fix the code.

1. Optionally, refine the generated code by providing additional context in the chat prompt.

Alternatively, if there's a compile or linting problem in a code file, Copilot shows a code action in the editor to help resolve the issue.

![Screenshot of the editor showing the sparkle icon and Copilot context menu to explain or fix the issue.](images/copilot-smart-actions/copilot-code-action-fix.png)

## Fix testing errors

Copilot integrates with the Test Explorer in VS Code and can help with fixing failing tests.

1. In the Test Explorer, hover over a failing test
1. Select the **Fix Test Failure** button (sparkle icon)
1. Review and apply Copilot's suggested fix

Alternatively, you can:

1. Open the Chat view
1. Enter the `/fixTestFailure` command
1. Follow Copilot's suggestions to fix the test

> [!TIP]
> [Agent mode](/docs/copilot/chat/chat-agent-mode.md) monitors the test output when running tests, and automatically attempts to fix and rerun failing tests.

## Fix terminal errors

When a command fails to run in the terminal, Copilot displays a sparkle in the gutter that offers a Quick Fix to explain what happened.

![Fix with Copilot option in the terminal after a failed terminal command.](images/copilot-smart-actions/terminal-command-explanation.png)

## Review code

Copilot can help with reviewing your code, either for a code block in the editor or all changes included in a pull request (requires the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items/?itemName=GitHub.vscode-pull-request-github)).

To review a code block in the editor:

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Copilot** > **Review and Comment**.

    Copilot creates review comments in the **Comments** panel and also shows them inline in the editor.

To review all changes in a pull request:

1. Create a pull request with the GitHub Pull Requests extension
1. Select the **Copilot Code Review** button in the **Files Changed** view.

    Copilot creates review comments in the **Comments** panel and also shows them inline in the editor.

## Semantic search results (Preview)

The Search view in VS Code enables you to search for text across your files. Semantic search enables you to find results that are semantically relevant to your search query, even if they don't match the text exactly. This is particularly useful when you're looking for code snippets or documentation that relate to a concept rather than a specific term, or when you don't know the exact terms to search for.

![Search view showing semantic search results that are not an exact match for the search criteria.](images/copilot-smart-actions/semantic-search-results.png)

Configure semantic search in the Search view with the `setting(search.searchView.semanticSearchBehavior)` setting. You can choose to run semantic search automatically, or only when you explicitly request it.

You can also get AI-generated keyword suggestions in the Search view to provide relevant alternative search terms. Enable search keyword suggestions with the `setting(search.searchView.keywordSuggestions)` setting.

![Search view showing keyword suggestions based on the search query.](images/copilot-smart-actions/search-keyword-suggestions.png)

You can reference search results in your chat prompt by selecting **Get results from the search view** from the **Add Context** Quick Pick. Alternatively, type `#searchResults` in the chat prompt.

## Search settings with AI (Experimental)

If you don't know the exact name of a setting you want to change, you can use AI to help find the relevant settings based on your search query. For example, you can search for "increase text size" to find the setting that controls the editor font size.

Enable this functionality with the `setting(workbench.settings.showAISearchToggle)` setting. In the Settings editor, you can then toggle the AI search results on or off with the **Search Settings with AI** button.

![Screenshot that shows the Settings editor showing AI-generated suggestions for settings.](images/copilot-smart-actions/settings-suggestions.png)

## Related content

* [Get started with the Copilot Quickstart](/docs/copilot/getting-started.md).

```

## copilot-tips-and-tricks.md

```markdown
---
ContentId: 58ea6755-9bfa-42c2-a4c8-ff0510f9c031
DateApproved: 02/06/2025
MetaDescription: Tips and tricks to optimize your development experience with GitHub Copilot in VS Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Tips and tricks for Copilot in VS Code

This article provides tips and tricks to optimize your development experience for using GitHub Copilot in Visual Studio Code.

## Checklist for using Copilot in VS Code

Use the following checklist to get the most out of Copilot:

1. [Choose the right tool](#choose-the-right-copilot-tool). _Use the tool that's optimized for editing, asking questions, or staying in the flow of writing code._

1. [Personalize Copilot](#personalize-copilot-with-instructions-files). _Use custom instructions to get code suggestions that match your style and coding practices._

1. [Write effective prompts](#prompt-engineering) and provide [context](#provide-the-right-context-and-tools). _Get the most relevant responses._

1. [Index your workspace](#workspace-indexing). _Receive accurate responses to questions about your codebase._

1. [Choose your AI model](#choose-your-ai-model). _Choose between models for fast coding or planning/reasoning._

1. [Reuse prompts](#reusable-prompts). _Save time by saving and reusing task-specific prompts across your team._

## Choose the right Copilot tool

Depending on your task, you can choose between different Copilot tools.

| Tool | Use case |
|------|----------|
| [Code completions](/docs/copilot/ai-powered-suggestions.md) | Streamline coding while staying in the flow.<br/>Receive inline suggestions for code snippets, variable names, and functions as you write them in the editor. |
| [Chat](/docs/copilot/chat/copilot-chat.md) | Have an ongoing chat conversation for brainstorming design ideas or getting code suggestions, optionally calling on domain-specific chat participants.<br/>Choose to apply specific code suggestions to your codebase. |
| [Edits](/docs/copilot/chat/copilot-edits.md) | Use natural language to start a coding editing session.<br/>Automatically apply large code changes across multiple files in your workspace. |
| [Agent mode](/docs/copilot/chat/chat-agent-mode.md) | Implement high-level requirements by starting an agentic coding flow.<br/>Copilot autonomously invokes multiple tools to plan and implement the code changes and tasks that are needed. |

## Personalize Copilot with instructions files

When Copilot generates code or answers questions, it tries to match your coding practices and preferences such as which libraries you use or how you name your variables. However, it might not always have enough context to do this effectively. For example, if you work with a specific framework version, you need to provide additional context in your prompts.

To enhance AI responses, you can use _instructions files_ to provide contextual details about your team's coding practices, tools, or project specifics. You can then attach these instructions to your chat prompt, or have them applied automatically.

To enable instructions files for your workspace:

1. Run the **Chat: New Instructions File** command from the Command Palette.

    This command creates a `.instructions.md` file in `.github/instructions` folder.

1. Add your instructions in Markdown format to the file. For example:

    ```markdown
    # Custom instructions for Copilot

    ## Project context
    This project is a web application built with React and Node.js.

    ## Indentation
    We use tabs, not spaces.

    ## Coding style
    Use camelCase for variable names and prefer arrow functions over traditional function expressions.

    ## Testing
    We use Jest for unit testing and Playwright for end-to-end testing.
    ```

1. Optionally, add a glob pattern to the `applyTo` metadata field to specify which files the instructions apply to.

    ```markdown
    ---
    applyTo: "**/*.ts"
    ---
    Coding practices for TypeScript files.
    ...
    ```

Get more details about [using instructions files in VS Code](/docs/copilot/copilot-customization.md#instruction-files).

## Prompt engineering

You can enhance the quality of Copilot's responses by using effective prompts. A well-crafted prompt can help Copilot understand your requirements better and generate more relevant code suggestions.

* Start general, then get specific.

    ```text
    Generate a Calculator class.
    Add methods for addition, subtraction, multiplication, division, and factorial.
    Don't use any external libraries and don't use recursion.
    ```

* Give examples of what you want.

    ```text
    Generate a function that takes a string and returns the number of vowels in it.
    Example:
    findVowels("hello") returns 2
    findVowels("sky") returns 0
    ```

* Break down complex tasks into simpler tasks.

    Instead of asking Copilot to generate a meal planner app, break it down into smaller tasks:
    * Generate a function that takes a list of ingredients and returns a list of recipes.
    * Generate a function that takes a list of recipes and returns a shopping list.
    * Generate a function that takes a list of recipes and returns a meal plan for the week.

* Provide the [right context](#provide-the-right-context), such as code selections, files, terminal output, and more.

    Example, use the `#codebase` variable to refer to the entire codebase:

    ```text
    Where is the database connection string used in #codebase?
    ```

* Iterate on your prompts.

    Provide follow-up prompts to refine or modify the response. For example:

    * "Write a function to calculate the factorial of a number."
    * "Don't use recursion and optimize by using caching."
    * "Use meaningful variable names."

* Keep chat history relevant.

    Copilot uses history of the conversation to provide context. Remove past questions and responses from the history if they're not relevant. Or, start a new session if you want to change the context.

Get more details about [prompt engineering](/docs/copilot/chat/prompt-crafting.md).

Find practical [examples of prompts to use with Copilot](https://docs.github.com/en/copilot/copilot-chat-cookbook) in the GitHub Copilot documentation.

## Provide the right context and tools

Enrich your prompts with relevant context to get more accurate and relevant responses in chat. Withe the right tools, you can boost your developer productivity.

* In [agent mode](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools), select the tools button to configure the tools you want to use or explicitly add then to your prompt.
* Use `#codebase` to let Copilot find the right files automatically by performing a code search.
* Use the `#fetch` tool to fetch content from a web page or use `#githubRepo` to perform a code search on a GitHub repository.
* Reference files, folders, or symbols in your prompt by using `#<file name>`, `#<folder name>`, or `#<symbol>`.
* Drag and drop files, folders, or editor tabs onto the chat prompt.
* Add problems, test failures, or terminal output to your chat prompt for scenario-specific context.
* Add images or screenshots to your prompt to let Copilot analyze the image.
* In agent mode, prompt to preview your app to directly open it with the built-in simple browser.

When you use [agent mode](/docs/copilot/chat/chat-agent-mode.md), Copilot autonomously finds the relevant files and context for you.

Get more details about [adding context to chat prompts](/docs/copilot/chat/copilot-chat-context.md).

## Reusable prompts

Prompt files enable you to save a prompt for a specific task with its context and instructions in a Markdown file. You can then attach and reuse that prompt in chat. If you store the prompt in your workspace, you can also share it with your team.

To create a reusable prompt:

1. Create a prompt file with the **Chat: New Prompt File** command in the Command Palette.

    This command creates a `.prompt.md` file in the `.github/prompts` folder at the root of your workspace.

1. Describe your prompt and relevant context in Markdown format.

    For example, use this prompt to generate a new React form component.

    ```markdown
    Your goal is to generate a new React form component.

    Ask for the form name and fields if not provided.

    Requirements for the form:
    * Use form design system components: [design-system/Form.md](../docs/design-system/Form.md)
    * Use `react-hook-form` for form state management:
    * Always define TypeScript types for your form data
    * Prefer *uncontrolled* components using register
    * Use `defaultValues` to prevent unnecessary rerenders
    * Use `yup` for validation:
    * Create reusable validation schemas in separate files
    * Use TypeScript types to ensure type safety
    * Customize UX-friendly validation rules
    ```

1. Optionally, add metadata about how to run the prompt in chat. Use the `mode` field to specify the chat mode, and the `tools` field to specify which agent mode tools to use.

    ```markdown
    ---
    mode: 'agent'
    tools: ['githubRepo', 'codebase']
    description: 'Generate a new React form component'
    ---
    Your goal is to generate a new React form component based on the templates in #githubRepo contoso/react-templates.

    Requirements for the form:
    * Use form design system components: [design-system/Form.md](../docs/design-system/Form.md)
    * Use `react-hook-form` for form state management:
    * Always define TypeScript types for your form data
    ```

1. Run the command by typing `/`, followed by the prompt file name in the chat input field.

    For example, type `/new-react-form` to run the prompt file named `new-react-form.prompt.md`.

Get started with [prompt files](/docs/copilot/copilot-customization.md#prompt-files-experimental).

## Choose your AI model

Copilot offers different AI models to choose from. Some models are optimized for fast coding tasks, while others are better suited for slower planning and reasoning tasks.

| Model type | Models |
|-----------|--------|
| Fast coding | <ul><li>GPT-4o</li><li>Claude Sonnet 3.5</li><li>Claude Sonnet 3.7</li><li>Gemini 2.0 Flash</li></ul> |
| Reasoning/planning | <ul><li>Claude Sonnet 3.7 Thinking</li><li>o1</li><li>o3-mini</li></ul> |

Choose the model that best fits your needs by using the model picker in the chat input field.

Learn more about [AI models for Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat) in the GitHub Copilot documentation.

## Workspace indexing

Copilot uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

For GitHub repositories, you can use a remote index of your workspace, based on [GitHub code search](https://docs.github.com/en/enterprise-cloud@latest/copilot/using-github-copilot/asking-github-copilot-questions-in-github#asking-exploratory-questions-about-a-repository). This allows Copilot to search your entire codebase very quickly, even if the codebase is very large.

Get more details about [workspace indexing](/docs/copilot/reference/workspace-context.md#managing-the-workspace-index).

## Related resources

* [Prompt engineering for Copilot Chat](/docs/copilot/chat/prompt-crafting.md)
* [Best Practices for using GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot) in the GitHub Copilot documentation
* [Personalize Copilot in VS Code](/docs/copilot/copilot-customization.md)

```

## faq.md

```markdown
---
ContentId: e02ded07-6e5a-4f94-b618-434a2c3e8f09
DateApproved: 06/12/2025
MetaDescription: Frequently asked questions for using GitHub Copilot in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot frequently asked questions

This article answers frequently asked questions about using GitHub Copilot in Visual Studio Code.

## GitHub Copilot subscription

### How can I get a Copilot subscription?

There are different ways to get access to GitHub Copilot:

| Type of User                   | Description |
|--------------------------------|-------------|
| Individual                     | <ul><li>Set up [GitHub Copilot Free](https://github.com/github-copilot/signup) to get a limited experience of Copilot without a subscription. See [About GitHub Copilot Free](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).</li><li>Sign up for a paid GitHub Copilot subscription to get unlimited completions and chat interactions. You can [try GitHub Copilot for free](https://github.com/github-copilot/signup?ref_cta=Copilot+trial&ref_loc=about+github+copilot&ref_page=docs) with a one-time 30-day trial.</li><li>See [Setting up GitHub Copilot for yourself](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-yourself) for all options. </li></ul> |
| Organization/Enterprise member | <ul><li>If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to <https://github.com/settings/copilot> and requesting access under "Get Copilot from an organization."</li><li>See [Setting up GitHub Copilot for your organization](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-your-organization) to enable Copilot for your organization.</li></ul> |

### How can I monitor my Copilot usage?

You can view the current Copilot usage in the Copilot status dashboard, available through the VS Code Status Bar. The dashboard shows the following information:

- **Completions**: The percentage of code completions quota you have used in the current month.
- **Chat messages**: The percentage of chat requests quota you have used in the current month.
- **Premium requests**: The percentage of premium requests quota you have used in the current month.
- **Premium requests overage**: The number of overage premium requests you have used in the current month.

Visit the GitHub Copilot documentation for more information about [monitoring usage and entitlements](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/monitoring-your-copilot-usage-and-entitlements).

### I reached my completions or chat interactions limit

Your limit of code completions and chat interactions is reset every month, starting from the day you first signed up for the Copilot Free plan. If you reach your limit, you can opt to sign up for a [paid subscription](#how-can-i-get-a-copilot-subscription), and get an unlimited number of completions and chat messages. Alternatively, you can wait until the next month to continue using Copilot for free.

![Visual indicators in Chat view, Status Bar, and title bar that you reached a limit for Copilot chat messages.](images/faq/copilot-chat-limit-reached.png)

If only the chat interactions are reaching the limit, you can still use Copilot for code completions.

If only the code completions are reaching the limit, you can still use Copilot for chat interactions and Copilot Edits.

### My Copilot subscription is not detected in VS Code

- To use Copilot Chat in Visual Studio Code, you must be signed into Visual Studio Code with a GitHub ID that has access to GitHub Copilot. If your Copilot subscription is associated with another GitHub account, you might have to sign out of your GitHub account and sign in with another account. Use the **Accounts** menu in the Activity Bar for signing out of your current GitHub account.

- Verify that your Copilot subscription is still active in [GitHub Copilot settings](https://github.com/settings/copilot).

### How can I switch accounts for Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with for Copilot.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to your GitHub account using any of the following methods:

    - Select **Sign in to use Copilot** from the Copilot status menu.

        ![Sign in to use Copilot from the Copilot status menu.](images/setup/copilot-signedout-sign-in.png)

    - Select the **Accounts** menu in the Activity Bar, and then select **Sign in with GitHub to use GitHub Copilot**.

        ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

    - Run the **GitHub Copilot: Sign in** command in the Command Palette (`kb(workbench.action.showCommands)`).

## General

### How can I remove Copilot from VS Code?

To remove Copilot from VS Code, select the **Hide Copilot** option from the Copilot menu in the VS Code title bar. This removes the Copilot menu from the title bar and the Status Bar, and removes the Chat view.

If you have already installed the Copilot extensions, you need to first uninstall the Copilot and Copilot Chat extensions from the Extensions view. After that, you can hide the Copilot menu.

To restore the Copilot functionality, run the **Chat: Use AI Features with Copilot for free** command from the Command Palette (`kb(workbench.action.showCommands)`).

### Network and firewall configuration for Copilot

- If you or your organization employs security measures like a firewall or proxy server, it may be beneficial to include certain domain URLs in an "allowlist" and open specific ports and protocols. Learn more about troubleshooting [firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).

- If you're working on company equipment and connecting to a corporate network, you may be connecting to the Internet via a VPN or an HTTP proxy server. In some cases, these types of network setups may prevent GitHub Copilot from connecting to GitHub's server. Learn more about [troubleshooting network errors for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-network-errors-for-github-copilot).

### How can I provide feedback on Copilot?

If you would like to provide feedback on the Copilot features including inline suggestions and chat, you can create issues in the [vscode-copilot-release](https://github.com/microsoft/vscode-copilot-release/issues) repository.

It can be helpful to include information from the [GitHub Copilot logs](#view-logs-for-github-copilot-in-vs-code) if you're reporting an issue.

### View logs for GitHub Copilot in VS Code

The log files for the GitHub Copilot extension are stored in the standard log location for Visual Studio Code extensions. The log files are useful for diagnosing connection issues.

Use the **Toggle Output** command (`kb(workbench.action.output.toggleOutput)`) and select **GitHub Copilot** or **GitHub Copilot Chat** in the dropdown.

### Are there pre-release builds of the Copilot extensions?

Yes, you can switch to the pre-release (nightly) version of a Copilot extension to try the latest features and fixes. From the Extensions view, right-click or select the gear icon to bring up the context menu, and then select **Switch to Pre-Release Version**:

![Extensions view context menu with Switch to Pre-Release Version option](images/faq/switch-to-pre-release.png)

You can tell if you're running a pre-release version by the "Pre-release" badge in the extension details:

![Pre-release version of the GitHub Copilot extension](images/faq/copilot-ext-pre-release.png)

## Copilot code completions

### How do I enable or disable code completions?

You can enable or disable code completions in VS Code by using the checkboxes in the Copilot status dashboard from the VS Code Status Bar. You can enable or disable code completions globally or for the file type of the active editor.

![Screenshot showing the VS Code status bar, highlighting the Copilot icon that indicates Copilot is active.](./images/faq/copilot-disable-completions.png)

### Inline completions are not working in the editor

- Verify that [GitHub Copilot is not disabled](#how-do-i-enabledisable-copilot) globally or for this language
- Verify that your [GitHub Copilot subscription is active and detected](#my-copilot-subscription-is-not-detected-in-vs-code)
- Verify that your [network settings](#network-and-firewall-configuration-for-copilot) are configured to allow connectivity to GitHub Copilot.
- Verify that you have not reached the limit of completions for the month with the [Copilot Free plan](https://docs.github.com/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).

## Copilot Chat

### Copilot Chat features aren't working for me?

Check each requirement if Copilot Chat doesn't work:

- Make sure you are on the latest version of Visual Studio Code (run **Code: Check for Updates**).
- Make sure you have the latest version of both the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions.
- Your GitHub account that is signed into VS Code must have an active Copilot subscription. Check your [Copilot subscription](https://github.com/settings/copilot).
- Verify that you have not reached your limit of chat interactions for the month with the [Copilot Free plan](https://docs.github.com/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).

### Why is my Copilot Chat extension blocked?

If you receive a message that an extension is blocked from using Copilot Chat, the extension was likely disabled due to a detected pattern of abuse coming from that specific extension. Contact the publisher of the extension when you encounter this issue. You can find the publisher information on the extension details page in the Visual Studio Marketplace.

## Additional resources

- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [GitHub Copilot FAQ](https://github.com/features/copilot#faq) in the GitHub documentation

```

## getting-started.md

```markdown
---
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
DateApproved: 06/12/2025
MetaDescription: Get started with GitHub Copilot in Visual Studio Code and create your first AI-powered suggestions in the editor.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Get started with GitHub Copilot in VS Code

Visual Studio Code has rich AI features powered by GitHub. In this tutorial, you discover how to use AI while coding in the editor, to ask questions about your code, and to start an editing session to make changes across multiple files.

While we're using JavaScript and TypeScript for this tutorial, note that Copilot is also trained on numerous other languages and a wide variety of frameworks.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/2q0BoioYSxQ" title="GitHub Copilot Best Practices (what not to do)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites

* VS Code installed on your machine. Download it from the [Visual Studio Code website](https://code.visualstudio.com/).

* Access to GitHub Copilot. Follow these steps to [Set up GitHub Copilot in VS Code](/docs/copilot/setup.md).

    > [!TIP]
    > If you don't have a Copilot subscription or have a seat assigned by your organization, you can sign up to use Copilot for free directly from within VS Code and get a monthly limit of completions and chat interactions.

## Get your first code suggestion

To get started with AI features in VS Code, you don't have to do anything special. As you're typing code in the editor, Copilot automatically presents you code suggestions (_code completions_) in the editor to help you code more efficiently.

1. Open VS Code and create a new JavaScript file `calculator.js`.

1. In the JavaScript file, start typing the following code:

    ```javascript
    class Calculator
    ```

    Notice that as you type, you automatically get code suggestions for the implementation of the `Calculator` class in gray dimmed text (ghost text). The exact suggestions you receive might vary because large language models are non-deterministic.

    ![Screenshot of VS Code editor, showing Copilot suggesting the `add` method inside the `Calculator` class.](./images/getting-started/copilot-code-completion.png)

1. To accept the suggestion, press the `kbstyle(Tab)` key.

    Congratulations! You've just accepted your first AI-powered code suggestion. As you continue typing, Copilot updates the code suggestion accordingly.

1. For any given input, there might be multiple suggestions. Type the following code inside the class to add a `factorial` method:

    ```javascript
    factorial(n) {
    ```

1. Hover over the suggestion in the editor and notice that there are multiple suggestions.

    ![Screenshot of VS Code editor, showing Copilot giving multiple suggestions for `factorial` when hovering over it.](./images/getting-started/copilot-code-completion-multiple.png)

    You can use the arrow controls or use the keyboard shortcuts to show the next (`kb(editor.action.inlineSuggest.showNext)`) or previous (`kb(editor.action.inlineSuggest.showPrevious)`) suggestion.

AI-powered code completions can help you with generating boilerplate or repetitive code, letting you stay in the developer flow and focus on more complex coding tasks.

## Use editor inline chat to generate a basic web server

With chat-based AI, you can use natural language to ask questions about your code or to ask it to generate code for you. _Editor inline chat_ provides a chat interface directly in the editor, so you can prompt about the code in the active editor.

Let's use editor inline chat to help generate a basic Express web server.

1. First, add a new TypeScript file `server.ts` to your workspace.

1. Now, press `kb(inlinechat.start)` on your keyboard to bring up editor inline chat.

    Editor inline chat gives you a chat interface that lets you ask questions about the code in the active editor or generate code for you.

    ![Screenshot of VS Code editor, showing the Copilot Inline Chat control.](./images/getting-started/copilot-inline-chat.png)

1. Type "add a simple express web server" in the chat input field, and press `kbstyle(Enter)` to submit the prompt.

    Notice that the code changes start streaming directly in the editor. The response is an implementation for a simple Node.js Express web server.

    ![Screenshot of VS Code editor, showing the inline chat response for adding an Express web server.](./images/getting-started/copilot-inline-chat-express-server.png)

1. Select **Accept** or press `kb(inlineChat.acceptChanges)` to apply the proposed code changes.

    Congratulations! You've used editor inline chat for generating code using chat and natural language.

## Refactor your code through AI chat

You can also use editor inline chat to refactor or improve existing code in the editor.

Notice that the generated web server is currently using a static port number `3000`. Let's change this to use an environment variable instead.

1. In the editor, select the `3000` port number in the `server.ts` file, and then press `kb(inlinechat.start)` to open inline chat.

1. Type "use an environment variable for the port number" in the chat input field, and press `kbstyle(Enter)` to send the chat request or prompt.

    Notice how the existing code is updated to use an environment variable for the port number.

    ![Screenshot of VS Code editor, showing editor inline chat to use an environment variable for the port number.](./images/getting-started/copilot-inline-chat-refactor-port.png)

1. Select **Accept** or press `kb(inlineChat.acceptChanges)` to apply the proposed code changes.

1. If you're not happy with a proposed change, you can modify the prompt and keep iterating to get a different solution. For example, ask to use a different environment variable name for the port number.

## Use chat for general programming questions

As you're working in a new codebase, or exploring a new programming language, you might have more general coding questions come up. By using chat, you can have a chat conversation on the side, which keeps track of the history of your questions.

1. Open the Chat view from the Copilot menu in the title bar or press `kb(workbench.action.chat.open)`.

    ![Screenshot of the VS Code editor, showing the Copilot menu, highlighting the Open Chat option.](./images/getting-started/copilot-chat-menu-command-center.png)

1. You can use chat in different ways. Select **Ask** from the mode dropdown to ask questions.

    In a later step, you'll use chat to start an editing session and make changes across multiple files.

    ![Screenshot of the Chat view, highlighting the dropdown to to change the chat mode to 'Ask'.](./images/getting-started/copilot-chat-ask-mode.png)

    > [!TIP]
    > You can change the language model that is used in chat by choosing a different model from the dropdown.

1. Type "what is recursion?" in the chat input field and press `kb(workbench.action.chat.submit)` to submit your chat prompt.

    Notice how the chat response contains rich results like Markdown text and code blocks.

    ![Screenshot of VS Code editor, showing the Chat view containing the answer to what recursion is.](./images/getting-started/copilot-chat-view-recursion.png)

1. Follow the steps in the [Chat Tutorial](/docs/copilot/chat/getting-started-chat.md) to learn how you can also use chat to ask questions about your specific codebase.

## Make edits across multiple files

For larger code changes that might involve making edits to multiple files, you can start an AI-powered editing session. Instead of receiving code blocks in the Chat view, the edits are applied directly to your files across your workspace.

Let's start an editing session to return the contents of an HTML file for our web server.

1. Select **Edit** from the mode dropdown in the Chat view.

    ![Screenshot of the Chat view, highlighting the dropdown to to change the chat mode to 'Edit'](./images/getting-started/copilot-chat-edit-mode.png)

1. Notice that the `server.ts` file is automatically added as context for your chat prompt.

    By adding the file as context to your prompt, the AI model can provide more relevant code edits. Optionally, add more context to your prompt with the **Add Context** button.

    ![Screenshot of the Chat view, showing the prompt input field with the `server.ts` file.](./images/getting-started/copilot-edits-working-set.png)

1. Enter _Return a static html page as the home page and implement it._ in the chat input field and press `kbstyle(Enter)` to start a new edit session.

    Notice that multiple edits are applied to your project: the `server.ts` file now returns the newly created `index.html` HTML page.

    ![Screenshot of VS Code editor, showing the chat response for returning a static HTML page in the web server response.](./images/getting-started/copilot-edits-html-response.png)

1. If you're happy with the results, select **Keep** to apply all suggested changes.

    You can also navigate between the different edited files and accept or reject them by using the editor overlay controls.

    ![Screenshot of the Chat view, highlighting the Keep button to apply the changes and the editor overlay controls.](./images/getting-started/copilot-edits-accept.png)

## Fix coding errors with AI

Aside from inline suggestions and chat conversations, AI features are available in different areas throughout your developer flow in VS Code. You might notice the presence of AI functionality through the _sparkle_ icon in the VS Code user interface.

One such place is the editor, whenever there's a red squiggle due to a compiler error. Let's use AI to fix a coding error.

1. Open the `server.ts` TypeScript file that you created earlier in the editor.

    Notice that the `import express from 'express';` statement contains a red squiggle. If you put the cursor on the red squiggle, you can see the sparkle icon appear.

    ![Screenshot of VS Code editor, showing the Copilot sparkle because of an error with the express import statement.](./images/getting-started/copilot-code-action-sparkle.png)

1. Select the sparkle icon to view the AI Code Actions, and then select **Fix using Copilot**.

    ![Screenshot of VS Code editor, showing the Copilot code actions, highlighting `Fix using Copilot`.](./images/getting-started/copilot-code-action-fix.png)

1. Notice that editor inline chat comes up, prepopulated with the error message, and a solution to fix the problem.

    ![Screenshot of VS Code editor, showing the Copilot Inline Chat proposing to install the express npm package to solve the problem.](./images/getting-started/copilot-code-action-fix-result.png)

    Directly from the chat response, you can optionally select the **Insert into Terminal** button to copy the proposed command in your terminal.

## Next steps

Congratulations, you've now used AI to enhance your coding! In this tutorial, you successfully used AI features in VS Code to get code completions in the editor, and used chat to ask questions and generate code edits.

* To learn more about chat, proceed to the [Copilot Chat Tutorial](/docs/copilot/chat/getting-started-chat.md).

* To learn more about AI code editing, proceed to the [Copilot Edits](/docs/copilot/chat/copilot-edits.md) documentation.

## Related resources

* Check our videos on YouTube about [Copilot Best Practices](https://youtu.be/2q0BoioYSxQ) and [Advanced Features](https://www.youtube.com/watch?v=SLMfhuptCo8).

```

## language-models.md

```markdown
---
ContentId: 33e63aa1-1d8f-4d23-9733-1475f8c9f502
DateApproved: 06/12/2025
MetaDescription: Learn how to choose between different AI language models and how to use your own language model API key in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# AI language models in VS Code

Copilot in Visual Studio Code offers different built-in language models that are optimized for different tasks. You can also bring your own language model API key to use models from other providers. This article describes how to change the language model for chat or code completions, and how to use your own API key.

## Choose the right model for your task

By default, Copilot Chat uses a base model to provide fast, capable responses for a wide range of tasks, such as coding, summarization, knowledge-based questions, reasoning, and more.

However, you are not limited to using this model. You can choose from a selection of other models, each with its own particular strengths. You may have a favorite model that you like to use, or you might prefer to use a particular model for inquiring about a specific subject.

| Model type | Models |
|-----------|--------|
| Fast coding | <ul><li>GPT-4o</li><li>Claude Sonnet 3.5</li><li>Claude Sonnet 3.7</li><li>Gemini 2.0 Flash</li></ul> |
| Reasoning/planning | <ul><li>Claude Sonnet 3.7 Thinking</li><li>o1</li><li>o3-mini</li></ul> |

For a detailed comparison of AI models, see [Choosing the right AI model for your task](https://docs.github.com/en/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task) in the GitHub Copilot documentation.

Depending on which [chat mode](/docs/copilot/chat/copilot-chat.md#chat-mode) you are using, the list of available models might be different. In agent mode, the list of models is limited to those that have good support for tool calling.

The list of [models available in Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode) can change over time.

> [!NOTE]
> If you are a Copilot Business or Enterprise user, your administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) on GitHub.com.

## Why use your own language model API key?

Developers can now leverage models directly from Anthropic, Azure, Google, OpenAI, OpenRouter, or Ollama directly by providing a valid API key. Learn how to [use your own API in VS Code](#bring-your-own-language-model-key).

Using your own language model API key in VS Code has several advantages:

- **Model choice**: access hundreds of models from different providers, beyond the built-in models.
- **Experimentation**: experiment with new models or features that are not yet available in the built-in models.
- **Local compute**: use your own compute for one of the models already supported in GitHub Copilot or to run models not yet available.
- **Greater control**: by using your own key, you can bypass the standard rate limits and restrictions imposed on the built-in models.

> [!IMPORTANT]
> This feature is currently in preview and is not currently available to Copilot Business or Copilot Enterprise users.

## Change the model for chat conversations

Use the language model picker in the chat input field to change the model that is used for chat conversations and code editing.

![Screenshot that shows the model picker in the Chat view.](images/language-models/model-dropdown-change-model.png)

You can further extend the list of available models by [using your own language model API key](#bring-your-own-language-model-key).

If you have a paid Copilot plan, the model picker shows the premium request multiplier for premium models. Learn more about [premium requests](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests#premium-requests) in the GitHub Copilot documentation.

## Change the model for code completions

To change the language model that is used for generating code completions in the editor:

1. Select **Configure Code Completions...** from the Copilot menu in the VS Code title bar.

1. Select **Change Completions Model...**, and then select one of the models from the list.

## Bring your own language model key

If you already have an API key for a language model provider, you can use their models in chat in VS Code, in addition to the built-in models that Copilot provides. You can use models from the following providers: Anthropic, Azure, Google Gemini, Ollama, OpenAI, and OpenRouter.

> [!IMPORTANT]
> This feature is currently in preview and is not currently available to Copilot Business or Copilot Enterprise users.

To manage the available models for chat:

1. Select **Manage Models** from the language model picker in the Chat view.

    Alternatively, run the **GitHub Copilot: Manage Models** command from the Command Palette.

    ![Screenshot that shows the model picker in the Chat view, which has an item for managing the list of models.](images/language-models/model-dropdown-change-model.png)

1. Select a model provider from the list.

    ![Screenshot that shows the model provider Quick Pick.](images/language-models/model-provider-quick-pick.png)

1. Enter the provider-specific details, such as the API key or endpoint URL.

1. Enter the model details or select a model from the list, if available for the provider.

    The following screenshot shows the model picker for Ollama running locally, with the Phi-4 model deployed.

    ![Screenshot that shows the model picker of Ollama running locally, allowing you to select a model from the list of available models.](images/language-models/ollama-installed-models-quick-pick.png)

1. You can now select the model from the model picker in the Chat view and use it for chat conversations.

### Update the provider details

To update the provider details, such as the API key or endpoint URL:

1. Select **Manage Models** from the language model picker in the Chat view.

   Alternatively, run the **GitHub Copilot: Manage Models** command from the Command Palette.

1. Hover over a model provider in the list, and select the gear icon to edit the provider details.

   ![Screenshot that shows the model provider Quick Pick, with a gear icon next to the provider name.](images/language-models/reconfigure-model-provider.png)

1. Update the provider details, such as the API key or endpoint URL.

### Considerations

There are a number of considerations when using your own language model API key in VS Code:

- Bringing your own model only applies to the chat experience and doesn't impact code completions or other AI-powered features in VS Code, such as commit-message generation.
- The capabilities of each model might differ from the built-in models and could affect the chat experience. For example, some models might not support vision or tool calling.
- The Copilot API is still used for some tasks, such as sending embeddings, repository indexing, query refinement, intent detection, and side queries.
- When using your own model, there is no guarantee that responsible AI filtering is applied to the model's output.

## Frequently asked questions

### Why is bring your own model key not available for Copilot Business or Copilot Enterprise?

Bringing your own model key is not available for Copilot Business or Copilot Enterprise because it's mainly meant to allow users to experiment with the newest models the moment they are announced, and not yet available as a built-in model in Copilot.

Bringing your own model key will come to Copilot Business and Enterprise plans later this year, as we better understand the requirements that organizations have for using this functionality at scale. Copilot Business and Enterprise users can still use the built-in, managed models.

## Related resources

- [Available language models in GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode)

```

## overview.md

```markdown
---
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
DateApproved: 06/12/2025
MetaDescription: Copilot is your AI pair programmer tool in Visual Studio Code. Get code suggestions as you type in the editor, or use natural language chat to ask about your code or start an editing session for implementing new feature and fixing bugs.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code

GitHub Copilot is an AI-powered coding assistant integrated into Visual Studio Code. It provides code suggestions, explanations, and automated implementations based on natural language prompts and existing code context. Copilot has been trained on public code repositories and can assist with most programming languages and frameworks.

<video src="images/overview/agent-mode-blog-video.mp4" title="Agent mode hero video" autoplay loop controls muted></video>

## Core capabilities

### Code completions

Copilot provides inline code suggestions as you type, ranging from single line completions to entire function implementations. With next edit suggestions, it predicts the next logical code change based on your current context.

<video src="images/inline-suggestions/nes-video.mp4" title="Copilot NES video" autoplay loop controls muted poster="./images/inline-suggestions/point3d.png"></video>

**Examples:**

- Type `function calculateTax(` to get a complete tax calculation implementation
- Write `// Create a REST API endpoint for user authentication` to generate Express.js route code
- Begin a React component with `const UserProfile = ({` to receive a complete functional component with TypeScript types

Learn more about [code completions in VS Code](/docs/copilot/ai-powered-suggestions.md).

### Autonomous coding

VS Code and agent mode can autonomously plan and execute complex development tasks, coordinating multi-step workflows that involve running terminal commands or invoking specialized tools. It can transform high-level requirements into working code.

Install Model Context Protocol (MCP) servers or tools from Marketplace extensions to further enhance the capabilities of the autonomous coding experience. For example, pull information from a database or connect to external APIs.

<video src="images/overview/agent-mode-short.mp4" title="Agent mode video" autoplay loop controls muted></video>

**Example tasks:**

- Implement authentication using OAuth
- Migrate the codebase to a new framework or language
- Debug failing tests and apply fixes
- Optimize performance across the application

Learn more about [autonomous coding with agent mode](/docs/copilot/chat/chat-agent-mode.md) and [configuring MCP servers in VS Code](/docs/copilot/chat/mcp-servers.md).

### Natural language chat

Use natural language to interact with your codebase through chat interfaces. Ask questions, request explanations, or specify code changes using conversational prompts.

Apply changes across multiple files in your project using single prompts. Copilot analyzes your project structure and makes coordinated modifications.

**Common queries:**

- "How does authentication work in this project?"
- "What's causing the memory leak in the data processing function?"
- "Add error handling to the payment processing service"
- "Add a login form and backend API"

![Screenshot of the Chat view asking how to add a page to a web app](images/overview/copilot-chat-view-add-page.png)

Learn more about [using chat in VS Code](/docs/copilot/chat/copilot-chat.md).

### Smart actions

VS Code has many predefined actions for common development tasks that are enhanced with AI capabilities and integrated into the editor.

From helping you write commit messages or pull requests descriptions, renaming code symbols, fixing errors in the editor, to semantic search that helps you find relevant files.

![Screenshot of the Smart Actions menu in VS Code](images/overview/copilot-chat-fix-test-failure.png)

Learn more about the [smart actions in VS Code](/docs/copilot/copilot-smart-actions.md).

## Getting started

### Step 1: Set up Copilot

1. **Set up Copilot** from the Copilot dashboard in the Status Bar
2. **Sign in** with your GitHub account

![Hover over the Copilot icon in the Status Bar and select Set up Copilot.](images/setup/setup-copilot-status-bar.png)

### Step 2: Basic code completion

Create a new file and start typing. Copilot displays suggestions in _ghost text_.

```javascript
// Try typing this in a new .js file:
function factorial(
```

Accept suggestions with `kbstyle(Tab)`.

### Step 3: Autonomous coding

Let Copilot handle complex tasks by using the chat interface and agent mode. The AI will iterate on the code until the task is complete.

1. Open the Chat view (`kb(workbench.action.chat.open)`)
1. Select **Agent** from the chat mode dropdown list
1. Ask to generate a basic web app like: "Create a basic node.js web app to share cycling tips. Make it look modern and responsive."

Notice how the code is generated step-by-step, and dependencies are installed automatically.

### Step 4: Inline Chat

Use inline chat to ask questions about your code while you're in the flow of writing code.

1. Select some code in your editor
1. Press `kb(inlinechat.start)` to open editor inline chat
1. Ask to explain or make a modification like: "Refactor this code to ..."
1. Review and accept the suggested changes

## Usage scenarios

### Code analysis and review

Understanding existing codebases and identifying issues:

- "Explain the authentication flow in this application"
- "What are the potential security issues in this payment handler?"
- "Document this API endpoint with proper JSDoc comments"

### Debugging and troubleshooting

Identifying and resolving code issues:

- "Why is this component re-rendering unnecessarily?"
- "Find and fix the memory leak in this data processing pipeline"
- "Optimize this database query for better performance"

Learn more about using [AI for debugging](/docs/copilot/guides/debug-with-copilot.md).

### Feature implementation

Building new functionality:

- "Create a user registration system with email verification"
- "Add real-time notifications using WebSockets"
- "Implement a shopping cart with local storage persistence"

### Testing and quality assurance

Generating tests and ensuring code quality:

- "Generate comprehensive unit tests for this service class"
- "Create integration tests for the API endpoints"
- "Add property-based tests for this data validation function"

Learn more about using [AI for testing](/docs/copilot/guides/test-with-copilot.md).

### Learning and documentation

Understanding new technologies and patterns:

- "Show me the differences between async/await and Promises"
- "How would you implement this pattern in Go instead of Python?"
- "What are the best practices for error handling in React?"

## Customize the AI to your workflow

### Custom instructions

Use custom instructions to define project-specific coding conventions and patterns, and the AI will generate code that matches your style. Automatically apply these instructions to all chat requests or only for specific file types.

```markdown
---
applyTo: "**"
---
# My Coding Style
- Use arrow functions for components
- Prefer const over let
- Always include TypeScript types
- Use descriptive variable names
- Follow the Repository pattern for data access
```

Learn more about [using custom instructions](/docs/copilot/copilot-customization.md) to tailor the AI to your coding style.

### Language models

Quickly switch between different AI models to optimize for speed, reasoning, or specialized tasks. Choose from various built-in models or connect to external providers and bring your own API keys.

![Screenshot that shows the model picker in the Chat view.](images/language-models/model-dropdown-change-model.png)

Learn more about using [language models in VS Code](/docs/copilot/language-models.md).

### Custom chat modes

The chat experience in VS Code can operate in different modes to switch between asking questions, making edits, or running autonomous coding sessions. You can also create custom chat modes that fit your workflow. For example, create a chat mode that focuses on planning and architecture discussions. Specify which tools chat is allowed to use, and provide custom instructions to provide the right context in which it should operate.

![Screenshot showing the Chat view, highlighting the chat mode dropdown list.](images/overview/chat-mode-dropdown.png)

Learn more about [creating your own chat modes](/docs/copilot/chat/chat-modes.md).

### Extend chat with tools

Extend the capabilities of the chat experience with specialized tools from MCP servers or Marketplace extensions. For example, add tools for querying databases, connecting to external APIs, or performing specialized tasks.

![MCP tools list](chat/images/mcp-servers/agent-mode-select-tools.png)

Learn more about [using MCP servers and tools](/docs/copilot/chat/mcp-servers.md).

## Best Practices

- Choose the right tool for the task. Get code completions while you're coding, use chat for natural language queries, and pick the chat mode that fits your workflow.

- Write effective prompts to get the best results. Be specific, provide the right context, and iterate often.

- Customize the AI to your coding style and project conventions by using custom instructions, prompt files, or chat modes.

- Extend the AI's capabilities with tools from MCP servers or Marketplace extensions.

- Choose a language model that is optimized for your task. Use fast models for quick code suggestions, reasoning models for more complex requests.

Get more [tips and tricks for using AI in VS Code](/docs/copilot/copilot-tips-and-tricks.md).

## Pricing

You can start using GitHub Copilot for free with monthly limits on completions and chat interactions. For more extensive usage, you can choose from various paid plans.

[View detailed pricing →](https://docs.github.com/en/copilot/about-github-copilot/plans-for-github-copilot)

## Next steps

- [Set up Copilot in VS Code](/docs/copilot/setup.md)
- [Get started with hands-on examples](/docs/copilot/getting-started.md)
- [Customize the AI for your workflow](/docs/copilot/copilot-customization.md)

```

## setup-simplified.md

```markdown
---
ContentId: a18e245e-af72-4d0f-b322-fa1030af5284
DateApproved: 06/12/2025
MetaDescription: Set up Copilot in VS Code
MetaSocialImage: images/shared/github-copilot-social.png
---
# Set up Visual Studio Code with Copilot

Welcome to AI-powered development with Visual Studio Code! Follow the steps in this guide to get started in minutes.

## Set up Copilot in VS Code

To use Copilot in VS Code, you need access to a GitHub Copilot subscription.

To set up Copilot in VS Code:

1. [Download and install Visual Studio Code](https://code.visualstudio.com/Download) for your platform

1. Start VS Code

1. Hover over the Copilot icon in the Status Bar and select **Set up Copilot**.

    ![Hover over the Copilot icon in the Status Bar and select Set up Copilot.](images/setup/setup-copilot-status-bar.png)

1. Select **Sign in** to sign in to your GitHub account or **Use Copilot** if you're already signed in.

    If you don't have a Copilot subscription yet, you'll be signed up for the [Copilot Free plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free).

    > [!IMPORTANT]
    > Telemetry in your free version of GitHub Copilot is currently enabled. By default, code suggestions that match public code, including code references in the VS Code and <github.com> experience, are allowed. You can opt out of telemetry data collection by disabling telemetry in VS Code by setting `setting(telemetry.telemetryLevel)` to `off`, or you can adjust both telemetry and code suggestion settings in [Copilot Settings](https://github.com/settings/copilot).

1. You can now start using Copilot in VS Code. Learn the basics with the [Copilot Quickstart](/docs/copilot/getting-started.md).

## Next steps

- Discover AI-powered development in VS Code with our [Copilot Quickstart](/docs/copilot/getting-started.md)
- Get an [overview of Copilot in VS Code](/docs/copilot/overview.md)
- Get more info about the [Copilot Free plan details and conditions](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)

```

## setup.md

```markdown
---
ContentId: 37fd3bd2-4209-49f6-bec5-c544d6b1b289
DateApproved: 06/12/2025
MetaDescription: Access your GitHub Copilot subscription and set up GitHub Copilot in Visual Studio.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Set up GitHub Copilot in VS Code

This guide walks you through setting up GitHub Copilot in Visual Studio Code. To use Copilot in VS Code, you need to have access to GitHub Copilot with your GitHub account.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Get access to GitHub Copilot

There are different ways to get access to GitHub Copilot:

| Type of User                   | Description |
|--------------------------------|-------------|
| Individual                     | <ul><li>Set up [GitHub Copilot Free](https://github.com/github-copilot/signup) to get a limited experience of Copilot without a subscription. See [About GitHub Copilot Free](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free).</li><li>Sign up for a paid GitHub Copilot subscription to get unlimited completions and chat interactions. You can [try GitHub Copilot for free](https://github.com/github-copilot/signup?ref_cta=Copilot+trial&ref_loc=about+github+copilot&ref_page=docs) with a one-time 30-day trial.</li><li>See [Setting up GitHub Copilot for yourself](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-yourself) for all options. </li></ul> |
| Organization/Enterprise member | <ul><li>If you are a member of an organization or enterprise that has a subscription to GitHub Copilot, you can request access to Copilot by going to <https://github.com/settings/copilot> and requesting access under "Get Copilot from an organization."</li><li>See [Setting up GitHub Copilot for your organization](https://docs.github.com/en/copilot/setting-up-github-copilot/setting-up-github-copilot-for-your-organization) to enable Copilot for your organization.</li></ul> |

## Set up Copilot in VS Code

To use Copilot in VS Code, you need access to a GitHub Copilot subscription.

To set up Copilot in VS Code:

1. Hover over the Copilot icon in the Status Bar and select **Set up Copilot**.

    ![Hover over the Copilot icon in the Status Bar and select Set up Copilot.](images/setup/setup-copilot-status-bar.png)

1. Select **Sign in** to sign in to your GitHub account or **Use Copilot** if you're already signed in.

    ![Sign in to your GitHub account or use Copilot if you're already signed in.](images/setup/setup-copilot-sign-in.png)

    If you don't have a Copilot subscription yet, you'll be signed up for the [Copilot Free plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free).

    > [!IMPORTANT]
    > Telemetry in your free version of GitHub Copilot is currently enabled. By default, code suggestions that match public code, including code references in the VS Code and <github.com> experience, are allowed. You can opt out of telemetry data collection by disabling telemetry in VS Code by setting `setting(telemetry.telemetryLevel)` to `off`, or you can adjust both telemetry and code suggestion settings in [Copilot Settings](https://github.com/settings/copilot).

1. You can now start using Copilot in VS Code. Learn the basics with the [Copilot Quickstart](/docs/copilot/getting-started.md).

## Use a different GitHub account with Copilot

If your Copilot subscription is associated with another GitHub account, sign out of your GitHub account in VS Code, and sign in with another account.

1. Select the **Accounts** menu in the Activity Bar, and then select **Sign out** for the account you're currently signed in with for Copilot.

    ![Accounts menu in VS Code, showing the option to sign out of the current GitHub account.](images/setup/vscode-accounts-menu-signout.png)

1. Sign in to your GitHub account using any of the following methods:

    - Select **Sign in to use Copilot** from the Copilot status menu.

        ![Sign in to use Copilot from the Copilot status menu.](images/setup/copilot-signedout-sign-in.png)

    - Select the **Accounts** menu in the Activity Bar, and then select **Sign in with GitHub to use GitHub Copilot**.

        ![Accounts menu in VS Code, showing the option to sign in with GitHub to use GitHub Copilot.](images/setup/vscode-accounts-menu.png)

    - Run the **GitHub Copilot: Sign in** command in the Command Palette (`kb(workbench.action.showCommands)`).

## Hide Copilot in VS Code

To completely hide Copilot in VS Code, select **Hide Copilot** from the Copilot menu in the VS Code title bar.

![Screenshot that shows the Copilot menu in the VS Code title bar, with the option to hide Copilot.](images/setup/hide-copilot.png)

To reenable Copilot, run the **Chat: Use AI Features with Copilot for Free** command in the Command Palette (`kb(workbench.action.showCommands)`).

## Disable Copilot for a workspace

To disable Copilot for a specific workspace:

1. Open the Extensions view in VS Code (`kb(workbench.view.extensions)`).
1. Search for the **GitHub Copilot** extension.
1. Select the gear icon and then select **Disable (Workspace)**

![Screenshot that shows the GitHub Copilot extension in the Extensions view, with the option to disable it for the workspace.](images/setup/copilot-disable-workspace.png)

## Next steps

- Continue with the [Copilot Quickstart](/docs/copilot/getting-started.md) to discover the key features of Copilot in VS Code.

```

## chat/chat-agent-mode.md

```markdown
---
ContentId: 57754e12-a134-41cc-9693-fb187729c49f
DateApproved: 06/12/2025
MetaDescription: Use chat agent mode in VS Code to start an agentic code editing session to autonomously make edits and invoke tools. Use built-in tools, MCP tools, or tools from extensions.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use agent mode in VS Code

With chat _agent mode_ in Visual Studio Code, you can use natural language to specify a high-level task, and let AI autonomously reason about the request, plan the work needed, and apply the changes to your codebase. Agent mode uses a combination of code editing and tool invocation to accomplish the task you specified. As it processes your request, it monitors the outcome of edits and tools, and iterates to resolve any issues that arise.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Why use agent mode?

Agent mode is optimized for making autonomous edits across multiple files in your project. It is particularly useful for complex tasks that require not only code edits but also the invocation of tools and terminal commands. You can use agent mode to:

* Refactor parts of your codebase, such as "refactor the app to use a Redis cache".
* Plan and implement new features, such as "add a login form to the app using OAuth for authentication".
* Migrate your codebase to a new framework, such as "migrate the app from React to Vue.js".
* Generate an implementation plan for a complex task, such as "create a meal-planning web app using a Swift front-end and a Node.js back-end".
* Define a high-level requirement, such as "add social media sharing functionality".

Agent mode is particularly useful for coding tasks when you have a less well-defined task that might also require running terminal commands and tools. Agent mode autonomously determines the relevant context and tasks to accomplish the request. It can also iterate multiple times to resolve intermediate issues, such as syntax errors or test failures.

## Enable agent mode in VS Code

> [!NOTE]
> Agent mode is available starting from VS Code 1.99.

To enable agent mode in VS Code, enable the `setting(chat.agent.enabled)` setting.

To centrally enable or disable agent mode within your organization, check [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

## Use agent mode

In agent mode, the AI operates autonomously and determines the relevant context for your prompt.

Follow these steps to get started:

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Agent** from the chat mode selector.

    ![Screenshot showing the Chat view, highlighting agent mode selected.](images/copilot-edits/copilot-edits-agent-mode.png)

    Directly open agent mode in VS Code [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) or [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent).

1. Enter your prompt for making edits in the chat input field and select **Send** (`kb(workbench.action.edits.submit)`) to submit it.

    You can specify a high-level requirement, and you don't have to specify which files to work on. In agent mode, the AI determines the relevant context and files to edit autonomously.

    Experiment with some of these example prompts to get started:

    * `Create a meal-planning web app using React and Node.js`
    * `Add social media sharing functionality`
    * `Replace current auth with OAuth`

1. Agent mode might invoke multiple [tools](#agent-mode-tools) to accomplish different tasks. Optionally, select the **Tools** icon to configure which tools can be used for responding to your request.

    ![Screenshot showing the Copilot Edits view, highlighting the Tools icon in the chat input.](images/copilot-edits/agent-mode-select-tools.png)

    > [!TIP]
    > You can also directly reference a tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode).

1. Confirm tool invocations and terminal commands.

    Before running a terminal command or non-builtin tool, Copilot requests confirmation to continue. This is because tools might run locally on your machine and perform actions that modify files or data.

    Use the **Continue** button dropdown options to automatically confirm the specific tool for the current session, workspace, or all future invocations. Learn how to [manage tool approvals and approve all tool invocations](#manage-tool-approvals).

    ![MCP Tool Confirmation](images/mcp-servers/mcp-tool-confirmation.png)

    If your project has configured [tasks](/docs/debugtest/tasks.md) in `tasks.json`, agent mode tries to run the appropriate tasks. For example, if you've defined a build task, agent mode will run the build task before running the application. Enable or disable running workspace tasks with the `setting(github.copilot.chat.agent.runTasks)` setting.

1. Optionally, verify and edit the tool input parameters before running the tool.

    Select the chevron next to the tool name to view its details and input parameters. You can edit the input parameters before running the tool.

    ![MCP Tool Input Parameters](images/mcp-servers/mcp-tool-edit-parameters.png)

1. Copilot detects issues and problems in code edits and terminal commands and will iterate and perform additional actions to resolve them.

    Enable the `setting(github.copilot.chat.agent.autoFix)` setting to automatically diagnose and fix issues in the generated code changes. This setting is enabled by default.

    For example, agent mode might run unit tests as a result of a code edit. If the tests fail, it uses the test outcome to resolve the issue.

    Copilot Edits agent mode iterates multiple times to resolve issues and problems. The `setting(chat.agent.maxRequests)` setting controls the maximum number of requests that Copilot Edits can make in agent mode.

1. As Copilot processes your request, notice that Copilot streams the suggested code edits directly in the editor.

    The Chat view shows the list of files that were edited in bold text. The editor overlay controls enable you to navigate between the suggested edits.

1. Review the suggested edits and [accept or discard the suggested edits](#accept-or-discard-edits).

1. Continue to iterate on the code changes to refine the edits or implement additional features.

## Agent mode tools

Agent mode uses tools to accomplish specialized tasks while processing a user request. Examples of such tasks are listing the files in a directory, editing a file in your workspace, running a terminal command, getting the output from the terminal, and more.

Agent mode can use the following tools:

* Built-in tools
* [MCP tools](/docs/copilot/chat/mcp-servers.md)
* [Tools contributed by extensions](/api/extension-guides/tools.md)

You can view and manage the tools that can be used for responding to a request. Select the **Tools** icon in the Chat view to view and manage the tools that are available in agent mode.

![Screenshot showing the Copilot Edits view, highlighting the Tools icon in the chat input.](images/copilot-edits/agent-mode-select-tools.png)

Based on the outcome of a tool, Copilot might invoke other tools to accomplish the overall request. For example, if a code edit results in syntax errors in the file, Copilot might explore another approach and suggest different code changes.

You can enable or disable the use of agent tools by configuring the `setting(chat.extensionTools.enabled)` setting. Learn how to centrally manage this setting in your organization by checking [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

### Define tool sets

A tool set is a collection of tools that you can use in chat. You can use tool sets in the same way as you would use individual tools. For example, select a tool set with the tools picker in agent mode or reference the tool set directly in your prompt by typing `#` followed by the tool set name.

![Screenshot showing the tools picker, highlighting user-defined tool sets.](images/agent-mode/tools-picker-tool-sets.png)

Tool sets enable you to group related tools together, making it easier to use them in your chat prompts, [prompt files](/docs/copilot/copilot-customization.md), or [custom chat modes](/docs/copilot/chat/chat-modes.md). This can be particularly useful when you have many installed tools from MCP servers or extensions.

To create a tool set, use the **Chat: Configure Tool Sets** > **Create new tool sets file** command in the Command Palette. A tool sets file is a `.jsonc` file that is stored in your user profile.

A tool set has the following structure:

* `<tool set name>`: name of the tool set, which is displayed in the tools picker and when referencing the tool set in your prompt.
* `tools`: list of tool names that are included in the tool set. The tools can be built-in tools, MCP tools, or tools contributed by extensions.
* `description`: brief description of the tool set. This description is displayed alongside the tool set name in the tools picker.
* `icon`: icon for the tool set, values can be found in the [Product Icon Reference](/api/references/icons-in-labels.md).

The following code snippet shows an example of a tool sets file:

```json
{
    "reader": {
        "tools": [
            "changes", "codebase", "fetch", "findTestFiles", "githubRepo", "problems", "usages"
        ],
        "description": "description",
        "icon": "tag"
    }
}
```

## Manage tool approvals

When a tool is invoked, Copilot requests confirmation to run the tool. This is because tools might run locally on your machine and perform actions that modify files or data.

In the Chat view, after a tool invocation, use the **Continue** button dropdown options to automatically confirm the specific tool for the current session, workspace, or all future invocations.

![MCP Tool Confirmation](images/mcp-servers/mcp-tool-confirmation.png)

You can reset the tool confirmations by using the **Chat: Reset Tool Confirmations** command in the Command Palette.

In case you want to auto-approve _all_ tools, you can now use the experimental `setting(chat.tools.autoApprove)` setting. This will automatically approve all tool invocations, and VS Code will not ask for confirmation when a language model wishes to run tools. Bear in mind that with this setting enabled, you will not have the opportunity to cancel potentially destructive actions a model wants to take.

As an enhanced boundary, you might choose to set `setting(chat.tools.autoApprove)` only when connected to a [remote environment](/docs/remote/remote-overview.md). You'll want to set this as a remote, rather than user-level, setting. Note that remote environments that are part of your local machine (like dev containers) or that have access to your credentials will still pose different levels of risk.

Learn how to centrally manage the auto-approve tools setting in your organization by checking [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

## Accept or discard edits

Copilot lists the files that were edited in the list of the changed files in the Chat view. Files with pending edits also have an indicator in the Explorer view and editor tabs.

![Screenshot that shows the Copilot Edits view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files-full.png)

With the editor overlay controls, you can navigate between the suggested edits by using the `kbstyle(Up)` (<i class="codicon codicon-arrow-up"></i>) and `kbstyle(Down)` (<i class="codicon codicon-arrow-down"></i>) controls. Use the **Keep** or **Undo** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/copilot-edits/copilot-edits-file-review-controls.png)

Use the **Keep** or **Undo** controls in the editor or Chat view to accept or reject individual or all suggested edits.

![Screenshot showing the Copilot Edits view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

With the `setting(chat.editing.autoAcceptDelay)` setting, you can configure a delay after which the suggested edits are automatically accepted. Hover over the editor overlay controls to cancel the auto-accept countdown.

When you close VS Code, the status of the pending edits is remembered. When you reopen VS Code, the pending edits are restored, and you can still accept or discard the edits.

## Revert edits

As you're sending requests to make edits to your code, you might want to roll back some of these changes, for example, because you want to use another implementation strategy or because Copilot starts walking down the wrong path when generating edits.

You can use the **Undo Last Edit** control in the Chat view title bar to revert the last edits and return to the state before sending the last request. After you perform an undo of the last edit, you can redo those edits again by using the **Redo Last Edit** control in the Chat view title bar.

![Screenshot showing the Copilot Edits view, highlighting the Undo and Redo actions in the view title bar.](images/copilot-edits/copilot-edits-undo-redo.png)

You can also use the **Undo Edits (Delete)** control (`kbstyle(x)` icon) when hovering over a request in the Copilot Edits view to revert all edits that were made from that request onwards.

![Screenshot showing the Copilot Edits view, highlighting the Undo Edits control for a specific request.](images/copilot-edits/copilot-edits-undo-request.png)

## Interrupt an agent mode request

To interrupt an ongoing request, you can either **Pause** it or **Cancel** it. When you pause a request, Copilot stops processing the request and waits for your input.

When you pause a request, you can either choose to enter a new prompt, which cancels the current request, or you can choose to resume the current request.

When you cancel a request, Copilot interrupts and ends the active request. You can still [review and accept or reject](#accept-or-discard-edits) the changes that were made up to that point.

## Use instructions to get AI edits that follow your coding style

To get AI-generated code edits that follow your coding style, preferred frameworks, and other preferences, you can use instruction files. Instruction files enable you to describe your coding style and preferences in Markdown files, which the AI uses to generate code edits that match your requirements.

You can manually attach instruction files as context to your chat prompt, or you can configure the instruction files to be automatically applied.

The following code snippet shows an example of an instruction file that describes your coding style and preferences:

```markdown
---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
```

Learn more about [using instruction files](/docs/copilot/copilot-customization.md).

## Settings

The following list contains the settings related to agent mode. You can configure settings through the Settings editor (`kb(workbench.action.openSettings)`).

* `setting(chat.agent.enabled:true)`: enable or disable agent mode (default: `false`, requires VS Code 1.99 or later)
* `setting(chat.agent.maxRequests)`: maximum number of requests that Copilot Edits can make in agent mode (default: 5 for Copilot Free users, 15 for other users)
* `setting(github.copilot.chat.agent.runTasks)`: run workspace tasks when using agent mode in Copilot Edits (default: `true`)
* `setting(chat.mcp.discovery.enabled)`: enable or disable discovery of MCP servers configured in other tools (default: `true`)
* `setting(github.copilot.chat.agent.autoFix)`: automatically diagnose and fix issues in the generated code changes (default: `true`)
* `setting(chat.tools.autoApprove)` _(Experimental)_: automatically approve all tools (default: `false`)

## Frequently asked questions

### Why would I use agent mode instead of edit mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: agent mode autonomously determines the relevant context and files to edit. In edit mode, you need to specify the context yourself.
* **Task complexity**: agent mode is better suited for complex tasks that require not only code edits but also the invocation of tools and terminal commands.
* **Duration**: agent mode involves multiple steps to process a request, so it might take longer to get a response. For example, to determine the relevant context and files to edit, determine the plan of action, and more.
* **Self-healing**: agent mode evaluates the outcome of the generated edits and might iterate multiple times to resolve intermediate issues.
* **Request quota**: in agent mode, depending on the complexity of the task, one prompt might result in many requests to the backend.

## Related resources

* [Configure MCP servers to add tools to agent mode](/docs/copilot/chat/mcp-servers.md)
* [Customize AI with instructions and prompts](/docs/copilot/copilot-customization.md)

```

## chat/chat-ask-mode.md

```markdown
---
ContentId: 9c7d2fe3-ed18-4370-9d59-dfd34a039091
DateApproved: 06/12/2025
MetaDescription: Use ask mode for chat in VS Code to ask questions about your codebase, coding, and general technology concepts by using natural language.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use ask mode in VS Code

Chat in Visual Studio Code lets you use natural language to interact with large language models (LLMs) to get help with your code. _Ask mode_ for chat  is optimized for asking questions about your codebase, coding, and general technology concepts. Ask mode is particularly useful for getting a better understanding of your codebase, brainstorming ideas, and getting help with coding tasks.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Why use ask mode?

Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts. You can use it to:

* Ask questions about your codebase, such as "Where is the database connection string defined?" or "Explain the sort function".
* Brainstorm ideas, such as "How can I improve the performance of my application?" or "Provide 3 different ways to implement a search feature".
* Get help with coding tasks, such as "How do I create a new React component?" or "How do I implement the factory pattern?".

In ask mode, the response can contain code blocks, which you can [apply to your codebase](#apply-a-code-block-from-chat). This works well for smaller edits within a single file. However, [edit mode](/docs/copilot/chat/copilot-edits.md) and [agent mode](/docs/copilot/chat/chat-agent-mode.md) are better suited for making larger changes across multiple files or for more complex coding tasks.

## Use ask mode

Follow these steps to get started with ask mode in VS Code:

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Ask** from the chat mode selector.

    ![Screenshot showing the Chat view, showing the mode dropdown with "Ask" selected.](images/ask-mode/chat-mode-dropdown-ask.png)

    Directly open ask mode in VS Code [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) or [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask).

1. Type your question in the chat input field and select **Send** (`kb(workbench.action.edits.submit)`) to submit it.

    Experiment with some of these example questions to get started:

    * `"What is the factory design pattern?"`
    * `"How do I use the fetch API in JavaScript?"`
    * `"How do I create a new React component?"`

1. Add context to your chat prompt by using **Add Context** or #-mentioning specific workspace files or predefined context items like `#codebase`.

    By adding context, you can get more relevant responses. For example, to ask questions that are specific to your current project, you can use the `#codebase` context item. Type `#` in the chat input field to view the list of available context items.

    Here are some example prompts that use context:

    * `"Where is the db connecting string defined in #codebase?"`
    * `"Which testing framework is used for #calculator.test.js?"`
    * `"Summarize the changes in #changes"`

    Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

1. Notice that, based on your question, the response might include different types of rich content, such as code blocks, terminal commands, links, and references to symbols in your code.

    Learn how you can [apply code blocks](#apply-a-code-block-from-chat) to your codebase, or run terminal commands directly in the integrated terminal.

## Apply a code block from chat

When your chat response contains code blocks, you can apply them individually to the corresponding file in your workspace. VS Code performs a smart apply and inserts the changes in the right location within the file.

To apply a code block to your codebase, hover over the code block and select the **Apply in Editor** button. VS Code tries to apply the proposed changes to your existing code.

![Screenshot of a chat code block response, highlighting the actions to apply changes.](images/ask-mode/copilot-chat-view-code-block-actions.png)

Alternatively, you can also copy the code or insert it at the current cursor position. Hover over the code block and select the corresponding action.

Depending on the language extension, code blocks in chat responses might support IntelliSense, similar to the experience in the editor.

If a code block contains a shell command, you can run it directly in the integrated terminal with the **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`) action.

![Chat code block to list files with Insert into Terminal option visible](images/ask-mode/run-in-terminal.png)

> [!TIP]
> Navigate between code blocks with the **Chat: Next Code Block** (`kb(workbench.action.chat.nextCodeBlock)`) and **Chat Previous Code Block** (`kb(workbench.action.chat.previousCodeBlock)`) commands.

## Quick chat

Use Quick Chat to ask a quick question without starting a full chat session on the side. Quick Chat is a lightweight chat experience that lets you open a Quick Pick to ask a question.

To open Quick Chat, select **Quick Chat** from the Copilot menu in the title bar, or use the `kb(workbench.action.quickchat.toggle)` keyboard shortcut.

<video src="images/ask-mode/quick-chat-recursion.mp4" title="Open Quick Chat to ask about recursion, and then open the response in the Chat view." autoplay loop controls muted></video>

You can ask a question in Quick Chat, and if you want to keep the conversation going, promote it to a full chat session with the **Open in Chat View** button.

## Special keywords

In your prompt, you can use special keywords to get more relevant responses:

* #-mentions: used to add context to your chat prompt. For example, `#codebase` to refer to the entire codebase, or `#<file | folder | symbol>` to refer to a specific file, folder, or symbol in your workspace. Type `#` in the chat input field to view the list of context items. Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

* @-mentions: used to reference a _chat participant_, which can help answer questions about a specific topic like interacting with a database. Type `@` in the chat input field to view the list of available participants. Choose from built-in participants like `@terminal`, or [extension-provided participants](https://marketplace.visualstudio.com/search?term=tag%3Achat-participant&target=VSCode&category=All%20categories&sortBy=Relevance).

* _Slash commands_: provide a shortcut to commonly used instructions, such as `/fix` to propose a fix for a problem, or `/explain` to explain how the selected code works. Type `/` in the chat input field to view a list of available slash commands.

## Related resources

* [Learn more about using chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Use edit mode to make code edits across multiple files](/docs/copilot/chat/copilot-edits.md)
* [Use agent mode to start an autonomous coding session](/docs/copilot/chat/chat-agent-mode.md)

```

## chat/chat-modes.md

```markdown
---
ContentId: 276ecd8f-2a76-467e-bf82-846d49c13ab5
DateApproved: 06/12/2025
MetaDescription: Learn how to use chat modes in VS Code to use chat for different tasks, such as asking questions, making code edits, and autonomous coding tasks. Define custom chat modes to chat for your usage scenario or project.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Chat modes in VS Code

Chat modes are predefined configurations that enable you to tailor the AI chat behavior in Visual Studio Code for specific tasks, such as asking questions, making code edits, or performing autonomous coding tasks. Switch between chat modes at any time in the Chat view, depending on the task you want to accomplish.

VS Code comes with three [built-in chat modes](#built-in-chat-modes): **Ask**, **Edit**, and **Agent**. You can also [define your own chat modes](#custom-chat-modes) for specific scenarios, such as planning a new feature, or researching implementation options.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Switch between chat modes

To switch between chat modes, open the Chat view (`kb(workbench.action.chat.open)`), and then select the desired mode from the chat mode dropdown list.

![Screenshot showing the Chat view, highlighting the chat mode dropdown list.](images/chat-modes/chat-mode-dropdown.png)

## Built-in chat modes

Chat in VS Code can operate in different modes, each optimized for a specific use case. You can change between the different chat modes at any time in the Chat view.

| Chat mode | Description |
|-----------|-------------|
| [Ask mode](/docs/copilot/chat/chat-ask-mode.md) | Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts.<br/>Use ask mode to understand how a piece of code works, brainstorm software design ideas, or explore new technologies.<br/>Open ask mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask). |
| [Edit mode](/docs/copilot/chat/copilot-edits.md) | Edit mode is optimized for making code edits across multiple files in your project. VS Code directly applies the code changes in the editor, where you can review them in-place. <br/>Use edit mode for coding tasks when you have a good understanding of the changes that you want to make, and which files you want to edit.<br/>Open edit mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit). |
| [Agent mode](/docs/copilot/chat/chat-agent-mode.md) | Agent mode is optimized for making autonomous edits across multiple files in your project. <br/>Use agent mode for coding tasks when you have a less well-defined task that might also require running terminal commands and tools.<br/>Open agent mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent). |

## Custom chat modes

> [!NOTE]
> Custom chat modes are available as of VS Code release 1.101 and are currently in preview.

The built-in chat modes provide general-purpose configurations for chat in VS Code. For a more tailored chat experience, you can create your own chat modes.

Custom chat modes consist of a set of instructions and tools that are applied when you switch to that mode. For example, a "Plan" chat mode could include instructions for generating an implementation plan and only use read-only tools. By creating a custom chat mode, you can quickly switch to that specific configuration without having to manually select relevant tools and instructions each time.

Custom chat modes are defined in a `.chatmode.md` Markdown file, and can be stored in your workspace for others to use, or in your user profile, where you can reuse them across different workspaces.

You can reference instructions files and tools (sets) in your custom chat mode file.

### Chat mode file structure

A chat mode file is a Markdown file with the `.chatmode.md` suffix. It has the following two main sections:

* Front Matter metadata header

    * `description`: A brief description of the chat mode. This description is displayed when you hover the chat mode in the chat mode dropdown list in the Chat view.
    * `tools`: A list of tool or tool set names that are available for this chat mode. This can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. Use the **Configure Tools** action to select the tools from the list of available tools in your workspace.

* Body with chat mode instructions

    This is where you provide specific prompts, guidelines, or any other relevant information that you want the AI to follow when in this chat mode. You can also reference instructions files by using Markdown links. The chat mode instructions will complement whatever is specified in the chat prompt.

### Chat mode file example

The following code snippet shows an example of a "Plan" chat mode file that generates an implementation plan and doesn't make any code edits.

```markdown
---
description: Generate an implementation plan for new features or refactoring existing code.
tools: ['codebase', 'fetch', 'findTestFiles', 'githubRepo', 'search', 'usages']
---
# Planning mode instructions
You are in planning mode. Your task is to generate an implementation plan for a new feature or for refactoring existing code.
Don't make any code edits, just generate a plan.

The plan consists of a Markdown document that describes the implementation plan, including the following sections:

* Overview: A brief description of the feature or refactoring task.
* Requirements: A list of requirements for the feature or refactoring task.
* Implementation Steps: A detailed list of steps to implement the feature or refactoring task.
* Testing: A list of tests that need to be implemented to verify the feature or refactoring task.
```

### Create a chat mode

You can create a chat mode file in your workspace or user profile.

1. Run the **Chat: New Mode File** command in the Command Palette (`kb(workbench.action.chat.createChatMode)`).

1. Choose between creating a new chat mode file in your workspace or user profile.

1. Enter a name for the chat mode. This name is used in the chat mode dropdown list in the Chat view.

1. Provide the details for the chat mode in the newly created `.chatmode.md` file.

    * Provide the description and configure the list of available tools or tool sets in the Front Matter metadata.
    * Add instructions for the chat mode in the body of the file.

By default, VS Code looks for workspace chat mode files in the `.github/chatmodes` folder. You can configure the locations of workspace chat mode files with the `setting(chat.modeFilesLocations)` setting.

### Manage existing chat modes

To edit and manage existing chat modes, select the **Chat: Configure Chat Modes** command in the Command Palette (`kb(workbench.action.chat.configureChatModes)`). Select a chat mode from the list to open it in the editor, where you can edit the instructions and tools (sets).

Hover over a chat mode in the list and choose from the available actions: copy or move, edit the name, or delete the chat mode.

## Related resources

* [Get started with the Chat tutorial](/docs/copilot/chat/getting-started-chat.md)
* [Get an overview of chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Customize AI with instructions and prompts](/docs/copilot/copilot-customization.md)
* [Configure tools in chat](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)

```

## chat/copilot-chat-context.md

```markdown
---
ContentId: 5d8a707d-a239-4cc7-92ee-ccc763e8eb9c
DateApproved: 06/12/2025
MetaDescription: "Learn how to manage context when using AI in VS Code, including workspace indexing, #-mentions for files and symbols, web content references, and custom instructions."
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Manage context for AI

By providing the right context, you can get more relevant and accurate responses from the AI in VS Code. In this article, you learn how to manage context in chat, including how to use #-mentions to reference files, folders, and symbols, how to reference web content, or how you can use custom instructions to guide the AI's responses.

## Implicit context

VS Code automatically provides context to the chat prompt based on your current activity. The following information is implicitly included in the chat context:

* The currently selected text in the active editor.
* The file name or notebook name of the active editor.

The actual contents of the active file are not included in the context, but are shown as a suggested context item in the chat input box (indicated with italic text and a dotted outline). Depending on your prompt, VS Code might decide to read the contents of the active file. To explicitly include the contents of the active file in the chat context, select the suggested file in the chat input box.

![Screenshot of the Chat view, showing the active file as a suggested context item in the chat input box.](./images/copilot-chat/chat-context-current-file.png)

## #-mentions

In chat, you can explicitly refer to context by typing `#` followed by the context item you want to mention. This enables the AI to provide more relevant responses based on the specific context you are referring to.

Type the `#` symbol in the chat input field to see a list of available context items.

![Screenshot of VS Code Chat view, showing the chat variable picker.](./images/copilot-chat/copilot-chat-view-chat-variables.png)

To reference a specific workspace file, folder, or code symbol, type `#` followed by the file name, folder name, or symbol name. Learn more about [referencing files and folders in chat](#add-files-as-context).

Alternatively, choose from the list of available predefined context items like `#changes` to get the diffs of changed files, or `#codebase` to perform a codebase search for your workspace.

Make sure to enable the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting to get the best results.

<details>
<summary>Supported context items</summary>

VS Code supports the following context items:

| Context item | Description |
| ------------- | ----------- |
| #changes | Get the diffs of changed files in source control. |
| #codebase | Perform a codebase search across the current workspace. |
| #extensions | Search across VS Code extensions. |
| #fetch | Get the contents of a web page. |
| #githubRepo | Perform a web search within a GitHub repo. |
| #problems | Get the list of problems for the current workspace. |
| #selection | Get the text selection for the active editor. |
| #searchResults | Get the results from the Search view. |
| #terminalLastCommand | Get the last run terminal command and its status. |
| #terminalSelection | Get the terminal text selection. |
| #testFailure | Get the list of test failures. |
| #usages | Get symbol references across the workspace. |
| #vscodeAPI | Perform a search across the VS Code extension API. |

</details>

### Prompt examples

The following examples show how to use #-mentions in your chat prompts:

<details>
<summary>Reference your pending source control changes</summary>

* `"Summarize the #changes"`
* `"Generate release notes based on the #changes"`

</details>

<details>
<summary>Understand the codebase</summary>

* `"Explain how authentication works in #codebase"`
* `"Where is the database connecting string configured? #codebase"`
* `"How do I build this #codebase?"`
* `"Where is #getUser used? #usages"`

</details>

<details>
<summary>Generate code that is consistent with your codebase</summary>

* `"Create an about page and include it in the nav bar #codebase"`
* `"Add a new API route for updating the address info #codebase"`
* `"Add a login button and style it based on #styles.css"`

</details>

<details>
<summary>Fix issues in the workspace</summary>

* `"Fix the issues in #problems"`
* `"Fix the failing tests #testFailure"`

</details>

<details>
<summary>Get information about extensions</summary>

* `"What are the top #extensions for this workspace?"`

</details>

<details>
<summary>Reference content from the web</summary>

* `"How do I use the 'useState' hook in react 18? #fetch https://18.react.dev/reference/react/useState#usage"`
* `"Build an API endpoint to fetch address info, use the template from #githubRepo contoso/api-templates"`

</details>

## Add files as context

To let the AI automatically find relevant files and symbols in your workspace, you can use `#codebase`. To provide specific files, folders, or symbols as context, add them to the chat using the following methods:

![Screenshot of the Chat view, showing a prompt that references a file from the workspace.](./images/copilot-chat/chat-reference-file.png)

* #-mention the file, folder, or symbol in your chat message by typing `#` followed by the name of the file, folder, or symbol.
    To reference a symbol, make sure to open the file containing the symbol in the editor first.

* Drag and drop files or folders from the Explorer view, Search view, or editor tabs onto the Chat view to add them as context.

* Use the **Add Context** button in the Chat view and select **Files & Folders** or **Symbols**.

> [!NOTE]
> If possible, the full contents of the file will be included when you attach a file. If that is too large to fit into the context window, an outline of the file will be included that includes functions and their descriptions without implementations. If the outline is also too large, then the file won't be part of the prompt.

## Perform a codebase search

Instead of adding individual files manually, you can let VS Code find the right files from your codebase automatically. This can be useful when you don't know which files are relevant to your question.

Add `#codebase` in your prompt or select **Add Context** > **Tools** > **codebase** to enable code search for your workspace.

The following prompt examples show how to use codebase search:

* `"Explain how authentication works in #codebase"`
* `"Where is the database connecting string configured? #codebase"`
* `"Add a new API route for updating the address #codebase"`

Make sure to enable the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting to get the best results.

## Reference web content

You can reference content from the web in your chat prompts, for example to get the latest API reference or code examples.

* `#fetch`: use this tool to retrieve content from a specific web page, such as a version-specific documentation page of a framework. To use this tool, type `#fetch` followed by the URL of the page you want to reference.

    * `"What are the highlights of VS Code 1.100 #fetch https://code.visualstudio.com/updates/v1_100"`
    * `"Update the asp.net app to .net 9 #fetch https://learn.microsoft.com/en-us/aspnet/core/migration/80-90"`

* `#githubRepo`: use this tool to perform a code search within a GitHub repository, for example to reference code patterns or examples from another project. Type `#githubRepo` followed by the repository name (for example, `microsoft/vscode-docs`).

    * `"How does routing work in next.js #githubRepo vercel/next.js"`
    * `"Perform a code review to validate it's consistent with #githubRepo microsoft/typescript"`
    * `"Add unit tests for my app. Use the same test setup and structure as #githubRepo rust-lang/rust"`

## Reference tools

Chat in VS Code has several [built-in tools](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools) and you can further extend it with tools from [MCP servers](/docs/copilot/chat/mcp-servers.md) or extensions. For example, the `#fetch` tool is a built-in tool that allows you to fetch content from a web page. You can also group tools into [tool sets](/docs/copilot/chat/chat-agent-mode.md#define-tool-sets), which you can then reference in your chat prompts.

To reference a tool or tool set directly in your chat prompt, type `#` followed by the tool (set) name and optional tool parameters. The following prompt examples show how to use tools:

* Use the [GitHub MCP server](https://github.com/github/github-mcp-server) tool (configured as `github-mcp` in your `mcp.json`):

    * `"what are my open issues #github-mcp"`
    * `"Implement a fix for issue #123 in contoso/tailwindtraders #github-mcp"`
    * `"What is PR 8407 in microsoft/vscode-docs about? #github-mcp"`

* Use the `#postgres` MCP server to query a PostgreSQL database:

    * `"Generate an API endpoint and data access layer for getting weather data from #postgres"`
    * `"What is the max length of the company name from #postgres"`

## @-mentions

When you use [ask mode](/docs/copilot/chat/chat-ask-mode.md) in chat, you can use the `@` symbol to pass the chat prompt to a chat participant. A chat participant is a domain expert that has context and knowledge about a specific topic. For example, the built-in `@vscode` participant is an expert on VS Code and the extension API, or `@terminal` can help with shell commands.

To use a chat participant, start your prompt with `@` followed by the participant name, and then continue with your question.

The following examples show how to use @-mentions in your chat prompts:

* `"@vscode how to enable word wrapping"`
* `"@terminal what are the top 5 largest files in the current directory"`

Type `@` in the chat input field to see a list of available chat participants.

Extensions can also contribute their own [chat participants](/api/extension-guides/chat.md).

## Add elements from the VS Code simple browser (Experimental)

VS Code has a built-in simple browser that you can use to view and interact with a locally-hosted web application, for example to do quick testing and debugging of your web application.

You can add elements from the Simple Browser window as context to your chat prompt. To do this:

1. Make sure to enable selecting elements from the Simple Browser with the `setting(chat.sendElementsToChat.enabled)` setting.
1. Run your web application locally.
1. Open the Simple Browser view by running the **Simple Browser: Show** command from the Command Palette.
1. Select the **Start** button to start selecting elements from the current page.
1. Hover over the elements of the web page and click to add them to the chat prompt.

    <video src="images/copilot-chat/simple-browser-select-element.mp4" title="Adding elements from the Simple Browser to the chat prompt" autoplay loop controls muted></video>

    Notice that the selected element is added as context to the current chat prompt.

You can configure which information is included in the context:

* Attach CSS - enable with the `setting(chat.sendElementsToChat.attachCSS)` setting.
* Attach images - enable with the `setting(chat.sendElementsToChat.attachImages)` setting.

> [!TIP]
> This functionality is also available in the [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) extension (pre-release).

## Chat history

Chat in VS Code is designed to be a multi-turn conversation. Within a chat session, VS Code uses the history of the conversation as context to your current prompt. This means that you can ask follow-up questions or clarify your previous question without having to repeat the context.

To start over with a new chat session and discard the current context, select the **New Chat** (`+`) button (`kb(workbench.action.chat.newChat)`) in the Chat view. This can be useful if you want to move to a different topic and avoid the previous context and history.

Learn more about [chat history and context management](/docs/copilot/chat/copilot-chat.md#chat-history).

## Custom instructions

With instruction files, you can provide the AI with common guidelines and rules for generating responses that match your coding style and preferences. Instruction files are Markdown files that you can create in your workspace or in your current profile.

By using instruction files, you can avoid having to repeatedly add common instructions in your chat prompts, and instead have the AI automatically apply these instructions to your chat interactions.

Learn more about [using instruction files](/docs/copilot/copilot-customization.md).

## Workspace indexing

VS Code uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

The following workspace indexing options are available:

* **Remote index**: if your code is hosted in a GitHub repository, you can build a remote index search your codebase quickly, even for large codebases.
* **Local index**: use an advanced semantic index that is stored on your local machine to provide fast and accurate search results for your codebase.
* **Basic index**: if local indexing is not available, you can use simpler algorithms that are optimized to work locally for larger codebases.

Learn more about [workspace indexing](/docs/copilot/reference/workspace-context.md#managing-the-workspace-index).

## Related resources

* Learn about [tools in agent mode](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools).
* Customize AI with [instruction files](/docs/copilot/copilot-customization.md).
* Learn about [workspace indexing](/docs/copilot/reference/workspace-context.md#managing-the-workspace-index).
* Get started with [chat in VS Code](/docs/copilot/chat/copilot-chat.md).

```

## chat/copilot-chat.md

```markdown
---
ContentId: 130ecf6c-6f06-4ddd-8b1d-f85f023af77b
DateApproved: 06/12/2025
MetaDescription: Interact with GitHub Copilot through AI-powered chat conversations in VS Code to generate code, increase your code understanding, and even configure your editor.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use chat in VS Code

Use chat in Visual Studio Code to ask about your codebase or make edits across your project by using natural language. Chat can operate in different modes, optimized for your use case, from asking questions to making multi-file edits or starting an autonomous coding workflow.

You might want to use chat in VS Code when you need to:

* Understand code - "Explain how this authentication middleware works"
* Debug issues - "Why am I getting a null reference in this loop?"
* Get code suggestions - "Show me how to implement a binary search tree in Python"
* Optimize performance - "Help me improve the efficiency of this database query"
* Learn best practices - "What's the recommended way to handle errors in async functions?"
* Get VS Code tips - "How do I customize keyboard shortcuts?"

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Access chat in VS Code

You can use natural language chat in different ways in VS Code, each optimized for a specific use case and task.

| Experience| Use case | User experience |
|-----------|----------|-----------------|
| **Chat view**<br/>`kb(workbench.action.chat.open)` | Have an ongoing, multi-turn chat conversation in a dedicated view on the side. Switch between different [chat modes](#choose-a-chat-mode) to ask questions, make code edits across files, or start an autonomous coding workflow. | ![Screenshot of the Chat view](images/copilot-chat/chat-view.png) |
| **Inline chat**<br/>`kb(inlineChat.start)` | Start a chat conversation directly from the editor (_editor inline chat_) or integrated terminal (_terminal inline chat_) to get suggestions in-place. | ![Screenshot of the Inline chat](images/copilot-chat/inline-chat.png) |
| **Quick Chat**<br/>`kb(workbench.action.quickchat.toggle)` | Ask a quick question and get back into what you were doing. | ![Screenshot of the Quick Chat](images/copilot-chat/quick-chat.png) |

Access each chat experience by using the corresponding keyboard shortcuts or via the Copilot menu in the VS Code title bar.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-chat-menu-command-center.png)

## Choose a chat mode

Chat modes are predefined configurations to customize chat in VS Code for specific tasks, such as asking questions, making code edits, or performing autonomous coding tasks. VS Code comes with three built-in chat modes: **Ask**, **Edit**, and **Agent**. You can also define your own chat modes for specific scenarios, such as planning a new feature, or researching implementation options.

To switch between chat modes, open the Chat view (`kb(workbench.action.chat.open)`), and then select the desired mode from the chat mode dropdown list.

![Screenshot showing the Chat view, highlighting the chat mode dropdown list.](images/chat-modes/chat-mode-dropdown.png)

Learn more about [chat modes in VS Code](/docs/copilot/chat/chat-modes.md).

## Change the language model

VS Code offers different built-in language models to choose from. Some models are optimized for fast coding tasks, while others are better suited for slower planning and reasoning tasks. Use the model picker in the chat input field to change the model that Copilot uses for generating a response.

![Screenshot of the chat model picker in the Chat view, showing a dropdown list of available models.](images/copilot-chat/chat-model-picker.png)

You can also add models from other model providers (preview) and use them in chat. Get more details about how to [use models from other providers](/docs/copilot/language-models.md#bring-your-own-language-model-key).

> [!NOTE]
> The list of available models might vary based on your Copilot subscription and might change over time. See the GitHub Copilot documentation for more information about the [available language models](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode).

## Submit a chat prompt

Use natural language to make chat requests in VS Code. Depending on the chat mode, you can ask questions about your codebase, get code suggestions, or make code edits across multiple files in your project and invoke specialized tools.

A chat response might contain a combination of rich content such as Markdown text, code blocks, buttons, file trees, and more.

![Copilot Chat view in the Secondary Side Bar and Explorer view in the Primary Side Bar.](images/copilot-chat/copilot-chat-view.png)

To get more relevant responses or reference specific files or artifacts in your workspace, such as test failures or terminal output, [add context](#add-chat-context) to your chat prompt by #-mentioning relevant context items.

## Add chat context

VS Code tries to determine the intent and scope of your chat request based on your natural language prompt. To help get more relevant responses, provide additional context in your chat prompt, such as files, test results, terminal output, and more.

Use the **Add Context** button in the Chat view or type #-mentions to add context to your chat prompt. For example, `#codebase` to refer to the entire codebase, or `#<file | folder | symbol>` to refer to a specific file, folder, or symbol in your workspace. Type `#` in the chat input field to view the list of context items.

![Screenshot of the Chat view with the context menu open](images/copilot-chat/chat-add-context.png)

You can also directly reference an agent mode tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode). For example, use the `#fetch` tool to add the content of a web page as context to your chat prompt, or use `#githubRepo` to perform a code search in a GitHub repository.

Get more details about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

## Prompt examples

<details>
<summary>Ask about general technology topics</summary>

* `"What is a linked list?"`
* `"top 10 popular web frameworks"`

</details>

<details>
<summary>Understand the codebase</summary>

* `"Explain how authentication works in #codebase"`
* `"Where is the database connecting string configured? #codebase"`
* `"How do I build this #codebase?"`
* `"Where is #getUser used? #usages"`

</details>

<details>
<summary>Add new features to your app</summary>

* `"Create an about page and include it in the nav bar #codebase"`
* `"Add a new API route for updating the address info #codebase"`
* `"Add a login button and style it based on #styles.css"`

</details>

<details>
<summary>Fix issues in the workspace</summary>

* `"Fix the issues in #problems"`
* `"Fix the failing tests #testFailure"`

</details>

<details>
<summary>Reference content from the web</summary>

* `"How do I use the 'useState' hook in react 18? #fetch https://18.react.dev/reference/react/useState#usage"`
* `"Build an API endpoint to fetch address info, use the template from #githubRepo contoso/api-templates"`

</details>

For more prompt examples, see the [Copilot Chat Cookbook](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat) in the GitHub documentation.

> [!TIP]
> Type `/help` in the chat input field to get help about Copilot and how to interact with chat.

## Vision

Chat supports vision capabilities, which means you can attach an image as context to your chat prompt and ask questions about it. For example, attach a screenshot of a block of code and ask to explain it, or attach a sketch of a UI and ask agent mode to implement it.

> [!TIP]
> You can drag and drop an image from a web browser onto the Chat view to add it as context.

## Chat history

As you iterate and send multiple chat prompts in a chat session, VS Code uses the history of chat prompts and responses as context for your current chat prompt. This means that you can ask follow-up questions or clarify your previous question without having to repeat the context. For example, you can ask "How does *this*
differ from ...", "Now add a test case", "explain in more detail", and more.

At any time, you can create a new chat session by using the **New Chat** (`+`) button (`kb(workbench.action.chat.newChat)`) in the Chat view. This can be useful if you want to move to a different topic and avoid the previous context and history.

To view the history of chat sessions, select the **Show Chats...** button in the Chat view or by using the **Chat: Show Chats...** command in the Command Palette. Select a history entry to open that chat session in the Chat view and continue the conversation.

![Screenshot of the Chat view with the Show Chats... button highlighted](images/copilot-chat/copilot-chat-view-show-chats.png)

You can export all prompts and responses for a chat session in a JSON file with the **Chat: Export Chat...** command in the Command Palette.

### Revert chat requests

You can revert (undo) chat requests in the active chat session. When you revert a chat request, you also remove the corresponding response from the conversation history.

Reverting a request is useful if you want to remove a specific prompt and response from the conversation history of that session. For example, if you notice that the language model is not providing relevant responses or is taking an unwanted direction.

You have two options to revert a chat request:

* Undo the last chat request: use the **Undo Last Request** button in the Chat view toolbar.

    ![Screenshot of the Chat view with the Undo Last Request button highlighted.](images/copilot-chat/chat-undo-last-request.png)

* Undo a specific chat request: hover over a chat request in the Chat view and select the **Undo Request (Delete)** (`x`) button next to the request (or press `kb(workbench.action.chat.undoEdits)`). When you undo a request, it also undoes all subsequent requests and responses in the chat session.

    ![Screenshot of the Chat view with multiple prompts, highlighting the 'x' control to delete a chat prompt and its response.](images/copilot-chat/copilot-chat-delete-prompt.png)

## Open chat in an editor tab or separate window

You can open a chat session as a separate editor tab, or even as a separate, floating window. This functionality enables you to have multiple chat sessions open at the same time.

In the Chat view, select the `...` icon in the top-right corner, and then select **Open Chat in Editor** or **Open Chat in New Window**.

![Screenshot of the Chat view, highlighting the three-dot menu that contains the Open in Editor and Open in New Window options.](images/copilot-chat/chat-three-dot-menu.png)

The following screenshot shows the Chat view running in a floating window:

![Screenshot of the Chat view, highlighting the three-dot menu that contains the Open in Editor and Open in New Window options. The desktop shows a floating window with a chat session.](images/copilot-chat/chat-open-in-new-window.png)

By default, the chat session opens in compact mode, which hides the title bar and other UI elements. Select the compact mode icon in the floating window title bar to toggle between compact and normal mode.

Optionally, enable the **Always on Top** mode to always keep the Chat view on top of other windows.

Learn more about [floating windows](/docs/configure/custom-layout.md#floating-windows) in VS Code.

## Use voice interactions

With the voice control capabilities in VS Code, provided by the [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension, you can initiate a chat conversation by using your voice:

* Use your voice to dictate your chat prompt
* Use the "Hey Code" voice command to start a voice session with Copilot Chat
* Accelerate voice input for chat by using the "hold to speak" mode

Learn more about how to [use voice interactions in VS Code](/docs/configure/accessibility/voice.md).

## Privacy and transparency

To enable more workspace search features for private repositories, we require additional permissions. If we detect that we don't have these permissions already, we will ask for them at startup. Once granted, we'll securely store the session for the future.

![Modal window asking for additional authentication for a private repository.](images/copilot-chat/authentication.png)

Learn more about security, privacy, and transparency in the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/).

## Frequently asked questions

### How do I choose between the different chat modes?

The different chat modes are optimized for different use cases:

* Use _editor inline chat_ to ask questions or make edits directly in the active editor. This is useful for making code changes or asking questions that are scoped to the active file.

* Use _ask mode_ to ask questions about your codebase or technology concepts. The response might include code suggestions, which you can apply manually and individually to your codebase. Changes are not automatically applied to your codebase.

* Use _edit mode_ to directly apply edits across multiple files in your codebase based on your chat prompt. You provide the relevant context and files for your prompt.

* Use _agent mode_ to start an agentic coding workflow, whereby Copilot autonomously determines the relevant context and files, determines which tasks need to be performed to complete the request. It then iterates independently to achieve the desired outcome, fixing issues as they come up. Agent mode can invoke tools to perform specialized tasks, such as running terminal commands, validating test cases, or accessing APIs.

## Additional resources

You can read more about [GitHub Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.

## Next steps

* Get started with the introductory [Copilot Chat tutorial](/docs/copilot/chat/getting-started-chat.md).
* [Use ask mode to ask questions about your code](/docs/copilot/chat/chat-ask-mode.md)
* [Use agent mode to start an autonomous coding session](/docs/copilot/chat/chat-agent-mode.md)
* [Use edit mode to make code edits across multiple files](/docs/copilot/chat/copilot-edits.md)

```

## chat/copilot-edits.md

```markdown
---
ContentId: 393f3945-0821-42ca-bdd7-fb82affacb6a
DateApproved: 06/12/2025
MetaDescription: Get started with chat edit mode in VS Code to start an AI-powered code editing session across multiple files in your project.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use edit mode in VS Code

With chat _edit mode_ in Visual Studio Code, you can use natural language to make edits across multiple files in your project. The edits are applied directly in the editor, where you can review them in-place, with the full context of the surrounding code.

By selecting specific files and providing clear context, you can guide edit mode to make targeted code changes and improvements.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Why use edit mode?

Edit mode is optimized for making code edits across multiple files in your project. VS Code directly applies the code changes in the editor, where you can review them in-place. You can use edit mode to:

* Refactor parts of your codebase, such as "refactor this using async/await" or "use a singleton pattern for the database connection".
* Add new features to your codebase, such as "add a login form to the app".
* Fix bugs in your codebase, such as "the sort function fails when the input is empty, fix it".
* Write unit tests for your code, such as "add unit tests for the calculator class using vitest".
* Improve the performance of your code, such as "optimize the calculate function to make it more efficient".

Edit mode is particularly useful for coding tasks when you have a good understanding of the changes that you want to make, and which files you want to edit. If you have a less well-defined task, a high-level requirement, or changes that also require running terminal commands and tools, you might want to use [agent mode](/docs/copilot/chat/chat-agent-mode.md) instead.

## Use edit mode

In edit mode, you select which files to edit and provide the relevant context and prompt. VS Code will suggest code edits based on your prompt.

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Edit** from the chat mode selector.

    ![Screenshot showing the Chat view, highlighting edit mode selected.](images/copilot-chat/chat-mode-dropdown-edit.png)

    Directly open edit mode in VS Code [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) or [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit).

1. Select **Add Context** or #-mention specific workspace files or context items to provide extra context for your prompt.

    By adding context, you can get more relevant responses. For example, to ask questions that are specific to your current project, you can use the `#codebase` context item. Type `#` in the chat input field to view the list of available context items.

    The active editor is automatically added as context. When you add files, other relevant files might be suggested.

1. Enter your prompt in the chat input field to indicate the type of edits you want to make.

    Experiment with some of these example questions to get started:

    * `Refactor the calculate function to make it more efficient.`
    * `Add a login form to the app. Use OAuth for authentication.`
    * `Add unit tests for the calculator class. Use vitest as the test framework.`

1. Notice that VS Code streams the suggested edits directly in the editor.

    The Chat view shows the list of files that were edited in bold text. The editor overlay controls enable you to navigate between the suggested edits.

    ![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files.png)

1. Review the suggested edits and [accept or discard the suggested edits](#accept-or-discard-edits).

1. Continue to iterate on the code changes to refine the edits or to implement additional features.

## Accept or discard edits

VS Code lists the files that were edited in the changed files list in the Chat view. Files with pending edits also have an indicator in the Explorer view and editor tabs.

![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files-full.png)

With the editor overlay controls, you can navigate between the suggested edits by using the `kbstyle(Up)` (<i class="codicon codicon-arrow-up"></i>) and `kbstyle(Down)` (<i class="codicon codicon-arrow-down"></i>) controls. Use the **Keep** or **Undo** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/copilot-edits/copilot-edits-file-review-controls.png)

Use the **Keep** or **Undo** controls in the editor or Chat view to accept or reject individual or all suggested edits.

![Screenshot showing the Chat view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

With the `setting(chat.editing.autoAcceptDelay)` setting, you can configure a delay after which the suggested edits are automatically accepted. Hover over the editor overlay controls to cancel the auto-accept countdown.

When you close VS Code, the status of the pending edits is remembered. When you reopen VS Code, the pending edits are restored and you can still accept or discard the edits.

## Revert edits

As you're sending requests to make edits to your code, you might want to roll back some of these changes, for example because you want to use another implementation strategy or because the AI starts walking down the wrong path when generating edits.

You can use the **Undo Last Edit** control in the Chat view title bar to revert the last edits and return to the state before sending the last request. After you perform an undo of the last edit, you can redo those edits again by using the **Redo Last Edit** control in the Chat view title bar.

![Screenshot showing the Chat view, highlighting the Undo and Redo actions in the view title bar.](images/copilot-edits/copilot-edits-undo-redo.png)

You can also use the **Undo Edits (Delete)** control (`kbstyle(x)` icon) when hovering over a request in the Chat view to revert all edits that were made from that request onwards.

![Screenshot showing the Chat view, highlighting the Undo Edits control for a specific request.](images/copilot-edits/copilot-edits-undo-request.png)

## Use instructions to get AI edits that follow your coding style

To get AI-generated code edits that follow your coding style, preferred frameworks, and other preferences, you can use instruction files. Instruction files enable you to describe your coding style and preferences in Markdown files, which the AI uses to generate code edits that match your requirements.

You can manually attach instruction files as context to your chat prompt, or you can configure the instruction files to be automatically applied.

The following code snippet shows an example of an instruction file that describes your coding style and preferences:

```markdown
---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
```

Learn more about [using instruction files](/docs/copilot/copilot-customization.md).

## Settings

The following list contains the settings related to edit mode. You can configure settings through the Setting editor (`kb(workbench.action.openSettings)`).

* `setting(chat.editing.confirmEditRequestRemoval)` - ask for confirmation before undoing an edit (default: `true`).
* `setting(chat.editing.confirmEditRequestRetry)` - ask for confirmation before performing a redo of the last edit (default: `true`).
* `setting(chat.editing.autoAcceptDelay)` - configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept (default: 0).
* `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ - let VS Code find the right files when you add `#codebase` to your prompt, similar to how agent mode works (default: `false`).

## Frequently asked questions

### Why would I use edit mode instead of agent mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: you might use edit mode if your request involves only code edits and you know the precise scope for the changes.
* **Duration**: agent mode involves multiple steps to process a request, so it might take longer to get a response. For example, to determine the relevant context and files to edit, determine the plan of action, and more.
* **Non-deterministic**: agent mode evaluates the outcome of the generated edits and might iterate multiple times. As a result, agent mode can be more non-deterministic than edit mode.
* **Request quota**: in agent mode, depending on the complexity of the task, one prompt might result in many requests to the backend.

## Related content

* [Learn more about using chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Use ask mode to ask questions about your code](/docs/copilot/chat/chat-ask-mode.md)
* [Use agent mode to start an autonomous coding session](/docs/copilot/chat/chat-agent-mode.md)

```

## chat/getting-started-chat.md

```markdown
---
ContentId: ae1f36a9-7597-425f-97fc-49bd51c153a3
DateApproved: 06/12/2025
MetaDescription: Get started with AI-powered chat conversations with GitHub Copilot in Visual Studio Code, inline while you're coding, or in a separate Chat view.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Getting started with Copilot Chat in VS Code

This tutorial walks you through using Copilot Chat in Visual Studio Code. You use AI-powered chat conversations to help with refactoring code, improving your code understanding, and finding your way around configuring VS Code.

If you're new to using Copilot in VS Code, see the [Copilot Overview](/docs/copilot/overview.md) or get set up and discover the key capabilities in the [Copilot Quickstart](/docs/copilot/getting-started.md).

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Prerequisites

To use GitHub Copilot in VS Code, you need to have the following:

* Access to GitHub Copilot
* GitHub Copilot extensions installed in VS Code

Follow the steps in the [GitHub Copilot set up guide](/docs/copilot/setup.md) to get access to GitHub Copilot and install the Copilot extensions in VS Code.

## Get your first chat conversation

Copilot Chat lets you interact with GitHub Copilot by using natural language, to ask and receive answers to coding-related questions.

In this tutorial, you'll be creating a simple Node.js web application.

1. Open a new VS Code window. You'll be creating a new workspace in a follow-up step.

1. Select **Open Chat** from the Copilot menu in the title bar or use the `kb(workbench.action.chat.open)` keyboard shortcut.

    ![Screenshot of VS Code editor, showing the Copilot Chat view, highlighting the chat menu in the Command Center.](./images/getting-started-chat/copilot-chat-menu-command-center.png)

    Notice that the Chat view opens in the Secondary Side Bar. Having the Chat view on the side allows you to keep the conversation going while you work on your code.

1. In the Chat view, select **Ask** from the chat mode dropdown.

    Use _ask mode_ to ask Copilot questions about coding and technology topics, explain code, or brainstorm ideas.

    ![Screenshot of VS Code Copilot Chat view, showing the Ask mode dropdown.](./images/getting-started-chat/chat-mode-dropdown-ask.png)

1. Let's ask Copilot about popular web frameworks. Enter "what are the most popular web frameworks?" in the chat input field.

    Copilot returns a list of popular web frameworks. Experiment with asking follow-up questions to get more information about a specific framework, or to compare frameworks. For example, you can ask "what are the differences between Express and Fastify?" or "how to do server-side rendering?".

1. To scaffold a new web app, enter "new express app with typescript and pug" in the chat input field.

    Notice how Copilot returns a file tree that represents the new workspace files. Select any file in the file tree to preview its content.

    ![Screenshot of VS Code Copilot Chat view, showing a file tree for a new workspace and a 'Create Workspace' button.](./images/getting-started-chat/copilot-chat-view-workspace-file-tree.png)

1. Select **Create Workspace** to create the app, and select a folder on disk where the workspace should be created.

    Select **Open** in the dialog to open the newly-created workspace in VS Code.

    > [!NOTE]
    > VS Code might ask if you want to trust the new workspace. Select **Yes, I trust the contents** to trust the workspace. Get more details about [workspace trust](/docs/editing/workspaces/workspace-trust.md).

## Stay in the flow with inline chat

While the Chat view is great for keeping a conversation going, _editor inline chat_ is optimized for situations where you want to ask Copilot about the code you're actively working on in the editor. For example, to refactor a specific piece of code, or explain a complex algorithm.

Let's look at how to use editor inline chat for code refactoring.

1. Open the `app.ts` file and use the `kb(inlinechat.start)` keyboard shortcut to bring up editor inline chat. Alternatively, select **Editor Inline Chat** from the Copilot menu in the title bar.

    A chat input field appears inline in the editor, where you can enter your chat prompt and ask Copilot about the code in the editor.

    ![Screenshot of VS Code editor, highlighting the Inline Chat popup control.](./images/getting-started-chat/copilot-inline-chat-popup.png)

1. Enter "Add support for JSON output" in the chat input field and press `kbstyle(Enter)`.

    Notice how Copilot provides a code suggestion to add support for JSON output in Express.

    ![Screenshot of VS Code editor with the suggested code change.](./images/getting-started-chat/copilot-inline-chat-json-support.png)

1. Select **Accept** or **Close** to apply or ignore the changes.

    If you're not happy with the suggested code changes, you can select the **Rerun Request** control or ask a follow-up question to get another suggestion.

> [!TIP]
> Right-click in the editor and select the **Copilot** context menu to access commonly used Copilot commands, such as fixing or explaining code or generating tests.

## Make edits across multiple files

With inline chat, you made changes to a single file. You can also use Copilot to make changes across multiple files in your workspace by switching to _edit mode_ in the Chat view.

Let's use edit mode to use a `.env` file to store the configuration for your web app.

1. Open the Chat view and select **Edit** from the chat mode dropdown.

    ![Screenshot of VS Code Copilot Chat view, showing the Edit mode dropdown.](./images/getting-started-chat/chat-mode-dropdown-edit.png)

1. To help Copilot understand the scope of your request, let's add `package.json` and `app.ts` as context to the prompt.

    1. Select **Add Context** in the Chat view, type `package` in the search field, and select the `package.json` file from the list of files. Notice that there are many types of context you can add.

    1. Open the `app.ts` file in the editor, and notice that Copilot automatically adds the active file to the chat context.

1. Enter "Use a .env file for configuration" in the chat input field and press `kbstyle(Enter)`.

1. Notice how Copilot makes updates across multiple files and adds a new `.env` file to your workspace.

    The Chat view shows the files that were changed in bold text in the Chat view.

    ![Screenshot of VS Code editor, showing the suggested code change in the app.ts file.](./images/getting-started-chat/copilot-inline-chat-env-file.png)

1. Select **Keep** in the Chat view to confirm all suggested changes.

    Use the overlay controls in the editor to easily navigate and review the individual changes across your files.

## Start an agentic coding flow

For more complex requests, you can use _agent mode_ to let Copilot autonomously plan and execute the tasks that are needed to complete your request. These tasks can involve editing code but also include running commands in the terminal. In agent mode, Copilot might invoke different tools to accomplish the task.

Let's use agent mode to make the web app about sharing travel tips and add testing.

1. Open the Chat view and select **Agent** from the chat mode dropdown.

    ![Screenshot of VS Code Copilot Chat view, showing the Agent mode dropdown.](./images/getting-started-chat/chat-mode-dropdown-agent.png)

1. Enter "Make the app a travel blog. Add tests to avoid code regression." in the chat input field and press `kbstyle(Enter)`.

    Note that you don't need to add context to your prompt. Agent mode automatically analyzes the code in your workspace.

1. Copilot iterates to apply code changes and run commands like running tests. Confirm terminal commands by selecting **Continue** in the Chat view.

    ![Screenshot of VS Code editor, showing the Chat view asking to confirm running tests in the terminal.](./images/getting-started-chat/copilot-chat-agent-terminal.png)

    Depending on the complexity of your request, Copilot might take a few minutes to complete all tasks. If it encounters issues along the way, it iterates to fix them.

1. Once Copilot completes the tasks, review the changes, and test the app.

    You can also ask Copilot to run the app by giving it a prompt like "Run the app" or "Start the server".

## Congratulations

Congratulations, you successfully used Copilot Chat in VS Code to ask questions and make code edits across your workspace. Continue to experiment with different prompts and chat modes to get the most out of Copilot Chat.

## Additional resources

* [Get an overview of Copilot Chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Use chat for asking questions about your code](/docs/copilot/chat/chat-ask-mode.md)
* [Start a multi-file coding session](/docs/copilot/chat/copilot-edits.md)
* [Start an agentic coding workflow](/docs/copilot/chat/chat-agent-mode.md)

```

## chat/inline-chat.md

```markdown
---
ContentId: e6b33fcb-8240-49dd-b6ca-5412d6fa669a
DateApproved: 06/12/2025
MetaDescription: Use Inline Chat in Visual Studio Code to make edits directly in the editor or get command suggestions in the terminal.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Inline chat

With Copilot inline chat in Visual Studio Code, you can ask questions and get suggestions directly in the editor or get help with shell commands within the integrated terminal. Inline chat allows you to stay in the flow of your work without having to switch to a separate Chat view.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md)

## Use editor inline chat

When you use editor inline chat, your prompt is scoped to the code in the active editor. Inline chat might use the content from other files in your workspace as context for your prompt.

To use editor inline chat:

1. Open a file in the editor.

1. Open editor inline chat by using the `kb(inlinechat.start)` keyboard shortcut or selecting **Editor Inline Chat** from the Copilot menu in the title bar.

    Notice how Copilot shows a chat input field at your cursor position in the editor.

1. Enter your prompt in the chat input field.

    Select a block of code in the editor to scope the prompt to that code.

    Experiment with some of these example prompts to get started:

    * `Refactor this code to use async/await`
    * `Explain this code`
    * `Add error handling`

1. Notice that Copilot shows code suggestions inline in the editor. Accept or reject the changes.

    ![Copilot Inline Chat asking to not use recursion for a factorial function.](images/copilot-chat/inline-chat-no-recursion.png)

1. Optionally, ask a follow-up question to get other or suggestions or refine the results.

> [!TIP]
> Attach context to your Inline Chat prompt to include relevant files, code symbols, or other context. Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

## Use terminal inline chat

You can bring up terminal inline chat in the [integrated terminal](/docs/terminal/basics.md) to get help with shell commands or ask terminal-related questions.

To use terminal inline chat:

1. Open the terminal in VS Code by selecting the **View** > **Terminal** menu item or using the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut.

1. Open terminal inline chat by using the `kb(workbench.action.terminal.chat.start)` keyboard shortcut or running the **Terminal Inline Chat** command in the Command Palette.

    Copilot shows a chat input field at the current position in the terminal.

1. Enter your prompt in the chat input field.

    Experiment with some of these example prompts to get started:

    * `How do I install npm packages?`
    * `List the top 5 largest files in the src directory`
    * `undo the last git commit`

    ![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/copilot-chat/terminal-chat-2.png)

1. Review the response and select the **Run** (`kb(workbench.action.terminal.chat.runCommand)`) to run the command in the terminal

    Optionally, select **Insert** (`kb(workbench.action.terminal.chat.insertCommand)`) to insert the command into the terminal and modify it before running.

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Start a multi-file coding session](/docs/copilot/chat/copilot-edits.md)
* [Start an agentic coding workflow](/docs/copilot/chat/chat-agent-mode.md)

```

## chat/mcp-servers.md

```markdown
---
ContentId: 7c550054-4ade-4665-b368-215798c48673
DateApproved: 06/12/2025
MetaDescription: Learn how to configure and use Model Context Protocol (MCP) servers with GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use MCP servers in VS Code (Preview)

Model Context Protocol (MCP) servers enable you to expand your chat experience in VS Code with extra tools for connecting to databases, invoking APIs, or performing specialized tasks.
Model Context Protocol (MCP) is an open standard that enables AI models to interact with external tools and services through a unified interface.
This article guides you through setting up MCP servers and using tools with agent mode in Visual Studio Code.

> [!NOTE]
> MCP support in VS Code is currently in preview.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md)

## What is MCP?

Model Context Protocol (MCP) provides a standardized way for AI models to discover and interact with external tools, applications, and data sources. When you enter a chat prompt to a language model with agent mode in VS Code, the model can invoke various tools to perform tasks like file operations, accessing databases, or calling APIs in response to your request.

<details>
<summary>How does MCP work?</summary>

MCP follows a client-server architecture:

* **MCP clients** (like VS Code) connect to MCP servers and request actions on behalf of the AI model
* **MCP servers** provide one or more tools that expose specific functionalities through a well-defined interface
* **The Model Context Protocol (MCP)** defines the message format for communication between clients and servers, including tool discovery, invocation, and response handling

For example, a file system MCP server might provide tools for reading, writing, or searching files and directories. GitHub's MCP server offers tools to list repositories, create pull requests, or manage issues. MCP servers can run locally on your machine or be hosted remotely, and VS Code supports both configurations.

By standardizing this interaction, MCP eliminates the need for custom integrations between each AI model and each tool. This allows you to extend your AI assistant's capabilities by simply adding new MCP servers to your workspace. Learn more about the [Model Context Protocol specification](https://modelcontextprotocol.io/).

</details>

<details>
<summary>Supported MCP capabilities in VS Code</summary>

VS Code supports the following MCP capabilities:

* MCP Server transport: local standard input/output (`stdio`), server-sent events (`sse`), and streamable HTTP (`http`) for MCP server transport.
* [MCP features](https://modelcontextprotocol.io/specification/2025-03-26#features): tools, prompts, resources, and sampling.
* VS Code provides servers with the current workspace folders using `roots` ([spec](https://modelcontextprotocol.io/docs/concepts/roots)).

</details>

<details>
<summary>Finding MCP servers</summary>

MCP's [official server repository](https://github.com/modelcontextprotocol/servers) is a great starting point for reference, official, and community-contributed servers that showcase MCP's versatility. You can explore servers for various functionalities, such as file system operations, database interactions, and web services.

MCP is still a relatively new standard, and the ecosystem is rapidly evolving. As more developers adopt MCP, you can expect to see an increasing number of servers and tools available for integration with your projects.

</details>

## Enable MCP support in VS Code

> [!NOTE]
> MCP support in agent mode in VS Code is available starting from VS Code 1.99 and is currently in preview.

To enable MCP support in VS Code, enable the `setting(chat.mcp.enabled)` setting.

To centrally enable or disable MCP support within your organization, check [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

## Add an MCP server

You have multiple options to add an MCP server in VS Code:

* **Workspace settings**: add a `.vscode/mcp.json` file in your workspace to configure MCP servers for a workspace and share configurations with team members.
* **User settings**: specify the server in your user settings to enable the MCP server across all workspaces.
* **Automatic discovery**: enable autodiscovery of MCP servers defined in other tools, such as Claude Desktop.

> [!CAUTION]
> MCP servers can run arbitrary code on your machine. Only add servers from trusted sources, and review the publisher and server configuration before starting it.

To view and manage the list of configured MCP servers, run the **MCP: List Servers** command from the Command Palette.

After you add an MCP server, you can [use the tools it provides in agent mode](#use-mcp-tools-in-agent-mode).

### Add an MCP server to your workspace

To configure an MCP server for a specific workspace, you can create a `.vscode/mcp.json` file in your workspace folder. This allows you to share the server configuration with project team members.

> [!IMPORTANT]
> Make sure to avoid hardcoding sensitive information like API keys and other credentials by using input variables or environment files.

To add an MCP server to your workspace:

1. Create a `.vscode/mcp.json` file in your workspace.

1. Select the **Add Server** button to add a template for a new server. VS Code provides IntelliSense for the MCP server configuration file.

    The following example shows how to configure a [Perplexity MCP server](https://github.com/ppl-ai/modelcontextprotocol/), where VS Code prompts you for the API key when the server starts. Learn more about the [Configuration format](#configuration-format).

    ```json
    {
        // 💡 Inputs are prompted on first server start, then stored securely by VS Code.
        "inputs": [
            {
                "type": "promptString",
                "id": "perplexity-key",
                "description": "Perplexity API Key",
                "password": true
            }
        ],
        "servers": {
            // https://github.com/ppl-ai/modelcontextprotocol/
            "Perplexity": {
                "type": "stdio",
                "command": "npx",
                "args": [
                    "-y",
                    "server-perplexity-ask"
                ],
                "env": {
                    "PERPLEXITY_API_KEY": "${input:perplexity-key}"
                }
            }
        }
    }
    ```

1. Alternatively, run the **MCP: Add Server** command from the Command Palette, choose the type of MCP server to add and provide the server information. Next, select **Workspace Settings** to create the `.vscode/mcp.json` file in your workspace if it doesn't already exist.

> [!IMPORTANT]
> Follow the naming conventions for the server, as specified in the [Configuration format](#configuration-format) section.

### Add an MCP server to your user settings

To configure an MCP server for all your workspaces, you can add the server configuration to your user settings. This allows you to reuse the same server configuration across multiple projects.

Specify the server in the `setting(mcp)` VS Code [user settings](/docs/getstarted/personalize-vscode.md#configure-settings) to enable the MCP server across all workspaces.

```json
// settings.json
{
    "mcp": {
        "servers": {
            "my-mcp-server": {
                "type": "stdio",
                "command": "my-command",
                "args": []
            }
        }
    },
}
```

Alternatively, use the **MCP: Add Server** command from the Command Palette, provide the server information, and then select **User Settings** to add the server configuration to your user settings.

### Automatic discovery of MCP servers

VS Code can automatically detect and reuse MCP servers that you defined in other tools, such as Claude Desktop.

Enable autodiscovery with the `setting(chat.mcp.discovery.enabled)` setting.

## Configuration format

Use the following JSON configuration format to define MCP servers.

* **`"servers": {}`**

    Contains the list of MCP servers, and follows Claude Desktop's configuration format.

    Specify the server name as the key and provide the server configuration as the value. VS Code shows the server name in the MCP server list. Follow these naming conventions for the server name:

    * Use camelCase for the server name, such as "uiTesting".
    * Avoid using whitespace or special characters.
    * Use a unique name for each server to avoid conflicts.
    * Use a descriptive name that reflects the server's functionality or brand, such as "github" or "database".

    Provide the following fields in the server configuration. You can use [predefined variables](/docs/reference/variables-reference.md) in the server configuration, for example to refer to the workspace folder (`${workspaceFolder}`).

    <details>
    <summary>Server configuration for `stdio`</summary>

    | Field | Description | Examples |
    |-------|-------------|----------|
    | `type` | Server connection type.  | `"stdio"` |
    | `command` | Command to start the server executable. The command needs to be available on your system path or contain its full path.<br/>If you use docker, don't use the detach option. | `"npx"`,`"node"`, `"python"`, `"docker"` |
    | `args` | Array of arguments passed to the command. | `["server.py", "--port", "3000"]` |
    | `env` | Environment variables for the server. | `{"API_KEY": "${input:api-key}"}` |
    | `envFile` | Path to an `.env` from which to load additional environment variables. | `"${workspaceFolder}/.env"` |

    </details>

    <details>
    <summary>Server configuration for `sse` or `http`</summary>

    | Field | Description | Examples |
    |-------|-------------|----------|
    | `type` | Server connection type. VS Code first tries the streamable HTTP transport and falls back to SSE if HTTP is not supported. | `"sse"`, `"http"` |
    | `url` | URL of the server. | `"http://localhost:3000"` |
    | `headers` | HTTP headers for the server. | `{"API_KEY": "${input:api-key}"}` |

    </details>

* **`"inputs": []`**

    Lets you define custom placeholders for configuration values to avoid hardcoding sensitive information, such as API keys or passwords in the server configuration.

    VS Code prompts you for these values when the server starts for the first time, and securely stores them for subsequent use. To avoid showing the typed value, set the `password` field to `true`.

    Learn more about how to configure [input variables](/docs/reference/variables-reference.md#input-variables) in VS Code.

### Configuration example

The following code snippet shows an example MCP server configuration that specifies three servers and defines an input placeholder for the API key.

<details>
<summary>View `.vscode/mcp.json`</summary>

```json
// Example .vscode/mcp.json
{
    // 💡 Inputs will be prompted on first server start,
    //    then stored securely by VS Code.
    "inputs": [
        {
            "type": "promptString",
            "id": "perplexity-key",
            "description": "Perplexity API Key",
            "password": true
        },
    ],
    "servers": {
        // https://github.com/ppl-ai/modelcontextprotocol/
        "Perplexity": {
            "type": "stdio",
            "command": "docker",
            "args": [
                "run",
                "-i",
                "--rm",
                "-e",
                "PERPLEXITY_API_KEY",
                "mcp/perplexity-ask"
            ],
            "env": {
                "PERPLEXITY_API_KEY": "${input:perplexity-key}"
            }
        },
        // https://github.com/modelcontextprotocol/servers/tree/main/src/fetch
        "fetch": {
            "type": "stdio",
            "command": "uvx",
            "args": ["mcp-server-fetch"]
        },
        "my-remote-server": {
            "type": "sse",
            "url": "http://api.contoso.com/sse",
            "headers": { "VERSION": "1.2" }
        }
    }
}
```

</details>

## Use MCP tools in agent mode

Once you have added an MCP server, you can use the tools it provides in agent mode. To use MCP tools in agent mode:

1. Open the **Chat** view (`kb(workbench.action.chat.open)`), and select **Agent** mode from the dropdown.

    ![Agent mode dropdown option](images/mcp-servers/chat-mode-agent.png)

1. Select the **Tools** button to view the list of available tools.

    Optionally, select or deselect the tools you want to use. You can search tools by typing in the search box.

    ![MCP tools list](images/mcp-servers/agent-mode-select-tools.png)

    > [!TIP]
    > You can also directly reference a tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode).

1. Select **Add Context** > **MCP Resources** to add resources from the MCP server to your chat context.

    For example, a database MCP server might provide access to database tables, or a file system MCP server might provide access to files and directories.

1. You can now enter a prompt in the chat input box and notice how tools are automatically invoked as needed.

    By default, when a tool is invoked, you need to confirm the action before it is run. This is because tools might run locally on your machine and might perform actions that modify files or data.

    Use the **Continue** button dropdown options to automatically confirm the specific tool for the current session, workspace, or all future invocations.

    ![MCP Tool Confirmation](images/mcp-servers/mcp-tool-confirmation.png)

1. Optionally, verify and edit the tool input parameters before running the tool.

    ![MCP Tool Input Parameters](images/mcp-servers/mcp-tool-edit-parameters.png)

## Use MCP resources

In addition to tools, MCP servers can also provide resources that you can use as context in your chat prompts. For example, a file system MCP server might provide access to files and directories, or a database MCP server might provide access to database tables.

To add a resource from an MCP server to your chat prompt:

1. In the Chat view, select **Add Context** > **MCP Resources**

1. Select a resource type from the list and provide optional resource input parameters.

    ![Screenshot of the MCP resource Quick Pick, showing resource types provided by the GitHub MCP server.](images/mcp-servers/mcp-resources-quick-pick.png)

To view the list of available resources for an MCP server, use the **MCP: Browse Resources** command or use the **MCP: List Servers** > **Browse Resources** command to view resources for a specific server.

MCP tools can return resources as part of their response. You can view or save these resources to your workspace with the **Save** button or by dragging and dropping the resource to the Explorer view.

## Use MCP prompts

MCP servers can provide preconfigured prompts for common tasks, so you don't have to type an elaborate chat prompt. You can directly invoke these prompts in the chat input box by typing `/` followed by the prompt name, formatted as `mcp.servername.promptname`. Optionally, the prompt might ask you for additional input parameters.

![Screenshot of the Chat view, showing an MCP prompt invocation and a dialog asking for additional input parameters.](images/mcp-servers/mcp-prompt-invocation.png)

## Group related tools in a tool set

As you add more MCP servers, the list of tools can become long. This can make it tedious to manage individual tools, for example when you want to define a [reusable prompt file](/docs/copilot/copilot-customization.md#prompt-files-experimental) or a [custom chat mode](/docs/copilot/chat/chat-modes.md).

To help you manage tools, you can group related tools into a tool set. A tool set is a collection of individual tools that you can refer to as a single entity. A tool set can contain built-in tools, MCP tools, or tools provided by extensions.

Learn more about how to [create and use tool sets in VS Code](/docs/copilot/chat/chat-agent-mode.md#define-tool-sets).

## Manage MCP servers

Run the **MCP: List Servers** command from the Command Palette to view the list of configured MCP servers. You can then select a server and perform the following actions on it:

* **Start**: Start the MCP server if it is not already running.
* **Stop**: Stop the MCP server if it is running.
* **Restart**: Restart the MCP server.
* **Show Output**: View the server logs to diagnose issues.
* **Show Configuration**: View the server configuration in the editor.
* **Configure Model Access**: Configure which models the MCP server can access (sampling).
* **Browse Resources**: View the resources provided by the MCP server.

> [!TIP]
> When you open the `.vscode/mcp.json` file, VS Code shows commands to start, stop, or restart a server directly from the editor.

![MCP server configuration with lenses to manage server.](images/mcp-servers/mcp-server-config-lenses.png)

### Command-line configuration

You can also use the VS Code command-line interface to add an MCP server to your user profile or to a workspace.

To add an MCP server to your user profile, use the `--add-mcp` command line option, and provide the JSON server configuration in the form `{\"name\":\"server-name\",\"command\":...}`.

```bash
code --add-mcp "{\"name\":\"my-server\",\"command\": \"uvx\",\"args\": [\"mcp-server-fetch\"]}"
```

### URL handler

VS Code also includes a URL handler that you can use to install an MCP server. To form the URL, construct an `obj` object in the same format as you would provide to `--add-mcp`, and then create the link by using the following logic:

```typescript
// For Insiders, use `vscode-insiders` instead of `code`
const link = `vscode:mcp/install?${encodeURIComponent(JSON.stringify(obj))`;
```

This link can be used in a browser, or opened on the command line, for example via `xdg-open $LINK` on Linux.

## Troubleshoot and debug MCP servers

### MCP output log

When VS Code encounters an issue with an MCP server, it shows an error indicator in the Chat view.

![MCP Server Error](images/mcp-servers/mcp-error-loading-tool.png)

Select the error notification in the Chat view, and then select the **Show Output** option to view the server logs. Alternatively, run **MCP: List Servers** from the Command Palette, select the server, and then choose **Show Output**.

![MCP Server Error Output](images/mcp-servers/mcp-server-error-output.png)

### Debug an MCP server

You can enable _development mode_ for MCP servers by adding a `dev` key to the MCP server configuration. This is an object with two properties:

* `watch`: A file glob pattern to watch for files change that will restart the MCP server.
* `debug`: Enables you to set up a debugger with the MCP server.

```json
{
  "servers": {
    "gistpad": {
      "command": "node",
      "args": ["build/index.js"],
     "dev": {
       "watch": "build/**/*.js",
       "debug": { "type": "node" }
     },
```

> [!NOTE]
> We currently only support debugging Node.js and Python servers launched with `node` and `python` respectively.

## Create an MCP server

VS Code has all the tools you need to develop your own MCP server. While MCP servers can be written in any language that can handle `stdout`, the MCP's official SDKs are a good place to start:

* [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
* [Python SDK](https://github.com/modelcontextprotocol/python-sdk)
* [Java SDK](https://github.com/modelcontextprotocol/java-sdk)
* [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk)
* [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)

## Frequently asked questions

### Can I control which MCP tools are used?

Yes, you have several options to control which tools are active:

* Select the **Tools** button in the Chat view when in agent mode, and toggle specific tools on/off as needed.
* Add specific tools to your prompt by using the **Add Context** button or by typing `#`.
* For more advanced control, you can use `.github/copilot-instructions.md` to fine-tune tool usage.

### The MCP server is not starting when using Docker

Verify that the command arguments are correct and that the container is not running in detached mode (`-d` option). You can also check the MCP server output for any error messages (see [Troubleshooting](#troubleshoot-and-debug-mcp-servers)).

## Related resources

* [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
* [Model Context Protocol Server repository](https://github.com/modelcontextprotocol/servers)
* [Use agent mode in Visual Studio Code](/docs/copilot/chat/chat-agent-mode.md)

```

## chat/prompt-crafting.md

```markdown
---
ContentId: 5dfd207f-fcee-42c3-b7fe-622b42b3397c
DateApproved: 06/12/2025
MetaDescription: Optimize your development experience with GitHub Copilot in VS Code with best practices for crafting chat prompts and providing context.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Prompt engineering for Copilot Chat

This article covers tips to write prompts to get better and more relevant responses from Copilot Chat in Visual Studio Code. _Prompt engineering_ or _prompt crafting_ is a common phrase you'll hear when discussing AI and refers to how and what information is packaged and sent to an AI API endpoint.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/hh1nOX14TyY" title="Core principles of prompt engineering with GitHub Copilot" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you are new to VS Code or GitHub Copilot, you might want to review the [GitHub Copilot Overview](/docs/copilot/overview.md) article first or dive straight into the [Getting started](/docs/copilot/getting-started.md) tutorial.

There are different options for optimizing your Copilot experience for inline suggestions and chat:

- [Get the most out of inline suggestions](#getting-the-most-out-of-copilot-inline-suggestions)
- [Get the most out of Copilot Chat](#getting-the-most-out-of-copilot-chat)

## Getting the most out of Copilot inline suggestions

The [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension presents [suggestions](/docs/copilot/overview.md#Code-completions-in-the-editor) automatically to help you code more efficiently. There are things you can do to help ("prompt") Copilot to give you the best possible suggestions. And the good news is that you are probably already doing these right now, since they help you and your colleagues understand your code.

### Provide context to Copilot

Copilot works best when it has sufficient context to know what you're doing and what you want help with. Just as you would provide a colleague with the context when asking for help with a specific programming task, you can do the same with Copilot.

#### Open files

For code completions, Copilot looks at the current and open files in your editor to analyze the context and create appropriate suggestions. Having related files open in VS Code while using Copilot helps set this context and lets the Copilot see a bigger picture of your project.

#### Top level comment

Just as you would give a brief, high-level introduction to a coworker, a top level comment in the file you're working in can help Copilot understand the overall context of the pieces you are creating.

<!-- Example of a good and bad top level comment -->

#### Appropriate includes and references

It's best to manually set the includes or module references you need for your work. Copilot can make suggestions, but you likely know best what dependencies you need to include. This can also help let Copilot know what frameworks, libraries, and their versions you'd like it to use when crafting suggestions.

In the following TypeScript example, we want to log the output of the `add` method. When we don't have any includes, Copilot suggests using `console.log`:

![Copilot inline suggestion proposes Console.log when no imports in the file.](images/prompt-crafting/copilot-suggestion-console-log.png)

On the other hand, when you add a reference to `Log4js`, Copilot suggests using that framework for logging the output:

![Copilot inline suggestion proposes logging using the imported logging framework.](images/prompt-crafting/copilot-suggestion-framework-log.png)

#### Meaningful function names

Just as a method called `fetchData()` won't mean much to a coworker (or you after several months), `fetchData()` won't help Copilot either. Using meaningful function names helps Copilot provide a body that does what you want.

<!-- Example of a meaningful function/method name. -->

#### Specific and well-scoped function comments

A function name can only be so descriptive without being overly long. Function comments can help fill in details that Copilot might need to know.

<!-- Example of a meaningful function/method comment -->

#### Prime Copilot with sample code

One trick to get Copilot on the right page, is to copy and paste sample code that is close to what you are looking for into your open editor. Providing a small example can help Copilot generate suggestions that match the language and tasks you want to achieve. Once Copilot begins providing you with the code you want and will actually use, you can delete the sample code from the file. This can be especially helpful to jump start Copilot to a newer library version when it defaults to providing older code suggestions.

### Be consistent and keep the quality bar high

Copilot is going to latch on to your code to generate suggestions that follow the existing pattern, so the adage "garbage in, garbage out" applies.

Always keeping a high quality bar can take discipline. Especially when you're coding fast and loose to get something working, you might want to disable Copilot completions while in "hacking" mode. You can temporarily disable completions from the Copilot status menu. Bring up the Copilot status menu dropdown by selecting the Copilot Status bar item.

![Hover over the Copilot Status bar item displays "Show Copilot status menu"](images/prompt-crafting/show-copilot-status-menu.png)

From the dropdown, you can disable completions entirely, or disable just for the active file type, for example Markdown files.

![Copilot Status menu dropdown with Disable Completions selected](images/prompt-crafting/disable-completions.png)

<!-- ### Be specific

break things down into separate specific tasks

Be specific about inputs, outputs, ranges, APIs, frameworks.

### Verify suggestions

Copilot is not a compiler or language service

Tools, which you may already be using, can help.

#### Language Service warnings

#### Linters -->

## Getting the most out of Copilot Chat

You can also get assistance from Copilot via a [chat interface](/docs/copilot/overview.md#Answer-coding-questions) by installing the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension.

When you're using chat to interact with GitHub Copilot, there are several things you can do to optimize your experience.

### Use chat participants and slash commands

Chat participants are designed to collect extra context either about a code base or a specific domain or technology. By using the appropriate participant, Copilot Chat can find and provide better information to send to the Copilot backend. For example, use `@workspace` if you want to ask questions about your open project, or `@vscode` to know more about VS Code features and APIs.

![Asking the @vscode participant how to change the VS Code colors](images/prompt-crafting/agent-example.png)

Slash commands help Copilot Chat understand your **intent** when you ask a question. Are you learning about a code base (`/explain`), do you want help with fixing an issue (`/fix`), or are you creating test cases (`/tests`)? By letting Copilot Chat know what you're trying to do, it can tune its reply to your task and provide helpful commands, settings, and code snippets.

![Inline Chat slash command list](images/prompt-crafting/inline-chat-slash-commands.png)

You could write out your project scope or current task with a natural language query but using chat participants and slash commands is more concise and explicit.

Learn more about [chat participants](/docs/copilot/chat/chat-ask-mode.md#special-keywords) and [slash commands](/docs/copilot/chat/chat-ask-mode.md#special-keywords) in Copilot Chat.

### Use chat variables for context

Chat participants, such as `@workspace` or `@vscode`, can contribute chat variables that provide domain-specific context. You can reference a chat variable in your chat prompt by using the `#` symbol. By using a chat variable, you can be more specific about the context that you include in your chat prompt.

For example, with `#<file name>` or `#<folder name>` you can reference specific files or folders from your workspace in your chat prompt. This helps make the answers from Copilot Chat more relevant to your code by providing context about the file you are working with. You can ask questions like "Can you suggest improvements to #package.json?" or "How do I add an extension in #devcontainer.json?".

You can also add context to your chat message by using the **Attach Context** button in the Chat view. You can then select the specific type of context from a Quick Pick, such as the current selection, one or more files from the workspace, or one or more symbols from your source code.

![Screenshot of VS Code Copilot Chat view, showing the Attach context button and context Quick Pick.](./images/prompt-crafting/copilot-chat-view-attach-context.png)

Learn more about [using context variables with Copilot Chat](/docs/copilot/chat/chat-ask-mode.md#special-keywords).

### Be specific and keep it simple

When you ask Copilot to do something, be specific in your ask and break down a large task into separate, smaller tasks. For example, don't ask Copilot to create an Express app, that uses TypeScript and Pug, and that has a products page that retrieves data from a MongoDB database. Instead, first ask Copilot to create the Express app with TypeScript and Pug. Next, ask to add a products page, and finally ask to retrieve the customer data from a database.

When you ask Copilot to do a specific task, be specific about the inputs, outputs, APIs, or frameworks you want to use. The more specific your prompt is, the better the outcome will be. For example, instead of "read product data from the database", use "read all products by category, return the data in JSON format, and use the Mongoose library".

### Iterate on your solution

When asking Copilot Chat for help, you aren't stuck with the first response. You can iterate and prompt Copilot to improve the solution. Copilot has both the context of the generated code and also your current conversation.

Here's an example using Inline Chat to create a function to calculate Fibonacci numbers:

![First response from Copilot for a function to calculate Fibonacci numbers](images/prompt-crafting/fibonacci-first.png)

Maybe you prefer a solution that doesn't use recursion:

![Ask Copilot to not use recursion and new result](images/prompt-crafting/fibonacci-second.png)

You can even ask Copilot to follow coding conventions or improve variable names:

![Ask Copilot to use better variable names and new result](images/prompt-crafting/fibonacci-third.png)

Even if you've already accepted a result, you can always ask Copilot to iterate on the code later.

## More resources about prompting for Copilot

If you'd like to learn more about productively using GitHub Copilot, you can follow up with these videos and blog posts:

* [Effective Prompting for GitHub Copilot](https://www.youtube.com/watch?v=ImWfIDTxn7E)
* [Pragmatic techniques to get the most out of GitHub Copilot](https://www.youtube.com/watch?v=CwAzIpc4AnA)
* [Best practices for prompting GitHub Copilot in VS Code](https://www.linkedin.com/pulse/best-practices-prompting-github-copilot-vs-code-pamela-fox)
* [How to use GitHub Copilot: Prompts, tips, and use cases](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)

```

## guides/code-review-with-copilot.md

```markdown
---
ContentId: 3d26d330-5e97-4748-83d1-351aaddcc60c
DateApproved: 06/12/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to review code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Review code with Copilot

This page is redirected to <https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review> and only exists to keep the "Review code with Copilot" TOC item.

```

## guides/debug-with-copilot.md

```markdown
---
ContentId: 2f21c45a-8931-4da2-a921-af23a3b92949
DateApproved: 06/12/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to set up debugging configurations and fix issues during debugging.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Debug with GitHub Copilot

GitHub Copilot can help improve your debugging workflow in Visual Studio Code. Copilot can assist with the setup of the debug configuration for your project and provide suggestions for fixing issues discovered during debugging. This article gives an overview of how to use Copilot for debugging applications in VS Code.

Copilot can help with the following debugging tasks:

* **Configure debug settings**: generate and customize launch configurations for your project.
* **Start a debugging session**: use `copilot-debug` to start a debugging session from the terminal.
* **Fix issues**: receive suggestions for fixing issues discovered during debugging.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Set up debug configuration with Copilot

VS Code uses the `launch.json` file to store [debug configuration](/docs/debugtest/debugging-configuration.md). Copilot can help you create and customize this file to set up debugging for your project.

1. Open the Chat view (`kb(workbench.action.chat.open)`).
1. Enter the `/startDebugging` command.
1. Follow Copilot's guidance to set up debugging for your project.

Alternatively, you can use a natural language prompt like:

* "Create a debug configuration for a Django app"
* "Set up debugging for a React Native app"
* "Configure debugging for a Flask application"

## Start debugging with Copilot

The `copilot-debug` terminal command simplifies the process of configuring and starting a debugging session. Prefix the command you'd use for starting your application with `copilot-debug` to have Copilot automatically configure and start a debugging session.

1. Open the integrated terminal (`kb(workbench.action.terminal.toggleTerminal)`).

1. Enter `copilot-debug` followed by your application's start command. For example:

    ```bash
    copilot-debug node app.js
    ```

    or

    ```bash
    copilot-debug python manage.py
    ```

1. Copilot launches a debugging session for your application. You can now use the built-in debugging features in VS Code.

Learn more about [debugging in VS Code](/docs/debugtest/debugging.md).

## Fix coding issues with Copilot

You can use Copilot Chat to help you fix coding issues or improve your code.

### Use chat prompts

1. Open your application code file.

1. Open one of these views:
    * Copilot Edits (`kb(workbench.action.chat.openEditSession)`)
    * Chat view (`kb(workbench.action.chat.open)`)
    * Inline Chat (`kb(inlineChat.start)`)

1. Enter a prompt like:
    * "/fix"
    * "Fix this #selection"
    * "Validate input for this function"
    * "Refactor this code"
    * "Improve the performance of this code"

Learn more about using [Copilot Chat](/docs/copilot/chat/copilot-chat.md) and [Copilot Edits](/docs/copilot/chat/copilot-edits.md) in VS Code.

### Use editor smart actions

To fix coding issues for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Copilot** > **Fix**.

    Copilot provides a code suggestion to fix the code.

1. Optionally, refine the generated code by providing additional context in the chat prompt.

## Next steps

* Explore [general debugging features in VS Code](/docs/debugtest/debugging.md).
* Learn more about [Copilot in VS Code](/docs/copilot/overview.md).

```

## guides/notebooks-with-ai.md

```markdown
---
ContentId: 101027aa-e73c-4d1b-a93f-b8ce10e1f946
DateApproved: 06/12/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to edit Jupyter notebooks with AI.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Edit Jupyter notebooks with AI in VS Code

Visual Studio Code supports working with [Jupyter notebooks](/docs/datascience/jupyter-notebooks.md) natively, and through [Python code files](/docs/python/jupyter-support-py.md). The AI features in VS Code can help you in creating and editing notebooks, as well as analyzing and visualizing data. In this article, you learn how to use the AI features in VS Code to work with Jupyter notebooks.

## Scaffold a new notebook

To accelerate getting started with a new notebook, you can use the AI features in VS Code to scaffold a new notebook. You can provide details about what functionality you want to add and which libraries you want to use.

To create a new notebook with AI, choose the [chat mode](/docs/copilot/chat/copilot-chat.md#chat-mode) and enter a prompt in the Chat view.

With [ask mode](vscode://GitHub.Copilot-Chat/chat?mode=ask) in chat, use the `/newNotebook` command in the chat input field to indicate that you want to scaffold a new notebook.

[Agent mode](vscode://GitHub.Copilot-Chat/chat?mode=agent) provides a more autonomous experience, where it can make changes to the notebook, run the cells, and monitor and resolve potential run-time issues.

Example prompts:

- *Create a Jupyter notebook to read data from #housing.csv*
- *Create a Jupyter notebook to read data from #housing.csv, add a step to clean the data*
- *Create a notebook to read data from #housing.csv and plot the distribution of prices*
- */newNotebook using pandas and seaborn to read and visualize the titanic dataset. Show key information from the dataset.* (ask mode)
- *Create a Jupyter notebook to read data from #housing.csv. Run all cells.* (agent mode)

The following screenshot shows how the output from agent mode to the prompt *Create a Jupyter notebook to read data from #housing.csv* (you can get this dataset from [Kaggle](https://www.kaggle.com/search?q=housing+dataset+in%3Adatasets)):

![Screenshot that shows a new notebook created by agent mode that reads the 'housing.csv' file in the workspace.](images/notebooks-with-ai/agent-mode-create-new-notebook.png)

Notice that a new `.ipynb` file is created in the workspace, which contains Markdown and code cells for reading the CSV file and displaying the first few rows of the data.

You can now further edit the notebook manually, or use AI to make inline edits or send follow-up chat requests to modify the notebook.

## Make inline edits in notebooks

If you already have a notebook and want to make some inline changes in a cell, you can use inline chat, like you would in a code file.

To make inline edits in a cell, press `kb(notebook.cell.chat.start)` or right-click in the cell and select **Copilot** > **Editor Inline Chat**. This opens the inline chat view, where you can enter your prompt.

> [!TIP]
> You can reference kernel variables in your chat prompt. Type `#` followed by the variable name to reference it. For example, if you have a variable named `df`, you can type `#df` in your chat prompt to reference it.

![Screenshot that shows the inline chat view in a notebook cell.](images/notebooks-with-ai/notebook-inline-chat.png)

When the response is generated, notice that the code is updated in the notebook cell. You can **Accept** the changes and decide to **Accept and Run** the cell changes.

To generate a new cell with AI, select the **Generate** button in the notebook view, or don't focus on a cell and press `kb(notebook.cell.chat.start)` to open the inline chat view for a new cell.

## Make edits across multiple cells

To make larger edits, across multiple cells, you can use the chat interface in [edit mode](vscode://GitHub.Copilot-Chat/chat?mode=edit) or [agent mode](vscode://GitHub.Copilot-Chat/chat?mode=agent).

Example prompts:

- *Plot a graph of the price distribution*
- *Make sure the data is cleaned before visualizing and processing it*
- *Show the correlation between different features in the dataset*
- *Use matplotlib instead of seaborn to plot the data*
- *Remove the display of dataset information*

![Screenshot that shows the response from edit mode to the prompt 'Plot a graph of the price distribution'.](images/notebooks-with-ai/notebook-edit-mode-plot-prices.png)

Notice that you can use the overlay controls to navigate between the different edit suggestions, and to keep or undo the changes.

## Ask questions about notebook content

You can use the chat interface to ask questions about the content of your notebook. This is useful for getting explanations of code, data, or visualizations. You can add extra context to your chat request, such as the cell output, graphs, or errors.

The following example shows how to ask questions about a visualization in a notebook.

1. Change to [ask mode](vscode://GitHub.Copilot-Chat/chat?mode=ask) in chat.

1. Select `...` next to the graph, and select **Add Cell Output to Chat** to add the chart as context to your chat request.

    ![Screenshot that shows the context menu for a graph in a notebook cell.](images/notebooks-with-ai/notebook-ask-mode-add-cell-output.png)

1. Enter the prompt *Explain this chart* in the chat input field.

    Notice that you get a detailed explanation of the chart.

    ![Screenshot that shows the response from chat to the prompt 'Explain this chart'.](images/notebooks-with-ai/notebook-ask-mode-explain-chart.png)

## Perform data analysis and visualization

You can do a full data analysis and visualization notebook of a dataset by using agent mode in chat. Agent mode analyzes the dataset, and then scaffolds a new notebook, implements the code for performing the data analysis, and runs the cells to process and visualize the data. As needed, agent mode invokes relevant tools and terminal commands to complete its tasks.

For example, to perform a data analysis of the housing dataset:

1. Open [agent mode](vscode://GitHub.Copilot-Chat/chat?mode=agent) in chat.

1. Enter the following prompt in the chat input field: *Perform data analysis of the data in #housing.csv*.

    Notice that agent mode iterates through the different tasks. When needed, approve the tool and command invocations.

1. The result is a new notebook with a complete data analysis of the dataset, including data cleaning, data visualization, and statistical analysis.

    ![Screenshot that shows the response from agent mode to the prompt 'Perform data analysis of the data in housing.csv'.](images/notebooks-with-ai/notebook-agent-mode-data-analysis.png)

You can now further edit the notebook manually, or use AI to make inline edits or send follow-up chat requests to modify the notebook.

## Next steps

- [Learn more about Jupyter notebooks in VS Code](/docs/datascience/jupyter-notebooks.md)
- [Learn more about the AI features in VS Code](/docs/copilot/overview.md)
- [Learn more about chat in VS Code](/docs/copilot/chat/copilot-chat.md)

```

## guides/test-with-copilot.md

```markdown
---
ContentId: 9f84b21e-5b76-4c3a-a5dd-2021ab343f1f
DateApproved: 06/12/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to write, debug, and fix tests.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Test with GitHub Copilot

Writing and maintaining tests is a crucial but often time-consuming part of software development. GitHub Copilot streamlines this process by helping you write, debug, and fix tests more efficiently in Visual Studio Code. This article shows you how to leverage Copilot's testing capabilities to improve your testing workflow and increase test coverage in your projects.

Copilot can help with the following testing tasks:

* **Set up testing frameworks**: get help configuring the right testing framework and VS Code extensions for your project and language.
* **Generate test code**: create unit tests, integration tests, and end-to-end tests that cover your application code.
* **Handle edge cases**: generate comprehensive test suites to cover edge cases and error conditions.
* **Fix failing tests**: receive suggestions for fixing test failures.
* **Maintain consistency**: personalize Copilot to generate tests that follow your project's coding practices.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Set up your testing framework

To accelerate your testing workflow, Copilot can help set up the testing framework and VS Code extensions for your project. Copilot suggests appropriate testing frameworks based on your project type.

1. Open the Chat view (`kb(workbench.action.chat.open)`).
1. Enter the `/setupTests` command in the chat input field.
1. Follow Copilot's guidance to configure your project.

## Write tests with Copilot

Copilot can help you write tests for your application code by generating test code that covers your codebase. This includes unit tests, end-to-end tests, and tests for edge cases.

### Use chat prompts

1. Open your application code file.

1. Open one of these views:
    * Copilot Edits (`kb(workbench.action.chat.openEditSession)`)
    * Chat view (`kb(workbench.action.chat.open)`)
    * Inline Chat (`kb(inlineChat.start)`)

1. Enter a prompt like:
    * "Generate tests for this code"
    * "Write unit tests including edge cases"
    * "Create integration tests for this module"

Get more guidance about [using GitHub Copilot for writing tests](https://docs.github.com/en/copilot/using-github-copilot/guides-on-using-github-copilot/writing-tests-with-github-copilot) in the GitHub documentation.

### Use editor smart actions

To generate tests for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Optionally, select the code you want to test.
1. Right-click and select **Copilot** > **Generate Tests**.

    Copilot generates test code in an existing test file, or creates a new test file if one doesn't exist.

1. Optionally, refine the generated tests by providing additional context in the Inline Chat prompt.

## Fix failing tests

Copilot integrates with the Test Explorer in VS Code and can help with fixing failing tests.

1. In the Test Explorer, hover over a failing test
1. Select the **Fix Test Failure** button (sparkle icon)
1. Review and apply Copilot's suggested fix

Alternatively, you can:

1. Open the Chat view
1. Enter the `/fixTestFailure` command
1. Follow Copilot's suggestions to fix the test

> [!TIP]
> [Agent mode](/docs/copilot/chat/chat-agent-mode.md) monitors the test output when running tests, and automatically attempts to fix and rerun failing tests.

## Personalize test generation

If your organization has specific testing requirements, you can customize how Copilot generates tests to ensure they meet your standards. You can personalize how Copilot generates tests by providing custom instructions. For example:

* Specify preferred testing frameworks
* Define naming conventions for tests
* Set code structure preferences
* Request specific test patterns or methodologies

Get more information about [personalizing Copilot for generating tests](/docs/copilot/copilot-customization.md).

## Tips for better test generation

To get the best results when generating tests with Copilot, follow these tips:

* Provide context in your prompts about the testing framework you prefer
* Specify if you want particular types of tests (unit, integration, end-to-end)
* Ask for specific test cases or edge cases
* Request tests that follow your project's coding standards

## Next steps

* Learn more about [Copilot in VS Code](/docs/copilot/overview.md).
* Explore [general testing features in VS Code](/docs/debugtest/testing.md).
* Check out example prompts for [generating unit tests](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat/testing-code/generate-unit-tests)

```

## reference/copilot-settings.md

```markdown
---
ContentId: 7b232695-cbbe-4f3f-a625-abc7a5e6496c
DateApproved: 06/12/2025
MetaDescription: Overview of the configuration settings for GitHub Copilot in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code settings reference

This article lists the configuration settings for GitHub Copilot in Visual Studio Code. For general information about working with settings in VS Code, refer to [User and workspace settings](/docs/configure/settings.md), as well as the [Variables reference](/docs/reference/variables-reference.md) for information about predefined variable support.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

The team is continuously working on improving Copilot in VS Code and adding new features. Some features are still experimental. Try them out and share your feedback in [our issues](https://github.com/microsoft/vscode-copilot-release/issues). Get more info about the [feature lifecycle in VS Code](/docs/configure/settings.md#feature-lifecycle).

## General settings

* `setting(github.copilot.editor.enableCodeActions)`: Controls if Copilot commands are shown as Code Actions when available.
* `setting(github.copilot.renameSuggestions.triggerAutomatically)`: Controls whether Copilot generates suggestions for renaming.
* `setting(chat.commandCenter.enabled)`: Controls whether to show the Copilot menu in the VS Code title bar (default: `true`).
* `setting(workbench.commandPalette.experimental.askChatLocation)` _(Experimental)_: Controls where the Command Palette should ask chat questions.
* `setting(search.searchView.semanticSearchBehavior)` _(Preview)_: Configure when to run semantic search in the Search view: manually (default), when no text search results are found, or always.
* `setting(search.searchView.keywordSuggestions)` _(Preview)_: Controls whether to show keyword suggestions in the Search view. This setting is disabled by default.
* `setting(workbench.settings.showAISearchToggle)` _(Experimental)_: Enable searching settings with AI in the Settings editor. This setting is enabled by default.

## Code completion settings

* `setting(github.copilot.enable)`: Enable or disable Copilot completions for specified [languages](/docs/languages/identifiers.md).
* `setting(github.copilot.nextEditSuggestions.enabled)`: Enables Copilot next edit suggestions (Copilot NES).
* `setting(editor.inlineSuggest.edits.allowCodeShifting)`: Configure if Copilot NES is able to shift your code to show a suggestion.
* `setting(editor.inlineSuggest.edits.renderSideBySide)`: Configure if Copilot NES can show larger suggestions side-by-side if possible, or if Copilot NES should always show larger suggestions below the relevant code.

## Chat settings

* `setting(github.copilot.chat.followUps)`: Controls whether Copilot should suggest follow-up questions in chat.
* `setting(github.copilot.chat.localeOverride)`: Specify a locale that Copilot should respond in, such as `en` or `fr`.
* `setting(github.copilot.chat.runCommand.enabled)`: Enables the `/runCommand` intent in the Chat view to run VS Code commands.
* `setting(github.copilot.chat.useProjectTemplates)`: Use relevant GitHub projects as starter projects when using `/new`.
* `setting(github.copilot.chat.scopeSelection)`: Whether to prompt for a specific symbol scope if you use `/explain` and the active editor has no selection.
* `setting(github.copilot.chat.terminalChatLocation)`: Controls where chat queries from the terminal should be opened.
* `setting(chat.detectParticipant.enabled)`: Enable chat participant detection in the Chat view.
* `setting(chat.editor.fontFamily)`: Font family in chat codeblocks.
* `setting(chat.editor.fontSize)`: Font size in pixels in chat codeblocks.
* `setting(chat.editor.fontWeight)`: Font weight in chat codeblocks.
* `setting(chat.editor.lineHeight)`: Line height in pixels in chat codeblocks.
* `setting(chat.editor.wordWrap)`: Toggle line wrapping in chat codeblocks.
* `setting(chat.editing.confirmEditRequestRemoval)`: Ask for confirmation before undoing an edit (default: `true`)
* `setting(chat.editing.confirmEditRequestRetry)`: Ask for confirmation before performing a redo of the last edit (default: `true`)
* `setting(chat.editing.autoAcceptDelay)`: Configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept (default: 0)
* `setting(chat.agent.enabled:true)`: Enable or disable agent mode (default: `false`, requires VS Code 1.99 or later)
* `setting(chat.agent.maxRequests)`: Maximum number of requests that Copilot can make in agent mode (default: 15)
* `setting(github.copilot.chat.agent.autoFix)`: Automatically diagnose and fix issues in the generated code changes (default: `true`)
* `setting(github.copilot.chat.agent.runTasks)`: Run workspace tasks when using agent mode (default: `true`)
* `setting(chat.mcp.enabled)` _(Preview)_: Enable Model Context Protocol (MCP) support in VS Code. This enables adding tools from MCP servers in agent mode.
* `setting(github.copilot.chat.codesearch.enabled)` _(Preview)_: When using `#codebase` in the prompt, Copilot automatically discovers relevant files to be edited.
* `setting(chat.implicitContext.enabled)` _(Experimental)_: Configure if the active editor should be automatically added as context to the chat prompt.
* `setting(github.copilot.chat.agent.thinkingTool:true)` _(Experimental)_: Enable the thinking tool in agent mode.
* `setting(github.copilot.chat.newWorkspaceCreation.enabled)` _(Experimental)_: Enable the agent mode tool for scaffolding a new workspace in chat.
* `setting(github.copilot.chat.edits.temporalContext.enabled)` _(Experimental)_: Whether to include recently viewed and edited files with requests in Copilot Edits.
* `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` _(Experimental)_: Suggest related files from git history in Copilot Edits (default: `false`)
* `setting(chat.tools.autoApprove)` _(Experimental)_: Automatically approve all tools (default: `false`)
* `setting(chat.sendElementsToChat.enabled)` _(Experimental)_: Enable sending elements from the Simple Browser to the chat view as context (default: `true`).

## Inline chat settings

* `setting(inlineChat.acceptedOrDiscardBeforeSave)`: Controls whether pending Inline Chat sessions in an editor prevent saving the file.
* `setting(inlineChat.finishOnType)`: Whether to finish an Inline Chat session when typing outside of changed regions.
* `setting(inlineChat.holdToSpeech)`: Whether holding the Inline Chat keyboard shortcut will automatically enable speech recognition.
* `setting(inlineChat.lineEmptyHint)` _(Experimental)_: Controls whether to show a hint for Inline Chat on an empty line.
* `setting(inlineChat.lineNaturalLanguageHint)` _(Experimental)_: Experimental suggestion that triggers Inline Chat as soon as a line mostly consists of words.
* `setting(editor.inlineSuggest.syntaxHighlightingEnabled)`: Controls whether to show syntax highlighting for inline suggestions.
* `setting(github.copilot.chat.editor.temporalContext.enabled)` _(Experimental)_: Whether to include recently viewed and edited files with Copilot requests in Inline Chat.

## Customize chat

* `setting(github.copilot.chat.codeGeneration.useInstructionFiles)`: Controls whether code instructions from `.github/copilot-instructions.md` are added to Copilot requests.
* `setting(github.copilot.chat.reviewSelection.enabled)` _(Preview)_: Enable code review for an editor text selection.
* `setting(github.copilot.chat.reviewSelection.instructions)` _(Preview)_: A set of instructions that will be added to Copilot requests for reviewing the current editor selection.
* `setting(github.copilot.chat.codeGeneration.instructions)` _(Experimental)_: A set of instructions that will be added to Copilot requests that generate code.
* `setting(github.copilot.chat.testGeneration.instructions)` _(Experimental)_: A set of instructions that will be added to Copilot requests that generate tests.
* `setting(github.copilot.chat.commitMessageGeneration.instructions)` _(Experimental)_: A set of instructions that will be added to Copilot requests that generate commit messages.
Copilot requests for reviewing the current editor selection.
* `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` _(Experimental)_: A set of instructions that will be added to Copilot requests that generate pull request titles and descriptions.
* `setting(chat.promptFiles)` _(Experimental)_: Enable or disable reusable prompt files.
* `setting(chat.promptFilesLocations)` _(Experimental)_: A list of folders where prompt files are located. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.
* `setting(chat.instructionsFilesLocations)` _(Experimental)_: A list of folders where instruction files are located. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.
* `setting(chat.modeFilesLocations)` _(Experimental)_: A list of folders where chat mode files are located. Relative paths are resolved from the root folder(s) of your workspace. Supports glob patterns for file paths.

## Debugging settings

* `setting(github.copilot.chat.startDebugging.enabled)` _(Preview)_: Enables the experimental `/startDebugging` intent in the Chat view to generate debugging configuration.
* `setting(github.copilot.chat.copilotDebugCommand.enabled)` _(Preview)_: Enables the `copilot-debug` terminal command.

## Testing settings

* `setting(github.copilot.chat.generateTests.codeLens)` _(Experimental)_: Show **Generate tests** code lens for symbols that are not covered by current test coverage information.
* `setting(github.copilot.chat.setupTests.enabled)` _(Experimental)_: Enables the experimental `/setupTests` intent and prompting in `/tests` generation.
* `setting(github.copilot.chat.testGeneration.instructions)` _(Experimental)_: A set of instructions that will be added to Copilot requests that generate tests.

## Notebook settings

* `setting(notebook.experimental.generate)` _(Experimental)_: Enable the **Generate** action to create code cells with Inline Chat enabled in the notebook editor.

## Accessibility settings

* `setting(inlineChat.accessibleDiffView)`: Whether the Inline Chat also renders an accessible diff viewer for its changes.
* `setting(accessibility.signals.chatRequestSent)`: Plays a signal - sound (audio cue) and/or announcement (alert) - when a chat request is made.
* `setting(accessibility.signals.chatResponseReceived)`: Plays a sound / audio cue when the response has been received.
* `setting(accessibility.verbosity.inlineChat)`: Provide information about how to access the inline editor chat accessibility help menu and alert with hints that describe how to use the feature when the input is focused.
* `setting(accessibility.verbosity.inlineCompletions)`: Provide information about how to access the inline completions hover and Accessible View.
* `setting(accessibility.verbosity.panelChat)`: Provide information about how to access the chat help menu when the chat input is focused.
* `setting(accessibility.voice.keywordActivation)`: Controls whether the keyword phrase 'Hey Code' is recognized to start a voice chat session.
* `setting(accessibility.voice.autoSynthesize)`: Controls whether a textual response should automatically be read out aloud when speech was used as input.
* `setting(accessibility.voice.speechTimeout)`: The duration in milliseconds that voice speech recognition remains active after you stop speaking.

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)

```

## reference/copilot-vscode-features.md

```markdown
---
ContentId: de6f9f68-7dd5-4de3-a210-3db57882384b
DateApproved: 06/12/2025
MetaDescription: Get a quick overview of the GitHub Copilot features in Visual Studio Code. GitHub Copilot provides AI-powered features to help you write code faster and with less effort.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code cheat sheet

GitHub Copilot in Visual Studio Code provides AI-powered features to help you write code faster and with less effort. This cheat sheet provides a quick overview of the features for GitHub Copilot in Visual Studio Code.

You can access GitHub Copilot in VS Code through the Chat view, directly in the editor, from the integrated terminal, and via AI-powered enhancements in the VS Code user interface.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

The team is continuously working on improving Copilot in VS Code and adding new features. Some features are still experimental. Try them out and share your feedback in [our issues](https://github.com/microsoft/vscode-copilot-release/issues).

## Chat with GitHub Copilot

Use natural language to chat with GitHub Copilot and get help with coding tasks. For example, ask Copilot to explain a block of code or a programming concept. Get more information about using [Copilot Chat](/docs/copilot/chat/copilot-chat.md).

| Action | Description |
|--------|-------------|
| `kb(workbench.action.chat.open)` | Open the **Chat view**. |
| `kb(workbench.action.quickchat.toggle)` | Open **Quick Chat** and ask a quick question to Copilot. |
| `kb(inlinechat.start)` | Start **Inline Chat** to send a chat request to Copilot directly from the editor. Use natural language or use `/` commands to give instructions to Copilot. |
| `kb(workbench.action.chat.toggleAgentMode)` | Toggle between different [chat modes](/docs/copilot/chat/copilot-chat.md#chat-mode) in the Chat view. |
| `Add Context...` | Attach different types of context to your chat prompt. |
| `/explain` | Ask Copilot to explain a block of code or a programming concept. |
| <i class="codicon codicon-history"></i> | Access your history of chat sessions. |
| <i class="codicon codicon-mic"></i> | Enter a chat prompt by using speech (voice chat). The chat response is read out aloud. |

> **Tips**
>
> - Use `/` commands and `@` participants to get more precise and relevant answers.
> - Be specific, keep it simple, and ask follow-up questions to get the best results.
> - Provide context by attaching files, symbols, or selections to your chat prompt.
> - Choose the appropriate chat mode: ask, edit, or agent mode.

## Generate code from chat

Copilot can generate code blocks in response to your chat prompts. Quickly apply the generated code in your project or insert it in a new file. For example, ask Copilot to optimize an algorithm in your code.

| Action | Description |
|--------|-------------|
| <i class="codicon codicon-git-pull-request-go-to-changes"></i> | Smart-apply the generated code block in the active editor. |
| <i class="codicon codicon-insert"></i> | Insert the generated code block at the cursor. |
| <i class="codicon codicon-copy"></i> | Copy the generated code block to the clipboard. |
| <i class="codicon codicon-terminal"></i> | Insert the generated code block in the terminal as a shell command. |

> **Tips**
>
> - Provide details about the framework or libraries to use.
> - Consider creating [custom code-generation instructions](#customize-ai-code-generation).

## Attach context to your prompt

When you send a chat prompt to Copilot, you can attach context to help Copilot understand your question better. For example, add the current editor selection, a file, or a symbol to your chat prompt. Get more information about [best practices for using Copilot](/docs/copilot/chat/prompt-crafting.md).

| Action | Description |
|--------|-------------|
| **Add Context** | Open a Quick Pick to select relevant context for your chat prompt. Choose from different context types, such as workspace files, symbols, current editor selection, terminal selection, and more. |
| `Prompts...` _(Experimental)_ | Add reusable [prompt instructions](/docs/copilot/copilot-customization.md#reusable-prompt-files-experimental) to your request. |
| Drag & drop file | Drag & drop a file or editor tab onto the chat to attach the file as context. |
| Drag & drop folder | Drag & drop a folder onto the chat to attach the files within it as context. |
| Drag & drop problem | Drag & drop an item from the **Problems** panel to attach it as context. |
| Recent files _(Experimental)_ | Automatically include recently opened and edited files in your chat prompt. [Get more info](https://code.visualstudio.com/updates/v1_93#_use-recent-coding-files-as-inline-chat-context-experimental).  |

### Chat variables

Use chat variables in your chat prompt to reference context that is relevant to your question.

| Chat variable | Description |
|--------|-------------|
| `#changes` | The list of source control changes. |
| `#codebase` | Add relevant workspace content as context to your prompt. |
| `#extensions` | Tool to find and ask questions about VS Code extensions. For example, "how to get started with Python #extensions?" |
| `#fetch` | Fetch the content from a web page - provide the URL. |
| `#<file or folder name>` | Type `#`, followed by a file or folder name, to add it as chat context. |
| `#githubRepo` | Perform a code search for a GitHub repo to gather context for your prompt. For example, "what is a global snippet #githubRepo microsoft/vscode." |
| `#new` | Tool to scaffold a new VS Code workspace. |
| `#newJupyterNotebook` | Tool to scaffold a new Jupyter notebook. |
| `#openSimpleBrowser` | Tool to open the built-in Simple Browser and preview a locally-deployed web app. |
| `#problems` | Add workspace issues and problems from the **Problems** panel as context. Useful while fixing code or debugging. |
| `#searchResults` | Add the results from the Search view as context to your prompt. |
| `#selection` | Add the current editor selection as context to your prompt. |
| `#<symbol>` | Type `#`, followed by a symbol name, to get symbol suggestions for workspace files and attach as context. |
| `#terminalSelection` | Add the current terminal selection as context to your chat prompt. |
| `#terminalLastCommand` | Add the last run terminal command as context to your chat prompt. |
| `#testFailure` | Add test failure information as context. Useful when running and diagnosing [tests](/docs/debugtest/testing.md). |
| `#usages` | Combination of "Find All References", "Find Implementation", and "Go to Definition". |
| `#VSCodeAPI` | Add the VS Code API as context to your prompt to ask questions related to VS Code extension development. |

## Copilot in the editor

As you're coding in the editor, you can use Copilot to generate code completions as you're typing. Invoke Inline Chat to ask questions and get help from Copilot, while staying in the flow of coding. For example, ask Copilot to generate unit tests for a function or method. Get more information about [code completions](/docs/copilot/ai-powered-suggestions.md) and [Inline Chat](/docs/copilot/chat/inline-chat.md).

| Action | Description |
|--------|-------------|
| Code completions | Start typing in the editor and Copilot provides code suggestions that match your coding style and take your existing code into account. |
| Code comments | Provide a code completion prompt to Copilot by writing instructions in a code comment.<br/>Example: `# write a calculator class with methods for add, subtract, and multiply. Use static methods.` |
| Next edit suggestions | Predict your next code edit with Copilot next edit suggestions. Enable Copilot NES with the `setting(github.copilot.nextEditSuggestions.enabled)` setting. Learn how to get started with [Copilot NES](/docs/copilot/ai-powered-suggestions.md#next-edit-suggestions). |
| `kb(inlinechat.start)` | Start **Inline Chat** to send a chat request to Copilot directly from the editor. Use natural language or use `/` commands to give instructions to Copilot. |
| `kb(editor.action.rename)` | Get AI-powered suggestions when renaming symbols in your code. |

> **Tips**
>
> - Use meaningful method or function names to get better code completions quicker.
> - Select a code block to scope your Inline Chat prompt or attach relevant context by attaching files or symbols.
> - Use the editor context menu options to access common Copilot actions directly from the editor.

## Customize AI code generation

Define [custom instructions](/docs/copilot/copilot-customization.md#instruction-files) to help AI generate code or review code that matches the coding style, tools, and developer workflow of your team or project.

With reusable [prompt files](/docs/copilot/copilot-customization.md#prompt-files-experimental), you can specify common prompt instructions and relevant content in a Markdown file (`*.prompt.md`), that you can then reuse in your chat prompts.

| Action | Description |
|--------|-------------|
| Instructions files | Define shared instructions for code generation in `*.instructions.md` Markdown files in your workspace or user data folder. These common instructions supplement your own personal code-generation instructions.  |
| Code-review instructions _(Preview)_ | Define instructions for using Copilot to review an editor selection in settings or import from a file. You can define language-specific instructions. |
| Code-generation instructions _(Experimental)_ | Define instructions for code generation with GitHub Copilot in settings or import from a file. You can define language-specific instructions. |
| Test-generation instructions _(Experimental)_ | Define instructions for test generation with GitHub Copilot in settings or import from a file. You can define language-specific instructions. |
| Commit-message generation instructions _(Experimental)_ | Define instructions for commit message generation with GitHub Copilot in settings or import from a file. You can define language-specific instructions. |
| Pull request title and description generation instructions _(Experimental)_ | Define instructions for pull request title and description generation with GitHub Copilot in settings or import from a file. You can define language-specific instructions. |
| Reusable prompt files _(Experimental)_ | [Define reusable prompt files](/docs/copilot/copilot-customization.md#prompt-files-experimental) for repeatable tasks with additional context in `*.prompt.md` Markdown files and run them in chat. |

> **Tips**
>
> - Define language-specific instructions to get more accurate generated code for each language.
> - Store your instructions in your workspace to easily share them with your team.

## Review code (experimental)

Copilot can do a quick review pass of a code block or perform a review of uncommitted changes in your workspace. Review feedback shows up as comments in the editor, where you can apply the suggestions.

| Action | Description |
|--------|-------------|
| **Review and Comment** _(Preview)_ | Select a block of code, and select **Copilot** > **Review and Comment** from the editor context menu for quick review pass.  |
| **Copilot Code Review** | Select the **Copilot Code Review** button in the Source Control view for a deeper review of all uncommitted changes. Join the [waitlist](https://gh.io/copilot-code-review-waitlist). |

## Generate tests

Copilot can generate tests for functions and methods in your codebase. Get more information about [slash commands in Chat](/docs/copilot/chat/chat-ask-mode.md#special-keywords).

| Action | Description |
|--------|-------------|
| `/tests` | Generate tests for all or only the selected methods and functions in the editor. The generated tests are appended in an existing tests file or a new tests file is created.  |
| `/setupTests` | Get help setting up a testing framework for your code. Get recommendation for a relevant testing framework, steps to set up and configure it, and suggestions for VS Code testing extensions.   |
| `/fixTestFailure` | Ask Copilot for suggestions on how to fix failing tests. |
| Test coverage _(Experimental)_ | Generate tests for functions and methods that are not yet covered by tests. [Get more information](https://code.visualstudio.com/updates/v1_93#_generate-tests-based-on-test-coverage-experimental). |

> **Tips**
>
> - Provide details about the testing frameworks or libraries to use.

## Generate documentation

Generate code documentation for functions and methods in your codebase. Get more information about [slash commands in Chat](/docs/copilot/chat/chat-ask-mode.md#special-keywords).

| Action | Description |
|--------|-------------|
| `/docs` | Generate documentation comments for all or only the selected methods and functions in the editor.  |

## Debug and fix problems

Use Copilot to help fix coding problems and to get help with configuring and starting debugging sessions in VS Code.

| Action | Description |
|--------|-------------|
| `/fix` | Ask Copilot for suggestions on how to fix a block of code or how to resolve any compiler or linting errors in your code. For example, to help fix unresolved Node.js package names. |
| `/fixTestFailure` | Ask Copilot for suggestions on how to fix failing tests. |
| `/startDebugging` _(Experimental)_ | Generate a `launch.json` debug configuration file and [start a debugging session](/docs/copilot/guides/debug-with-copilot.md) from the Chat view. |
| `copilot-debug` command | Terminal command to help you [debug your programs](/docs/copilot/guides/debug-with-copilot.md). Prefix a run command to start a debugging session for it (for example, `copilot-debug python foo.py`). |

> **Tips**
>
> - Provide additional information about the type of fix you need, such as optimizing the memory consumption or performance.
> - Watch for Copilot Code Actions in the editor that indicate suggestions for fixing problems in your code.

## Scaffold a new project

Copilot can help you create a new project by generating a scaffold of the project structure, or generate a notebook based on your requirements.

| Action | Description |
|--------|-------------|
| `/new` | Use the `/new` command in the Chat view to scaffold a new project or a new file. Use natural language to describe the type of project/file you need, and preview the scaffolded content before creating it.<br/>Example: `/new Express app using typescript and svelte` |
| `/newNotebook` | Use the `/newNotebook` command in the Chat view to generate a new Jupyter notebook based on your requirements. Use natural language to describe what the notebook should contain.<br/>Example: `/newNotebook get census data and preview key insights with Seaborn`. |

## Source control and issues

Copilot can analyze the changes in your commits and pull requests and provide suggestions for commit messages and pull request descriptions.

| Action | Description |
|--------|-------------|
| Commit | Generate a commit message for the current changes in a source control commit. |
| Pull request | Generate a pull request title and description that correspond with the changes in your pull request. |
| `@github` | Use the `@github` participant in chat to ask about issues, pull requests, and more across your repositories. Get more information about the [available GitHub skills](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#currently-available-skills).<br/>Example: `@github What are all of the open PRs assigned to me?`, `@github Show me the recent merged pr's from @dancing-mona`  |

## Search

Use Copilot to get more relevant search results in the Search view.

| Action | Description |
|--------|-------------|
| Semantic search _(Experimental)_ | Include search results from Copilot in the Search view that are semantically relevant for your query. |

## Terminal

Get help about shell commands and how to resolve errors when running commands in the terminal.

| Action | Description |
|--------|-------------|
| `kb(inlinechat.start)` | Start Inline Chat within the terminal to use natural language to quickly get and run a shell command.<br/>Example: `how many cores on this machine?` |
| `@terminal` | Use the `@terminal` participant in the Chat view to ask questions about the integrated terminal or shell commands.<br/>Example: `@terminal list the 5 largest files in this workspace` |
| `@terminal /explain` | Use the `/explain` command in the Chat view to explain something from the terminal.<br/>Example: `@terminal /explain top shell command` |

## Python and notebook support

You can use chat to help you with Python programming tasks in the Native Python REPL and in Jupyter notebooks.

| Action | Description |
|--------|-------------|
| <i class="codicon codicon-sparkle"></i> Generate<br/>`kb(inlinechat.start)` | Start Inline Chat in a notebook to generate a codeblock or Markdown block. |
| `#` | Attach variables from the Jupyter kernel in your chat prompt to get more relevant responses. |
| Native REPL + `kb(inlinechat.start)` | Start Inline Chat in the Native Python REPL and run the generated commands. |
| `kb(workbench.action.chat.open)` | Open the **Chat view** and use edit or agent mode to make notebook edits. |
| `/newNotebook` | Use the `/newNotebook` command in the Chat view to generate a new Jupyter notebook based on your requirements. Use natural language to describe what the notebook should contain.<br/>Example: `/newNotebook get census data and preview key insights with Seaborn`. |

## VS Code commands and APIs

You can use Copilot to get help about VS Code features, settings, and the VS Code extension APIs. Get more information about [chat participants](/docs/copilot/chat/chat-ask-mode.md#special-keywords).

| Action | Description |
|--------|-------------|
| `@vscode` | Use the `@vscode` chat participant to ask questions about VS Code by using natural language.<br/>Example: `@vscode how to enable word wrapping?` |
| `@vscode /runCommand` | Use `/runCommand` with the `@vscode` chat participant to run a VS Code command.<br/>`@vscode /runCommand enable developer mode` |
| `@vscode /search` | Use `/search` with the `@vscode` chat participant to generate a VS Code search.<br/>Example: `@vscode /search python files without imports` |

> **Tips**
>
> - Use the `#vscodeAPI` chat variable if you're asking about the VS Code extension API.

## Next steps

- [Tutorial: Get started with GitHub Copilot in VS Code](/docs/copilot/getting-started.md)

```

## reference/workspace-context.md

```markdown
---
ContentId: c77dcce9-4ba9-40ac-8ae5-2df855088090
DateApproved: 06/12/2025
MetaDescription: How to use Copilot's @workspace chat to ask questions against your entire codebase.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Making chat an expert in your workspace

To ask questions in chat about your entire codebase, you can reference `@workspace` or `#codebase` in your chat prompt. Based on the question, chat intelligently retrieves relevant files and symbols, which it then references in its answer as links and code examples.

## What is the difference between `@workspace` and `#codebase`?

Conceptually, both `@workspace` and `#codebase` enable you to ask questions about your entire codebase. However, there are some differences in how you can use them:

- `@workspace`
  - Chat participant, dedicated to answering questions about your codebase.
  - Takes control of the user prompt and uses the codebase to provide an answer.
  - Can't invoke other tools.
  - Can only be used in ask mode.
  - Example: `"@workspace how can I validate a date?"`

- `#codebase`
  - Tool that performs a codebase search based on the user prompt and adds the relevant code as context to the chat prompt.
  - The LLM remains in control and can combine it with other tools for editing scenarios.
  - Can be used in all chat modes (ask, edit, and agent).
  - Examples: `"add a tooltip to this button, consistent with other button #codebase"`, `"add unit tests and run them #codebase"`

It's recommended to use `#codebase` in your chat prompts, as it provides more flexibility.

> [!TIP]
> Enable the `setting(github.copilot.chat.codesearch.enabled)` to make `#codebase` more effective in finding relevant code snippets. This setting is enabled by default.

## Prompt examples

- Finding existing code in your codebase:
  - `"@workspace where is database connecting string configured?"` - Explains where and how the database connection is configured
  - `"@workspace how can I validate a date?"` - Finds existing date validation helpers in the codebase
  - `"@workspace where are tests defined?"` - Provides the location of test suites, cases, and related references and configurations
- Making plans for complex code edits:
  - `"@workspace how can I add a rich tooltip to a button?"` - Provides a plan for using the existing tooltip component with button elements
  - `"@workspace add a new API route for the forgot password form"` - Outlines where to add the new route and how to connect it to the existing code
- Explaining higher-level concepts in a codebase:
  - `"@workspace how is authentication implemented?"` - Overview of the authentication flow and references to the relevant code
  - `"@workspace which API routes depend on this service?"` - Lists the routes that use the service in the selected code
  - `"How do I build this #codebase?"` - List the steps to build the project based on documentation, scripts, and configurations

## What sources are used for context?

To answer your question, workspace context searches through the same sources a developer would use when navigating a codebase in VS Code:

- All [indexable files](#what-content-is-included-in-the-workspace-index) in the workspace, except for files that are ignored by a `.gitignore` file
- Directory structure with nested folder and file names
- GitHub's code search index, if the workspace is a GitHub repository and [indexed by code search](https://docs.github.com/en/enterprise-cloud@latest/copilot/github-copilot-enterprise/copilot-chat-in-github/using-github-copilot-chat-in-githubcom#asking-a-question-about-a-specific-repository-file-or-symbol)
- Symbols and definitions in the workspace
- Currently selected text or visible text in the active editor

> [!NOTE]
> `.gitignore` is bypassed if you have a file open or have text selected within an ignored file.

## How does `@workspace` find the most relevant context

Your full VS Code workspace can be too large to pass entirely to GitHub Copilot for responding to your chat prompt. Instead, `@workspace` extracts the most relevant information from the different context sources to ground Copilot's answer.

First, `@workspace` determines which information is needed to answer your question, also including the conversation history, workspace structure, and currently selected code.

Next, it collects the context using different approaches, such as finding relevant code snippets by searching locally or by using [GitHub's code search](https://github.blog/2023-02-06-the-technology-behind-githubs-new-code-search), and using VS Code's language IntelliSense to add details like function signatures, parameters, and more.

Finally, this context is used by GitHub Copilot to answer your question. If the context is too large, only the most relevant parts of the context are used. The response is marked up with references to files, file ranges, and symbols. This enables you to link directly from the chat response to the corresponding information in your codebase. The code snippets that were provided to Copilot are listed as references in the response.

## Managing the workspace index

Copilot uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

You can view the type of index and its status in the Copilot status dashboard in the Status Bar.

![Screenshot showing the workspace index status in the Copilot status menu.](images/workspace-context/workspace-index-status.png)

### Remote index

If your code is hosted in a GitHub repository, you can build a remote index with [GitHub code search](https://docs.github.com/en/search-github/github-code-search/about-github-code-search) to enable AI to search your codebase quickly, even for large codebases.

To build a remote index for your workspace:

1. Sign in with your GitHub account in VS Code.

1. Run the **Build Remote Workspace Index** command in the Command Palette (`kb(workbench.action.showCommands))`.

    It may take some time for the remote index to be built, especially for large codebases. You can monitor the status of the remote index in the Copilot status dashboard in the Status Bar.

    You only need to build the remote index once. GitHub automatically keeps it up-to-date whenever you push code changes.

> [!IMPORTANT]
> Remote indexing requires a project with a git remote on GitHub. Make sure that you have pushed your code to GitHub too. The remote index works best if GitHub has a relatively up-to-date version of your code, so make sure to push your code to GitHub regularly.

### Local index

If you can't use a [remote index](#remote-index), Copilot can use an advanced semantic index that is stored on your local machine to provide fast, high quality search results. Currently, local indexes are limited to 2500 indexable files.

To build a local index:

- The project has less than 750 indexable files: Copilot automatically builds an advanced local index.

- The project has between 750 and 2500 indexable files: run the **Build local workspace index** command in the Command Palette (`kb(workbench.action.showCommands))`. This command only needs to be run once.

- The project has more than 2500 indexable files: see the [basic index](#basic-index) section below.

It may take some time to build the initial local index or update the index if many files have changed (such as when switching git branches). You can monitor the current local index status in the Copilot status dashboard in the Status Bar.

### Basic index

If your project does not have a [remote index](#remote-index) and has more than 2500 [indexable files](#what-content-is-included-in-the-workspace-index), Copilot falls back to using a basic index to search your codebase. This index uses simpler algorithms to search your codebase and has been optimized to work locally for larger codebases.

The basic index should work just fine for many questions. However, if you find that Copilot is struggling to answer questions about your codebase, try upgrading to a [remote index](#remote-index).

### What content is included in the workspace index

Copilot indexes relevant text files that are part of your current project. This is not limited to specific file types or programming languages, however Copilot automatically skips over some common file types that are typically not relevant to `@workspace` questions, such as `.tmp` or `.out` files. Copilot also excludes any files that are excluded from VS Code using the `setting(files.exclude)` setting or that are part of the `.gitignore` file.

Copilot also currently does not index binary files, such as images or PDFs.

## Tips for using workspace context

The way you phrase your question can significantly influence the quality of the context and the accuracy of the response. To optimize results, consider the following tips:

- Be specific and detailed in your question, avoiding vague or ambiguous terms like "what does this do" (where "this" could be interpreted as the last answer, current file, or whole project, etc.).
- Incorporate terms and concepts in your prompt that are likely to appear in your code or its documentation.
- Review the *used references* in the response to ensure that the files are relevant. Iterate on your question if necessary.
- Explicitly include relevant context by selecting code or mentioning chat variables such as `#editor`, `#selection`, or `#<file name>`.
- Responses can draw from multiple references, such as "find exceptions without a catch block" or "provide examples of how handleError is called". However, don't anticipate a comprehensive code analysis across your codebase, such as "how many times is this function invoked?" or "rectify all bugs in this project".
- Avoid assuming information beyond the code (for now), such as "who contributed to this file?" or "summarize review comments for this folder".

## Related resources

- Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
- Get started with the [Copilot Chat tutorial](/docs/copilot/chat/getting-started-chat.md)
- Learn more about [Copilot Chat](/docs/copilot/chat/copilot-chat.md)

```

