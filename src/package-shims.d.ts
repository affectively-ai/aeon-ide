declare namespace AeonIdePackageShims {
  type ContainerLanguage =
    | 'javascript'
    | 'typescript'
    | 'go'
    | 'lua'
    | 'tla'
    | 'gnosis'
    | 'python'
    | 'rust';

  type ExecutionOutcome =
    | 'OUTCOME_OK'
    | 'OUTCOME_TIMEOUT'
    | 'OUTCOME_ERROR'
    | 'OUTCOME_MEMORY_EXCEEDED'
    | 'OUTCOME_UNSUPPORTED_LANGUAGE';

  interface AeonFSChange {
    path: string;
    type: 'create' | 'modify' | 'delete';
    content?: string;
    previousHash?: string;
    newHash: string;
  }

  interface AeonFSMetadata {
    language?: string;
    lastModified: number;
    hash: string;
    encrypted?: boolean;
  }

  interface AeonFSPermission {
    did: string;
    capabilities: ('read' | 'write' | 'execute')[];
    xpath?: string;
    ucanProof?: string;
  }

  interface AeonFSNode {
    id: string;
    did: string;
    type: 'file' | 'directory' | 'module';
    name: string;
    path: string;
    content?: string;
    children?: AeonFSNode[];
    permissions: AeonFSPermission[];
    metadata: AeonFSMetadata;
  }

  interface FileEntry {
    name?: string;
    path: string;
    content?: string;
    size?: number;
    type?: 'file' | 'directory' | 'module';
    language?: string;
    dirty?: boolean;
    isDirectory?: boolean;
    metadata?: Record<string, unknown>;
    [key: string]: unknown;
  }

  interface ContainerExecuteRequest {
    code: string;
    language: ContainerLanguage;
    session_id?: string;
    timeout_ms?: number;
    memory_limit_bytes?: number;
    mounts?: Array<{ path: string; target: string }>;
    context?: {
      cwd?: string;
      env?: Record<string, string>;
      argv?: string[];
    };
    filesystem?: AeonFSNode | { files?: FileEntry[] };
    ucan?: unknown;
  }

  interface ContainerExecuteResult {
    outcome: ExecutionOutcome;
    output: string;
    error?: string;
    logs: string[];
    execution_time_ms: number;
    filesystem_changes?: AeonFSChange[];
    language: ContainerLanguage;
    ast?: unknown;
    b1?: number;
    buleyMeasure?: number;
    gnosis?: unknown;
    execution_proof?: unknown;
  }

  interface ContainerLockState {
    locked?: boolean;
    container_id?: string;
    owner_did?: string | null;
    ownerId?: string;
    expiresAt?: number;
    expires_at?: number;
    lease_id?: string | null;
    heartbeat_at?: string | number;
    [key: string]: unknown;
  }

  interface ExecutionReceipt {
    id: string;
    status: 'ok' | 'error' | 'timeout';
    output?: string;
    error?: string;
    timestamp?: number;
    event_type?: string;
    created_at?: string | number;
    actor_did?: string;
    [key: string]: unknown;
  }

  interface RepoIngestInput {
    container_id?: string;
    repoUrl: string;
    branch?: string;
    commit?: string;
    mountPath?: string;
    source_type?: string;
    [key: string]: unknown;
  }

  type StreamedLintLanguage = ContainerLanguage;
  type StreamedLintSeverity = 'error' | 'warning' | 'info';
  type StreamedLintEngine = 'swc-wasm' | 'rules';

  interface StreamedLintDiagnostic {
    id: string;
    line: number;
    column: number;
    endLine: number;
    endColumn: number;
    severity: StreamedLintSeverity;
    source: string;
    code: string;
    message: string;
  }

  interface StreamedLintStats {
    total: number;
    errors: number;
    warnings: number;
    infos: number;
    elapsedMs: number;
    engine: StreamedLintEngine;
    supportsWasm: boolean;
  }

  interface LintCoreInput {
    path: string;
    language: StreamedLintLanguage;
    content: string;
    maxDiagnostics: number;
  }

  interface LintCoreOutput {
    diagnostics: StreamedLintDiagnostic[];
    engine: StreamedLintEngine;
    supportsWasm: boolean;
  }

  interface StreamedLintHandle {
    requestId: string;
    cancel: () => void;
  }

  interface StreamedLintRunConfig {
    version: number;
    path: string;
    language: StreamedLintLanguage;
    content: string;
    maxDiagnostics?: number;
    onStarted?: (message: {
      type: 'started';
      requestId: string;
      version: number;
      engine: StreamedLintEngine;
      supportsWasm: boolean;
    }) => void;
    onChunk?: (diagnostics: StreamedLintDiagnostic[], progress: number) => void;
    onDone?: (stats: StreamedLintStats) => void;
    onError?: (errorMessage: string) => void;
  }

  type AgentRoomPresenceStatus =
    | 'online'
    | 'thinking'
    | 'editing'
    | 'testing'
    | 'blocked'
    | 'idle'
    | 'offline'
    | 'coordinating'
    | 'restarting'
    | 'schema-gating';

  interface AgentRoomTask {
    taskId: string;
    title: string;
    status: 'todo' | 'in_progress' | 'done' | 'blocked';
    blockedReason?: string;
    dependsOn: string[];
  }

  interface AgentRoomPresenceRecord {
    roomId: string;
    agentId: string;
    channel: number;
    role: 'system1' | 'coordinator' | 'subagent';
    status: AgentRoomPresenceStatus;
    currentFile?: string;
    lineRange?: string;
    currentTaskId?: string;
    workerId?: string;
    parentAgentId?: string;
    iterationNumber?: number;
    loopStatus?: string;
    lastMcpCall?: string;
    lastHeartbeat: string;
  }

  interface AgentRoomSnapshotPayload {
    room: {
      roomId: string;
      request: {
        roomName: string;
        requestSummary: string;
      };
      agents: Record<
        string,
        {
          agentId: string;
          channel: number;
          kind: 'system1' | 'coordinator' | 'subagent';
          displayName: string;
          parentAgentId?: string;
        }
      >;
    };
    presence: AgentRoomPresenceRecord[];
    globalTasks: AgentRoomTask[];
    agentTasks: Record<string, AgentRoomTask[]>;
    latestOutput?: {
      summary: string;
      emittedAt: string;
      decision: {
        emit: boolean;
        selectedActions: Array<{ id: string }>;
      };
    };
  }

  interface SyncStatus {
    connected: boolean;
  }
}

