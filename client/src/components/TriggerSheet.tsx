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
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    description: "Runs whenever the price of an asset crosses a certain threshold",
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger you would like to add to your workflow.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Trigger Type</label>
            <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>{title}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {selectedTrigger === "timer" && (
            <div>
              <label className="text-sm font-medium">Number of seconds after which to run the timer</label>
              <Input
                type="number"
                value={(metadata as TimerNodeMetadata).time}
                onChange={(e) => setMetadata(metadata => ({
                  ...metadata,
                  time: Number(e.target.value)
                }))}
              />
            </div>
          )}

          {selectedTrigger === "price-trigger" && (
            <>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  onChange={(e) => setMetadata(m => ({
                    ...m,
                    price: Number(e.target.value)
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Asset</label>
                <Select
                  value={(metadata as PriceTriggerMetadata).asset}
                  onValueChange={(value) => setMetadata(metadata => ({
                    ...metadata,
                    asset: value
                  }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((id) => (
                        <SelectItem key={id} value={id}>{id}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedTrigger as NodeKind, metadata)
            }}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
