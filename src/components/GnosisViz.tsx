'use aeon';

import React, { useMemo } from 'react';

interface GraphNode {
  id: string;
}

interface GraphEdge {
  sourceIds: string[];
  targetIds: string[];
  type: string;
}

interface GraphAST {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

interface SimulationParticle {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  progress: number;
}

interface GnosisVizProps {
  ast: GraphAST | null;
  b1: number;
  isExecuting?: boolean;
}

/**
 * GnosisViz — High-fidelity topological graph renderer
 * Renders GGL graphs using pure SVG and CSS transitions.
 */
export const GnosisViz: React.FC<GnosisVizProps> = ({
  ast,
  b1,
  isExecuting = false,
}) => {
  const particles = useMemo<SimulationParticle[]>(() => {
    if (!isExecuting || !ast) return [];
    return [];
  }, [ast, isExecuting]);
  const nodes = useMemo(() => {
    if (!ast) return [];
    return Array.from(ast.nodes.values());
  }, [ast]);

  const edges = useMemo(() => {
    if (!ast) return [];
    return ast.edges;
  }, [ast]);

  // Simple deterministic layout for now
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    nodes.forEach((node, i) => {
      positions[node.id] = {
        x: 50 + ((i * 120) % 700),
        y: 50 + Math.floor(i / 6) * 100,
      };
    });
    return positions;
  }, [nodes]);

  if (!ast || nodes.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-500">
        Await valid topology...
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black/20 p-4 font-mono">
      <div className="absolute top-2 left-2 text-xs text-cyan-400">
        TOPOLOGY: β₁ = {b1}
      </div>
      <svg className="h-full w-full" viewBox="0 0 800 600">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#444" />
          </marker>
        </defs>

        {/* Render Edges */}
        {edges.map((edge, i) => (
          <g key={`edge-${i}`}>
            {edge.sourceIds.flatMap((src) =>
              edge.targetIds.map((tgt) => {
                const p1 = nodePositions[src];
                const p2 = nodePositions[tgt];
                if (!p1 || !p2) return null;
                return (
                  <line
                    key={`${src}-${tgt}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={edge.type === 'FORK' ? '#06b6d4' : '#71717a'}
                    strokeWidth={edge.type === 'FORK' ? 2 : 1}
                    markerEnd="url(#arrowhead)"
                    className="transition-all duration-500"
                  />
                );
              })
            )}
          </g>
        ))}

        {/* Render Particles */}
        {particles.map((p) => {
          const p1 = nodePositions[p.sourceNodeId];
          const p2 = nodePositions[p.targetNodeId];
          if (!p1 || !p2) return null;
          const x = p1.x + (p2.x - p1.x) * p.progress;
          const y = p1.y + (p2.y - p1.y) * p.progress;
          return (
            <circle
              key={p.id}
              cx={x}
              cy={y}
              r="3"
              fill="#06b6d4"
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            />
          );
        })}

        {/* Render Nodes */}
        {nodes.map((node) => {
          const p = nodePositions[node.id];
          return (
            <g key={node.id} transform={`translate(${p.x}, ${p.y})`}>
              <circle
                r="18"
                fill="#18181b"
                stroke="#3f3f46"
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <text
                textAnchor="middle"
                dy=".3em"
                fill="#e4e4e7"
                fontSize="10"
                className="select-none pointer-events-none"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
