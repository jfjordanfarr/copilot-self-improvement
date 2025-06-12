import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as fs from 'fs'; // Import fs
import * as path from 'path'; // Import path
import { InstructionTool } from '../instructionTool';
import * as fileHandler from '../fileHandler';
import { InstructionFileEntry } from '../fileHandler';

// Helper to create a mock Uri
const mockUri = (scheme: string, p: string): vscode.Uri => ({
    scheme,
    authority: '',
    path: p, // Corrected parameter name
    query: '',
    fragment: '',
    fsPath: p, // Corrected parameter name
    with: sinon.stub().returnsThis(),
    toJSON: sinon.stub().returns({ scheme, path: p, fsPath: p }), // Corrected parameter name
    toString: sinon.stub().returns(`${scheme}://${p}`), // Corrected parameter name
});

// Load actual conventions file for testing
let expectedConventions: string;

suite('InstructionTool Test Suite', () => {
    let sandbox: sinon.SinonSandbox;
    let instructionTool: InstructionTool;
    let mockReadAllInstructionFiles: sinon.SinonStub;
    let mockToken: vscode.CancellationToken;
    let mockExtensionUri: vscode.Uri;

    suiteSetup(() => {
        // Determine the project root reliably using __dirname
        // __dirname in out/test/instructionTool.test.js will be D:/Projects/copilot-self-improvement/out/test
        const projectRoot = path.resolve(__dirname, '..', '..'); 
        const conventionsPath = path.join(projectRoot, 'src', 'assets', 'CONVENTIONS.md');
        try {
            expectedConventions = fs.readFileSync(conventionsPath, 'utf-8').trim();
        } catch (e) {
            console.error(`Failed to read CONVENTIONS.md at ${conventionsPath}`, e);
            expectedConventions = "Fallback conventions if file read fails - THIS SHOULD NOT HAPPEN IN CI"; 
        }
    });

    setup(() => {
        sandbox = sinon.createSandbox();
        
        // Determine the project root reliably using __dirname for mockExtensionUri
        const projectRoot = path.resolve(__dirname, '..', '..');
        mockExtensionUri = vscode.Uri.file(projectRoot); 
        instructionTool = new InstructionTool(mockExtensionUri);

        // Stub getWorkspaceRootUri directly on the imported module
        sandbox.stub(vscode.workspace, 'workspaceFolders').get(() => [{ uri: mockUri('file', '/test/project'), name: 'test-ws', index: 0 }]);
        
        mockReadAllInstructionFiles = sandbox.stub(fileHandler, 'readAllInstructionFiles');

        mockToken = {
            isCancellationRequested: false,
            onCancellationRequested: sinon.stub(),
        };
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('invoke for copilotSelfImprovement-getInstructionsAndConventions', () => {
        test('Should throw LanguageModelError if no workspace root (workspaceFolders is undefined)', async () => {
            // Override the getter for this specific test
            Object.defineProperty(vscode.workspace, 'workspaceFolders', { get: () => undefined, configurable: true });
            try {
                await instructionTool.invoke({ tool: 'copilotSelfImprovement-getInstructionsAndConventions', content: '{}' } as any, mockToken);
                assert.fail('Should have thrown an error');
            } catch (e: any) {
                assert.ok(e instanceof vscode.LanguageModelError);
                assert.strictEqual(e.message, 'No workspace root found. Cannot retrieve instructions.');
            }
        });

        test('Should throw LanguageModelError if no workspace root (workspaceFolders is empty)', async () => {
            // Override the getter for this specific test
            Object.defineProperty(vscode.workspace, 'workspaceFolders', { get: () => [], configurable: true });
            try {
                await instructionTool.invoke({ tool: 'copilotSelfImprovement-getInstructionsAndConventions', content: '{}' } as any, mockToken);
                assert.fail('Should have thrown an error');
            } catch (e: any) {
                assert.ok(e instanceof vscode.LanguageModelError);
                assert.strictEqual(e.message, 'No workspace root found. Cannot retrieve instructions.');
            }
        });

        test('Should throw LanguageModelError if cancellation requested before reading files', async () => {
            mockToken.isCancellationRequested = true;
            try {
                await instructionTool.invoke({ tool: 'copilotSelfImprovement-getInstructionsAndConventions', content: '{}' } as any, mockToken);
                assert.fail('Should have thrown an error');
            } catch (e: any) {
                assert.ok(e instanceof vscode.LanguageModelError);
                assert.strictEqual(e.message, 'Operation cancelled.');
            }
        });

        test('Should return empty instructionFiles and conventions if no instruction files found', async () => {
            mockReadAllInstructionFiles.resolves([]);

            const result = await instructionTool.invoke({ tool: 'copilotSelfImprovement-getInstructionsAndConventions', content: '{}' } as any, mockToken);
            const firstPart = result.content[0];
            assert.ok(firstPart instanceof vscode.LanguageModelTextPart, 'First part should be LanguageModelTextPart');
            
            if (firstPart instanceof vscode.LanguageModelTextPart) {
                const parsedResult = JSON.parse(firstPart.value);
                assert.deepStrictEqual(parsedResult.instructionFiles, []);
                assert.strictEqual(parsedResult.conventions.trim(), expectedConventions, "Conventions string does not match CONVENTIONS.md");
            } else {
                assert.fail('Result content is not LanguageModelTextPart');
            }
        });

        test('Should return instructionFiles and conventions when files are found', async () => {
            const now = new Date().toISOString();
            const mockFileEntries: InstructionFileEntry[] = [
                {
                    uri: 'file:///test/project/.github/instructions/instr1.selfImprovement.instructions.md',
                    name: 'instr1.selfImprovement.instructions.md',
                    filePath: '/test/project/.github/instructions/instr1.selfImprovement.instructions.md',
                    title: 'Instruction One',
                    applyTo: '**/*.ts',
                    purpose: 'For TS files',
                    lastModified: now,
                },
                {
                    uri: 'file:///test/project/.github/instructions/instr2.selfImprovement.instructions.md',
                    name: 'instr2.selfImprovement.instructions.md',
                    filePath: '/test/project/.github/instructions/instr2.selfImprovement.instructions.md',
                    title: 'Instruction Two',
                    applyTo: 'src/**',
                    // purpose is optional
                    lastModified: now,
                },
            ];
            mockReadAllInstructionFiles.resolves(mockFileEntries);

            const result = await instructionTool.invoke({ tool: 'copilotSelfImprovement-getInstructionsAndConventions', content: '{}' } as any, mockToken);
            const firstPart = result.content[0];
            assert.ok(firstPart instanceof vscode.LanguageModelTextPart, 'First part should be LanguageModelTextPart');

            if (firstPart instanceof vscode.LanguageModelTextPart) {
                const parsedResult = JSON.parse(firstPart.value);
                assert.strictEqual(parsedResult.instructionFiles.length, 2);
                
                // Check first file entry
                assert.deepStrictEqual(parsedResult.instructionFiles[0], {
                    uri: 'file:///test/project/.github/instructions/instr1.selfImprovement.instructions.md',
                    name: 'instr1.selfImprovement.instructions.md',
                    filePath: '/test/project/.github/instructions/instr1.selfImprovement.instructions.md',
                    title: 'Instruction One',
                    applyTo: '**/*.ts',
                    purpose: 'For TS files',
                    lastModified: now,
                });

                // Check second file entry
                const expectedSecondFile: any = {
                    uri: 'file:///test/project/.github/instructions/instr2.selfImprovement.instructions.md',
                    name: 'instr2.selfImprovement.instructions.md',
                    filePath: '/test/project/.github/instructions/instr2.selfImprovement.instructions.md',
                    title: 'Instruction Two',
                    applyTo: 'src/**',
                    lastModified: now,
                };
                // If purpose was defined in mock, it should be in the result, otherwise not.
                if (mockFileEntries[1].purpose !== undefined) {
                    expectedSecondFile.purpose = mockFileEntries[1].purpose;
                } else {
                    // Ensure if purpose is undefined in mock, it's also undefined or not present in result
                    assert.strictEqual(parsedResult.instructionFiles[1].purpose, undefined, "Purpose should be undefined");
                }
                assert.deepStrictEqual(parsedResult.instructionFiles[1], expectedSecondFile);

                assert.strictEqual(parsedResult.conventions.trim(), expectedConventions, "Conventions string does not match CONVENTIONS.md");
            } else {
                assert.fail('Result content is not LanguageModelTextPart');
            }
        });
        
        test('Should throw LanguageModelError if CONVENTIONS.md is missing or unreadable', async () => {
            // To simulate this, we can temporarily use an extension URI that won't resolve CONVENTIONS.md
            const badExtensionUri = vscode.Uri.file(path.join(process.cwd(), 'nonexistent_path_for_test'));
            const toolWithBadUri = new InstructionTool(badExtensionUri);
            mockReadAllInstructionFiles.resolves([]); // Let file reading for instructions succeed

            try {
                await toolWithBadUri.invoke({ tool: 'copilotSelfImprovement-getInstructionsAndConventions', content: '{}' } as any, mockToken);
                assert.fail('Should have thrown an error due to missing CONVENTIONS.md');
            } catch (e: any) {
                assert.ok(e instanceof vscode.LanguageModelError, `Expected LanguageModelError, but got ${e.constructor.name}`);
                assert.strictEqual(e.message, 'Failed to load convention details. The CONVENTIONS.md file might be missing or corrupted.');
            }
        });

        test('Should throw LanguageModelError if readAllInstructionFiles rejects with a generic error', async () => {
            mockReadAllInstructionFiles.rejects(new Error('FS Read Error'));

            try {
                await instructionTool.invoke({ tool: 'copilotSelfImprovement-getInstructionsAndConventions', content: '{}' } as any, mockToken);
                assert.fail('Should have thrown an error');
            } catch (e: any) {
                assert.ok(e instanceof vscode.LanguageModelError, `Expected LanguageModelError, but got ${e.constructor.name}`);
                assert.strictEqual(e.message, 'FS Read Error');
            }
        });

        test('Should throw original LanguageModelError if readAllInstructionFiles rejects with it', async () => {
            const originalError = new vscode.LanguageModelError('Original LM Error'); // Removed the second argument
            mockReadAllInstructionFiles.rejects(originalError);

            try {
                await instructionTool.invoke({ tool: 'copilotSelfImprovement-getInstructionsAndConventions', content: '{}' } as any, mockToken);
                assert.fail('Should have thrown an error');
            } catch (e: any) {
                assert.ok(e instanceof vscode.LanguageModelError);
                assert.strictEqual(e, originalError); // Check for exact error instance
            }
        });
    });
});
