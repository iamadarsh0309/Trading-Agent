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
    description: "Place a trade on Hyperliquid",
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on Lighter",
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on Backpack",
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

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>
            Configure the action to execute when the trigger fires.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Action Type</label>
            <Select value={selectedAction} onValueChange={(value) => setSelectedAction(value as NodeKind)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ACTIONS.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>{title}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Trade Type</label>
            <Select
              value={metadata.type}
              onValueChange={(value) => setMetadata(m => ({
                ...m,
                type: value as "LONG" | "SHORT"
              }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select trade type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TRADE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Symbol</label>
            <Select
              value={metadata.symbol}
              onValueChange={(value) => setMetadata(m => ({
                ...m,
                symbol: value
              }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select symbol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ASSETS.map((asset) => (
                    <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Quantity</label>
            <Input
              type="number"
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
            type="submit"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
