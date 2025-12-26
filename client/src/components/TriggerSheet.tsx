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
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import { Input } from "./ui/input";

const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    description: "Trigger based on a specific time or interval",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    description: "Runs whenever the price of an asset crosses a certain threshold",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  }
]

export const SUPPORTED_ASSETS = ["BTC", "ETH", "SOL"];

export const TriggerSheet = ({
  onSelect
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void
}) => {
  const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
    time: 60
  });
  const [selectedTrigger, setSelectedTrigger] = useState<string>(SUPPORTED_TRIGGERS[0].id);

  return (
    <Sheet open={true}>
      <SheetContent className="bg-zinc-900 border-zinc-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-white">Create Trigger</SheetTitle>
          <SheetDescription className="text-base text-zinc-400">
            Select the type of trigger to start your workflow.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <label className="text-base font-semibold text-zinc-200">Trigger Type</label>
            <div className="grid gap-3">
              {SUPPORTED_TRIGGERS.map(({ id, title, description, icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTrigger(id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedTrigger === id
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedTrigger === id ? 'bg-violet-500 text-white' : 'bg-zinc-700 text-zinc-300'
                  }`}>
                    {icon}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{title}</div>
                    <div className="text-sm text-zinc-400 mt-0.5">{description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedTrigger === "timer" && (
            <div className="space-y-3">
              <label className="text-base font-semibold text-zinc-200">Interval (seconds)</label>
              <Input
                type="number"
                className="bg-zinc-800 border-zinc-700 text-white text-lg h-12 focus:border-violet-500 focus:ring-violet-500"
                value={(metadata as TimerNodeMetadata).time}
                onChange={(e) => setMetadata(metadata => ({
                  ...metadata,
                  time: Number(e.target.value)
                }))}
              />
              <p className="text-sm text-zinc-500">The trigger will fire every {(metadata as TimerNodeMetadata).time} seconds</p>
            </div>
          )}

          {selectedTrigger === "price-trigger" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-base font-semibold text-zinc-200">Asset</label>
                <Select
                  value={(metadata as PriceTriggerMetadata).asset}
                  onValueChange={(value) => setMetadata(metadata => ({
                    ...metadata,
                    asset: value
                  }))}
                >
                  <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white text-lg h-12">
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((id) => (
                        <SelectItem key={id} value={id} className="text-white text-base hover:bg-zinc-700">
                          {id}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <label className="text-base font-semibold text-zinc-200">Price Threshold ($)</label>
                <Input
                  type="number"
                  className="bg-zinc-800 border-zinc-700 text-white text-lg h-12 focus:border-amber-500 focus:ring-amber-500"
                  placeholder="0.00"
                  onChange={(e) => setMetadata(m => ({
                    ...m,
                    price: Number(e.target.value)
                  }))}
                />
              </div>
            </div>
          )}
        </div>

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedTrigger as NodeKind, metadata)
            }}
            className="w-full h-12 text-lg font-semibold bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
