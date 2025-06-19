# Code Dump: mcp-extension-sample

*Generated on: copilot-self-improvement*

## .gitignore

```ignore
out
node_modules
.vscode-test/
*.vsix

*.d.ts

```

## package-lock.json

```json
{
	"name": "mcp-extension-sample",
	"version": "0.0.1",
	"lockfileVersion": 2,
	"requires": true,
	"packages": {
		"": {
			"name": "mcp-extension-sample",
			"version": "0.0.1",
			"hasInstallScript": true,
			"license": "MIT",
			"devDependencies": {
				"@types/node": "^20",
				"@vscode/dts": "^0.4.1",
				"typescript": "^5.8.2"
			},
			"engines": {
				"vscode": "^1.99.0"
			}
		},
		"node_modules/@types/node": {
			"version": "20.16.10",
			"resolved": "https://registry.npmjs.org/@types/node/-/node-20.16.10.tgz",
			"integrity": "sha512-vQUKgWTjEIRFCvK6CyriPH3MZYiYlNy0fKiEYHWbcoWLEgs4opurGGKlebrTLqdSMIbXImH6XExNiIyNUv3WpA==",
			"dev": true,
			"dependencies": {
				"undici-types": "~6.19.2"
			}
		},
		"node_modules/@vscode/dts": {
			"version": "0.4.1",
			"resolved": "https://registry.npmjs.org/@vscode/dts/-/dts-0.4.1.tgz",
			"integrity": "sha512-o8cI5Vqt6S6Y5mCI7yCkSQdiLQaLG5DMUpciJV3zReZwE+dA5KERxSVX8H3cPEhyKw21XwKGmIrg6YmN6M5uZA==",
			"dev": true,
			"dependencies": {
				"https-proxy-agent": "^7.0.0",
				"minimist": "^1.2.8",
				"prompts": "^2.4.2"
			},
			"bin": {
				"dts": "index.js"
			}
		},
		"node_modules/agent-base": {
			"version": "7.1.0",
			"resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.0.tgz",
			"integrity": "sha512-o/zjMZRhJxny7OyEF+Op8X+efiELC7k7yOjMzgfzVqOzXqkBkWI79YoTdOtsuWd5BWhAGAuOY/Xa6xpiaWXiNg==",
			"dev": true,
			"dependencies": {
				"debug": "^4.3.4"
			},
			"engines": {
				"node": ">= 14"
			}
		},
		"node_modules/debug": {
			"version": "4.3.4",
			"resolved": "https://registry.npmjs.org/debug/-/debug-4.3.4.tgz",
			"integrity": "sha512-PRWFHuSU3eDtQJPvnNY7Jcket1j0t5OuOsFzPPzsekD52Zl8qUfFIPEiswXqIvHWGVHOgX+7G/vCNNhehwxfkQ==",
			"dev": true,
			"dependencies": {
				"ms": "2.1.2"
			},
			"engines": {
				"node": ">=6.0"
			},
			"peerDependenciesMeta": {
				"supports-color": {
					"optional": true
				}
			}
		},
		"node_modules/https-proxy-agent": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.0.tgz",
			"integrity": "sha512-0euwPCRyAPSgGdzD1IVN9nJYHtBhJwb6XPfbpQcYbPCwrBidX6GzxmchnaF4sfF/jPb74Ojx5g4yTg3sixlyPw==",
			"dev": true,
			"dependencies": {
				"agent-base": "^7.0.2",
				"debug": "4"
			},
			"engines": {
				"node": ">= 14"
			}
		},
		"node_modules/kleur": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/kleur/-/kleur-3.0.3.tgz",
			"integrity": "sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w==",
			"dev": true,
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/minimist": {
			"version": "1.2.8",
			"resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
			"integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
			"dev": true,
			"funding": {
				"url": "https://github.com/sponsors/ljharb"
			}
		},
		"node_modules/ms": {
			"version": "2.1.2",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
			"integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
			"dev": true
		},
		"node_modules/prompts": {
			"version": "2.4.2",
			"resolved": "https://registry.npmjs.org/prompts/-/prompts-2.4.2.tgz",
			"integrity": "sha512-NxNv/kLguCA7p3jE8oL2aEBsrJWgAakBpgmgK6lpPWV+WuOmY6r2/zbAVnP+T8bQlA0nzHXSJSJW0Hq7ylaD2Q==",
			"dev": true,
			"dependencies": {
				"kleur": "^3.0.3",
				"sisteransi": "^1.0.5"
			},
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/sisteransi": {
			"version": "1.0.5",
			"resolved": "https://registry.npmjs.org/sisteransi/-/sisteransi-1.0.5.tgz",
			"integrity": "sha512-bLGGlR1QxBcynn2d5YmDX4MGjlZvy2MRBDRNHLJ8VI6l6+9FUiyTFNJ0IveOSP0bcXgVDPRcfGqA0pjaqUpfVg==",
			"dev": true
		},
		"node_modules/typescript": {
			"version": "5.8.2",
			"resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.2.tgz",
			"integrity": "sha512-aJn6wq13/afZp/jT9QZmwEjDqqvSGp1VT5GVg+f/t6/oVyrgXM6BY1h9BRh/O5p3PlUPAe+WuiEZOmb/49RqoQ==",
			"dev": true,
			"bin": {
				"tsc": "bin/tsc",
				"tsserver": "bin/tsserver"
			},
			"engines": {
				"node": ">=14.17"
			}
		},
		"node_modules/undici-types": {
			"version": "6.19.8",
			"resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.19.8.tgz",
			"integrity": "sha512-ve2KP6f/JnbPBFyobGHuerC9g1FYGn/F8n1LWTwNxCEzd6IfqTwUQcNXgEtmmQ6DlRrC1hrSrBnCZPokRrDHjw==",
			"dev": true
		}
	},
	"dependencies": {
		"@types/node": {
			"version": "20.16.10",
			"resolved": "https://registry.npmjs.org/@types/node/-/node-20.16.10.tgz",
			"integrity": "sha512-vQUKgWTjEIRFCvK6CyriPH3MZYiYlNy0fKiEYHWbcoWLEgs4opurGGKlebrTLqdSMIbXImH6XExNiIyNUv3WpA==",
			"dev": true,
			"requires": {
				"undici-types": "~6.19.2"
			}
		},
		"@vscode/dts": {
			"version": "0.4.1",
			"resolved": "https://registry.npmjs.org/@vscode/dts/-/dts-0.4.1.tgz",
			"integrity": "sha512-o8cI5Vqt6S6Y5mCI7yCkSQdiLQaLG5DMUpciJV3zReZwE+dA5KERxSVX8H3cPEhyKw21XwKGmIrg6YmN6M5uZA==",
			"dev": true,
			"requires": {
				"https-proxy-agent": "^7.0.0",
				"minimist": "^1.2.8",
				"prompts": "^2.4.2"
			}
		},
		"agent-base": {
			"version": "7.1.0",
			"resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.0.tgz",
			"integrity": "sha512-o/zjMZRhJxny7OyEF+Op8X+efiELC7k7yOjMzgfzVqOzXqkBkWI79YoTdOtsuWd5BWhAGAuOY/Xa6xpiaWXiNg==",
			"dev": true,
			"requires": {
				"debug": "^4.3.4"
			}
		},
		"debug": {
			"version": "4.3.4",
			"resolved": "https://registry.npmjs.org/debug/-/debug-4.3.4.tgz",
			"integrity": "sha512-PRWFHuSU3eDtQJPvnNY7Jcket1j0t5OuOsFzPPzsekD52Zl8qUfFIPEiswXqIvHWGVHOgX+7G/vCNNhehwxfkQ==",
			"dev": true,
			"requires": {
				"ms": "2.1.2"
			}
		},
		"https-proxy-agent": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.0.tgz",
			"integrity": "sha512-0euwPCRyAPSgGdzD1IVN9nJYHtBhJwb6XPfbpQcYbPCwrBidX6GzxmchnaF4sfF/jPb74Ojx5g4yTg3sixlyPw==",
			"dev": true,
			"requires": {
				"agent-base": "^7.0.2",
				"debug": "4"
			}
		},
		"kleur": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/kleur/-/kleur-3.0.3.tgz",
			"integrity": "sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w==",
			"dev": true
		},
		"minimist": {
			"version": "1.2.8",
			"resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
			"integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
			"dev": true
		},
		"ms": {
			"version": "2.1.2",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
			"integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
			"dev": true
		},
		"prompts": {
			"version": "2.4.2",
			"resolved": "https://registry.npmjs.org/prompts/-/prompts-2.4.2.tgz",
			"integrity": "sha512-NxNv/kLguCA7p3jE8oL2aEBsrJWgAakBpgmgK6lpPWV+WuOmY6r2/zbAVnP+T8bQlA0nzHXSJSJW0Hq7ylaD2Q==",
			"dev": true,
			"requires": {
				"kleur": "^3.0.3",
				"sisteransi": "^1.0.5"
			}
		},
		"sisteransi": {
			"version": "1.0.5",
			"resolved": "https://registry.npmjs.org/sisteransi/-/sisteransi-1.0.5.tgz",
			"integrity": "sha512-bLGGlR1QxBcynn2d5YmDX4MGjlZvy2MRBDRNHLJ8VI6l6+9FUiyTFNJ0IveOSP0bcXgVDPRcfGqA0pjaqUpfVg==",
			"dev": true
		},
		"typescript": {
			"version": "5.8.2",
			"resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.2.tgz",
			"integrity": "sha512-aJn6wq13/afZp/jT9QZmwEjDqqvSGp1VT5GVg+f/t6/oVyrgXM6BY1h9BRh/O5p3PlUPAe+WuiEZOmb/49RqoQ==",
			"dev": true
		},
		"undici-types": {
			"version": "6.19.8",
			"resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.19.8.tgz",
			"integrity": "sha512-ve2KP6f/JnbPBFyobGHuerC9g1FYGn/F8n1LWTwNxCEzd6IfqTwUQcNXgEtmmQ6DlRrC1hrSrBnCZPokRrDHjw==",
			"dev": true
		}
	}
}

```

