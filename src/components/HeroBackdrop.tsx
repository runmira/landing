/**
 * Full-bleed hero backdrop.
 *
 * Palette: deep indigo + soft purple glows — mirrors the actual ℳ
 * brand icon (blue/purple gradient). Cool base makes the warm salmon
 * CTAs pop through complementary contrast. The bottom curve carves
 * down into `ink-950` so the demo section reads as a quieter room
 * the hero pours into.
 *
 * All decorative — `aria-hidden` keeps it out of the accessibility tree.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Base wash: deep indigo top → midnight middle → warm ink at the
          seam just above the curve so the transition doesn't ring. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #14162e 0%, #11132a 40%, #14101f 75%, #0d0c0a 100%)',
        }}
      />

      {/* Indigo halo, upper-right — the eye lands here after reading
          a left-aligned headline. Big + soft. */}
      <div
        className="absolute right-[-10%] top-[-20%] h-[70vmin] w-[70vmin] rounded-full opacity-80 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(92, 108, 220, 0.45), rgba(92, 108, 220, 0) 70%)',
        }}
      />

      {/* Purple accent, bottom-left — asymmetric weight in a warmer
          violet so the composition doesn't feel monochrome-blue. */}
      <div
        className="absolute bottom-[-30%] left-[-15%] h-[80vmin] w-[80vmin] rounded-full opacity-75 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(140, 88, 200, 0.40), rgba(140, 88, 200, 0) 65%)',
        }}
      />

      {/* Faint diagonal cream stripe — a single sheer band across the
          middle so light appears to fall on the hero. Kept low or it
          fights the type. */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background:
            'linear-gradient(115deg, transparent 40%, rgba(226, 210, 182, 0.9) 50%, transparent 60%)',
        }}
      />

      {/* Grain overlay — adds tactile texture so the gradient reads
          like matte paper, not a screengrab from 2015. Multiplied
          slightly darker on the cool palette so it stays subtle. */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.82  0 0 0 0 0.71  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          backgroundSize: '140px 140px',
        }}
      />

      {/* Bottom curve — matches the body's ink-950 so it reads as the
          next section carving up into the hero. Asymmetric Bezier
          control points keep it organic, not banking-website
          symmetrical. */}
      <svg
        className="absolute bottom-[-1px] left-0 h-24 w-full sm:h-32"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C280,110 520,110 780,60 C1000,20 1200,10 1440,55 L1440,120 L0,120 Z"
          fill="#0d0c0a"
        />
      </svg>
    </div>
  );
}
