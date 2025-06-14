import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Copilot Self-Improvement: Activating and registering MCP Server Definition Provider.');

    const provider: vscode.McpServerDefinitionProvider = {
        onDidChangeMcpServerDefinitions: new vscode.EventEmitter<void>().event,
        
        async provideMcpServerDefinitions(token: vscode.CancellationToken): Promise<vscode.McpServerDefinition[]> {
            
            const serverPath = vscode.Uri.joinPath(context.extensionUri, 'out', 'server.js').fsPath;

            const serverDefinition = new vscode.McpStdioServerDefinition(
                'Copilot Self-Improvement', 
                'node',
                [serverPath]
            );

            return [serverDefinition];
        }
    };

    context.subscriptions.push(
        vscode.lm.registerMcpServerDefinitionProvider('copilot-self-improvement-provider', provider)
    );
}

export function deactivate() {}