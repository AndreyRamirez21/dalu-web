import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { LogoWipeMark } from './LogoWipeMark';

interface LogoPreloaderProps {
  isLoading: boolean;
  minDurationMs?: number;
  colorClassName?: string;
}

export function LogoPreloader({
  isLoading,
  minDurationMs = 900,
  colorClassName = 'text-[#5F9EA0]',
}: LogoPreloaderProps) {
  const [canHide, setCanHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanHide(true), minDurationMs);
    return () => clearTimeout(timer);
  }, [minDurationMs]);

  const shouldShow = isLoading || !canHide;

  return (
    <AnimatePresence>
      {shouldShow && (
        <m.div
          key="logo-preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <m.div
            className="w-40 h-40 sm:w-48 sm:h-48"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <LogoWipeMark className="w-full h-full" colorClassName={colorClassName} durationS={1.4} delayS={0.1} />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}