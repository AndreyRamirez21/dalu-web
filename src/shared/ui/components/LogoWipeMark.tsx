import { useId } from 'react';
import { m } from 'framer-motion';
import { LOGO_PATH, LOGO_VIEWBOX } from './daluLogoPath';

interface LogoWipeMarkProps {
  /** Tamaño del contenedor, ej. "w-11 h-11" */
  className?: string;
  colorClassName?: string;
  durationS?: number;
  delayS?: number;
}

/**
 * Icono animado del logo Dalú con efecto "wipe reveal" (usado en el
 * LogoPreloader y también en el Navbar cuando el usuario hace scroll).
 * Cada instancia genera su propio clipPath id para poder montarse
 * varias veces en la página sin colisionar.
 */
export function LogoWipeMark({
  className = 'w-11 h-20',
  colorClassName = 'text-[#5F9EA0]',
  durationS = 0.8,
  delayS = 0,
}: LogoWipeMarkProps) {
  // useId puede incluir ":" — no es válido dentro de url(#id) en algunos
  // navegadores (Safari), así que lo limpiamos.
  const clipId = `logo-wipe-${useId().replace(/:/g, '')}`;

  return (
    <div className={`relative ${className} ${colorClassName}`}>
      {/* Base tenue, siempre visible */}
      <svg
        viewBox={LOGO_VIEWBOX}
        fill="currentColor"
        className="absolute inset-0 w-full h-full opacity-15"
      >
        <path d={LOGO_PATH} />
      </svg>

      {/* Wipe revelado por encima */}
      <svg viewBox={LOGO_VIEWBOX} fill="currentColor" className="absolute inset-0 w-full h-full">
        <defs>
          <clipPath id={clipId}>
            <m.rect
              x={0}
              y={0}
              width={1600}
              height={1600}
              initial={{ x: -1600 }}
              animate={{ x: 0 }}
              transition={{ duration: durationS, ease: 'easeInOut', delay: delayS }}
            />
          </clipPath>
        </defs>
        <path d={LOGO_PATH} clipPath={`url(#${clipId})`} />
      </svg>
    </div>
  );
}