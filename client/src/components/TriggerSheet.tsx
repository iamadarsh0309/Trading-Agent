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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import { Input } from "./ui/input";


const SUPPORTED_TRIGGERS: { id: NodeKind; title: string; description: string }[] = [
    {
    id: "timer-trigger",
    title: "Timer",
    description: "Trigger based on a specific time or interval",
    },
    {
        id: "price-trigger",
        title: "Price Trigger",
        description:"Runs whenever the price of an asset crosses a certain threshold",
    }

]

const SUPPORTED_ASSETS = ["BTC", "ETH", "SOL"];

export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetadata ) => void
    }) => {
    
  const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
      time:3600 
    });
    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind>(SUPPORTED_TRIGGERS[0].id);
   
    return (
    <Sheet open={true}>
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
             Select the type of trigger you would like to add to your workflow.
                        <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value as NodeKind)}>
                    <SelectTrigger className="w-full">
                         <SelectValue placeholder="Select a trigger" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        
                                    {SUPPORTED_TRIGGERS.map(({ id, title, description }) => <>
                                        
                                        <SelectItem
                                            key={id} 
                                            
                                            value={id}>{title}</SelectItem>
                                        <SelectLabel>{description}</SelectLabel>
                                    </>)
                                    }
                        </SelectGroup>
                    </SelectContent>
              </Select>
              {selectedTrigger === "timer-trigger" && <div>
                Number of seconds after which to run the timer
                <Input value={metadata.time} onChange={(e) => setMetadata(metadata => ({
                ...metadata,
                  time: Number(e.target.value)
                }))}></Input>
                
              </div>}
              {selectedTrigger === "price-trigger" && <div>
                Price:
                <Input type="text" onChange={(e) => setMetadata(m => ({
                  ...m,
                  price: Number(e.target.value)
                }))}></Input>
                Asset
                <Select value={metadata.asset} onValueChange={(value) => setMetadata(metadata => ({
                ...metadata,
                  asset: value
                }))}>
                  <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectGroup>

                  {SUPPORTED_ASSETS.map((id) => <>

                  <SelectItem
                  key={id} 

                  value={id}>{id}</SelectItem>
                  </>)
                  }
                  </SelectGroup>
                  </SelectContent>
                  </Select>
              </div>}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
                    <Button
                        onClick={() => {
                            onSelect(
                                selectedTrigger,
                                metadata
                            )
                        }}
                        type="submit">Create Trigger</Button>
          
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )

}

