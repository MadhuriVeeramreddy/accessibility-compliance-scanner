"use client";

interface ScoreMeterProps {
  score: number;
  size?: number;
  loading?: boolean;
}

export default function ScoreMeter({ score, size = 200, loading }: ScoreMeterProps) {
  if (loading) {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <div className="animate-pulse">
          <div className="w-full h-full bg-slate-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 90) return "#22C55E"; // green
    if (score >= 70) return "#FACC15"; // yellow
    return "#E11D48"; // red
  };

  const color = getColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth="16"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="16"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-slate-900">{score}</span>
        <span className="text-lg text-slate-600">/ 100</span>
      </div>
    </div>
  );
}

