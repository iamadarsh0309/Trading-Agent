import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
import { ActionSheet } from './ActionSheet';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { Timer } from '@/nodes/triggers/Timer';
import { Lighter } from '@/nodes/actions/Lighter';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';
import { Backpack } from '@/nodes/actions/Backpack';

const nodeTypes = {
  'price-trigger': PriceTrigger,
  'timer': Timer,
  'hyperliquid': Hyperliquid,
  'lighter': Lighter,
  'backpack': Backpack,
}

export type NodeMetadata = any;

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter";

interface NodeType {
  type: NodeKind,
  data: {
    kind: "action" | "trigger",
    metadata: NodeMetadata,
  },
  id: string,
  position: { x: number, y: number }
}

interface Edge {
  id: string,
  source: string,
  target: string
}

interface PendingConnection {
  sourceNodeId: string;
  position: { x: number; y: number };
}

function CreateWorkflowInner() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [pendingConnection, setPendingConnection] = useState<PendingConnection | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent, connectionState: any) => {
      if (!connectionState.isValid && connectionState.fromNode) {
        const clientX = 'changedTouches' in event
          ? event.changedTouches[0].clientX
          : event.clientX;
        const clientY = 'changedTouches' in event
          ? event.changedTouches[0].clientY
          : event.clientY;

        const position = screenToFlowPosition({
          x: clientX,
          y: clientY,
        });

        setPendingConnection({
          sourceNodeId: connectionState.fromNode.id,
          position,
        });
        setShowActionSheet(true);
      }
    },
    [screenToFlowPosition]
  );

  const handleActionSelect = useCallback(
    (type: NodeKind, metadata: NodeMetadata) => {
      if (!pendingConnection) return;

      const newNodeId = Math.random().toString();
      const newNode: NodeType = {
        id: newNodeId,
        type,
        data: {
          kind: "action",
          metadata,
        },
        position: pendingConnection.position,
      };

      setNodes((nodes) => [...nodes, newNode]);
      setEdges((edges) => [
        ...edges,
        {
          id: `${pendingConnection.sourceNodeId}-${newNodeId}`,
          source: pendingConnection.sourceNodeId,
          target: newNodeId,
        },
      ]);

      setPendingConnection(null);
    },
    [pendingConnection]
  );

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh', backgroundColor: '#000' }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={(type, metadata) => {
            setNodes([...nodes, {
              id: Math.random().toString(),
              type,
              data: {
                kind: "trigger",
                metadata,
              },
              position: { x: 0, y: 0 },
            }])
          }}
        />
      )}
      <ActionSheet
        open={showActionSheet}
        onSelect={handleActionSelect}
        onClose={() => {
          setShowActionSheet(false);
          setPendingConnection(null);
        }}
      />
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}

export default function CreateWorkflow() {
  return (
    <ReactFlowProvider>
      <CreateWorkflowInner />
    </ReactFlowProvider>
  );
}
