import { Handle, Position } from "@xyflow/react"

export type TradingMetadata = {
    type: "LONG" | "SHORT",
    qty: number,
    symbol: string
}

export function Lighter({ data }: {
    data: {
        metadata: TradingMetadata
    }
}) {
    return (
        <div className="p-4 border bg-white rounded shadow-sm">
            <Handle type="target" position={Position.Left} />
            <div className="font-medium">Trade Action</div>
            <div className="text-sm text-gray-600">
                <div>{data.metadata.type} {data.metadata.symbol}</div>
                <div>Qty: {data.metadata.qty}</div>
            </div>
        </div>
    )
}