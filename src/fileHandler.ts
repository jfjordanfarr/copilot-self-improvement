// filepath: d:\Projects\copilot-self-improvement\src\fileHandler.ts
// Ref: ../docs/Specification/Implementations/file-handler-implementation.mdmd.md
import * as vscode from 'vscode';
import * as yamlFront from 'yaml-front-matter';
import * as path from 'path';
import { TextDecoder } from 'util';

// Testable seam for logging warnings. This allows us to reliably stub 'warn' in tests.
export const logger = {
    warn: (message?: any, ...optionalParams: any[]): void => {
        console.warn(message, ...optionalParams);
    }
};

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

export async function processSingleFile(
    fileUri: vscode.Uri,
    workspaceRootUri: vscode.Uri,
    processedFilePaths: Set<string>
): Promise<InstructionFileEntry | null> {
    const entryName = path.basename(fileUri.fsPath);
    const absoluteFilePath = fileUri.fsPath;

    if (processedFilePaths.has(absoluteFilePath)) {
        return null;
    }

    try {
        const fileStats = await vscode.workspace.fs.stat(fileUri);
        const fileContentBytes = await vscode.workspace.fs.readFile(fileUri);
        const fileContentString = new TextDecoder().decode(fileContentBytes);

        // Trim the content string once before parsing to handle potential BOM or leading/trailing whitespace
        const trimmedFileContentString = fileContentString.trim();

        const parsedFm = yamlFront.loadFront(trimmedFileContentString) as any;
        const markdownBody = parsedFm.__content ?? ''; // Ensure markdownBody is a string

        const applyToValue = typeof parsedFm.applyTo === 'string' ? parsedFm.applyTo.trim() : '';
        const applyTo = applyToValue !== '' ? applyToValue : '**/*';

        const purpose = typeof parsedFm.purpose === 'string' && parsedFm.purpose.trim() !== '' ? parsedFm.purpose.trim() : undefined;
        
        // Prioritize frontmatter title, then derive from H1, then first content line, then filename
        const title = (typeof parsedFm.title === 'string' && parsedFm.title.trim() !== '') 
            ? parsedFm.title.trim() 
            : deriveTitle(markdownBody.trim(), entryName);

        processedFilePaths.add(absoluteFilePath); // Add to set after successful processing

        return {
            name: entryName,
            uri: fileUri.toString(),
            filePath: fileUri.fsPath,
            applyTo: applyTo,
            purpose: purpose,
            title: title,
            lastModified: new Date(fileStats.mtime).toISOString(),
        };
    } catch (error: any) {
        const errorMessage = `Error reading or parsing frontmatter for instruction file '${entryName}'. Details: ${error.message}`;
        vscode.window.showErrorMessage(errorMessage);
        console.error(`Error processing file ${fileUri.fsPath}:`, error);
        return null;
    }
}

