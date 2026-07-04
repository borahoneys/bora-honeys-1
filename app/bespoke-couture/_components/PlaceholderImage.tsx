import Image from 'next/image'

export default function PlaceholderImage({
  className = '',
  alt = '',
  priority = false,
}: {
  className?: string
  alt?: string
  priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden bg-secondary ${className}`}>
      <Image
        src="/placeholder-image.png"
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-90"
      />
    </div>
  )
}
