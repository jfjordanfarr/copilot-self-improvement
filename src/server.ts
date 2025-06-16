import * as rpc from 'vscode-jsonrpc/node';
import * as fs from 'fs/promises';
import * as path from 'path';
import { readAllInstructionFiles } from './fileHandler';

const connection = rpc.createMessageConnection(
    new rpc.StreamMessageReader(process.stdin),
    new rpc.StreamMessageWriter(process.stdout)
);

async function getConventionDetails(): Promise<string> {
    const conventionsPath = path.join(__dirname, 'assets', 'CONVENTIONS.md');
    return fs.readFile(conventionsPath, 'utf-8');
}

connection.onRequest(async (method: string, params: any) => {
    if (method === 'initialize') {
        // The handshake requires both a response and a subsequent notification.
        
        // We must send the 'initialized' notification AFTER returning the response.
        // A short delay ensures the response is sent first.
        setTimeout(() => {
            connection.sendNotification('initialized');
        }, 100);

        // Return the response to the 'initialize' request.
        return {
            capabilities: {} 
        };
    }

    if (method === 'tools/list') {
        return [{
            name: 'copilotSelfImprovement-getInstructionsAndConventions',
            description: "Provides instructions and conventions for Copilot Self-Improvement.",
            inputSchema: { type: "object", properties: {} }
        }];
    }

    if (method === 'tools/call') {
        try {
            const workspaceRoot = process.env.WORKSPACE_ROOT;
            if (!workspaceRoot) {
                throw new Error("Workspace root not provided.");
            }
            
            const files = await readAllInstructionFiles(workspaceRoot, {});
            const conventions = await getConventionDetails();
            
            const result = { instructionFiles: files, conventions };
            return { isError: false, content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        } catch (e: any) {
            return { isError: true, content: [{ type: 'text', text: e.message }] };
        }
    }

    return null;
});

connection.listen();