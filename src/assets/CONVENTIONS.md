# Conventions for `*.selfImprovement.instructions.md` Files

## Preface

Github Copilot "Instructions Files" are simple markdown documents whose contents are automatically shown to Github Copilot during operations involving files that match a glob pattern in the YAML frontmatter called `applyTo`. This simple mechanism, used properly, is a powerful and capable driver of self-improvement. 

The Copilot Self-Improvement plugin is a radically simple readonly helper designed to provide Github Copilot with the right **instincts** for **when** and **how** to use these instructions files well. Framed in terms of software, this Conventions document constitutes the "logic" for the plugin, and the InstructionsFileListings represent the "data". 

Throughout the course of any software development project, developers accumulate a repertoire of hard-learned lessons. However, AI assistants **do not**. **Unless they use the Instructions Files mechanism**, the fruits of productive struggle are lost almost immediately to the ever-sliding context window. 

## Overview

**Your Role as GitHub Copilot:** You are the **author and maintainer** of the content within these instruction files. This tool helps you discover existing instructions and provides these conventions. You are responsible for reading the full content of relevant instruction files and for creating or modifying them (including their frontmatter and Markdown body) based on user requests or your self-improvement needs. 

## Conventions

### **⚠️ Critical Considerations for Authorship ⚠️**

*   **Instructions MUST Be "Durably True":**
    *   The guidance you encode into these files should reflect stable, enduring truths about the project's context, coding standards, architectural decisions, or idiomatic patterns.
    *   Avoid encoding transient preferences, temporary workarounds, or highly specific details that are likely to change frequently. The goal is to build a reliable, long-term knowledge base for yourself.
    *   Remember: **With great power comes great responsibility.** These instructions are an enormously powerful mechanism for self-improvement **or self-degradation** depending on the quality of their **contents** and their **patterns**. Incorrect or outdated instructions can lead to you providing subtly flawed assistance that is difficult for users to debug.

*   **`applyTo` Glob Patterns Require Extreme Care:**
    *   The `applyTo` frontmatter field is **CRITICAL**. It dictates when a specific set of instructions becomes active in your context.
    *   **Specificity is Key:** Strive for the most precise glob pattern possible. Overly broad patterns (e.g., `**/*` or `src/**/*`) can lead to irrelevant instructions being applied, causing confusion or incorrect suggestions.
    *   **Reason Deeply:** Before setting or modifying an `applyTo` pattern, carefully consider the exact scope of files the instruction should affect. Think about file types, directory structures, and naming conventions.
    *   **Consequences of Poor Glob Patterns:** Imprecise glob patterns are a primary source of "durable incorrect behaviors." If an instruction is wrongly applied due to a bad glob, you might persistently make the same mistake or offer unhelpful advice in contexts where it doesn't belong. This can be very confusing for the user and hard to trace back to the source instruction file.
    *   **Iterate and Refine:** If you suspect an instruction is misbehaving, one of the first things to check (and ask the user about) is its `applyTo` glob pattern.

*   **Power and Debugging:**
    *   This instruction mechanism is powerful, allowing for significant, tailored improvements to your behavior within a project.
    *   However, because these instructions directly influence your reasoning, issues arising from poorly written or misapplied instructions can be subtle and challenging to debug. Always prioritize clarity, precision, and the "durably true" principle.

### **File System and Format Details:**

*   **Location:** Files MUST be placed in the `{workspaceRoot}/.github/instructions/` directory.
*   **Naming Convention:** Files MUST use the suffix `*.selfImprovement.instructions.md`.
    *   Example: `react-component-guidelines.selfImprovement.instructions.md`
*   **Format:** Files are Markdown documents with YAML frontmatter.

### **YAML Frontmatter Fields (Authored by You, GitHub Copilot):**

```yaml
---
# REQUIRED. A meticulously crafted glob pattern (e.g., "src/components/**/*.tsx", "tests/unit/**/*.py") 
# that specifies EXACTLY which files this instruction set applies to.
# The instruction content is automatically shown to you when files matching this glob are being handled.
# If this field is missing or empty when read by the tool, it will default to '**/*', but YOU SHOULD ALWAYS AIM FOR MAXIMUM SPECIFICITY.
# The specificity of the glob pattern should be "right-sized", with the knowledge that there **will** exist valid situations where instructions are true:
# - at the single file level
# - at the entire workspace level
# Substantial reasoning should be applied to the authorship of this field, thoroughly considering possible knock-on consequences.
applyTo: string 

# REQUIRED. A brief, clear description that definitively answers **why this file exists**. 
# This field is surfaced to the chat UI on hover and should be concise, ideally one sentence.
description: string

# OPTIONAL. If you include a 'title' in the frontmatter, this tool will use it as the primary source for the 'title' metadata field it provides. 
# Otherwise, the title is derived from the following fallbacks, in order:
# - The first H1-level hashtag string
# - The first line after the close of the YAML frontmatter
# - The file name as per filesystem
title?: string 
---
```
*(Note: Other metadata fields like `lastModified`, `filePath`, `uri`, and `name` are measured/derived by this tool when it lists existing files and should not be manually set by you in the frontmatter of new or modified files.)*

### **Markdown Body (Content Authored by You, GitHub Copilot):**

The main body of the file (after the frontmatter) contains the actual natural language instructions for yourself, written in standard Markdown. This is where you codify the "durably true" contextualized guidance.

#### **Example File (Illustrating Your Authorship):**

Filename: `src/.github/instructions/api-error-handling.selfImprovement.instructions.md`

```markdown
---
applyTo: "src/services/apiClient.ts"
description: "Standardize error handling for API calls made via apiClient.ts."
title: "API Client Error Handling Standards"
---

## API Client Error Handling

When making calls using `apiClient.ts`:

1.  Always wrap API calls in a `try...catch` block.
2.  For 401 errors, trigger a re-authentication flow.
3.  For 403 errors, notify the user about permission issues.
4.  For 5xx errors, implement a retry mechanism with exponential backoff.
5.  Log all unexpected errors to the central logging service.
```

### **Summary of What This Tool Provides You:**
This tool (`copilotSelfImprovement-getInstructionsAndConventions`) will:
1.  List all existing `*.selfImprovement.instructions.md` files found in `.github/instructions/`.
2.  For each file, provide metadata: `name`, `uri`, `filePath`, `applyTo`, `description`, `title`, `lastModified`.
3.  Provide these conventions (the content of this document) to guide your authorship.

Your responsibility is to use this information to understand current guidance and to correctly author new or modified instruction files when requested or when you identify a need for self-correction.

## Maintaining Instructions

In spite of your best efforts authoring meticulous instructions files, reality will often push back with its own opinions. Project requirements may change, attempts or ideas may not pan out, components may be depricated, etc.

It is your duty to ensure that **whenever you are certain of an instructions file's outdatedness or incorrectness, you make a dedicated effort to fix it.** 

## **⚠️ User Approval Required ⚠️**

These instructions are precious artifacts, so approval of the user is required whenever you wish to create, modify, or delete them.