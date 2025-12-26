import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { Input } from "./ui/input";
import type { TradingMetadata } from "@/nodes/actions/Lighter";
import { SUPPORTED_ASSETS } from "./TriggerSheet";

const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "High-performance perpetual DEX",
    color: "emerald",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Fast order execution",
    color: "cyan",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Secure trading platform",
    color: "rose",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  }
]

const TRADE_TYPES = ["LONG", "SHORT"] as const;

export const ActionSheet = ({
  open,
  onSelect,
  onClose
}: {
  open: boolean;
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
  onClose: () => void;
}) => {

  const [metadata, setMetadata] = useState<TradingMetadata>({
    type: "LONG",
    qty: 1,
    symbol: "BTC"
  });
  const [selectedAction, setSelectedAction] = useState<NodeKind>(SUPPORTED_ACTIONS[0].id as NodeKind);

  const getColorClasses = (id: string, isSelected: boolean) => {
    const colors: Record<string, { border: string; bg: string; icon: string }> = {
      hyperliquid: {
        border: isSelected ? 'border-emerald-500' : 'border-zinc-700',
        bg: isSelected ? 'bg-emerald-500/10' : 'bg-zinc-800/50',
        icon: isSelected ? 'bg-emerald-500' : 'bg-zinc-700',
      },
      lighter: {
        border: isSelected ? 'border-cyan-500' : 'border-zinc-700',
        bg: isSelected ? 'bg-cyan-500/10' : 'bg-zinc-800/50',
        icon: isSelected ? 'bg-cyan-500' : 'bg-zinc-700',
      },
      backpack: {
        border: isSelected ? 'border-rose-500' : 'border-zinc-700',
        bg: isSelected ? 'bg-rose-500/10' : 'bg-zinc-800/50',
        icon: isSelected ? 'bg-rose-500' : 'bg-zinc-700',
      },
    };
    return colors[id] || colors.lighter;
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="bg-zinc-900 border-zinc-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-white">Create Action</SheetTitle>
          <SheetDescription className="text-base text-zinc-400">
            Configure the trading action for your workflow.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <label className="text-base font-semibold text-zinc-200">Exchange</label>
            <div className="grid gap-3">
              {SUPPORTED_ACTIONS.map(({ id, title, description, icon }) => {
                const isSelected = selectedAction === id;
                const colors = getColorClasses(id, isSelected);
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedAction(id as NodeKind)}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${colors.border} ${colors.bg} hover:border-zinc-600`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${colors.icon}`}>
                      {icon}
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white">{title}</div>
                      <div className="text-sm text-zinc-400 mt-0.5">{description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-base font-semibold text-zinc-200">Trade Type</label>
            <div className="grid grid-cols-2 gap-3">
              {TRADE_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setMetadata(m => ({ ...m, type }))}
                  className={`p-4 rounded-xl border-2 font-bold text-lg transition-all ${
                    metadata.type === type
                      ? type === "LONG"
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : 'border-rose-500 bg-rose-500/20 text-rose-400'
                      : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-base font-semibold text-zinc-200">Symbol</label>
            <Select
              value={metadata.symbol}
              onValueChange={(value) => setMetadata(m => ({
                ...m,
                symbol: value
              }))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white text-lg h-12">
                <SelectValue placeholder="Select symbol" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectGroup>
                  {SUPPORTED_ASSETS.map((asset) => (
                    <SelectItem key={asset} value={asset} className="text-white text-base hover:bg-zinc-700">
                      {asset}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-base font-semibold text-zinc-200">Quantity</label>
            <Input
              type="number"
              className="bg-zinc-800 border-zinc-700 text-white text-lg h-12 focus:border-cyan-500 focus:ring-cyan-500"
              value={metadata.qty}
              onChange={(e) => setMetadata(m => ({
                ...m,
                qty: Number(e.target.value)
              }))}
            />
          </div>
        </div>

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedAction, metadata);
              onClose();
            }}
            className="w-full h-12 text-lg font-semibold bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
