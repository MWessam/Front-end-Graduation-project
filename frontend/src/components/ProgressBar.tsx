import type { FC } from 'react';
import { cn } from '../lib/utils';

interface ProgressBarProps {
  progress: number;
  colorClass?: string;
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, colorClass = "bg-green-500", className }) => {
  return (
    <div className={cn("w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden", className)}>
      <div 
        className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClass)} 
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

export default ProgressBar;

