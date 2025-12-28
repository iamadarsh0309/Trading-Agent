import { Handle, Position } from "@xyflow/react"
import type { TradingMetadata } from "@repo/common"

export function Lighter({ data }: {
    data: {
        metadata: TradingMetadata
    }
}) {
    const isLong = data.metadata.type === "LONG";

    return (
        <div className="px-6 py-4 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg min-w-45 border border-cyan-400/30">
            <Handle
                type="target"
                position={Position.Left}
                className="w-4! h-4! bg-white! border-2! border-cyan-300!"
            />
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <span className="text-lg font-semibold text-white">Lighter</span>
            </div>
            <div className="flex items-center gap-2 text-base text-white/90 font-medium">
                <span className={`px-2 py-0.5 rounded text-sm font-bold ${isLong ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    {data.metadata.type}
                </span>
                <span>{data.metadata.symbol}</span>
            </div>
            <div className="text-sm text-white/70 mt-1">
                Qty: {data.metadata.qty}
            </div>
        </div>
    )
}
