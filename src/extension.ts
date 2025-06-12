// filepath: d:\Projects\copilot-self-improvement\src\extension.ts
// Ref: ../docs/Specification/Implementations/extension-entry-point-implementation.mdmd.md

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { InstructionTool } from './instructionTool'; // Import the InstructionTool
import { getWorkspaceRootUri } from './fileHandler'; // Import necessary functions
import * as path from 'path'; // For path.isAbsolute

const SETUP_MESSAGE_SHOWN_FLAG = 'selfImprovement.setupMessageShownV2'; // Incremented version due to logic change

interface ActivePathsResult {
    found: boolean; // True if at least one configured, enabled, relative path EXISTS on disk.
    configuredPathsForMessage: string[]; // List of all configured, enabled, relative paths (e.g., "`./.github/instructions`")
}

// Helper to check a single path and format it for messages if relevant
async function checkAndFormatPath(
    workspaceRootUri: vscode.Uri,
    relativeDirPath: string,
    isEnabled: boolean
): Promise<{ pathForMessage: string | null; exists: boolean }> {
    if (!isEnabled || path.isAbsolute(relativeDirPath)) {
        return { pathForMessage: null, exists: false };
    }
    const pathForMessage = `\`${relativeDirPath}\``;
    try {
        const dirUri = vscode.Uri.joinPath(workspaceRootUri, relativeDirPath);
        await vscode.workspace.fs.stat(dirUri);
        return { pathForMessage, exists: true };
    } catch {
        return { pathForMessage, exists: false };
    }
}

async function checkForActiveConfiguredPaths(
    workspaceRootUri: vscode.Uri,
    instructionLocationsSetting: { [key: string]: boolean } | undefined
): Promise<ActivePathsResult> {
    let foundAtLeastOneExistingPath = false;
    const configuredPathsForMessage: string[] = [];

    if (instructionLocationsSetting && typeof instructionLocationsSetting === 'object') {
        for (const [relativeDirPath, isEnabled] of Object.entries(instructionLocationsSetting)) {
            // Process each path using the helper
            const { pathForMessage, exists } = await checkAndFormatPath(workspaceRootUri, relativeDirPath, isEnabled);

            if (pathForMessage) { // Indicates it was an enabled, relative path
                configuredPathsForMessage.push(pathForMessage);
                if (exists) {
                    foundAtLeastOneExistingPath = true;
                }
            }
        }
    }
    return { found: foundAtLeastOneExistingPath, configuredPathsForMessage };
}

function buildMessageParts(
    configuredPathsForMessage: string[],
    activeConfiguredPathsExist: boolean,
    useInstructionFilesSetting: unknown
): string[] {
    const messageParts: string[] = [
        `Copilot Self-Improvement: Enhance Copilot's understanding of your project with instruction files. `,
        `This extension provides a tool that lists instruction files based on your VS Code settings.`
    ];

    if (configuredPathsForMessage.length > 0) {
        messageParts.push(`It will look for instruction files in these locations from your 'chat.instructionsFilesLocations' setting: ${configuredPathsForMessage.join(', ')}.`);
    } else {
        messageParts.push(`Currently, no instruction file locations are configured and enabled in your 'chat.instructionsFilesLocations' VS Code setting, or the configured paths do not exist.`);
    }
    messageParts.push(`These files (e.g., \`*.selfImprovement.instructions.md\`) guide Copilot with project-specific conventions and context.`);

    if (!useInstructionFilesSetting) {
        messageParts.push(
            `IMPORTANT: For Copilot to use these files, the VS Code setting 'github.copilot.chat.codeGeneration.useInstructionFiles' must be enabled.`
        );
    }

    if (configuredPathsForMessage.length === 0 || !activeConfiguredPathsExist) {
        messageParts.push(
            `Please configure one or more relative paths (e.g., \`.github/instructions\`) in the 'chat.instructionsFilesLocations' setting and ensure the directories exist.`
        );
    }

    messageParts.push(
        `Ensure the GitHub Copilot extension is active and your workspace is trusted. `,
        `Consider adding \`*.selfImprovement.instructions.md\` to your \`.gitignore\` if you create many such files.`
    );
    return messageParts;
}