declare module '@a0n/aeon-container/services/types' {
  export type ContainerLanguage = AeonIdePackageShims.ContainerLanguage;
  export type ExecutionOutcome = AeonIdePackageShims.ExecutionOutcome;
  export type AeonFSChange = AeonIdePackageShims.AeonFSChange;
  export type AeonFSNode = AeonIdePackageShims.AeonFSNode;
  export type FileEntry = AeonIdePackageShims.FileEntry;
  export type ContainerExecuteRequest =
    AeonIdePackageShims.ContainerExecuteRequest;
  export type ContainerExecuteResult =
    AeonIdePackageShims.ContainerExecuteResult;
  export type ContainerLockState = AeonIdePackageShims.ContainerLockState;
  export type ExecutionReceipt = AeonIdePackageShims.ExecutionReceipt;
  export type RepoIngestInput = AeonIdePackageShims.RepoIngestInput;
}

declare module '@a0n/aeon-container/services/browser-sandbox' {
  import type {
    ContainerExecuteRequest,
    ContainerExecuteResult,
  } from '@a0n/aeon-container/services/types';

  export class BrowserSandbox {
    static getInstance(): BrowserSandbox;
    setEdgeFallbackUrl(url: string): void;
    ensureLoaded(): Promise<boolean>;
    execute(request: ContainerExecuteRequest): Promise<ContainerExecuteResult>;
  }
}

declare module '@a0n/aeon-container/services/persistent-fs' {
  import type {
    AeonFSNode,
    ContainerLockState,
    ExecutionReceipt,
    FileEntry,
    RepoIngestInput,
  } from '@a0n/aeon-container/services/types';

  export class PersistentFS {
    dirty: boolean;

    constructor(
      containerId: string,
      config: {
        apiUrl?: string;
        ucanToken?: string;
        dashRelayRoom?: string;
        syncPolicy?: string;
      }
    );

