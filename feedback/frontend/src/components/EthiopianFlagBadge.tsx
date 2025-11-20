import { cn } from '@/lib/utils';

interface EthiopianFlagBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

/**
 * Ethiopian Flag Badge Component
 * Displays the Ethiopian flag in horizontal stripes with optional animation
 */
export function EthiopianFlagBadge({
  className,
  size = 'md',
  animated = false,
}: EthiopianFlagBadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-8',
    md: 'w-20 h-14',
    lg: 'w-32 h-20',
  };

  const stripeSizes = {
    sm: 'h-[10.67px]',
    md: 'h-[18.67px]',
    lg: 'h-[26.67px]',
  };

  return (
    <div
      className={cn(
        'relative rounded-md overflow-hidden shadow-lg',
        sizeClasses[size],
        animated && 'animate-pulse',
        className
      )}
      role="img"
      aria-label="Ethiopian Flag"
    >
      {/* Green stripe */}
      <div
        className={cn(
          'w-full bg-ethiopia-green',
          stripeSizes[size],
          animated && 'transition-all duration-300 hover:brightness-110'
        )}
      />
      {/* Yellow stripe */}
      <div
        className={cn(
          'w-full bg-ethiopia-yellow',
          stripeSizes[size],
          animated && 'transition-all duration-300 hover:brightness-110'
        )}
      />
      {/* Red stripe */}
      <div
        className={cn(
          'w-full bg-ethiopia-red',
          stripeSizes[size],
          animated && 'transition-all duration-300 hover:brightness-110'
        )}
      />
    </div>
  );
}
