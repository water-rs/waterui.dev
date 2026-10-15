import type { ReactNode } from 'react'

/*
 * Device frames drawn in CSS around real captures. Each frame is sized in
 * proportion to its own width, and the stage places frames in `cqw`, a
 * hundredth of its width, so the composition scales as one picture.
 */

type Capture = {
  src: string
  alt: string
  /** The capture's own width over height. */
  aspect: number
}

const shadow = 'shadow-[0_2.4cqw_4.8cqw_-1.6cqw_rgb(0_0_0/0.42)]'

/** A phone: a dark bezel around the screen capture, with the Pixel's punch-hole camera when asked. */
export function Phone({ capture, camera = false, className }: { capture: Capture; camera?: boolean; className: string }) {
  return (
    <div className={`absolute rounded-[14.5%/6.6%] bg-[#101114] ring-1 ring-black/50 ${shadow} ${className}`}>
      {/* The bezel is the child's padding: a percentage there resolves against the phone, not the stage. */}
      <div className="p-[3.2%]">
        <img src={capture.src} alt={capture.alt} className="block w-full rounded-[12%/5.4%] bg-white" style={{ aspectRatio: capture.aspect }} />
      </div>
      {camera ? <span className="absolute top-[3.6%] left-1/2 aspect-square w-[5%] -translate-x-1/2 rounded-full bg-black ring-1 ring-[#2a2c31]" aria-hidden /> : null}
    </div>
  )
}

/**
 * A tablet: the even, narrow bezel and rounded screen of an iPad Pro, held in
 * landscape, so its front camera sits at the middle of the top edge.
 */
export function Tablet({ capture, className }: { capture: Capture; className: string }) {
  return (
    <div className={`absolute rounded-[4%/5.7%] bg-[#101114] ring-1 ring-black/50 ${shadow} ${className}`}>
      <div className="p-[2.2%]">
        <img src={capture.src} alt={capture.alt} className="block w-full rounded-[1.6%/2.3%] bg-white" style={{ aspectRatio: capture.aspect }} />
      </div>
      <span className="absolute top-[1.1%] left-1/2 aspect-square w-[0.9%] -translate-x-1/2 rounded-full bg-[#1d1f24]" aria-hidden />
    </div>
  )
}

/** A laptop: the window capture on a desktop wallpaper, inside the lid, on a base. */
export function Laptop({ capture, className }: { capture: Capture; className: string }) {
  return (
    <div className={`absolute ${className}`}>
      {/* The aluminium rim around the black bezel keeps the lid's outline readable on a dark page. */}
      <div className={`rounded-t-[2.1%_3.4%] bg-[#0c0d10] p-[1.5%] pb-[2.1%] ring-[0.3cqw] ring-[#a7a9b0] ${shadow}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.1%_1.75%] bg-[linear-gradient(135deg,#b9c6f2_0%,#dcd6ef_45%,#f1d6c4_100%)]">
          <img
            src={capture.src}
            alt={capture.alt}
            className="absolute top-[6%] left-1/2 w-[70%] -translate-x-1/2 rounded-[0.8%] shadow-[0_1cqw_2.4cqw_-0.6cqw_rgb(0_0_0/0.45)]"
            style={{ aspectRatio: capture.aspect }}
          />
        </div>
      </div>
      <div className="relative -mx-[4%] aspect-[100/2.2] rounded-b-[50%/100%] bg-[linear-gradient(#e2e3e7,#a7a9b0)] shadow-[0_1.2cqw_2cqw_-1cqw_rgb(0_0_0/0.5)]">
        <span className="absolute top-0 left-1/2 h-[35%] w-[13%] -translate-x-1/2 rounded-b-[40%] bg-[#9a9ca3]" aria-hidden />
      </div>
    </div>
  )
}

/** A browser window: tab strip and address bar above the page capture. */
export function Browser({ capture, url, className }: { capture: Capture; url: string; className: string }) {
  return (
    <div className={`@container absolute overflow-hidden rounded-[2.2%/3.2%] bg-white ring-1 ring-black/20 ${shadow} ${className}`}>
      <div className="flex h-[7cqw] items-center gap-[1.3cqw] bg-[#e9eaee] px-[2.6cqw]">
        {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
          <span key={color} className="size-[1.8cqw] rounded-full" style={{ backgroundColor: color }} aria-hidden />
        ))}
        <span className="mx-auto flex h-[4.4cqw] w-[58%] items-center justify-center rounded-full bg-white font-mono text-[2.4cqw] text-[#5b5f68]">{url}</span>
      </div>
      <img src={capture.src} alt={capture.alt} className="block w-full" style={{ aspectRatio: capture.aspect }} />
    </div>
  )
}

/** The stage the devices stand on: a fixed-proportion picture that scales with its width. */
export function Stage({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`@container relative w-full ${className}`}>
      {children}
    </div>
  )
}
