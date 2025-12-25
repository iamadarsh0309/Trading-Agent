import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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


const SUPPORTED_TRIGGERS = [
    {
    id: "timer",
    title: "Timer",
    description: "Trigger based on a specific time or interval",
    },
    {
        id: "price",
        title: "Price Trigger",
        description:"Runs whenever the price of an asset crosses a certain threshold",
    }
  
]

export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetadata ) => void
    }) => {
    
    const [metadata, setMetadata] = useState({})
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
   
    return (
    <Sheet open={true}>
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
             Select the type of trigger you would like to add to your workflow.
                        <Select value={selectedTrigger} onValueChange={(value)=> setSelectedTrigger(value)}>
                    <SelectTrigger className="w-full">
                         <SelectValue placeholder="Select a fruit" />
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

