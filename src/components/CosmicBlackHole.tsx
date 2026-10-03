import { useEffect, useRef } from "react";

type Particle = { angle: number; radius: number; speed: number; size: number; tint: number };

/** A painted accretion flow: far-side light bends over the horizon; near-side plasma crosses in front. */
export function CosmicBlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !frame || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    const particles: Particle[] = Array.from({ length: 95 }, (_, i) => ({
      angle: i * 2.39996,
      radius: 1.25 + ((i * 47) % 101) / 49,
      speed: 0.14 + ((i * 13) % 19) / 95,
      size: 0.45 + ((i * 29) % 11) / 12,
      tint: i % 4,
    }));
    let width = 0;
    let height = 0;
    let visible = true;
    let raf = 0;
    let last = 0;
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const resize = () => {
      const rect = frame.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, width < 560 ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(time);
    };

    const paint = (t: number) => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const unit = Math.min(width / 7.6, height / 5.1);
      const cx = width / 2 + pointerX * unit * 0.13;
      const cy = height * 0.49 + pointerY * unit * 0.11;
      const horizon = unit * 0.91;
      const cool = ["172,222,255", "195,181,255", "224,237,255", "135,172,241"];

      // Volumetric scattering, strongest on the approaching (left) side.
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.45);
      const aura = ctx.createRadialGradient(0, 0, horizon * 0.5, 0, 0, unit * 3.45);
      aura.addColorStop(0, "rgba(176,195,255,0.24)");
      aura.addColorStop(0.38, "rgba(93,102,180,0.13)");
      aura.addColorStop(0.75, "rgba(55,62,136,0.035)");
      aura.addColorStop(1, "rgba(15,15,30,0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, 0, unit * 3.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const point = (angle: number, radius: number, far: boolean, band: number) => {
        const r = radius * unit;
        const swirl = Math.sin(angle * 6 - t * (0.95 + band * 0.018) + band * 1.87) * unit * 0.013;
        const eddy = Math.sin(angle * 13 + t * 0.41 + band * 2.61) * unit * 0.007;
        const x = Math.cos(angle) * (r + swirl + eddy);
        let y = Math.sin(angle) * r * (far ? 0.235 : 0.19);
        if (far) {
          // The far-side disk appears above the event horizon as a lensed arch.
          y -= horizon * 0.76 * Math.exp(-Math.pow(x / (horizon * 1.34), 4));
        } else {
          y += horizon * 0.075 * Math.exp(-Math.pow(x / (horizon * 1.45), 4));
        }
        return [cx + x, cy + y] as const;
      };

      const drawFlow = (far: boolean) => {
        const bands = width < 560 ? 42 : 67;
        const segments = width < 560 ? 38 : 52;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        for (let band = 0; band < bands; band++) {
          const radius = 1.12 + band / bands * 2.48;
          const sparse = Math.sin(band * 7.37) * 0.5 + 0.5;
          const color = cool[band % cool.length];
          for (let j = 0; j < segments; j++) {
            const angle = (far ? Math.PI : 0) + j / segments * Math.PI;
            const nextAngle = (far ? Math.PI : 0) + (j + 1) / segments * Math.PI;
            const surge = Math.sin(angle * 9 - t * (1.5 + band * 0.027) + band * 0.88);
            const filament = Math.sin(angle * 25 + t * 2.2 + band * 1.72);
            const doppler = Math.max(0.25, 1 - 0.32 * Math.cos(angle));
            const inner = Math.exp(-Math.pow((radius - 1.45) / 0.85, 2));
            const brightness = (0.035 + 0.19 * Math.pow(Math.max(0, surge), 5) + 0.09 * Math.pow(Math.max(0, filament), 9)) * (0.45 + inner * 0.9) * (0.55 + sparse * 0.65) * doppler * (far ? 0.88 : 1.35);
            if (brightness < 0.017) continue;
            const p = point(angle, radius, far, band);
            const q = point(nextAngle, radius, far, band);
            ctx.strokeStyle = `rgba(${color},${Math.min(0.75, brightness)})`;
            ctx.lineWidth = (band % 7 === 0 ? 1.4 : 0.65) * (width < 560 ? 0.8 : 1);
            ctx.beginPath();
            ctx.moveTo(p[0], p[1]);
            ctx.lineTo(q[0], q[1]);
            ctx.stroke();
          }
        }
        ctx.restore();
      };

      drawFlow(true);

      // Thin gravitationally lensed photon arcs run above and below the shadow.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let k = 0; k < 5; k++) {
        const r = horizon * (1.05 + k * 0.075);
        const alpha = 0.36 / (k + 1);
        ctx.strokeStyle = `rgba(${k % 2 ? "164,176,255" : "208,238,255"},${alpha})`;
        ctx.lineWidth = k === 0 ? 1.7 : 1.1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 1.13, r * 0.98, 0, Math.PI * 1.04, Math.PI * 1.96);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 1.13, r * 0.98, 0, 0.07, Math.PI * 0.93);
        ctx.stroke();
      }
      ctx.restore();

      // The unlit horizon occludes the back of the disk; edge has a narrow photon glow.
      const shadow = ctx.createRadialGradient(cx, cy, horizon * 0.62, cx, cy, horizon * 1.24);
      shadow.addColorStop(0, "rgba(2,3,8,1)");
      shadow.addColorStop(0.78, "rgba(2,3,8,1)");
      shadow.addColorStop(0.88, "rgba(5,7,15,0.99)");
      shadow.addColorStop(0.96, "rgba(20,28,50,0.52)");
      shadow.addColorStop(1, "rgba(20,28,50,0)");
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(cx, cy, horizon * 1.24, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const rim = ctx.createLinearGradient(cx - horizon, cy, cx + horizon, cy);
      rim.addColorStop(0, "rgba(153,200,255,0.08)");
      rim.addColorStop(0.32, "rgba(202,229,255,0.57)");
      rim.addColorStop(0.67, "rgba(160,178,244,0.34)");
      rim.addColorStop(1, "rgba(127,155,236,0.06)");
      ctx.strokeStyle = rim;
      ctx.lineWidth = width < 560 ? 1 : 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, horizon * 0.99, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      drawFlow(false);

      // Brighter turbulent threads in the foreground follow the rotating flow.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let strand = 0; strand < 16; strand++) {
        const radius = 1.13 + strand * 0.114;
        const start = ((strand * 0.618 + t * (0.16 + strand * 0.004)) % 1) * Math.PI;
        const length = 0.16 + (strand % 4) * 0.07;
        ctx.strokeStyle = `rgba(${cool[strand % 3]},${0.12 + (strand % 5) * 0.055})`;
        ctx.lineWidth = strand % 4 === 0 ? 1.5 : 0.7;
        ctx.beginPath();
        for (let j = 0; j <= 12; j++) {
          const a = Math.min(Math.PI, start + j / 12 * length);
          const p = point(a, radius, false, strand);
          if (j === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
        }
        ctx.stroke();
      }

      for (const p of particles) {
        const a = p.angle + t * p.speed;
        const radius = 1.16 + ((p.radius - 1.16 - t * p.speed * 0.048) % 2.5 + 2.5) % 2.5;
        const far = Math.sin(a) < 0;
        const pos = point(a, radius, far, Math.floor(p.angle * 10));
        if (far && Math.hypot(pos[0] - cx, pos[1] - cy) < horizon * 1.1) continue;
        ctx.fillStyle = `rgba(${cool[p.tint]},${far ? 0.28 : 0.68})`;
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], p.size * (far ? 0.58 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      frame.dataset.ready = "true";
    };

    const tick = (stamp: number) => {
      raf = requestAnimationFrame(tick);
      if (stamp - last < (width < 560 ? 38 : 31)) return;
      const delta = last ? Math.min(0.05, (stamp - last) / 1000) : 0;
      last = stamp;
      time += delta;
      pointerX += (targetX - pointerX) * 0.06;
      pointerY += (targetY - pointerY) * 0.06;
      paint(time);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      if (!motion.matches && !document.hidden && visible) raf = requestAnimationFrame(tick);
      else paint(time);
    };
    const onPointer = (event: PointerEvent) => {
      if (!fine.matches || motion.matches) return;
      const rect = frame.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
      targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      sync();
    });
    const resizer = new ResizeObserver(resize);
    resizer.observe(frame);
    observer.observe(frame);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={frameRef} aria-hidden="true" className="parallax-layer relative aspect-[3/2] w-full pointer-events-none" style={{ ["--depth" as string]: 14 }}>
      <div className="cosmic-fallback absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />
    </div>
  );
}
