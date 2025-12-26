import { Handle, Position } from "@xyflow/react"
import type { TradingMetadata } from "./Lighter"

export function Hyperliquid({ data }: {
    data: {
        metadata: TradingMetadata
    }
}) {
    return (
        <div className="p-4 border bg-white rounded shadow-sm">
            <Handle type="target" position={Position.Left} />
            <div className="font-medium">Hyperliquid</div>
            <div className="text-sm text-gray-600">
                <div>{data.metadata.type} {data.metadata.symbol}</div>
                <div>Qty: {data.metadata.qty}</div>
            </div>
        </div>
    )
}
