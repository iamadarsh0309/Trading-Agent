import { Handle, Position } from "@xyflow/react"

export type PriceTriggerMetadata = {
    asset: string,
    price: number,
};

export function PriceTrigger({ data }: {
    data: {
        metadata: PriceTriggerMetadata
    }
}) {
    return (
        <div className="p-4 border bg-white rounded shadow-sm">
            <div className="font-medium">Price Trigger</div>
            <div className="text-sm text-gray-600">
                <div>{data.metadata.asset} @ ${data.metadata.price}</div>
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}
