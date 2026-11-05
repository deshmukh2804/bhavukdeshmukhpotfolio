// src/components/SmokeCursor.tsx
import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  born: number;
  life: number;
  size: number;
  driftX: number;
  driftY: number;
  angle: number;
  alpha: number;
  curl: number;
  phase: number;
  stretch: number;
  texture: number;
  green: boolean;
};

type TrailPoint = { x: number; y: number; born: number };

const MAX_PARTICLES = 78;
const EMISSION_DISTANCE = 8;
const TRAIL_LIFE = 250;

function createSmokeTexture(green: boolean, variant: number): HTMLCanvasElement {
  const sprite = document.createElement('canvas');
  sprite.width = 112;
  sprite.height = 112;
  const context = sprite.getContext('2d');
  if (!context) return sprite;

  const color = green ? '112, 190, 141' : '244, 246, 240';
  const lobes = [
    [[56, 55, 43, 0.7], [38, 63, 25, 0.25], [75, 43, 22, 0.2]],
    [[52, 57, 39, 0.68], [72, 64, 28, 0.28], [42, 34, 20, 0.2]],
    [[59, 51, 41, 0.66], [35, 48, 24, 0.24], [68, 78, 21, 0.2]],
  ][variant];

  for (const [x, y, radius, opacity] of lobes) {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(${color}, ${opacity})`);
    gradient.addColorStop(0.24, `rgba(${color}, ${opacity * 0.58})`);
    gradient.addColorStop(0.62, `rgba(${color}, ${opacity * 0.13})`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, 112, 112);
  }
  return sprite;
}

function isInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest('a, button, input, textarea, select, [role="button"]'))
  );
}

export default function SmokeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const preference = window.matchMedia(
      '(min-width: 1000px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    let disposeTrail: (() => void) | undefined;

    const enableTrail = () => {
      const whiteTextures = [0, 1, 2].map((v) => createSmokeTexture(false, v));
      const greenTextures = [0, 1, 2].map((v) => createSmokeTexture(true, v));
      const particles: Particle[] = Array.from({ length: MAX_PARTICLES }, () => ({
        x: 0, y: 0, born: -1, life: 0, size: 0, driftX: 0, driftY: 0,
        angle: 0, alpha: 0, curl: 0, phase: 0, stretch: 1, texture: 0, green: false,
      }));

      let viewportWidth = 0;
      let viewportHeight = 0;
      let frame = 0;
      let previousTime = 0;
      let nextParticle = 0;
      let hasPointer = false;
      let targetX = 0;
      let targetY = 0;
      let smoothX = 0;
      let smoothY = 0;
      let emittedX = 0;
      let emittedY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let lastPointerTime = 0;
      let lastTrailX = 0;
      let lastTrailY = 0;
      let ringRadius = 8;
      let targetRingRadius = 8;
      let interactive = false;
      const trail: TrailPoint[] = [];

      const clear = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
        hasPointer = false;
        trail.length = 0;
        particles.forEach((p) => { p.born = -1; });
        context.clearRect(0, 0, viewportWidth, viewportHeight);
      };

      const resize = () => {
        clear();
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        canvas.width = Math.ceil(viewportWidth * pixelRatio);
        canvas.height = Math.ceil(viewportHeight * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      };

      const emit = (x: number, y: number, time: number) => {
        const p = particles[nextParticle];
        nextParticle = (nextParticle + 1) % MAX_PARTICLES;
        const speed = Math.min(Math.hypot(velocityX, velocityY), 34);
        const direction = Math.atan2(velocityY, velocityX);
        p.x = x + (Math.random() - 0.5) * 4;
        p.y = y + (Math.random() - 0.5) * 4;
        p.born = time;
        p.life = 680 + Math.random() * 220;
        p.size = 10 + Math.random() * 14;
        p.driftX = (Math.random() - 0.5) * 13 - Math.cos(direction) * speed * 0.12;
        p.driftY = -(7 + Math.random() * 12) - Math.sin(direction) * speed * 0.05;
        p.angle = direction + (Math.random() - 0.5) * 0.65;
        p.green = Math.random() < (interactive ? 0.24 : 0.16);
        p.alpha = p.green ? 0.075 + Math.random() * 0.04 : 0.11 + Math.random() * 0.06;
        p.curl = 3 + Math.random() * 6;
        p.phase = Math.random() * Math.PI * 2;
        p.stretch = 1.05 + Math.min(speed / 70, 0.35) + Math.random() * 0.2;
        p.texture = Math.floor(Math.random() * 3);
      };

      const drawRibbon = (time: number) => {
        while (trail.length && time - trail[0].born > TRAIL_LIFE) trail.shift();
        if (trail.length < 2) return;
        context.save();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        for (let i = 1; i < trail.length; i += 1) {
          const from = trail[i - 1];
          const to = trail[i];
          const age = Math.max(0, 1 - (time - to.born) / TRAIL_LIFE);
          const strength = age * (i / trail.length);
          context.beginPath();
          context.moveTo(from.x, from.y);
          context.lineTo(to.x, to.y);
          context.lineWidth = 1 + strength * 1.4;
          context.strokeStyle = `rgba(132, 198, 154, ${0.035 + strength * 0.16})`;
          context.stroke();
        }
        context.restore();
      };

      const drawCore = (time: number) => {
        const age = time - lastPointerTime;
        const fade = Math.max(0, Math.min(1, 1 - Math.max(age - 320, 0) / 360));
        if (!fade) return false;
        ringRadius += (targetRingRadius - ringRadius) * 0.16;
        context.save();
        context.translate(smoothX, smoothY);
        context.globalAlpha = fade;
        context.beginPath();
        context.arc(0, 0, ringRadius, 0, Math.PI * 2);
        context.lineWidth = 1;
        context.strokeStyle = interactive
          ? 'rgba(117, 206, 148, .72)'
          : 'rgba(235, 240, 232, .5)';
        context.stroke();
        if (interactive) {
          context.beginPath();
          context.arc(0, 0, ringRadius + 3, -Math.PI * 0.2, Math.PI * 0.72);
          context.strokeStyle = 'rgba(84, 185, 120, .28)';
          context.stroke();
        }
        context.beginPath();
        context.arc(0, 0, 1.7, 0, Math.PI * 2);
        context.fillStyle = 'rgba(247, 248, 243, .78)';
        context.fill();
        context.restore();
        return true;
      };

      const render = (time: number) => {
        frame = 0;
        const delta = previousTime ? Math.min(time - previousTime, 40) : 16;
        previousTime = time;
        context.clearRect(0, 0, viewportWidth, viewportHeight);

        let stillFollowing = false;
        if (hasPointer) {
          const blend = 1 - Math.exp(-delta / 42);
          smoothX += (targetX - smoothX) * blend;
          smoothY += (targetY - smoothY) * blend;
          stillFollowing = Math.hypot(targetX - smoothX, targetY - smoothY) > 0.35;
          if (Math.hypot(smoothX - lastTrailX, smoothY - lastTrailY) > 1.5) {
            trail.push({ x: smoothX, y: smoothY, born: time });
            if (trail.length > 22) trail.shift();
            lastTrailX = smoothX;
            lastTrailY = smoothY;
          }
          const distance = Math.hypot(smoothX - emittedX, smoothY - emittedY);
          if (distance >= EMISSION_DISTANCE) {
            const steps = Math.min(3, Math.floor(distance / EMISSION_DISTANCE));
            const ox = emittedX;
            const oy = emittedY;
            for (let s = 1; s <= steps; s += 1) {
              const f = s / steps;
              emit(ox + (smoothX - ox) * f, oy + (smoothY - oy) * f, time);
            }
            emittedX = smoothX;
            emittedY = smoothY;
          }
        }

        drawRibbon(time);
        let hasLive = false;
        for (const p of particles) {
          if (p.born < 0) continue;
          const progress = (time - p.born) / p.life;
          if (progress >= 1) { p.born = -1; continue; }
          hasLive = true;
          const fadeIn = Math.min(progress / 0.08, 1);
          const fd = fadeIn * (1 - progress) ** 1.35;
          const sz = p.size * (1 + progress * 0.9);
          const curl = Math.sin(p.phase + progress * 5) * p.curl * progress;
          const perp = p.angle + Math.PI / 2;
          context.save();
          context.globalAlpha = p.alpha * fd;
          context.translate(
            p.x + p.driftX * progress + Math.cos(perp) * curl,
            p.y + p.driftY * progress + Math.sin(perp) * curl,
          );
          context.rotate(p.angle + progress * 0.28);
          const tex = p.green ? greenTextures[p.texture] : whiteTextures[p.texture];
          context.drawImage(tex, -sz * p.stretch, -sz * 0.72, sz * 2 * p.stretch, sz * 1.44);
          context.restore();
        }

        const coreVisible = drawCore(time);
        if (hasLive || trail.length > 0 || stillFollowing || coreVisible) {
          frame = requestAnimationFrame(render);
        } else {
          previousTime = 0;
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' || document.hidden) return;
        velocityX = e.clientX - targetX;
        velocityY = e.clientY - targetY;
        targetX = e.clientX;
        targetY = e.clientY;
        lastPointerTime = performance.now();
        interactive = isInteractiveTarget(e.target);
        targetRingRadius = interactive ? 15 : 8;
        if (!hasPointer) {
          hasPointer = true;
          smoothX = emittedX = lastTrailX = targetX;
          smoothY = emittedY = lastTrailY = targetY;
        }
        if (!frame) frame = requestAnimationFrame(render);
      };

      const onPointerOut = (e: PointerEvent) => {
        if (e.relatedTarget === null) clear();
      };
      const onVisChange = () => { if (document.hidden) clear(); };

      canvas.style.display = 'block';
      resize();
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerout', onPointerOut, { passive: true });
      window.addEventListener('resize', resize, { passive: true });
      window.addEventListener('blur', clear);
      document.addEventListener('visibilitychange', onVisChange);

      return () => {
        clear();
        canvas.style.display = 'none';
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerout', onPointerOut);
        window.removeEventListener('resize', resize);
        window.removeEventListener('blur', clear);
        document.removeEventListener('visibilitychange', onVisChange);
      };
    };

    const update = () => {
      disposeTrail?.();
      disposeTrail = preference.matches ? enableTrail() : undefined;
    };
    update();
    preference.addEventListener('change', update);
    return () => {
      preference.removeEventListener('change', update);
      disposeTrail?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-smoke-cursor
      className="smoke-cursor"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'none',
      }}
    />
  );
}