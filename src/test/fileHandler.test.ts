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
    let mockConsoleWarn: sinon.SinonStub;

    let fsReadDirectoryStub: sinon.SinonStub;
    let fsReadFileStub: sinon.SinonStub;
    let fsStatStub: sinon.SinonStub;
    let mockWorkspaceConfigurationGetStub: sinon.SinonStub; // Specific stub for the 'get' method

    const FILE_SUFFIX = '.selfImprovement.instructions.md';

    setup(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(vscode.workspace, 'workspaceFolders').get(() => mockWorkspaceFolders);
        mockShowErrorMessage = sandbox.stub(vscode.window, 'showErrorMessage');
        mockConsoleWarn = sandbox.stub(console, 'warn');

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
        const workspaceRoot = vscode.Uri.file(path.resolve('/test/project')); // Use vscode.Uri.file and path.resolve for a canonical absolute path
        const mockMtime = new Date().getTime();
        const mockMtimeISO = new Date(mockMtime).toISOString();

        // Helper to setup directory stat and readdir mocks
        const setupDirectory = (relPath: string, files: [string, vscode.FileType][]) => {
            const dirUriToMatch = vscode.Uri.joinPath(workspaceRoot, path.normalize(relPath)); // Normalize relPath
            // Use a custom matcher for URIs based on fsPath for stat and readDirectory
            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(dirUriToMatch.fsPath)))
                      .resolves({ type: vscode.FileType.Directory, ctime: 0, mtime: 0, size: 0 });
            fsReadDirectoryStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(dirUriToMatch.fsPath)))
                               .resolves(files);
        };

        // Helper to setup file stat and read mocks
        const setupFile = (dirRelPath: string, fileName: string, content: string) => {
            const dirUri = vscode.Uri.joinPath(workspaceRoot, path.normalize(dirRelPath)); // Normalize dirRelPath
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
            sinon.assert.calledWith(mockConsoleWarn, sinon.match(/not configured or is not an object/));
        });

        test('Should return empty array and warn if instructionLocationsSetting is not an object', async () => {
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns('not-an-object');
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.deepStrictEqual(result, []);
            sinon.assert.calledWith(mockConsoleWarn, sinon.match(/not configured or is not an object/));
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

            // Check for the first warning
            sinon.assert.calledWith(mockConsoleWarn, `Configured instruction directory not found: ${nonExistentUri.fsPath}. Skipping.`);
            // Check for the second warning
            sinon.assert.calledWith(mockConsoleWarn, sinon.match(new RegExp(`No instruction files ending with '${FILE_SUFFIX}' found in the configured and enabled locations: ${nonExistentRelPath.replace(/\\\\/g, '\\\\\\\\')}`)));
            // Ensure mockConsoleWarn was called exactly twice if these are the only expected warnings for this test case
            sinon.assert.calledTwice(mockConsoleWarn); 
        });

        test('Should ignore and warn about absolute paths in settings', async () => {
            const absolutePath = path.resolve('/abs/path/instr');
            const expectedWarningSkipping = `Skipping absolute path found in 'chat.instructionsFilesLocations': ${absolutePath}. Paths should be relative to the workspace root.`;
            
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [absolutePath]: true });
            
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.deepStrictEqual(result, []);
            sinon.assert.calledWith(mockConsoleWarn, expectedWarningSkipping);
            // This will be the second warning, after the "Skipping absolute path" warning.
            sinon.assert.calledWith(mockConsoleWarn, sinon.match(new RegExp(`No instruction files ending with '${FILE_SUFFIX}' found in the configured and enabled locations: ${absolutePath.replace(/\\\\/g, '\\\\\\\\')}`)));
            sinon.assert.calledTwice(mockConsoleWarn);
        });

        test('Should ignore and warn if a configured path is a file, not a directory', async () => {
            const filePathAsDir = path.normalize('path/to/a-file.txt');
            const fileUri = vscode.Uri.joinPath(workspaceRoot, filePathAsDir);
            const expectedWarningNotDir = `Path specified in 'chat.instructionsFilesLocations' is not a directory: ${fileUri.fsPath}. Skipping.`;
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [filePathAsDir]: true });

            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(fileUri.fsPath)))
                      .resolves({ type: vscode.FileType.File, ctime: 0, mtime: 0, size: 0 });
            
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.deepStrictEqual(result, []);
            sinon.assert.calledWith(mockConsoleWarn, expectedWarningNotDir);
            sinon.assert.calledWith(mockConsoleWarn, sinon.match(new RegExp(`No instruction files ending with '${FILE_SUFFIX}' found in the configured and enabled locations: ${filePathAsDir.replace(/\\\\/g, '\\\\\\\\')}`)));
            sinon.assert.calledTwice(mockConsoleWarn);
        });
        
        test('Should correctly parse files with all fields from a configured directory', async () => {
            const relPath = path.normalize('.github/instructions');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });

            const fileName = `test-all-fields${FILE_SUFFIX}`;
            const fileContent = `---\\napplyTo: src/**/*.ts\\npurpose: Test purpose\\ntitle: Frontmatter Title\\n---\\n# Title from H1 Will Be Ignored if Frontmatter Title Exists\\nActual content`;
            
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
            const fileContent = `---\\napplyTo: src/**/*.js\\npurpose: Test H1 title\\n---\\n# Actual Title from H1\\nSome content here.`;
            
            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            setupFile(relPath, fileName, fileContent);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].title, 'Actual Title from H1');
        });


        test('Should default applyTo to **/* if missing or empty', async () => {
            const relPath = path.normalize('.vscode/instructions');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });
            // Correctly setup the directory first
            setupDirectory(relPath, []); 

            const fileNameMissing = `missing-applyto${FILE_SUFFIX}`;
            const contentMissing = `---\\\\npurpose: Test purpose\\\\n---\\\\n# Title`;
            setupFile(relPath, fileNameMissing, contentMissing);

            const fileNameEmpty = `empty-applyto${FILE_SUFFIX}`;
            const contentEmpty = `---\\\\napplyTo: \\\\npurpose: Test purpose\\\\n---\\\\n# Title`;
            setupFile(relPath, fileNameEmpty, contentEmpty);
            
            // Update directory listing AFTER files are setup
            const dirUriToMatch = vscode.Uri.joinPath(workspaceRoot, relPath);
            fsReadDirectoryStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(dirUriToMatch.fsPath)))
                               .resolves([
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
            const fileContent = `---\\napplyTo: *.js\\npurpose: Test purpose\\n---\\nThis is the first content line and should be the title.\r\nAnother line.`;
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
            const fileContent = `---\\napplyTo: *.py\\npurpose: Test purpose\\n---\\n`; 
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
            const fileContent = `---\\napplyTo: *.py\\npurpose: Test purpose\\n---\\n   \\n  \\t \\n  `; 
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
            const fileContent = `---\\napplyTo: *.txt\\n---\\n# Title`;
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
            const validFileContent = `---napplyTo: globnpurpose: pn---n# VT`;

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
            // Ensure the stat for the error file itself says it's a file, so readFile is attempted
            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(errorFileUri.fsPath)))
                      .resolves({ type: vscode.FileType.File, ctime: 0, mtime: mockMtime, size: 0 });


            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].name, validFileName);
            // The warning from processFile should be a showErrorMessage call
            sinon.assert.calledWith(mockShowErrorMessage, sinon.match(new RegExp(`Error reading or parsing frontmatter for instruction file '${errorFileName}'. Details: Read fail`)));
            // Check for the "No instruction files found" warning if only error files were in a dir (not applicable here as one is valid)
            // Check if any console.warn was called unexpectedly
            // For this specific test, we expect one valid file, and one error message.
            // If the directory itself was valid, no "No instruction files found..." warning should appear unless all files in it failed or were ignored.
            // Let's ensure no other console.warns were made related to the directory processing itself for 'error/handling/path'
            const relPathUri = vscode.Uri.joinPath(workspaceRoot, relPath);
            sinon.assert.neverCalledWith(mockConsoleWarn, sinon.match(relPathUri.fsPath)); // Ensure no warnings about the dir itself
        });

        test('Should handle fs.stat errors gracefully for an individual file', async () => {
            const relPath = path.normalize('stat/error/path');
            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ [relPath]: true });
            
            const fileName = `stat-error${FILE_SUFFIX}`;
            const fileUri = vscode.Uri.joinPath(vscode.Uri.joinPath(workspaceRoot, relPath), fileName);

            setupDirectory(relPath, [[fileName, vscode.FileType.File]]);
            // fsStatStub for the file itself (not the directory) should reject
            fsStatStub.withArgs(sinon.match((uri: vscode.Uri) => uri && path.normalize(uri.fsPath) === path.normalize(fileUri.fsPath)))
                      .rejects(new Error('Stat fail'));

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 0, 'File with stat error should be skipped');
            sinon.assert.calledWith(mockShowErrorMessage, sinon.match(new RegExp(`Error reading or parsing frontmatter for instruction file '${fileName}'. Details: Stat fail`)));
            
            // We also expect a console.warn that no files were found in this problematic directory.
            sinon.assert.calledWith(mockConsoleWarn, sinon.match(new RegExp(`No instruction files ending with '${FILE_SUFFIX}' found in the configured and enabled locations: ${relPath.replace(/\\\\/g, '\\\\\\\\')}`)));
        });

        test('Should process files from multiple configured directories and avoid duplicates', async () => {
            const path1 = path.normalize('dir1/instr');
            const path2 = path.normalize('dir2/otherinstr');

            mockWorkspaceConfigurationGetStub.withArgs('instructionsFilesLocations').returns({ 
                [path1]: true,
                [path2]: true,
            });

            const file1Name = `file1-in-dir1${FILE_SUFFIX}`;
            const file1Content = "---\\ntitle: File1\\n---\\nContent1";
            setupDirectory(path1, []); // Setup dir1
            const file1Uri = setupFile(path1, file1Name, file1Content); // Setup file1 in dir1
            
            const file2Name = `file2-in-dir2${FILE_SUFFIX}`;
            const file2Content = "---\\ntitle: File2\\n---\\nContent2";
            setupDirectory(path2, []); // Setup dir2
            const file2Uri = setupFile(path2, file2Name, file2Content); // Setup file2 in dir2

            const commonFileName = `common${FILE_SUFFIX}`;
            const commonFile1Content = "---\\ntitle: CommonFileInDir1\\n---\\nContentCommon1";
            const commonFile1Uri = setupFile(path1, commonFileName, commonFile1Content); // common file in dir1

            const commonFile2Content = "---\\ntitle: CommonFileInDir2\\n---\\nContentCommon2";
            const commonFile2Uri = setupFile(path2, commonFileName, commonFile2Content); // common file with same name in dir2

            // Update directory listings
            const dir1Uri = vscode.Uri.joinPath(workspaceRoot, path1);
            fsReadDirectoryStub.withArgs(sinon.match((uri: vscode.Uri) => path.normalize(uri.fsPath) === path.normalize(dir1Uri.fsPath))).resolves([
                [file1Name, vscode.FileType.File],
                [commonFileName, vscode.FileType.File]
            ]);
            const dir2Uri = vscode.Uri.joinPath(workspaceRoot, path2);
            fsReadDirectoryStub.withArgs(sinon.match((uri: vscode.Uri) => path.normalize(uri.fsPath) === path.normalize(dir2Uri.fsPath))).resolves([
                [file2Name, vscode.FileType.File],
                [commonFileName, vscode.FileType.File]
            ]);

            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 4, "Should find 4 unique files");
            assert.ok(result.find(f => f.name === file1Name && f.filePath === file1Uri.fsPath));
            assert.ok(result.find(f => f.name === file2Name && f.filePath === file2Uri.fsPath));
            assert.ok(result.find(f => f.name === commonFileName && f.filePath === commonFile1Uri.fsPath));
            assert.ok(result.find(f => f.name === commonFileName && f.filePath === commonFile2Uri.fsPath));
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
            const fileContent = "---\\ntitle: Unique\\n---\\nContent";
            // Setup directory with the file
            setupDirectory(effectiveRelPath, [[fileName, vscode.FileType.File]]);
            const fileUri = setupFile(effectiveRelPath, fileName, fileContent);
            
            const result = await fileHandler.readAllInstructionFiles(workspaceRoot);
            assert.strictEqual(result.length, 1, "Should find only 1 file despite effectively duplicate directory listing");
            assert.strictEqual(result[0].name, fileName);
            assert.strictEqual(result[0].filePath, fileUri.fsPath);
        });

    });
});
