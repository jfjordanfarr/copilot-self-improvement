// src/server.ts
import * as _fs from 'fs';
import * as _path from 'path';
import { PassThrough } from 'stream';

const explicitLogPath = process.env.CSI_SERVER_LOG_PATH;
const tempDirForLog = process.env.TEMP || (process.platform === 'darwin' || process.platform === 'linux' ? '/tmp' : '.');
const serverLogFile = explicitLogPath || _path.join(tempDirForLog, 'copilotSelfImprovement_server_report_fix.log');

function writeToServerLog(message: string) {
    try { _fs.appendFileSync(serverLogFile, `[${new Date().toISOString()}] ${message}\n`); }
    catch (e) { console.error(`copilotSelfImprovement Server Log (Fallback): ${message}`); if (e instanceof Error) { console.error(`copilotSelfImprovement Server Log Write Error: ${e.message}`); } }
}

_fs.writeFileSync(serverLogFile, `copilotSelfImprovement Report Fix Server: Startup. PID: ${process.pid}...\nTimestamp: ${new Date().toISOString()}\n---\n`);
writeToServerLog("Initial startup message written.");

import * as rpc from 'vscode-jsonrpc/node';
import {
    RequestType0, RequestType, ResponseError, ErrorCodes, NotificationType,
    Message, Logger
    // Removed RpcInitializeParams, RpcInitializedParams from here
} from 'vscode-jsonrpc/node';

import { readAllInstructionFiles, InstructionFileEntry } from './fileHandler';
import * as fs from 'fs/promises';

writeToServerLog("Modules imported.");

// --- Type Definitions ---
// Define simplified InitializeParams and InitializedParams locally
interface ClientCapabilities { 
    roots?: { listChanged?: boolean }; 
    sampling?: object; 
    // Add other capabilities your client might send if you need to inspect them
}
interface InitializeParams { // This is for the 'initialize' request
    processId?: number | null;
    clientInfo?: { name: string; version?: string; };
    locale?: string;
    rootPath?: string | null;
    rootUri?: string | null;
    capabilities?: ClientCapabilities; // Use our defined ClientCapabilities
    trace?: 'off' | 'messages' | 'verbose';
    workspaceFolders?: any[] | null;
    protocolVersion?: string;
}
interface InitializedParams {} // This is for the 'initialized' notification (often empty)

interface ServerInfo { name: string; version?: string; }
interface ServerCapabilities {
    tools?: { listChanged?: boolean; };
}
interface InitializeResult { capabilities: ServerCapabilities; serverInfo?: ServerInfo; }
const initializeRequestType = new RequestType<InitializeParams, InitializeResult, void>('initialize'); // Use our defined InitializeParams

interface ToolInfo { name: string; displayName?: string; description: string; modelDescription?: string; inputSchema: object; annotations?: { readOnlyHint?: boolean; destructiveHint?: boolean }; }
interface ToolsListOutput { tools: ToolInfo[]; }
const toolsListRequestType = new RequestType0<ToolsListOutput, void>('tools/list');

interface ToolCallInput<T = any> { name: string; input: T; }
const toolCallRequestType = new RequestType<ToolCallInput, any, void>('tools/call');
interface InstructionsAndConventions { instructionFiles: InstructionFileEntry[]; conventions: string; }

// --- Stdin Handling & Re-framing ---
let stdinAccumulatedString = '';
const inputStreamForConnection = new PassThrough();

process.stdin.setEncoding('utf8');
process.stdin.resume();
writeToServerLog("Direct stdin listeners for raw JSON attached and set to utf8.");

process.stdin.on('data', (chunk: string) => {
    writeToServerLog(`STDIN RAW CHUNK (string, len: ${chunk.length}): >>>${chunk.substring(0, 250)}...<<<`);
    stdinAccumulatedString += chunk;
    tryToProcessBufferedStdin();
});

