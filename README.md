# @affectively/aeon-ide

`@affectively/aeon-ide` provides the UI components and hooks for the Aeon Container execution environment.

The fair brag is that this package already covers the main pieces people expect from an embedded coding surface: file tree, editor pane, execution toolbar, console, collaboration hooks, and the higher-level `AeonContainerIDE` wrapper that ties them together.

## What You Get

- `AeonContainerIDE`: the main composed IDE surface
- `AeonIdeEditorPane`: editor and revision area
- `AeonIdePanels`: command, action, and collaboration panels
- `ExecutionToolbar`: run controls
- `ExecutionConsole`: logs and runtime output
- `FileTree`: filesystem sidebar
- `CapabilityBadge`: capability and identity indicator
- `useAeonContainer`: runtime hook
- `useAgentRoomCollaboration`: collaboration hook

## Why People May Like It

- it gives you a ready-made IDE shell instead of only loose widgets,
- it stays close to `@affectively/aeon-container`, so the UI and runtime packages match,
- collaboration is part of the package shape, not an afterthought,
- and the surface is small enough to understand without feeling toy-sized.

## Dependency

This package depends on [`@affectively/aeon-container`](../aeon-container/README.md) for the execution, filesystem, and collaboration runtime services underneath the UI.

## Why This README Is Grounded

Aeon IDE does not need more drama than that. The strongest fair brag is that it already gives you a coherent UI layer for the Aeon container runtime.
