// ==========================================
// Node Kind Types
// ==========================================

export type TriggerKind = "price-trigger" | "timer";

export type ActionKind = "hyperliquid" | "backpack" | "lighter";

export type NodeKind = TriggerKind | ActionKind;

// ==========================================
// Trigger Metadata Types
// ==========================================

export type TimerNodeMetadata = {
  time: number;
};

export type PriceTriggerMetadata = {
  asset: string;
  price: number;
};

export type TriggerMetadata = TimerNodeMetadata | PriceTriggerMetadata;

// ==========================================
// Action Metadata Types
// ==========================================

export type TradingMetadata = {
  type: "LONG" | "SHORT";
  qty: number;
  symbol: string;
};

export type ActionMetadata = TradingMetadata;

// ==========================================
// Node Metadata Union
// ==========================================

export type NodeMetadata = TriggerMetadata | ActionMetadata;

// ==========================================
// Workflow Node Types
// ==========================================

export interface NodeData {
  kind: "action" | "trigger";
  metadata: NodeMetadata;
}

export interface WorkflowNode {
  type: NodeKind;
  data: NodeData;
  id: string;
  position: { x: number; y: number };
}

// ==========================================
// Workflow Edge Types
// ==========================================

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

// ==========================================
// Connection Types
// ==========================================

export interface PendingConnection {
  sourceNodeId: string;
  position: { x: number; y: number };
}

// ==========================================
// Supported Assets
// ==========================================

export const SUPPORTED_ASSETS = ["BTC", "ETH", "SOL"] as const;

export type SupportedAsset = (typeof SUPPORTED_ASSETS)[number];
