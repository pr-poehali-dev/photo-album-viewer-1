
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconName;
  color?: string;
  size?: number;
  strokeWidth?: number;
  fallback?: IconName;
}

const Icon = ({
  name,
  color,
  size = 24,
  strokeWidth = 2,
  className,
  fallback = 'CircleAlert',
  ...props
}: IconProps) => {
  // Check if the icon exists in Lucide
  let LucideIcon = LucideIcons[name];
  
  // Use fallback icon if requested icon doesn't exist
  if (!LucideIcon) {
    LucideIcon = LucideIcons[fallback];
  }

  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      className={cn('', className)}
      {...props}
    />
  );
};

export default Icon;
