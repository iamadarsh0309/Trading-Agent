import { Handle, Position } from "@xyflow/react"
import type { PriceTriggerMetadata } from "@repo/common"

export function PriceTrigger({ data }: {
    data: {
        metadata: PriceTriggerMetadata
    }
}) {
    return (
        <div className="px-6 py-4 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg min-w-45 border border-amber-400/30">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <span className="text-lg font-semibold text-white">Price Alert</span>
            </div>
            <div className="text-base text-white/90 font-medium">
                {data.metadata.asset} @ ${data.metadata.price}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className="w-4! h-4! bg-white! border-2! border-amber-300!"
            />
        </div>
    )
}
