::: {composition}
id: "mdmd-primitive-unit-directive-spec"
title: "MDMD Unit Directive Specification"
composition-type: "language-primitive-specification"
status: "stable"
version: "0.2"
brief: "Specification for the MDMD '{unit}' directive supporting recursive bilayer/strata model."
see-also: ["[[mdmd-spec-main]]", "[[mdmd-concept-unit-intent]]", "[[mdmd-primitive-composition-directive-spec]]"]

This composition defines the MDMD `{unit}` directive, which is a fundamental
building block for concrete contract specifications within the recursive bilayer/strata
architecture. The `{unit}` directive represents the "Inner Leaflet" of each stratum's
bilayer, providing atomic, implementable specifications that interface closely with
concrete implementation details.

## 1. Purpose and Strata Context

The `{unit}` directive is designed to encapsulate a single, discrete, specifiable
building block of a system across different abstraction strata:

- **Definition/Vision Stratum**: Individual vision statements, specific goals
- **Definition/Requirements Stratum**: Atomic functional requirements, user stories  
- **Specification/Architecture Stratum**: Interface definitions, data schemas
- **Specification/Implementations Stratum**: Class definitions, file specifications with `source-ref`

Within each stratum, `{unit}` directives form the "Inner Leaflet" of the recursive bilayer,
complementing `{composition}` directives (the "Outer Leaflet") that provide overview and grouping.

Reference: [[mdmd-concept-unit-intent]]

## 2. MyST Directive Implementation Contract

The following `{unit}` defines the contract for the `DirectiveSpec` object that our
MyST JavaScript plugin must export to implement the MDMD `{unit}` directive.

::: {unit}
id: "myst-directive-spec-for-mdmd-unit"
title: "MyST DirectiveSpec for MDMD Unit"
unit-type: "typescript-interface-definition"
language: "typescript"
brief: "The MyST DirectiveSpec contract for the MDMD {unit} directive with enhanced strata support."
source-ref: "src/directives/unitDirective.ts" // Our target TS file

This `DirectiveSpec` from `myst-common` outlines the expected structure for
defining the `{unit}` directive within a MyST JavaScript plugin, supporting
the recursive bilayer/strata model with enhanced ID conventions and cross-reference patterns.

```typescript
import type { DirectiveSpec, DirectiveData, GenericNode } from 'myst-common';

export const unitDirectiveSpec: DirectiveSpec = {
  name: 'unit',
  // arg: undefined, // No positional arg for v0.2
  options: {
    id: { 
      type: String, 
      required: true, 
      doc: 'Globally unique identifier using kebab-case format (e.g., "user-service-class").' 
    },
    title: { 
      type: String, 
      doc: 'Human-readable display title (e.g., "User Service Class") for navigation and documentation.' 
    },
    'unit-type': { 
      type: String, 
      required: true, 
      doc: 'Semantic type tag guiding content interpretation (e.g., "functional-requirement", "javascript-class-definition").' 
    },
    language: { 
      type: String, 
      doc: 'Language of the main content block (e.g., "javascript", "typescript", "markdown").' 
    },
    status: { 
      type: String, 
      doc: 'Lifecycle status (idea | draft | review | stable | deprecated).' 
    },
    version: { 
      type: String, 
      doc: 'Unit version identifier.' 
    },
    brief: { 
      type: String, 
      doc: 'Concise one-line summary of the unit\'s purpose.' 
    },
    'source-ref': { 
      type: String, 
      doc: 'Relative path to implementation file for bi-directional synchronization.' 
    },
    'see-also': { 
      type: String, 
      doc: 'Cross-references using [[id]] format or external links (comma-separated or YAML list).' 
    }
  },
  body: {
    type: String, // Request raw string body from MyST
    required: false,
    doc: 'Markdown prose and primary fenced code block defining the unit contract with [[id]] cross-references.'
  },
  run(data: DirectiveData): GenericNode[] {
    // Implementation TBD:
    // 1. Parse data.options ensuring kebab-case id validation
    // 2. Parse data.body (string) to separate leading/trailing MD and code block
    // 3. Process [[id]] cross-references for global scope resolution
    // 4. Construct and return an 'mdmdUnit' AST node with enhanced metadata
    return []; // Placeholder
  }
};
```

**Enhanced parsing logic for `run(data)` function:**

- **ID Validation**: Ensure `data.options.id` follows kebab-case format
- **Title Handling**: Use `title` attribute for display, fallback to formatted `id`
- **Cross-Reference Processing**: Extract and validate `[[id]]` links in body text
- **Strata Awareness**: Support different content patterns based on `unit-type`
- **Source-Ref Validation**: Ensure relative paths resolve correctly within project structure
:::

## 3. Target MDMD Unit AST Node Structure

This `{unit}` describes the conceptual structure of the `mdmdUnit` AST node that our plugin's `run()` function should generate.

::: {unit}
id: "ast-node-mdmd-unit"
title: "MDMD Unit AST Node Structure"
unit-type: "typescript-interface-definition"
language: "typescript"
brief: "Target AST node structure for a parsed MDMD {unit} with enhanced metadata support."

```typescript
interface MdmdUnitNodeProps {
  unitId: string;        // Kebab-case globally unique identifier
  unitTitle?: string;    // Human-readable display title
  unitType: string;      // Semantic type tag for content interpretation
  unitLanguage?: string; // Primary language of content block
  status?: string;       // Lifecycle status
  version?: string;      // Version identifier
  brief?: string;        // One-line summary
  sourceRef?: string;    // Relative path to implementation file
  seeAlso?: string[];    // Array of cross-references (parsed from string option)

  // Enhanced content from the directive's body
  codeBlockLang?: string;  // Language of primary code block
  codeBlockValue?: string; // Content of primary code block
  
  // Strata context
  stratum?: 'definition-vision' | 'definition-requirements' | 'specification-architecture' | 'specification-implementations';
}

interface MdmdUnitNode extends GenericNode { // Extends myst-common's GenericNode
  type: 'mdmdUnit';
  children: GenericNode[]; // Parsed leading/trailing Markdown + structured code content
  data?: MdmdUnitNodeProps; // Enhanced metadata with strata awareness
}
```

**Enhanced AST structure features:**

- **Title Support**: Separate `unitTitle` field for human-readable display names
- **Cross-Reference Array**: `seeAlso` parsed from string format to structured array  
- **Strata Context**: Optional `stratum` field for tooling that needs layer awareness
- **Validation Ready**: Structure supports kebab-case ID validation and [[id]] link processing
- **Source Integration**: `sourceRef` enables bi-directional synchronization with implementation files

**Code Block Handling Options:**
1. **Embedded Properties**: Store code block content in `MdmdUnitNodeProps` (current approach)
2. **Child Node**: Create standard MyST `code` node as child with enhanced metadata
3. **Hybrid**: Use properties for metadata, child nodes for rendering/processing
:::
:::
