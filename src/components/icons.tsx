import type { SVGProps } from 'react'
import { SiAndroid, SiApple, SiGtk, SiLinux } from '@icons-pack/react-simple-icons'
import { Globe } from 'lucide-react'

type IconProps = { size?: number; className?: string }

/** The Windows mark: four panes. Simple Icons does not carry Microsoft's marks. */
function Windows({ size = 24, ...props }: IconProps & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden {...props}>
      <path d="M2 3.5 10.2 2.4v8.2H2zM11.2 2.3 22 .8v9.8H11.2zM2 11.6h8.2v8.2L2 18.7zM11.2 11.6H22v9.8l-10.8-1.5z" />
    </svg>
  )
}

export type PlatformId = 'apple' | 'android' | 'windows' | 'linux' | 'web' | 'gtk'

/** One icon per platform or toolkit the page names. */
export function PlatformIcon({ id, size = 18, className = '' }: { id: PlatformId; size?: number; className?: string }) {
  switch (id) {
    case 'apple':
      return <SiApple size={size} className={className} aria-hidden />
    case 'android':
      return <SiAndroid size={size} className={className} aria-hidden />
    case 'windows':
      return <Windows size={size} className={className} />
    case 'linux':
      return <SiLinux size={size} className={className} aria-hidden />
    case 'web':
      return <Globe size={size} className={className} aria-hidden />
    case 'gtk':
      return <SiGtk size={size} className={className} aria-hidden />
  }
}
