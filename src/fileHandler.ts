// filepath: d:\Projects\copilot-self-improvement\src\fileHandler.ts
// Ref: ../docs/Specification/Implementations/file-handler-implementation.mdmd.md
import * as vscode from 'vscode';
import * as yamlFront from 'yaml-front-matter';
import { TextDecoder } from 'util'; // Node.js util for TextDecoder
import * as path from 'path'; // Import path for isAbsolute check

// REMOVED: const DEFAULT_INSTRUCTION_DIRECTORIES = ['.github/instructions', '.vscode/instructions'];
const FILE_SUFFIX = '.selfImprovement.instructions.md';

// Interface for the object returned by yamlFront.loadFront
interface YamlFrontmatterResult {
    __content: string;
    [key: string]: any; // For other frontmatter properties
}

export interface InstructionFileEntry {
    name: string;           // Filename (e.g., "my-rules.selfImprovement.instructions.md")
    uri: string;            // Stringified URI of the file
    filePath: string;       // Full absolute path of the file
    applyTo: string;        // From frontmatter `applyTo`, defaults to '**/*'
    purpose?: string;       // From frontmatter `purpose`
    title: string;          // Derived: 1st H1, then 1st content line, then filename
    lastModified: string;   // ISO 8601 timestamp from file system stats
}

/**
 * Gets the Uri for the primary workspace folder.
 * In a multi-root workspace, it defaults to the first folder.
 * Shows an error message if no workspace is open.
 * @returns The Uri of the workspace root, or undefined if no workspace is open.
 */
export function getWorkspaceRootUri(): vscode.Uri | undefined {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folder is open. Please open a project to use this extension.');
        return undefined;
    }
    return workspaceFolders[0].uri;
}

function deriveTitle(markdownContent: string, fileName: string): string {
    const lines = markdownContent.split('\n');

    // 1. Check for H1
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('# ')) {
            return trimmedLine.substring(2).trim();
        }
    }

    // 2. Check for first non-empty content line
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            return trimmedLine;
        }
    }

    // 3. Fallback to a cleaned-up filename
    let titleFromFileName = fileName;
    if (titleFromFileName.endsWith(FILE_SUFFIX)) {
        titleFromFileName = titleFromFileName.substring(0, titleFromFileName.length - FILE_SUFFIX.length);
    }
    // Replace hyphens/underscores with spaces, capitalize words (simple version)
    titleFromFileName = titleFromFileName.replace(/[_-]/g, ' ');
    titleFromFileName = titleFromFileName.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
    return titleFromFileName || "Untitled Instruction"; // Final fallback
}

async function processSingleFile(fileUri: vscode.Uri, entryName: string): Promise<InstructionFileEntry | null> {
    try {
        const rawContent = await vscode.workspace.fs.readFile(fileUri);
        const fileContentString = new TextDecoder().decode(rawContent);
        const parsedFm = yamlFront.loadFront(fileContentString) as YamlFrontmatterResult;
        const stats = await vscode.workspace.fs.stat(fileUri);

        const applyTo = typeof parsedFm.applyTo === 'string' && parsedFm.applyTo.trim() !== '' ? parsedFm.applyTo.trim() : '**/*';
        const purpose = typeof parsedFm.purpose === 'string' ? parsedFm.purpose.trim() : undefined;
        
        const markdownContent = parsedFm.__content || '';

        // If parsedFm.title (from frontmatter) exists and is a non-empty string, use it directly (trimmed).
        // Otherwise, derive the title from the markdownContent (which should also be trimmed before processing).
        const title = (typeof parsedFm.title === 'string' && parsedFm.title.trim() !== '') 
            ? parsedFm.title.trim() 
            : deriveTitle(markdownContent.trim(), entryName); // Added .trim() to markdownContent

        const lastModified = new Date(stats.mtime).toISOString();

        return {
            uri: fileUri.toString(),
            name: entryName,
            filePath: fileUri.fsPath,
            applyTo: applyTo,
            purpose: purpose,
            title: title,
            lastModified: lastModified,
        };
    } catch (error: any) {
        console.error(`Error processing file ${fileUri.fsPath}:`, error);
        // Ensure the message format matches test expectations for showErrorMessage
        vscode.window.showErrorMessage(`Error reading or parsing frontmatter for instruction file '${entryName}'. Details: ${error.message}`);
        return null;
    }
}

