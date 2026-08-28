import { useEffect, useState } from 'react'
import SpecularButton, {
  type SpecularButtonProps,
} from './SpecularButton'

interface ResponsiveSpecularButtonProps extends SpecularButtonProps {
  mobileClassName?: string
}

export default function ResponsiveSpecularButton({
  children,
  mobileClassName = '',
  ...props
}: ResponsiveSpecularButtonProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const update = () => {
      setIsDesktop(mediaQuery.matches)
    }

    update()

    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  // Mientras detectamos el dispositivo,
  // mostramos un botón normal.
  if (isDesktop === null) {
    return (
      <button
        type={props.type ?? 'button'}
        disabled={props.disabled}
        onClick={props.onClick}
        className={mobileClassName}
      >
        {children}
      </button>
    )
  }

  // 💻 COMPUTADOR
  if (isDesktop) {
    return (
      <SpecularButton {...props}>
        {children}
      </SpecularButton>
    )
  }

  // 📱 CELULAR / TABLET
  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
      className={mobileClassName}
    >
      {children}
    </button>
  )
}