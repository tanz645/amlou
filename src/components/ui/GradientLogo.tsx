'use client';

import { memo } from 'react';

interface GradientLogoProps {
  size: 'sm' | 'md' | 'lg';
  text: string;
  className?: string;
}

const GradientLogo = memo(({ size, text, className = '' }: GradientLogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const sizeStyles = {
    sm: { minWidth: '24px', minHeight: '24px' },
    md: { minWidth: '32px', minHeight: '32px' },
    lg: { minWidth: '40px', minHeight: '40px' }
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-lg flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        ...sizeStyles[size]
      }}
      suppressHydrationWarning
    >
      <span className="text-white font-bold">{text}</span>
    </div>
  );
});

GradientLogo.displayName = 'GradientLogo';

export default GradientLogo;