    readFile(path: string): Promise<string>;
    writeFile(path: string, content: string): Promise<void>;
    deleteFile(path: string): Promise<void>;
    listFiles(): FileEntry[];
    loadFromBackend(): Promise<AeonFSNode>;
    syncToBackend(): Promise<void>;
    connectDashRelay(relay: unknown): void;
    toFSNode(): AeonFSNode;
    seedFiles(files: Array<{ path: string; content: string }>): void;
    dispose(): void;
    createSnapshot(): Promise<{
      snapshot_id: string;
      snapshot_key: string;
      files_count: number;
      manifest_hash: string;
      timestamp: number;
    }>;
    getReceipts(limit?: number): Promise<ExecutionReceipt[]>;
    getLockState(): Promise<ContainerLockState>;
    acquireLock(
      leaseMs?: number
    ): Promise<{ lease_id: string; expires_at: number }>;
    heartbeatLock(
      leaseId: string,
      leaseMs?: number
    ): Promise<{ heartbeat_at: string; expires_at: number }>;
    releaseLock(leaseId?: string): Promise<void>;
    overrideLock(
      leaseMs?: number
    ): Promise<{ lease_id: string; expires_at: number }>;
    ingestRepo(input: Omit<RepoIngestInput, 'container_id'>): Promise<{
      repo_id: string;
      indexed_files: number;
      symbols: number;
    }>;
    getRepoStatus(repoId: string): Promise<Record<string, unknown>>;
    getRepoFile(
      repoId: string,
      path: string
    ): Promise<{ content: string; language?: string }>;
    getRepoSymbols(
      repoId: string,
      query?: string
    ): Promise<Array<Record<string, unknown>>>;
    refreshRepo(repoId: string): Promise<{ job_id: string; status: string }>;
  }
}

declare module '@a0n/aeon-container/services/streamed-lint-types' {
  export type StreamedLintLanguage = AeonIdePackageShims.StreamedLintLanguage;
  export type StreamedLintSeverity = AeonIdePackageShims.StreamedLintSeverity;
  export type StreamedLintEngine = AeonIdePackageShims.StreamedLintEngine;
  export type StreamedLintDiagnostic =
    AeonIdePackageShims.StreamedLintDiagnostic;
  export type StreamedLintStats = AeonIdePackageShims.StreamedLintStats;
}

declare module '@a0n/aeon-container/services/streamed-lint-core' {
  import type {
    StreamedLintDiagnostic,
    StreamedLintEngine,
    StreamedLintLanguage,
  } from '@a0n/aeon-container/services/streamed-lint-types';

  export interface LintCoreInput {
    path: string;
    language: StreamedLintLanguage;
    content: string;
    maxDiagnostics: number;
  }

  export interface LintCoreOutput {
    diagnostics: StreamedLintDiagnostic[];
    engine: StreamedLintEngine;
    supportsWasm: boolean;
  }

  export function lintDocumentCore(input: LintCoreInput): LintCoreOutput;
}

declare module '@a0n/aeon-container/services/streamed-lint-client' {
  import type {
    StreamedLintDiagnostic,
    StreamedLintEngine,
    StreamedLintLanguage,
    StreamedLintStats,
  } from '@a0n/aeon-container/services/streamed-lint-types';

  export interface StreamedLintHandle {
    requestId: string;
    cancel: () => void;
  }

  export class StreamedLintClient {
    lint(config: {
      version: number;
      path: string;
      language: StreamedLintLanguage;
      content: string;
      maxDiagnostics?: number;
      onStarted?: (message: {
        type: 'started';
        requestId: string;
        version: number;
        engine: StreamedLintEngine;
        supportsWasm: boolean;
      }) => void;
      onChunk?: (
        diagnostics: StreamedLintDiagnostic[],
        progress: number
      ) => void;
      onDone?: (stats: StreamedLintStats) => void;
      onError?: (errorMessage: string) => void;
    }): StreamedLintHandle;
    dispose(): void;
  }
}

declare module '@a0n/aeon-container/services/agent-room-client' {
  export type AgentRoomPresenceStatus =
    AeonIdePackageShims.AgentRoomPresenceStatus;
  export type AgentRoomTask = AeonIdePackageShims.AgentRoomTask;
  export type AgentRoomSnapshotPayload =
    AeonIdePackageShims.AgentRoomSnapshotPayload;

  export class AgentRoomClient {
    constructor(input: { apiUrl: string; roomId: string; ucanToken?: string });
    getSnapshot(): Promise<AgentRoomSnapshotPayload>;
    postHeartbeat(input: {
      agentId: string;
      status?: AgentRoomPresenceStatus;
      currentFile?: string;
      lineRange?: string;
      currentTaskId?: string;
    }): Promise<void>;
    upsertTodo(input: {
      scope: 'global' | 'agent';
      task: AgentRoomTask;
      agentId?: string;
    }): Promise<{
      globalTasks: AgentRoomTask[];
      agentTasks: Record<string, AgentRoomTask[]>;
    }>;
  }
}

declare module '@affectively/shared-ui/services/dash/dashPeerSyncService' {
  export function initializePeerSync(
    doc: unknown,
    input: { roomName: string; relayWsUrl: string }
  ): Promise<void>;
  export function getYjsDoc(): unknown | null;
  export function subscribeToSyncStatus(
    callback: (status: AeonIdePackageShims.SyncStatus) => void
  ): () => void;
  export function disconnectPeerSync(): void;
}
