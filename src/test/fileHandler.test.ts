// filepath: d:\Projects\copilot-self-improvement\src\test\fileHandler.test.ts
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { TextEncoder } from 'util';
import * as path from 'path'; // Added import for path module
import * as fileHandler from '../fileHandler';

// Helper to create a mock Uri
const mockUri = (scheme: string, path: string): vscode.Uri => ({
    scheme,
    authority: '',
    path,
    query: '',
    fragment: '',
    fsPath: path,
    with: sinon.stub().returnsThis(),
    toJSON: sinon.stub().returns({ scheme, path, fsPath: path }),
    toString: sinon.stub().returns(`${scheme}://${path}`),
});

suite('FileHandler Test Suite', () => {
    let sandbox: sinon.SinonSandbox;
    let mockWorkspaceFolders: vscode.WorkspaceFolder[] | undefined;
    let mockShowErrorMessage: sinon.SinonStub;
    let mockLoggerWarn: sinon.SinonStub;

    let fsReadDirectoryStub: sinon.SinonStub;
    let fsReadFileStub: sinon.SinonStub;
    let fsStatStub: sinon.SinonStub;
    let mockWorkspaceConfigurationGetStub: sinon.SinonStub; // Specific stub for the 'get' method

    const FILE_SUFFIX = '.selfImprovement.instructions.md';
    
    setup(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(vscode.workspace, 'workspaceFolders').get(() => mockWorkspaceFolders);
        mockShowErrorMessage = sandbox.stub(vscode.window, 'showErrorMessage');
        // Stub the exported logger from the fileHandler module
        mockLoggerWarn = sandbox.stub(fileHandler.logger, 'warn');

        fsReadDirectoryStub = sandbox.stub();
        fsReadFileStub = sandbox.stub();
        fsStatStub = sandbox.stub();

        const mockFs: Partial<vscode.FileSystem> = {
            readDirectory: fsReadDirectoryStub,
            readFile: fsReadFileStub,
            stat: fsStatStub,
        };

        sandbox.stub(vscode.workspace, 'fs').get(() => mockFs as vscode.FileSystem);

        // Mock vscode.workspace.getConfiguration
        mockWorkspaceConfigurationGetStub = sandbox.stub();
        const mockConfig: Partial<vscode.WorkspaceConfiguration> = {
            get: mockWorkspaceConfigurationGetStub,
            has: sandbox.stub().returns(false),      
            inspect: sandbox.stub().returns(undefined),
            update: sandbox.stub().resolves()
        };
        sandbox.stub(vscode.workspace, 'getConfiguration').returns(mockConfig as vscode.WorkspaceConfiguration);

        mockWorkspaceFolders = undefined; 
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('getWorkspaceRootUri', () => {
        test('Should return undefined and show error if no workspace folders', () => {
            mockWorkspaceFolders = undefined;
            const result = fileHandler.getWorkspaceRootUri();
            assert.strictEqual(result, undefined);
            assert.ok(mockShowErrorMessage.calledOnceWith('No workspace folder is open. Please open a project to use this extension.'));
        });

        test('Should return undefined and show error if workspace folders array is empty', () => {
            mockWorkspaceFolders = [];
            const result = fileHandler.getWorkspaceRootUri();
            assert.strictEqual(result, undefined);
            assert.ok(mockShowErrorMessage.calledOnceWith('No workspace folder is open. Please open a project to use this extension.'));
        });

        test('Should return the URI of the first workspace folder', () => {
            const uri1 = mockUri('file', '/project1');
            const uri2 = mockUri('file', '/project2');
            mockWorkspaceFolders = [{ uri: uri1, name: 'Project 1', index: 0 }, { uri: uri2, name: 'Project 2', index: 1 }];
            const result = fileHandler.getWorkspaceRootUri();
            assert.deepStrictEqual(result, uri1);
            assert.ok(mockShowErrorMessage.notCalled);
        });
    });

    suite('readAllInstructionFiles', () => {
        const workspaceRoot = vscode.Uri.file(path.resolve('d:/test/project')); // Use an absolute path for consistency
        const mockMtime = new Date().getTime();
        const mockMtimeISO = new Date(mockMtime).toISOString();

        // Helper to setup directory stat and readdir mocks
        const setupDirectory = (relPath: string, files: [string, vscode.FileType][]) => {
            const dirUriToMatch = vscode.Uri.joinPath(workspaceRoot, path.normalize(relPath));
            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(dirUriToMatch.fsPath)))
                      .resolves({ type: vscode.FileType.Directory, ctime: 0, mtime: 0, size: 0 });
            fsReadDirectoryStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(dirUriToMatch.fsPath)))
                               .resolves(files);
        };

        // Helper to setup file stat and read mocks
        const setupFile = (dirRelPath: string, fileName: string, content: string) => {
            const dirUri = vscode.Uri.joinPath(workspaceRoot, path.normalize(dirRelPath));
            const fileUriToMatch = vscode.Uri.joinPath(dirUri, fileName);
            fsReadFileStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(fileUriToMatch.fsPath)))
                          .resolves(new TextEncoder().encode(content));
            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(fileUriToMatch.fsPath)))
                      .resolves({ type: vscode.FileType.File, ctime: 0, mtime: mockMtime, size: 100 });
            return fileUriToMatch;
        };
        
        test('Should return empty array and warn if instructionLocationsSetting is undefined', async () => {
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns(undefined);
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.deepStrictEqual(result, []);
            assert.ok(mockLoggerWarn.calledOnce, "logger.warn should be called once");
            assert.ok(mockLoggerWarn.calledWith("'chat.instructionsFilesLocations' setting is not configured or is not an object"));
        });

        test('Should return empty array and warn if instructionLocationsSetting is not an object', async () => {
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns('not-an-object');
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.deepStrictEqual(result, []);
            assert.ok(mockLoggerWarn.calledOnce, "logger.warn should be called once");
            assert.ok(mockLoggerWarn.calledWith("'chat.instructionsFilesLocations' setting is not configured or is not an object"));
        });
        
        test('Should return empty array if a configured directory does not exist', async () => {
            const nonExistentRelPath = path.normalize('nonexistent/dir');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [nonExistentRelPath]: true });
            
            const nonExistentUri = vscode.Uri.joinPath(workspaceRoot, nonExistentRelPath);
            const err = new vscode.FileSystemError('Mock directory not found');
            (err as any).code = 'FileNotFound'; 
            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(nonExistentUri.fsPath))).throws(err);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.deepStrictEqual(result, []);
            
            assert.ok(mockLoggerWarn.calledOnce, "logger.warn should be called once");
            assert.ok(mockLoggerWarn.calledWith(sinon.match(`Skipping instruction location '${nonExistentRelPath}'. Details: Directory not found`)));
        });

        test('Should ignore and warn about absolute paths in settings', async () => {
            const absolutePath = path.resolve('D:/abs/path/instr');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [absolutePath]: true });
            
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.deepStrictEqual(result, []);

            assert.ok(mockLoggerWarn.calledOnce, "logger.warn should be called once");
            // CORRECTED: Removed the over-zealous backslash replacement.
            assert.ok(mockLoggerWarn.calledWith(sinon.match(`Skipping absolute path found in 'chat.instructionsFilesLocations': ${absolutePath}. Paths should be relative to the workspace root.`)));
        });

        test('Should ignore and warn if a configured path is a file, not a directory', async () => {
            const filePathAsDir = path.normalize('path/to/a-file.txt');
            const fileUri = vscode.Uri.joinPath(workspaceRoot, filePathAsDir);
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [filePathAsDir]: true });

            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(fileUri.fsPath)))
                      .resolves({ type: vscode.FileType.File, ctime: 0, mtime: 0, size: 0 });
            
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.deepStrictEqual(result, []);
            
            assert.ok(mockLoggerWarn.calledOnce, "logger.warn should be called once");
            // CORRECTED: Removed the over-zealous backslash replacement.
            assert.ok(mockLoggerWarn.calledWith(sinon.match(`Path specified in 'chat.instructionsFilesLocations' is not a directory: ${fileUri.fsPath}. Skipping.`)));
        });
        
        test('Should correctly parse files with all fields from a configured directory', async () => {
            const relPath = path.normalize('.github/instructions');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });

            const fileName = `test-all-fields${FILE_SUFFIX}`;
            const fileContent = `---
applyTo: src/**/*.ts
purpose: Test purpose
title: Frontmatter Title
---
# Title from H1 Will Be Ignored if Frontmatter Title Exists
Actual content`;
            
            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            const fileUri = setupFile(relPath, fileName, fileContent);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            const entry = result[0];
            assert.strictEqual(entry.name, fileName);
            assert.strictEqual(entry.uri, fileUri.toString());
            assert.strictEqual(entry.filePath, fileUri.fsPath);
            assert.strictEqual(entry.applyTo, 'src/**/*.ts');
            assert.strictEqual(entry.purpose, 'Test purpose');
            assert.strictEqual(entry.title, 'Frontmatter Title'); 
            assert.strictEqual(entry.lastModified, mockMtimeISO);
        });
        
        test('Should correctly parse files and use H1 for title if frontmatter title is missing', async () => {
            const relPath = path.normalize('custom/instr');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });

            const fileName = `test-h1-title${FILE_SUFFIX}`;
            const fileContent = `---
applyTo: src/**/*.js
purpose: Test H1 title
---
# Actual Title from H1
Some content here.`;
            
            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            setupFile(relPath, fileName, fileContent);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].title, 'Actual Title from H1');
        });


        test('Should default applyTo to **/* if missing or empty', async () => {
            const relPath = path.normalize('.vscode/instructions');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });
            
            const fileNameMissing = `missing-applyto${FILE_SUFFIX}`;
            const contentMissing = `---
purpose: Test purpose
---
# Title`;
            setupFile(relPath, fileNameMissing, contentMissing);

            const fileNameEmpty = `empty-applyto${FILE_SUFFIX}`;
            const contentEmpty = `---
applyTo: 
purpose: Test purpose
---
# Title`;
            setupFile(relPath, fileNameEmpty, contentEmpty);
            
            setupDirectory(relPath, [
                [fileNameMissing, vscode.FileType.File],
                [fileNameEmpty, vscode.FileType.File],
            ]);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 2);
            assert.strictEqual(result.find(e => e.name === fileNameMissing)?.applyTo, '**/*');
            assert.strictEqual(result.find(e => e.name === fileNameEmpty)?.applyTo, '**/*');
        });

        test('Should derive title from first content line if no frontmatter title and no H1', async () => {
            const relPath = path.normalize('another/path');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });

            const fileName = `title-from-content${FILE_SUFFIX}`;
            const fileContent = `---
applyTo: "*.js"
purpose: Test purpose
---
This is the first content line and should be the title.
Another line.`;
            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            setupFile(relPath, fileName, fileContent);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].title, 'This is the first content line and should be the title.');
        });

        test('Should derive title from filename if no frontmatter title, no H1, and no content lines', async () => {
            const relPath = path.normalize('yet/another');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });
            
            const fileName = `title-from-filename-complex.name${FILE_SUFFIX}`;
            const fileContent = `---
applyTo: "*.py"
purpose: Test purpose
---
\\\`\\\`;`; 
            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            setupFile(relPath, fileName, fileContent);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].title, 'Title From Filename Complex Name');
        });
        
        test('Should derive title from filename if only whitespace content (and no frontmatter/H1 title)', async () => {
            const relPath = path.normalize('whitespace/title/test');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });

            const fileName = `title-from-filename-whitespace${FILE_SUFFIX}`;
            const fileContent = `---
applyTo: "*.py"
purpose: Test purpose
---
   
  \\t 
  \\\`\\\`;`; 
            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            setupFile(relPath, fileName, fileContent);
            
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].title, 'Title From Filename Whitespace');
        });

        test('Should handle missing purpose field gracefully (undefined)', async () => {
            const relPath = path.normalize('no/purpose/path');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });

            const fileName = `no-purpose${FILE_SUFFIX}`;
            const fileContent = `---
applyTo: "*.txt"
---
# Title`;
            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            setupFile(relPath, fileName, fileContent);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].purpose, undefined);
        });

        test('Should ignore files not matching suffix and handle file read errors within a configured dir', async () => {
            const relPath = path.normalize('error/handling/path');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });

            const validFileName = `valid${FILE_SUFFIX}`;
            const validFileContent = `---
applyTo: glob
purpose: p
---
# VT`;

            const errorFileName = `error${FILE_SUFFIX}`;
            const errorFileUri = vscode.Uri.joinPath(vscode.Uri.joinPath(workspaceRoot, relPath), errorFileName);
            
            setupDirectory(relPath, [
                [validFileName, vscode.FileType.File],
                ['ignored.txt', vscode.FileType.File], 
                [errorFileName, vscode.FileType.File],
            ]);
            setupFile(relPath, validFileName, validFileContent);
            
            fsReadFileStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(errorFileUri.fsPath)))
                          .rejects(new Error('Read fail'));
            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(errorFileUri.fsPath)))
                      .resolves({ type: vscode.FileType.File, ctime: 0, mtime: mockMtime, size: 0 });


            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].name, validFileName);
            
            assert.ok(mockShowErrorMessage.calledWith(sinon.match(`Error reading or parsing frontmatter for instruction file '${errorFileName}'. Details: Read fail`)));
        });

        test('Should handle fs.stat errors gracefully for an individual file', async () => {
            const relPath = path.normalize('stat/error/path');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });
            
            const fileName = `stat-error${FILE_SUFFIX}`;
            const fileUri = vscode.Uri.joinPath(vscode.Uri.joinPath(workspaceRoot, relPath), fileName);

            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(fileUri.fsPath)))
                      .rejects(new Error('Stat fail'));
                      
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 0, 'File with stat error should be skipped');
            
            const errorMessageCalls = mockShowErrorMessage.getCalls().map(call => call.args[0]);
            assert.ok(errorMessageCalls.some(message => 
                message.includes(`Error reading or parsing frontmatter for instruction file '${fileName}'`) && 
                message.includes('Stat fail')
            ));
            
            assert.ok(mockLoggerWarn.calledWith(sinon.match(`No instruction files found matching pattern '*${FILE_SUFFIX}' in enabled location: ${relPath}`)));
        });

        test('Should process files from multiple configured directories and avoid duplicates', async () => {
            const path1 = path.normalize('dir1/instr');
            const path2 = path.normalize('dir2/otherinstr');

            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ 
                [path1]: true,
                [path2]: true,
            });

            const file1Name = `file1-in-dir1${FILE_SUFFIX}`;
            const file1Content = `---
title: File1
---
Content1`;
            const file1Uri = setupFile(path1, file1Name, file1Content);
            
            const file2Name = `file2-in-dir2${FILE_SUFFIX}`;
            const file2Content = `---
title: File2
---
Content2`;
            const file2Uri = setupFile(path2, file2Name, file2Content);

            const commonFileName = `common${FILE_SUFFIX}`;
            const commonFile1Content = `---
title: CommonFileInDir1
---
ContentCommon1`;
            const commonFile1Uri = setupFile(path1, commonFileName, commonFile1Content);

            const commonFile2Content = `---
title: CommonFileInDir2
---
ContentCommon2`;
            const commonFile2Uri = setupFile(path2, commonFileName, commonFile2Content);

            setupDirectory(path1, [
                [file1Name, vscode.FileType.File],
                [commonFileName, vscode.FileType.File]
            ]);
            setupDirectory(path2, [
                [file2Name, vscode.FileType.File],
                [commonFileName, vscode.FileType.File]
            ]);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 4, "Should find 4 unique files because they have different paths");
            assert.ok(result.find(f => f.filePath === file1Uri.fsPath));
            assert.ok(result.find(f => f.filePath === file2Uri.fsPath));
            assert.ok(result.find(f => f.filePath === commonFile1Uri.fsPath));
            assert.ok(result.find(f => f.filePath === commonFile2Uri.fsPath));
        });
        
        test('Should handle duplicate file paths if a directory is listed twice with different keys but same effective path', async () => {
            const pathKey1 = path.normalize('dir/one');
            const pathKey2 = path.normalize('dir/./one'); 
            const effectiveRelPath = path.normalize('dir/one');

            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ 
                [pathKey1]: true,
                [pathKey2]: true, 
            });

            const fileName = `unique-file${FILE_SUFFIX}`;
            const fileContent = `---
title: Unique
---
Content`;
            
            setupDirectory(effectiveRelPath, [[fileName, vscode.FileType.File]]);
            const fileUri = setupFile(effectiveRelPath, fileName, fileContent);
            
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1, "Should find only 1 file despite effectively duplicate directory listing");
            assert.strictEqual(result[0].name, fileName);
            assert.strictEqual(result[0].filePath, fileUri.fsPath);
        });

    });
});