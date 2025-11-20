import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'rectangular',
  animation = true
}) => {
  const baseClasses = 'bg-muted';
  const animationClasses = animation ? 'animate-shimmer' : '';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses,
        className
      )}
      aria-label="Loading content"
    />
  );
};

// Predefined skeleton components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-4', className)}>
    <LoadingSkeleton className="h-4 w-3/4" />
    <LoadingSkeleton className="h-4 w-1/2" />
    <LoadingSkeleton className="h-32 w-full" />
    <div className="flex space-x-2">
      <LoadingSkeleton className="h-8 w-16" />
      <LoadingSkeleton className="h-8 w-16" />
    </div>
  </div>
);

export const SkeletonList: React.FC<{ items?: number; className?: string }> = ({ 
  items = 3, 
  className 
}) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3">
        <LoadingSkeleton variant="circular" className="w-10 h-10" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton className="h-4 w-3/4" />
          <LoadingSkeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; cols?: number; className?: string }> = ({ 
  rows = 5, 
  cols = 4, 
  className 
}) => (
  <div className={cn('space-y-3', className)}>
    {/* Header */}
    <div className="flex space-x-4">
      {Array.from({ length: cols }).map((_, i) => (
        <LoadingSkeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4">
        {Array.from({ length: cols }).map((_, j) => (
          <LoadingSkeleton key={j} className="h-3 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;