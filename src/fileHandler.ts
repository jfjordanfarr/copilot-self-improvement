import * as fs from 'fs/promises';
import * as path from 'path';
import * as yamlFront from 'yaml-front-matter';

export const logger = {
    warn: (message?: any, ...optionalParams: any[]): void => {
        console.warn(message, ...optionalParams);
    }
};

const FILE_SUFFIX = '.selfImprovement.instructions.md';

export interface InstructionFileEntry {
    name: string;
    uri: string;
    filePath: string;
    applyTo: string;
    description?: string;
    title: string;
    lastModified: string;
}

function deriveTitle(markdownContent: string, filename: string): string {
    if (typeof markdownContent !== 'string') {
        markdownContent = '';
    }
    const contentForProcessing = markdownContent.trim();
    const h1Match = /^#\s+(.+)/m.exec(contentForProcessing);
    if (h1Match?.[1]) {
        const h1Title = h1Match[1].trim();
        if (h1Title) { return h1Title; }
    }
    if (contentForProcessing) {
        const lines = contentForProcessing.split('\n');
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#') && /[a-zA-Z0-9]/.test(trimmedLine) && !/^[\\`\s]*$/.test(trimmedLine) && trimmedLine.length > 2) {
                return trimmedLine;
            }
        }
    }
    let titleFromFilename = filename.replace(FILE_SUFFIX, '').replace(/[._-]/g, ' ');
    return titleFromFilename.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim() || filename;
}

async function processSingleFile(filePath: string, processedFilePaths: Set<string>): Promise<InstructionFileEntry | null> {
    if (processedFilePaths.has(filePath)) {
        return null;
    }
    try {
        const entryName = path.basename(filePath);
        const fileStats = await fs.stat(filePath);
        const fileContentString = await fs.readFile(filePath, 'utf-8');
        const trimmedFileContentString = fileContentString.trim();
        const parsedFm = yamlFront.loadFront(trimmedFileContentString) as any;
        const markdownBody = parsedFm.__content ?? '';
        const applyToValue = typeof parsedFm.applyTo === 'string' ? parsedFm.applyTo.trim() : '';
        const applyTo = applyToValue !== '' ? applyToValue : '**/*';
        const description = typeof parsedFm.description === 'string' && parsedFm.description.trim() !== '' ? parsedFm.description.trim() : undefined;
        const title = (typeof parsedFm.title === 'string' && parsedFm.title.trim() !== '') ? parsedFm.title.trim() : deriveTitle(markdownBody.trim(), entryName);
        
        processedFilePaths.add(filePath);
        return {
            name: entryName,
            uri: `file://${filePath}`,
            filePath: filePath,
            applyTo: applyTo,
            description: description,
            title: title,
            lastModified: new Date(fileStats.mtime).toISOString(),
        };
    } catch (error: any) {
        logger.warn(`Error processing file ${filePath}:`, error.message);
        return null;
    }
}

async function readFilesFromDirectory(dirPath: string, processedFilePaths: Set<string>): Promise<InstructionFileEntry[]> {
    const entries: InstructionFileEntry[] = [];
    try {
        const dirContents = await fs.readdir(dirPath, { withFileTypes: true });
        for (const dirent of dirContents) {
            if (dirent.isFile() && dirent.name.endsWith(FILE_SUFFIX)) {
                const fullPath = path.join(dirPath, dirent.name);
                const fileEntry = await processSingleFile(fullPath, processedFilePaths);
                if (fileEntry) {
                    entries.push(fileEntry);
                }
            }
        }
    } catch (error) {
        // Directory not found is a common case, don't log as a warning.
    }
    return entries;
}

export async function readAllInstructionFiles(workspaceRootPath: string, instructionLocations: Record<string, boolean>): Promise<InstructionFileEntry[]> {
    const allFiles: InstructionFileEntry[] = [];
    const processedFilePaths = new Set<string>();
    if (!instructionLocations || typeof instructionLocations !== 'object') {
        logger.warn("'chat.instructionsFilesLocations' setting is not configured or is not an object");
        return [];
    }
    for (const [relativeDirPath, isEnabled] of Object.entries(instructionLocations)) {
        if (isEnabled && !path.isAbsolute(relativeDirPath)) {
            const fullPath = path.join(workspaceRootPath, relativeDirPath);
            const filesFromLocation = await readFilesFromDirectory(fullPath, processedFilePaths);
            allFiles.push(...filesFromLocation);
        }
    }
    return allFiles;
}