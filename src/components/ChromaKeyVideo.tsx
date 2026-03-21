import { useRef, useEffect, useState } from "react";

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** Chroma key color [R, G, B] — default bright green */
  keyColor?: [number, number, number];
  /** Tolerance 0–1 for color matching, default 0.35 */
  tolerance?: number;
  /** Edge softness 0–1, default 0.1 */
  softness?: number;
}

const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({
  src,
  className = "",
  style,
  keyColor = [0, 255, 0],
  tolerance = 0.35,
  softness = 0.12,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ w: 300, h: 300 });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const [kr, kg, kb] = keyColor;
    const tolSq = (tolerance * 441.67) ** 2; // 441.67 = sqrt(255^2 * 3)
    const softRange = softness * 441.67;

    const draw = () => {
      if (video.paused || video.ended) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const w = video.videoWidth;
      const h = video.videoHeight;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        setDimensions({ w, h });
      }

      ctx.drawImage(video, 0, 0, w, h);
      const frame = ctx.getImageData(0, 0, w, h);
      const d = frame.data;

      for (let i = 0; i < d.length; i += 4) {
        const dr = d[i] - kr;
        const dg = d[i + 1] - kg;
        const db = d[i + 2] - kb;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);

        if (dist * dist < tolSq) {
          d[i + 3] = 0; // fully transparent
        } else if (dist < Math.sqrt(tolSq) + softRange) {
          // soft edge
          const alpha = (dist - Math.sqrt(tolSq)) / softRange;
          d[i + 3] = Math.round(alpha * 255);
        }
      }

      ctx.putImageData(frame, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };

    const onPlay = () => {
      rafRef.current = requestAnimationFrame(draw);
    };

    video.addEventListener("play", onPlay);
    // If already playing
    if (!video.paused) onPlay();

    return () => {
      video.removeEventListener("play", onPlay);
      cancelAnimationFrame(rafRef.current);
    };
  }, [src, keyColor, tolerance, softness]);

  return (
    <div className={`relative ${className}`} style={style}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
};

export default ChromaKeyVideo;