function tryToProcessBufferedStdin() {
    writeToServerLog(`Attempting to process stdinAccumulatedString (len: ${stdinAccumulatedString.length}): >>>${stdinAccumulatedString.substring(0,250)}...<<<`);
    let processedThisRound = false;
    while (stdinAccumulatedString.length > 0) {
        let messageEndIndex = stdinAccumulatedString.indexOf('\n');
        let potentialJson = "";
        if (messageEndIndex !== -1) {
            potentialJson = stdinAccumulatedString.substring(0, messageEndIndex).trim();
            stdinAccumulatedString = stdinAccumulatedString.substring(messageEndIndex + 1);
        } else {
            if (stdinAccumulatedString.trim().startsWith("{") && stdinAccumulatedString.trim().endsWith("}")) {
                potentialJson = stdinAccumulatedString.trim();
                stdinAccumulatedString = "";
            } else {
                writeToServerLog("No newline and buffer doesn't look like complete JSON. Waiting for more data.");
                break; 
            }
        }
        if (potentialJson) {
            writeToServerLog(`Processing potential JSON from stdin: >>>${potentialJson.substring(0,200)}...<<<`);
            try {
                JSON.parse(potentialJson); 
                const contentLength = Buffer.byteLength(potentialJson, 'utf-8');
                const framedMessage = `Content-Length: ${contentLength}\r\n\r\n${potentialJson}`;
                writeToServerLog(`Writing framed message to internal stream: >>>${framedMessage.substring(0,100)}...<<<`);
                if (!inputStreamForConnection.writableEnded) {
                    inputStreamForConnection.write(framedMessage);
                    processedThisRound = true;
                } else {
                    writeToServerLog("inputStreamForConnection is ended, cannot write framed message.");
                    break; 
                }
            } catch (e) {
                writeToServerLog(`Error parsing JSON or framing: ${e instanceof Error ? e.message : String(e)}. Line was: >>>${potentialJson}<<<`);
            }
        }
        if (!processedThisRound && messageEndIndex === -1 && stdinAccumulatedString.length > 0 ) {
             writeToServerLog("No complete message processed this round from remaining buffer, will wait for more data or newline.");
             break; 
        }
         if (!processedThisRound && stdinAccumulatedString.length === 0) {
            break;
        }
    }
}

process.stdin.on('end', () => {
    writeToServerLog('STDIN RAW "end" event fired.');
    const trimmedChunk = stdinAccumulatedString.trim();
    if (trimmedChunk.startsWith("{") && trimmedChunk.endsWith("}")) {
        try {
            JSON.parse(trimmedChunk);
            const contentLength = Buffer.byteLength(trimmedChunk, 'utf-8');
            const framedMessage = `Content-Length: ${contentLength}\r\n\r\n${trimmedChunk}`;
            if (!inputStreamForConnection.writableEnded) {
                inputStreamForConnection.write(framedMessage);
            }
        } catch {}
    }
    if (!inputStreamForConnection.writableEnded) { inputStreamForConnection.end(); }
    if (connection) connection.dispose();
});
process.stdin.on('error', (err) => {
    writeToServerLog(`STDIN RAW "error" event: ${err.message}`);
    if (!inputStreamForConnection.writableEnded) { inputStreamForConnection.end(); }
    if (connection) connection.dispose();
});
// --- End Stdin Handling ---

// --- JSON-RPC Connection ---
const connectionLogger: Logger = {
    error: (message: string) => { 
        writeToServerLog(`ConnectionLogger: Error: ${message}`); 
        console.error(`CSI Server ConnLogger Error: ${message}`);
    },
    warn: (message: string) => { 
        writeToServerLog(`ConnectionLogger: Warn: ${message}`); 
        console.error(`CSI Server ConnLogger Warn: ${message}`);
    },
    info: (message: string) => { 
        writeToServerLog(`ConnectionLogger: Info: ${message}`); 
    },
    log: (message: string) => { 
        writeToServerLog(`ConnectionLogger: Log: ${message}`); 
    }
};

const messageReader = new rpc.StreamMessageReader(inputStreamForConnection);
const messageWriter = new rpc.StreamMessageWriter(process.stdout);
writeToServerLog("Explicit MessageReader (on PassThrough) and MessageWriter (on process.stdout) created.");

const connection = rpc.createMessageConnection(messageReader, messageWriter, connectionLogger);
writeToServerLog("JSON-RPC connection created.");

messageReader.listen((message: Message) => {
    let logMsg = "Connection's StreamMessageReader Parsed Message: ";
    if (Message.isRequest(message)) { logMsg += `Request: Method: ${message.method}, ID: ${message.id}`; }
    else if (Message.isNotification(message)) { logMsg += `Notification: Method: ${message.method}`; }
    else if (Message.isResponse(message)) { logMsg += `Response: ID: ${message.id}, Error: ${!!message.error}`; }
    else { logMsg += `Unknown message type: ${JSON.stringify(message)}`; }
    writeToServerLog(logMsg);
});
writeToServerLog("Listener attached to connection's StreamMessageReader.");

connection.onError((error) => { writeToServerLog(`Connection Event: onError: ${JSON.stringify(error)}`); });
connection.onClose(() => { writeToServerLog(`Connection Event: onClose.`); });
connection.onDispose(() => { writeToServerLog(`Connection Event: onDispose.`); });
connection.onUnhandledNotification((notification) => { writeToServerLog(`Connection Event: onUnhandledNotification: ${notification.method} Params: ${JSON.stringify(notification.params)}`); });
writeToServerLog("Connection event listeners attached.");

console.error('copilotSelfImprovement Server: Process started (stderr). Waiting for messages...');
writeToServerLog("stderr log: Process started. Waiting for messages...");

