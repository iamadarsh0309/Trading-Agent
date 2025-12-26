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
        <div className="p-4 border bg-white rounded shadow-sm">
            <div className="font-medium">Timer Trigger</div>
            <div className="text-sm text-gray-600">
                Every {data.metadata.time} seconds
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}
