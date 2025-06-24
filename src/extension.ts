import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';

function getExpectedServerLogPath(): string {
    const tempDir = os.tmpdir();
    return path.join(tempDir, 'copilotSelfImprovement_server_report_fix.log'); 
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Copilot Self-Improvement (MCP Provider): Activating...');

    const expectedLogPath = getExpectedServerLogPath();
    console.log(`CSI (MCP Provider): Expected server JSON-RPC log file path: ${expectedLogPath}`);

    const provider: vscode.McpServerDefinitionProvider = {
        provideMcpServerDefinitions: async (token: vscode.CancellationToken) => {
            console.log("CSI (MCP Provider): provideMcpServerDefinitions called.");
            const workspaceFolders = vscode.workspace.workspaceFolders;
            let workspaceRoot: string = "WORKSPACE_ROOT_NOT_SET"; 
            if (workspaceFolders && workspaceFolders.length > 0) {
                workspaceRoot = workspaceFolders[0].uri.fsPath;
            }

            const serverScriptPath = context.asAbsolutePath(path.join('dist', 'server.js'));
            console.log(`CSI (MCP Provider): Server script path: ${serverScriptPath}`);

            const serverArgs = [serverScriptPath];
            
            const serverEnv: { [key: string]: string } = {
                "WORKSPACE_ROOT": workspaceRoot,
                "CSI_SERVER_LOG_PATH": expectedLogPath // Pass the correct log path
                // "IS_SPAWN_TEST": "false" // Or remove this if server.ts defaults correctly
            };
            // For debugging the server itself:
            // serverEnv["NODE_OPTIONS"] = "--inspect-brk=9230"; // Then attach Node debugger

            const serverDefinition = new vscode.McpStdioServerDefinition(
                "Copilot Self-Improvement Local Instructions Server", // Label for the actual server
                "node", 
                serverArgs, 
                serverEnv, 
                context.extension.packageJSON.version 
            );
            
            console.log("CSI (MCP Provider): Providing server definition:", JSON.stringify(serverDefinition));
            return [serverDefinition];
        },
        resolveMcpServerDefinition: async (server: vscode.McpStdioServerDefinition, token: vscode.CancellationToken) => {
            console.log("CSI (MCP Provider): Resolving server definition for:", server.label);
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(server.args[0]));
                console.log(`CSI (MCP Provider): Server script ${server.args[0]} exists.`);
            } catch (e) {
                console.error(`CSI (MCP Provider): Server script not found at ${server.args[0]}`, e);
                return undefined; 
            }
            return server;
        }
    };

    const providerId = 'copilotSelfImprovement.instructionsServerProvider'; 
    try {
        context.subscriptions.push(
            vscode.lm.registerMcpServerDefinitionProvider(providerId, provider)
        );
        console.log(`Copilot Self-Improvement (MCP Provider): Provider "${providerId}" registered.`);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error(`Copilot Self-Improvement (MCP Provider): FAILED to register provider "${providerId}"`, e);
    }
}

export function deactivate() {
    console.log('Copilot Self-Improvement (MCP Provider): Deactivating...');
}