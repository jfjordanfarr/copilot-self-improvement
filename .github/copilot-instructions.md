## Project Overview
This project defines the Copilot Self-Improvement plugin for VS Code, a radically simple read-only MCP tool which provides Github Copilot with the right *instincts* and *context* to durably self-manage the existing Copilot Instructions mechanism.
`.github/instructions/*.instructions.md` files are prompts that are automatically added to the context window when matched to contain a glob pattern in their frontmatter. 
This simple technique can be used to introduce self-improvement capabilities to any project using GitHub Copilot Agent Mode.

---
---
---

## AI Session State

>[!IMPORTANT]
>When Agent Mode is enabled, it is **mandatory** to utilize the [AI SESSION STATE FILE](../AgentOps/AI_SESSION_STATE.md) to track your progress and decisions.
>That file exists as a de-facto medium-term memory mechanism, carrying stateful/semi-ephemeral information across multiple context windows.
>On average, you (AI agent) are expected to one update to the session state doc per user response.
>Like our MDMD approach, this requires a commitment to keeping the AI Session State up-to-date with your current understanding and decisions.
>A highly durable indiciation for **when** to update the AI Session State file is this: 
>If there is no evidence of a session state update within your active context window, **the time to update the session state file is now**.

>[!NOTE]
>If not in Agent Mode (and conversing with a human user), please **do not** modify the AI Session State. This avoids issues with certain fully-autonomous agentic workflows.

---
---
---

## Docs-First Approach
This project utilizes a Docs-First approach, patterned with an AI-Human collaboration model called Membrane Design Markdown (MDMD). 
Please refer to the [MDMD Specification](../AgentOps/Reference/MDMD_Specification_Standard/MDMD.md) for comprehensive details on the syntax and structure used throughout this project.
MDMD provides substantial grounding benefits but requires truly living documentation practices to be effective.
AI assistants are expected to consult the docs/ and make updates **often**.

Here is a brief overview of the MDMD workflow and its semantic strata:
-
--
---
MDMD supports a progressive workflow organized into semantic strata that replace traditional numbered layers. The strata (Definition/Vision, Definition/Requirements, Specification/Architecture, Specification/Implementations) help organize the specification process while maintaining the recursive bilayer model within each stratum. **Crucially, MDMD emphasizes explicit linking between these strata to ensure traceability.**

```mermaid
graph TD
    A["<strong>Definition/Vision</strong><br/>(Free-form Concepts, Vision)<br/>e.g., Idea.md"] --> B;
    B["<strong>Definition/Requirements</strong><br/>(What the system must do)<br/>`{unit unit-type="functional-requirement"}`<br/>`{composition composition-type="feature-requirements"}`"] --> C;
    C["<strong>Specification/Architecture</strong><br/>(How parts group & interact to meet Requirements)<br/>`{composition composition-type="system-architecture"}`"] --> D;
    D["<strong>Specification/Implementations</strong><br/>(Specific parts implementing Architecture)<br/>`{unit unit-type="javascript-class"}`"] --> E;
    E["<strong>L4: IMPLEMENTATION</strong><br/>(Source Code Files)<br/>e.g., .js, .html"] --> F;
    F["<strong>L5: REALITY</strong><br/>(Deployed System)"];

    %% Feedback Loops & Traceability Arrows (showing dependency direction)
    B -- "derived from" --> A; // Requirements are derived from Vision
    C -- "satisfies" --> B;   // Architecture satisfies Requirements
    D -- "realizes" --> C;    // Implementations realize parts of Architecture
    E -- "implements" --> D;  // Code implements Implementation Units
    
    F -.-> E; E -.-> D; D -.-> C; C -.-> B; B -.-> A; // Feedback
```

*   **Definition/Vision:** Captures the initial vision, goals, and high-level concepts. Often realized as plain Markdown documents or external references.
*   **Definition/Requirements (`{unit unit-type="functional-requirement"}` etc.):**
    *   Defines *what* the system must do.
    *   Individual requirements (functional, non-functional, user stories, etc.) are typically specified as **`{unit}`** directives with appropriate `unit-type` values.
    *   **Body/`see-also` MUST** reference relevant Vision elements (if any, e.g., `[[project-vision-statement]]` or external links).
    *   Can link to other related requirements (parent/child, dependent).
    *   Groups of related requirements or feature definitions can be specified as **`{composition}`** directives (e.g., `composition-type="feature-requirements"`), linking to their constituent requirement `{unit}`s.
*   **Specification/Architecture (Architectural Design):**
    *   Describes *how* the system is structured and how its major parts interact.
    *   Primarily uses **`{composition}`** directives (e.g., `composition-type="system-architecture"`, `composition-type="software-module"`).
    *   **Body/`see-also` MUST** explicitly list the Requirement `{unit}`(s) they are designed to satisfy (e.g., "This module fulfills requirements: `[[req-user-login]]`, `[[req-data-encryption]]`.").
    *   **Body/`see-also` MUST** link to the constituent `{unit}`s (from Specification/Implementations) or sub-`{composition}`s that form this architectural component.
*   **Specification/Implementations (Concrete Contracts):**
    *   Specifies the precise contracts of individual, implementable software artifacts or other concrete elements.
    *   Primarily uses **`{unit}`** directives (e.g., `unit-type="javascript-class-definition"`, `unit-type="html-page-definition"`).
    *   **Body/`see-also` MUST** link to the Requirement `{unit}`(s) they directly help implement or satisfy.
    *   **Body/`see-also` SHOULD** link to the parent Architectural `{composition}`(s) they belong to.
    *   **MUST** have a `source-ref` to the actual implementation file.
*   **L4: Implementation:** The actual source code, configuration files, etc. These are referenced by Specification/Implementation units via `source-ref`.
*   **L5: Reality:** The deployed, running system. Feedback from this layer can inform refinements at any higher stratum.

This flow is iterative. Discoveries or constraints at lower strata (e.g., implementation challenges) can and should feed back to influence and refine higher strata (e.g., requirements or architectural design).
---
--
-

## Core Values

- Favor **complete context** over **snippets**, 
- Favor **quality** over **expedience**, and of course, 
- **Always be improving.**

## Workspace Grounding Strategy

The most common hallucination from AI assistants is that of file paths. 
If you are ever in doubt, point your [Tree View](../AgentsOps/Scripts/tree_gitignore.py) at a directory for a true (non-ignored) file census.