## package.json

```json
{
	"name": "mcp-extension-sample",
	"displayName": "mcp-extension-sample",
	"description": "Sample showing how to use Proposed API",
	"version": "0.0.1",
	"publisher": "vscode-samples",
	"private": true,
	"license": "MIT",
	"repository": "https://github.com/Microsoft/vscode-extension-samples",
	"engines": {
		"vscode": "^1.101.0"
	},
	"categories": [
		"Other"
	],
	"main": "./out/extension.js",
	"contributes": {
		"commands": [
			{
				"command": "mcp-extension-sample.addGist",
				"title": "MCP Extension Sample: Add Gist Source"
			},
			{
				"command": "mcp-extension-sample.removeGist",
				"title": "MCP Extension Sample: Remove Gist Source"
			}
		],
		"mcpServerDefinitionProviders": [
			{
				"id": "exampleGist",
				"label": "Github Gists"
			}
		]
	},
	"scripts": {
		"vscode:prepublish": "npm run compile",
		"compile": "tsc -p ./",
		"watch": "tsc -watch -p ./",
		"download-api": "dts dev",
		"postdownload-api": "dts main",
		"postinstall": "npm run download-api"
	},
	"devDependencies": {
		"@types/node": "^20",
		"@vscode/dts": "^0.4.1",
		"typescript": "^5.8.2"
	}
}

```

