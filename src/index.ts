/**
 * @a0n/aeon-ide
 *
 * IDE UI components and hooks for the Aeon Container execution environment.
 * Depends on @a0n/aeon-container for runtime services.
 */

// ── Components ──────────────────────────────────────────────────────
export { AeonContainerIDE } from './components/AeonContainerIDE';
export { AeonIdeEditorPane } from './components/AeonIdeEditorPane';
export { AeonIdePanels } from './components/AeonIdePanels';
export { CapabilityBadge } from './components/CapabilityBadge';
export { ExecutionConsole } from './components/ExecutionConsole';
export type { ExecutionLogEntry } from './components/ExecutionConsole';
export { ExecutionToolbar } from './components/ExecutionToolbar';
export { FileTree } from './components/FileTree';

// ── Hooks ───────────────────────────────────────────────────────────
export { useAeonContainer } from './hooks/useAeonContainer';
export { useAgentRoomCollaboration } from './hooks/useAgentRoomCollaboration';
