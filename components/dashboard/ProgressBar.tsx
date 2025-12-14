"use client";

interface ProgressBarProps {
  status: "queued" | "running" | "analyzing" | "generating" | "completed";
  progress?: number;
}

const statusConfig = {
  queued: { label: "Queued", color: "bg-blue-200", progress: 10 },
  running: { label: "Running", color: "bg-blue-400", progress: 30 },
  analyzing: { label: "Analyzing Issues", color: "bg-amber-400", progress: 60 },
  generating: { label: "Generating Report", color: "bg-purple-400", progress: 85 },
  completed: { label: "Completed", color: "bg-green-500", progress: 100 },
};

export default function ProgressBar({ status, progress }: ProgressBarProps) {
  const config = statusConfig[status];
  const progressValue = progress || config.progress;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{config.label}</span>
        <span className="text-sm text-slate-500">{progressValue}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${config.color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progressValue}%` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

