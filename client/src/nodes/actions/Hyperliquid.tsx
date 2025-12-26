import { Handle, Position } from "@xyflow/react"
import type { TradingMetadata } from "./Lighter"

export function Hyperliquid({ data }: {
    data: {
        metadata: TradingMetadata
    }
}) {
    const isLong = data.metadata.type === "LONG";

    return (
        <div className="px-6 py-4 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg min-w-45 border border-emerald-400/30">
            <Handle
                type="target"
                position={Position.Left}
                className="w-4! h-4! bg-white! border-2! border-emerald-300!"
            />
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <span className="text-lg font-semibold text-white">Hyperliquid</span>
            </div>
            <div className="flex items-center gap-2 text-base text-white/90 font-medium">
                <span className={`px-2 py-0.5 rounded text-sm font-bold ${isLong ? 'bg-emerald-700' : 'bg-rose-500'}`}>
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