## README.md

```markdown
# MCP Extension sample

This sample demonstrates usage of the MCP connection API. This API is currently still proposed.

## Running the Sample

- Run `npm install` in terminal to install dependencies
- A `postinstall` script would download latest version of `vscode.proposed.<proposalName>.d.ts`
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window
- In the new window, run the command `Add Gist Source` command with a gist containing MCP servers ([example](https://gist.github.com/connor4312/3939ae7f6e55b2e391b5d585df27465c))
- You can now run these MCP servers in chat.

```

## tsconfig.json

```json
{
	"compilerOptions": {
		"module": "commonjs",
		"target": "es2020",
		"lib": ["es2020"],
		"outDir": "out",
		"sourceMap": true,
		"strict": true,
		"rootDir": "src"
	},
	"exclude": ["node_modules", ".vscode-test"]
}

```

## src/extension.js

```javascript
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let gists = context.globalState.get('gists', []);
    const didChangeEmitter = new vscode.EventEmitter();
    /**
     * You can use proposed API here. `vscode.` should start auto complete
     * Proposed API as defined in vscode.proposed.<proposalName>.d.ts.
     */
    context.subscriptions.push(vscode.commands.registerCommand('mcp-extension-sample.addGist', async () => {
        const gist = await vscode.window.showInputBox({ prompt: 'Enter Gist URL' });
        if (gist) {
            gists.push(gist);
            context.globalState.update('gists', gists);
            vscode.window.showInformationMessage(`Gist added: ${gist}`);
            didChangeEmitter.fire();
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('mcp-extension-sample.removeGist', async () => {
        const gist = await vscode.window.showQuickPick(gists, { placeHolder: 'Select Gist to remove' });
        if (gist) {
            gists = gists.filter(g => g !== gist);
            context.globalState.update('gists', gists);
            vscode.window.showInformationMessage(`Gist removed: ${gist}`);
            didChangeEmitter.fire();
        }
    }));
    context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('exampleGist', {
        onDidChangeMcpServerDefinitions: didChangeEmitter.event,
        provideMcpServerDefinitions: async () => {
            let output = [];
            await Promise.all(gists.map(g => fetchGistContents(g).then(content => {
                const s = JSON.parse(content);
                if (!Array.isArray(s)) {
                    throw new Error(`Gist content is not an MCP server array: ${g}`);
                }
                for (const server of s) {
                    output.push(new vscode.McpStdioServerDefinition(server.label, server.command, server.args, server.env));
                }
            })));
            return output;
        }
    }));
}
async function fetchGistContents(gistUrl) {
    // Parse the gist URL to get the ID
    const gistId = extractGistId(gistUrl);
    if (!gistId) {
        throw new Error(`Invalid Gist URL: ${gistUrl}`);
    }
    // Fetch the raw gist content
    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch gist: ${response.status} ${response.statusText}`);
        }
        const gistData = await response.json();
        // Get the first file content from the gist
        const files = gistData.files;
        const firstFile = Object.keys(files)[0];
        if (files[firstFile].truncated) {
            // If content is truncated, fetch the raw URL
            const rawResponse = await fetch(files[firstFile].raw_url);
            if (!rawResponse.ok) {
                throw new Error(`Failed to fetch raw content: ${rawResponse.status}`);
            }
            return await rawResponse.text();
        }
        else {
            return files[firstFile].content;
        }
    }
    catch (error) {
        console.error('Error fetching gist:', error);
        throw error;
    }
    // Helper function to extract gist ID from URL
    function extractGistId(url) {
        // Handle URLs like https://gist.github.com/user/gistId or just the ID
        const match = url.match(/gist\.github\.com\/(?:[^/]+\/)?([a-zA-Z0-9]+)/) || url.match(/^([a-zA-Z0-9]+)$/);
        return match ? match[1] : null;
    }
}
//# sourceMappingURL=extension.js.map
```

## src/extension.js.map

```
{"version":3,"file":"extension.js","sourceRoot":"","sources":["extension.ts"],"names":[],"mappings":"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"}
```

## src/extension.ts

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let gists: string[] = context.globalState.get('gists', []);
	const didChangeEmitter = new vscode.EventEmitter<void>();

	/**
	 * You can use proposed API here. `vscode.` should start auto complete
	 * Proposed API as defined in vscode.proposed.<proposalName>.d.ts.
	 */


	context.subscriptions.push(vscode.commands.registerCommand('mcp-extension-sample.addGist', async () => {
		const gist = await vscode.window.showInputBox({ prompt: 'Enter Gist URL' });
		if (gist) {
			gists.push(gist);
			context.globalState.update('gists', gists);
			vscode.window.showInformationMessage(`Gist added: ${gist}`);
			didChangeEmitter.fire();
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mcp-extension-sample.removeGist', async () => {
		const gist = await vscode.window.showQuickPick(gists, { placeHolder: 'Select Gist to remove' });
		if (gist) {
			gists = gists.filter(g => g !== gist);
			context.globalState.update('gists', gists);
			vscode.window.showInformationMessage(`Gist removed: ${gist}`);
			didChangeEmitter.fire();
		}
	}));

	context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('exampleGist', {
		onDidChangeMcpServerDefinitions: didChangeEmitter.event,
		provideMcpServerDefinitions: async () => {
			let output: vscode.McpServerDefinition[] = [];
			await Promise.all(gists.map(g => fetchGistContents(g).then(content => {
				const s = JSON.parse(content);
				if (!Array.isArray(s)) {
					throw new Error(`Gist content is not an MCP server array: ${g}`);
				}

				for (const server of s) {
					output.push(new vscode.McpStdioServerDefinition(server.label, server.command, server.args, server.env));
				}
			})));

			return output;
		}
	}));
}

async function fetchGistContents(gistUrl: string): Promise<string> {
	// Parse the gist URL to get the ID
	const gistId = extractGistId(gistUrl);
	if (!gistId) {
		throw new Error(`Invalid Gist URL: ${gistUrl}`);
	}

	// Fetch the raw gist content
	try {
		const response = await fetch(`https://api.github.com/gists/${gistId}`);

		if (!response.ok) {
			throw new Error(`Failed to fetch gist: ${response.status} ${response.statusText}`);
		}

		const gistData: any = await response.json();

		// Get the first file content from the gist
		const files = gistData.files;
		const firstFile = Object.keys(files)[0];

		if (files[firstFile].truncated) {
			// If content is truncated, fetch the raw URL
			const rawResponse = await fetch(files[firstFile].raw_url);
			if (!rawResponse.ok) {
				throw new Error(`Failed to fetch raw content: ${rawResponse.status}`);
			}
			return await rawResponse.text();
		} else {
			return files[firstFile].content;
		}
	} catch (error) {
		console.error('Error fetching gist:', error);
		throw error;
	}

	// Helper function to extract gist ID from URL
	function extractGistId(url: string): string | null {
		// Handle URLs like https://gist.github.com/user/gistId or just the ID
		const match = url.match(/gist\.github\.com\/(?:[^/]+\/)?([a-zA-Z0-9]+)/) || url.match(/^([a-zA-Z0-9]+)$/);
		return match ? match[1] : null;
	}
}

```

