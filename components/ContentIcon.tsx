import {
  Dumbbell,
  Flame,
  HeartPulse,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  "heart-pulse": HeartPulse,
  zap: Zap,
  "user-check": UserCheck,
  flame: Flame,
  "trending-up": TrendingUp,
  sparkles: Sparkles,
  target: Target,
};

export function ContentIcon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = iconMap[name] ?? Dumbbell;
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