async function readFilesFromDirectory(instructionsDirUri: vscode.Uri, existingFilePaths: Set<string>): Promise<InstructionFileEntry[]> {
    const directoryEntries: InstructionFileEntry[] = [];
    let entries;
    try {
        entries = await vscode.workspace.fs.readDirectory(instructionsDirUri);
    } catch (error: any) {
        if (error instanceof vscode.FileSystemError && (error.code === 'FileNotFound' || error.code === 'EntryNotFound')) {
            return []; // Directory not found, return empty for this directory
        }
        console.error(`Error reading instructions directory ${instructionsDirUri.fsPath}:`, error);
        // Optionally, inform the user, but avoid flooding with messages
        // vscode.window.showWarningMessage(`Could not read instructions from ${instructionsDirUri.fsPath}: ${error.message}`);
        return [];
    }

    for (const [entryName, type] of entries) {
        if (type === vscode.FileType.File && entryName.endsWith(FILE_SUFFIX)) {
            const fileUri = vscode.Uri.joinPath(instructionsDirUri, entryName);
            if (existingFilePaths.has(fileUri.fsPath)) {
                console.warn(`Skipping duplicate instruction file found at ${fileUri.fsPath}`);
                continue;
            }
            const fileEntry = await processSingleFile(fileUri, entryName);
            if (fileEntry) {
                directoryEntries.push(fileEntry);
                existingFilePaths.add(fileUri.fsPath); // Add to set to track processed files
            }
        }
    }
    return directoryEntries;
}

async function processInstructionLocation(workspaceRootUri: vscode.Uri, relativeDirPath: string, instructionLocationsSetting: { [key: string]: boolean }, processedFilePaths: Set<string>): Promise<InstructionFileEntry[]> {
    if (!Object.hasOwn(instructionLocationsSetting, relativeDirPath) || instructionLocationsSetting[relativeDirPath] !== true) {
        return [];
    }

    if (path.isAbsolute(relativeDirPath)) {
        console.warn(`Skipping absolute path found in 'chat.instructionsFilesLocations': ${relativeDirPath}. Paths should be relative to the workspace root.`);
        return [];
    }

    const instructionsDirUri = vscode.Uri.joinPath(workspaceRootUri, relativeDirPath);
    try {
        const stats = await vscode.workspace.fs.stat(instructionsDirUri);
        if (stats.type !== vscode.FileType.Directory) {
            console.warn(`Path specified in 'chat.instructionsFilesLocations' is not a directory: ${instructionsDirUri.fsPath}. Skipping.`);
            return [];
        }
    } catch (error: any) {
        // Ensure this warning message for non-existent/inaccessible directories matches test expectations.
        console.warn(`Skipping instruction location ${instructionsDirUri.fsPath} as it was not found or accessible. Details: ${error.message}`);
        return [];
    }

    return readFilesFromDirectory(instructionsDirUri, processedFilePaths);
}

/**
 * Reads all *.selfImprovement.instructions.md files from directories specified in the
 * 'chat.instructionsFilesLocations' VS Code setting.
 * Parses minimal frontmatter for each file.
 * @param workspaceRootUri The Uri of the workspace root.
 * @returns A promise that resolves to an array of InstructionFileEntry objects.
 */
export async function readAllInstructionFiles(workspaceRootUri: vscode.Uri): Promise<InstructionFileEntry[]> {
    const allInstructionFileEntries: InstructionFileEntry[] = [];
    const processedFilePaths = new Set<string>();

    const instructionLocationsSetting = vscode.workspace.getConfiguration('chat').get<{[key: string]: boolean}>('instructionsFilesLocations');

    if (!instructionLocationsSetting || typeof instructionLocationsSetting !== 'object') {
        console.warn("'chat.instructionsFilesLocations' setting is not configured or is not an object. No instruction files will be loaded by the Self-Improvement extension.");
        return [];
    }

    let hasEnabledAndCheckedPaths = false;
    for (const relativeDirPath in instructionLocationsSetting) {
        if (instructionLocationsSetting[relativeDirPath] === true) {
            hasEnabledAndCheckedPaths = true; // Mark that we are processing at least one enabled path
            const filesFromDir = await processInstructionLocation(workspaceRootUri, relativeDirPath, instructionLocationsSetting, processedFilePaths);
            allInstructionFileEntries.push(...filesFromDir);
        }
    }

    // Only show the "No instruction files ending with..." warning if:
    // 1. No files were found AND
    // 2. There was at least one enabled path in the settings that was processed.
    if (allInstructionFileEntries.length === 0 && hasEnabledAndCheckedPaths) {
        const enabledPaths = Object.entries(instructionLocationsSetting)
            .filter(([,isEnabled]) => isEnabled)
            .map(([pathKey]) => pathKey);
        // This condition is now more robust: only log if enabled paths were actually checked.
        if (enabledPaths.length > 0) { 
            console.warn(`No instruction files ending with '${FILE_SUFFIX}' found in the configured and enabled locations: ${enabledPaths.join(', ')}.`);
        }
    }

    return allInstructionFileEntries;
}

// REMOVED createInstructionFile function as per ultra-minimalist pivot.
// Copilot will handle file creation.
// REMOVED InstructionFile interface as it included markdownContent, which is no longer read by this handler.
// The new InstructionFileEntry interface is used instead.