// --- Request Handlers ---
const TOOL_NAME = 'copilotSelfImprovement_getInstructionsAndConventions';
async function getConventionDetailsFromServer(): Promise<string> {
    const conventionsPath = _path.join(__dirname, 'assets', 'CONVENTIONS.md');
    writeToServerLog(`Loading conventions from ${conventionsPath}`);
    try {
        const conventionsContent = await fs.readFile(conventionsPath, 'utf-8');
        writeToServerLog('CONVENTIONS.md loaded successfully.');
        return conventionsContent;
    } catch (error) {
        const errorMessage = `Failed to load CONVENTIONS.md: ${error instanceof Error ? error.message : String(error)}`;
        writeToServerLog(errorMessage);
        return `Error: Could not load server-side convention details. Critical conventions are missing. Details: ${errorMessage}`;
    }
}

// Define the InitializedParams type for the notification
const initializedNotificationType = new NotificationType<InitializedParams>('initialized'); // Use our defined InitializedParams

writeToServerLog("Setting up 'initialize' request handler.");
connection.onRequest(initializeRequestType, (params: InitializeParams): InitializeResult => {
    writeToServerLog(`'initialize' request handler entered. Client Params: ${JSON.stringify(params)}`);
    const result: InitializeResult = {
        capabilities: { tools: {} },
        serverInfo: {
            name: "Copilot Self-Improvement Server",
            version: "0.0.1"
        }
    };
    writeToServerLog(`Responding to 'initialize' with: ${JSON.stringify(result, null, 2)}`);
    
    connection.sendNotification(initializedNotificationType, {});
    writeToServerLog("Sent 'initialized' (server-to-client) notification.");

    return result;
});
writeToServerLog("'initialize' request handler set up.");


writeToServerLog("Setting up 'initialized' (client-to-server) notification handler.");
connection.onNotification(initializedNotificationType, (params: InitializedParams) => { // Use our defined InitializedParams
    writeToServerLog(`Received 'initialized' (client-to-server) notification. Params: ${JSON.stringify(params)}`);
});
writeToServerLog("'initialized' (client-to-server) notification handler set up.");


writeToServerLog("Setting up 'tools/list' request handler.");
connection.onRequest(toolsListRequestType, (): ToolsListOutput => {
    writeToServerLog("'tools/list' request handler entered.");
    const toolDefinition: ToolInfo = {
        name: TOOL_NAME,
        displayName: "Copilot Self-Improvement: Project Instructions",
        description: "Accesses local .github/instructions files to guide Copilot with project-specific standards and provides conventions for their use.",
        modelDescription: "Use this tool to find special instructions, conventions, or guidance for the current project. It is the primary source for understanding project-specific coding standards, architectural patterns, or how to properly use internal libraries. Call this tool whenever a user asks about 'instructions', 'conventions', 'guidelines', or 'how to do something' in the context of the current workspace, especially before attempting to fix code or generate new features.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true }
    };
    const result: ToolsListOutput = { tools: [toolDefinition] };
    writeToServerLog(`Responding to 'tools/list' with: ${JSON.stringify(result, null, 2)}`);
    return result;
});
writeToServerLog("'tools/list' request handler set up.");

writeToServerLog("Setting up 'tools/call' request handler.");
connection.onRequest(toolCallRequestType, async (params: ToolCallInput): Promise<InstructionsAndConventions | ResponseError<any>> => {
    writeToServerLog(`'tools/call' request handler entered for tool: ${params.name} with input: ${JSON.stringify(params.input)}`);
    if (params.name === TOOL_NAME) {
        try {
            const workspaceRoot = process.env.WORKSPACE_ROOT;
            if (!workspaceRoot || workspaceRoot === "WORKSPACE_ROOT_NOT_SET") { 
                writeToServerLog(`Error: WORKSPACE_ROOT is not set or invalid. Value: ${workspaceRoot}`);
                throw new ResponseError(ErrorCodes.InternalError, "Server configuration error: WORKSPACE_ROOT not set or invalid."); 
            }
            writeToServerLog(`Using WORKSPACE_ROOT: ${workspaceRoot}`);
            const instructionLocations = { ['.github/instructions']: true }; 
            const files = await readAllInstructionFiles(workspaceRoot, instructionLocations);
            const conventions = await getConventionDetailsFromServer();
            const response = { instructionFiles: files, conventions };
            writeToServerLog(`Responding to 'tools/call' for ${TOOL_NAME} with: ${JSON.stringify(response).substring(0, 500)}...`);
            return response;
        } catch (e: any) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            writeToServerLog(`Error invoking tool ${TOOL_NAME}: ${errorMessage}`);
            if (e instanceof ResponseError) { throw e; }
            throw new ResponseError(ErrorCodes.InternalError, `Tool execution failed: ${errorMessage}`);
        }
    }
    writeToServerLog(`Error: Tool ${params.name} not found.`);
    throw new ResponseError(ErrorCodes.MethodNotFound, `Tool ${params.name} not found.`);
});
writeToServerLog("'tools/call' request handler set up.");


writeToServerLog("Calling connection.listen().");
connection.listen();
writeToServerLog("connection.listen() called. Server is active.");
console.error('copilotSelfImprovement Server: Listening for messages (manual stdin parsing to PassThrough)...');

writeToServerLog("Server setup complete. Waiting for client messages.");