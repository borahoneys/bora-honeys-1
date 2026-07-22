import Image from 'next/image'

export default function ComingSoonPlaceholder({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 bg-card border border-primary/15 ${className}`}>
      <div className="relative w-24 h-24 md:w-28 md:h-28 opacity-80">
        <Image src="/logo.png" alt="Bora Honeys" fill className="object-contain" />
      </div>
      <p className="text-primary text-xs tracking-[0.35em] uppercase">Coming Soon</p>
    </div>
  )
}
