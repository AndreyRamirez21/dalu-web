import { WHATSAPP_URL } from '@/shared/constants/contact'

export function WhatsAppFloatingButton() {
  return (
      <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#82BBBD] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#6fa9ab] focus:outline-none focus:ring-4 focus:ring-[#82BBBD]/30"
    >
        <span className="absolute inset-0 rounded-full bg-[#82BBBD] opacity-75 animate-ping [animation-duration:2.5s]" />
        <span className="absolute inset-0 rounded-full bg-[#82BBBD]/40 animate-pulse [animation-duration:3s]" />

      <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="relative">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11a16.6 16.6 0 0 1-1.66-.61c-2.92-1.26-4.83-4.2-4.98-4.4-.15-.2-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2.01.89 2.15.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.47.13.64-.08.17-.2.71-.83.9-1.11.19-.29.38-.24.63-.15.26.1 1.66.78 1.94.92.29.15.48.22.55.34.07.13.07.75-.18 1.44z" />
      </svg>
    </a>
  )
}