import * as vscode from 'vscode';
import { readAllInstructionFiles, InstructionFileEntry } from './fileHandler';

interface InstructionToolInput {
    // Reflecting empty schema from package.json for now
}

interface InstructionsAndConventions {
    instructionFiles: InstructionFileEntry[];
    conventions: string;
}

async function getConventionDetails(context: vscode.ExtensionContext): Promise<string> {
    console.log('Copilot Self-Improvement: Attempting to load CONVENTIONS.md');
    const conventionsPath = vscode.Uri.joinPath(context.extensionUri, 'dist', 'assets', 'CONVENTIONS.md');
    try {
        const contentBytes = await vscode.workspace.fs.readFile(conventionsPath);
        const conventionsContent = Buffer.from(contentBytes).toString('utf-8');
        console.log('Copilot Self-Improvement: CONVENTIONS.md loaded successfully.');
        return conventionsContent;
    } catch (error) {
        const errorMessage = `Copilot Self-Improvement: Failed to load CONVENTIONS.md: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMessage);
        return `Error: Could not load convention details. Critical conventions are missing. Details: ${errorMessage}`;
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Copilot Self-Improvement: Extension activating...');

    const toolNameFromPackageJson = 'csi_getInstructionsAndConventions'; // Updated to match package.json

    const tool: vscode.LanguageModelTool<InstructionToolInput> = {
        invoke: async (
            options: vscode.LanguageModelToolInvocationOptions<InstructionToolInput>,
            token: vscode.CancellationToken
        ): Promise<vscode.LanguageModelToolResult> => {
            console.log(`Copilot Self-Improvement: Tool "${toolNameFromPackageJson}" invoked with options:`, options.input);
            
            try {
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (!workspaceFolders || workspaceFolders.length === 0) {
                    console.warn("Copilot Self-Improvement: No workspace folder is open.");
                    throw new Error("No workspace folder is open. Cannot determine instruction file locations.");
                }
                const workspaceRoot = workspaceFolders[0].uri.fsPath;
                console.log(`Copilot Self-Improvement: Workspace root: ${workspaceRoot}`);

                const defaultInstructionLocation = '.github/instructions';
                const instructionLocationsConfig = {
                    [defaultInstructionLocation]: true
                };

                const files = await readAllInstructionFiles(workspaceRoot, instructionLocationsConfig);
                console.log(`Copilot Self-Improvement: Found ${files.length} instruction files.`);
                const conventions = await getConventionDetails(context);

                if (token.isCancellationRequested) {
                    console.log('Copilot Self-Improvement: Tool invocation cancelled.');
                    throw new vscode.CancellationError();
                }

                const resultData: InstructionsAndConventions = { instructionFiles: files, conventions };
                const resultJsonString = JSON.stringify(resultData, null, 2);
                console.log('Copilot Self-Improvement: Tool returning data:', resultJsonString);
                
                return new vscode.LanguageModelToolResult([
                    new vscode.LanguageModelTextPart(resultJsonString)
                ]);

            } catch (e: any) {
                const errorMessage = e instanceof Error ? e.message : String(e);
                console.error('Copilot Self-Improvement: Error invoking tool:', errorMessage);
                return new vscode.LanguageModelToolResult([
                    new vscode.LanguageModelTextPart(`Error: ${errorMessage}`)
                ]);
            }
        },
        
        prepareInvocation: async (
            options: vscode.LanguageModelToolInvocationPrepareOptions<InstructionToolInput>,
            token: vscode.CancellationToken
        ): Promise<vscode.PreparedToolInvocation> => { 
            console.log('Copilot Self-Improvement: Preparing tool invocation...');
            const confirmationMessage: vscode.LanguageModelToolConfirmationMessages = {
                title: 'Access Self-Improvement Instructions & Conventions',
                message: new vscode.MarkdownString(
                    `Allow 'Copilot Self-Improvement' to list instruction files from your '.github/instructions/' directory and provide conventions for their use? This helps Copilot align with project standards.`
                ),
            };
            return {
                confirmationMessages: confirmationMessage, 
            };
        }
    };

    try {
        context.subscriptions.push(
            vscode.lm.registerTool(toolNameFromPackageJson, tool)
        );
        console.log(`Copilot Self-Improvement: Tool "${toolNameFromPackageJson}" registered successfully.`);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Copilot Self-Improvement: Failed to register tool:', errorMessage);
        vscode.window.showErrorMessage(`Copilot Self-Improvement: Failed to register tool. ${errorMessage}`);
    }

    context.subscriptions.push(vscode.commands.registerCommand('copilot-self-improvement.listLMTTools', () => {
        console.log('CSI: Debug command "copilot-self-improvement.listLMTTools" executed.');
        console.log('CSI: Listing vscode.lm.tools:');
        if (vscode.lm.tools && Array.isArray(vscode.lm.tools)) {
            if (vscode.lm.tools.length === 0) {
                console.log('CSI: vscode.lm.tools is an empty array.');
            }
            vscode.lm.tools.forEach(t => {
                console.log(`  Tool Name: ${t.name}`);
                console.log(`    Description: ${t.description}`);
                console.log(`    Input Schema: ${JSON.stringify(t.inputSchema)}`);
                if (t.tags) {
                    console.log(`    Tags: ${t.tags.join(', ')}`);
                } else {
                    console.log(`    Tags: undefined`);
                }
            });
        } else {
            console.log('CSI: vscode.lm.tools is undefined or not an array.');
        }
        vscode.window.showInformationMessage(`Listed LM tools to Debug Console. Found: ${vscode.lm.tools?.length || 0} tools.`);
    }));
    console.log('Copilot Self-Improvement: Debug command "listLMTTools" registered.');

    console.log('Copilot Self-Improvement: Activation complete.');
}

export function deactivate() {
    console.log('Copilot Self-Improvement: Deactivating...');
}