export function deriveTitle(markdownContent: string, filename: string): string {
    if (typeof markdownContent !== 'string') {
        markdownContent = ''; // Ensure it's a string
    }
    const contentForProcessing = markdownContent.trim(); // Trim once for overall content

    // 1. Check for H1
    const h1Match = /^#\s+(.+)/m.exec(contentForProcessing);
    if (h1Match?.[1]) {
        const h1Title = h1Match[1].trim();
        if (h1Title) { // Ensure trimmed H1 is not empty
            return h1Title;
        }
    }
    // 2. Check for the first non-empty, non-H1, textual line
    if (contentForProcessing) { 
        const lines = contentForProcessing.split('\n');
        for (const line of lines) {
            const trimmedLine = line.trim();
            // Ensure the line is not an H1, is not empty, and looks like meaningful text
            // Reject lines that are only special characters, escape sequences, or code blocks
            if (trimmedLine && 
                !trimmedLine.startsWith('#') && 
                /[a-zA-Z0-9]/.test(trimmedLine) &&
                !/^[\\`\s]*$/.test(trimmedLine) && // Reject lines with only backslashes, backticks, whitespace
                trimmedLine.length > 2) { // Require minimum meaningful length
                return trimmedLine;
            }
        }
    }

    // 3. Fallback to filename
    let titleFromFilename = filename.replace(FILE_SUFFIX, '');
    titleFromFilename = titleFromFilename.replace(/[._-]/g, ' ');
    // Capitalize each word
    titleFromFilename = titleFromFilename.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Keeps original case for rest of word
        .join(' ');
    return titleFromFilename.trim() || filename; // Ensure not returning empty string if filename was just suffix
}

async function readFilesFromDirectory(dirUri: vscode.Uri, workspaceRootUri: vscode.Uri, processedFilePaths: Set<string>): Promise<InstructionFileEntry[]> {
    const entries: InstructionFileEntry[] = [];
    let dirContents: [string, vscode.FileType][];
    try {
        dirContents = await vscode.workspace.fs.readDirectory(dirUri);
    } catch (error: any) {
        // This case is handled by the caller (processInstructionLocation), so just return empty.
        // logger.warn is not needed here as the caller provides a more specific message.
        return [];
    }

    for (const [entryName, entryType] of dirContents) {
        if (entryType === vscode.FileType.File && entryName.endsWith(FILE_SUFFIX)) {
            const fileUri = vscode.Uri.joinPath(dirUri, entryName);
            const fileEntry = await processSingleFile(fileUri, workspaceRootUri, processedFilePaths);
            if (fileEntry) {
                entries.push(fileEntry);
            }
        }
    }
    return entries;
}


async function processInstructionLocation(
    relativeDirPath: string, 
    isEnabled: boolean, 
    workspaceRootUri: vscode.Uri,
    processedFilePaths: Set<string>
): Promise<InstructionFileEntry[] | null> {
    if (!isEnabled) {
        return [];
    }
    if (path.isAbsolute(relativeDirPath)) {
        logger.warn(`Skipping absolute path found in 'chat.instructionsFilesLocations': ${relativeDirPath}. Paths should be relative to the workspace root.`);
        return null;
    }

    const instructionsDirUri = vscode.Uri.joinPath(workspaceRootUri, relativeDirPath);

    try {
        const stats = await vscode.workspace.fs.stat(instructionsDirUri);
        if (stats.type !== vscode.FileType.Directory) {
            logger.warn(`Path specified in 'chat.instructionsFilesLocations' is not a directory: ${instructionsDirUri.fsPath}. Skipping.`);
            return null;
        }
        const files = await readFilesFromDirectory(instructionsDirUri, workspaceRootUri, processedFilePaths);
        if (files.length === 0) {
            logger.warn(`No instruction files found matching pattern '*${FILE_SUFFIX}' in enabled location: ${relativeDirPath}`);
        }
        return files;
    } catch (error: any) {
        logger.warn(`Skipping instruction location '${relativeDirPath}'. Details: Directory not found.`);
        return null;
    }
}

export async function readAllInstructionFiles(workspaceRootUri?: vscode.Uri): Promise<InstructionFileEntry[]> {
    if (!workspaceRootUri) {
        const folders = vscode.workspace.workspaceFolders;
        if (folders && folders.length > 0) {
            workspaceRootUri = folders[0].uri;
        } else {
            logger.warn('No workspace folder found. Cannot load instruction files.');
            return [];
        }
    }

    const config = vscode.workspace.getConfiguration('chat');
    const instructionLocationsSetting = config.get<Record<string, boolean>>('instructionsFilesLocations');
    
    if (!instructionLocationsSetting || typeof instructionLocationsSetting !== 'object') {
        logger.warn("'chat.instructionsFilesLocations' setting is not configured or is not an object");
        return [];
    }

    const allFiles: InstructionFileEntry[] = [];
    const processedFilePaths = new Set<string>();
    
    for (const [relativeDirPath, isEnabled] of Object.entries(instructionLocationsSetting)) {
        if (isEnabled) {
            const filesFromLocation = await processInstructionLocation(relativeDirPath, isEnabled, workspaceRootUri, processedFilePaths);
            if (filesFromLocation) {
                allFiles.push(...filesFromLocation);
            }
        }
    }

    return allFiles;
}