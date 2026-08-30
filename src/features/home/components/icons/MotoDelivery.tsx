interface MotoDeliveryProps {
  size?: number
  className?: string
}

const MotoDelivery = ({ size = 28, className = "" }: MotoDeliveryProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* ruedas */}
    <circle cx="5" cy="18" r="3" />
    <circle cx="18" cy="18" r="3" />
    {/* chasis */}
    <path d="M5 18h1l2-6h5l2 4" />
    <path d="M13 12l2-4h2" />
    {/* manubrio */}
    <path d="M15 8h2l1 2" />
    {/* caja de domicilio */}
    <rect x="15" y="11" width="5" height="4" rx="1" />
    <path d="M17 11v-1.5" />
  </svg>
);

export default MotoDelivery;