function buildMessageItems(
    needsSettingsGuidance: boolean,
    useInstructionFilesSetting: unknown,
    configuredPathsForMessage: string[],
    activeConfiguredPathsExist: boolean
): vscode.MessageItem[] {
    const items: vscode.MessageItem[] = [{ title: "Open README" }];
    if (needsSettingsGuidance) {
        if (!useInstructionFilesSetting) {
            items.push({ title: "Enable 'useInstructionFiles' Setting" });
        }
        if (configuredPathsForMessage.length === 0 || !activeConfiguredPathsExist) {
            items.push({ title: "Configure 'instructionsFilesLocations' Setting" });
        }
    }
    items.push({ title: "Dismiss" });
    return items;
}

async function showOneTimeSetupMessage(context: vscode.ExtensionContext) {
    const alreadyShown = context.globalState.get<boolean>(SETUP_MESSAGE_SHOWN_FLAG);
    if (alreadyShown) {
        return;
    }

    const workspaceRootUri = getWorkspaceRootUri();
    if (!workspaceRootUri) {
        return;
    }

    const instructionLocationsSetting = vscode.workspace.getConfiguration('chat').get<{[key: string]: boolean}>('instructionsFilesLocations');
    const useInstructionFilesSetting = vscode.workspace.getConfiguration('github.copilot.chat.codeGeneration').get('useInstructionFiles');

    const { found: activeConfiguredPathsExist, configuredPathsForMessage } = await checkForActiveConfiguredPaths(workspaceRootUri, instructionLocationsSetting);

    if (useInstructionFilesSetting && activeConfiguredPathsExist) {
        await context.globalState.update(SETUP_MESSAGE_SHOWN_FLAG, true);
        return;
    }

    const messageParts = buildMessageParts(configuredPathsForMessage, activeConfiguredPathsExist, useInstructionFilesSetting);
    const needsSettingsGuidance = !useInstructionFilesSetting || configuredPathsForMessage.length === 0 || !activeConfiguredPathsExist;
    const items = buildMessageItems(needsSettingsGuidance, useInstructionFilesSetting, configuredPathsForMessage, activeConfiguredPathsExist);
    
    const selection = await vscode.window.showInformationMessage(messageParts.join('\n\n'), { modal: false }, ...items);

    if (selection?.title === "Open README") {
        // Assuming README.md is at the root of the extension
        const readmeUri = vscode.Uri.joinPath(context.extensionUri, 'README.md');
        vscode.commands.executeCommand('markdown.showPreview', readmeUri);
    } else if (selection?.title === "Enable 'useInstructionFiles' Setting") {
        vscode.commands.executeCommand('workbench.action.openSettings', 'github.copilot.chat.codeGeneration.useInstructionFiles');
    } else if (selection?.title === "Configure 'instructionsFilesLocations' Setting") {
        vscode.commands.executeCommand('workbench.action.openSettings', 'chat.instructionsFilesLocations');
    }

    await context.globalState.update(SETUP_MESSAGE_SHOWN_FLAG, true);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "copilot-self-improvement" is now active!');

    // Register the Language Model Tool
    if (vscode.lm) { // Check if Language Model API is available
        const instructionTool = new InstructionTool(context.extensionUri);
        // The name used here MUST match the name in package.json's languageModelTools contribution
        // (copilotSelfImprovement-getInstructionsAndConventions)
        const instructionToolDisposable = vscode.lm.registerTool(instructionTool.name, instructionTool);
        context.subscriptions.push(instructionToolDisposable);
        console.log(`Language Model Tool "${instructionTool.name}" registered.`);
    } else {
        console.warn('Language Model API (vscode.lm) not available. Instruction tool not registered.');
        vscode.window.showWarningMessage('Copilot Self-Improvement: Language Model API not available. The instruction tool could not be registered. Please ensure you have the latest version of VS Code and Copilot Chat.');
    }

    // Show the one-time setup message if needed.
    // Run this asynchronously and don't block activation.
    showOneTimeSetupMessage(context).catch(error => {
        console.error("Error showing one-time setup message:", error);
    });
}

// This method is called when your extension is deactivated
export function deactivate() {
    // Perform any cleanup tasks here if needed when the extension is deactivated
}
