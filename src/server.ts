import * as rpc from 'vscode-jsonrpc/node';
import { InstructionTool } from './instructionTool';
import * as vscode from 'vscode';

const serverExtensionUri = vscode.Uri.joinPath(vscode.Uri.file(__dirname), '..');
const tool = new InstructionTool(serverExtensionUri);

const connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(process.stdin),
    new rpc.StreamMessageWriter(process.stdout)
);

connection.onRequest(async (method: string, params: any) => {
    if (method === 'tools/list') {
        return [{
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
        }];
    }
    if (method === 'tools/call') {
        if (params.name === tool.name) {
            try {
                const mockToken: vscode.CancellationToken = {
                    isCancellationRequested: false,
                    onCancellationRequested: new vscode.EventEmitter<any>().event,
                };
                
                const result = await tool.invoke(params.options || {}, mockToken);
                return {
                    isError: false,
                    content: result.content.map(part => ({ type: 'text', text: (part as vscode.LanguageModelTextPart).value }))
                };
            } catch (e: any) {
                return {
                    isError: true,
                    content: [{ type: 'text', text: e.message }],
                };
            }
        }
    }
    return null;
});

connection.listen();