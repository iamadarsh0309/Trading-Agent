import { Handle, Position } from "@xyflow/react"

export type TimerNodeMetadata = {
    time: number;
};

export function Timer({ data }: {
    data: {
        metadata: TimerNodeMetadata
    }
}) {
    return (
        <div className="px-6 py-4 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg min-w-45 border border-violet-400/30">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <span className="text-lg font-semibold text-white">Timer</span>
            </div>
            <div className="text-base text-white/90 font-medium">
                Every {data.metadata.time}s
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className="w-4! h-4! bg-white! border-2! border-violet-300!"
            />
        </div>
    )
}
