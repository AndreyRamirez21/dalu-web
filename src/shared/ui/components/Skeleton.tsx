import { cn } from '@/shared/lib/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('bg-border/60 rounded-xl animate-pulse', className)} />
}