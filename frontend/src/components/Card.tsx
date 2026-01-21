import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn("bg-slate-50 dark:bg-zinc-800 p-6 rounded-xl border border-gray-200 dark:border-zinc-700", className)}>
      {children}
    </div>
  );
};

export default Card;

