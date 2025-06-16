import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const provider: vscode.McpServerDefinitionProvider = {
        onDidChangeMcpServerDefinitions: new vscode.EventEmitter<void>().event,
        async provideMcpServerDefinitions(token: vscode.CancellationToken): Promise<vscode.McpServerDefinition[]> {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders || workspaceFolders.length === 0) return [];
            
            const serverPath = vscode.Uri.joinPath(context.extensionUri, 'dist', 'server.js').fsPath;
            const env = { WORKSPACE_ROOT: workspaceFolders[0].uri.fsPath };

            return [new vscode.McpStdioServerDefinition('Copilot Self-Improvement', 'node', [serverPath], env)];
        }
    };
    context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('copilot-self-improvement-provider', provider));
}
export function deactivate() {}