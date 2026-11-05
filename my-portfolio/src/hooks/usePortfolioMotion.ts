import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

function readDistance(value: string | undefined, fallback: number, minimum: number, maximum: number) {
  const number = value?.trim() ? Number(value) : fallback;
  return Number.isFinite(number) ? Math.min(Math.max(number, minimum), maximum) : fallback;
}

/** Motion is progressive enhancement: default CSS always leaves every word visible. */
export function usePortfolioMotion(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ambientElements = Array.from(root.querySelectorAll<HTMLElement>('[data-hero], .marquee'));
    const ambientObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-motion-paused', !entry.isIntersecting)),
      { rootMargin: '120px 0px' },
    );
    ambientElements.forEach((element) => ambientObserver.observe(element));
    const updateVisibility = () => root.classList.toggle('is-page-hidden', document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const compact = window.matchMedia('(max-width: 767px)').matches;
        const header = root.querySelector<HTMLElement>('.site-header');
        const hero = root.querySelector<HTMLElement>('[data-hero]');

        if (header) {
          const headerItems = Array.from(
            header.querySelectorAll<HTMLElement>(':scope > .brand, :scope > .desktop-nav a, :scope > .nav-cta, :scope > .menu-toggle'),
          );
          const headerTimeline = gsap.timeline({ defaults: { ease: motion.easeOut } });
          headerTimeline.fromTo(header, {
            autoAlpha: 0,
            clipPath: 'inset(0 0 100% 0 round 12px)',
            filter: 'blur(9px)',
          }, {
            autoAlpha: 1,
            clipPath: 'inset(0 0 0% 0 round 12px)',
            filter: 'blur(0px)',
            duration: compact ? 0.58 : 0.72,
            clearProps: 'opacity,visibility,clipPath,filter',
          });
          if (headerItems.length) {
            headerTimeline.fromTo(headerItems, {
              y: compact ? -6 : -9,
              autoAlpha: 0,
              filter: 'blur(4px)',
            }, {
              y: 0,
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: compact ? 0.34 : 0.44,
              stagger: compact ? 0.045 : 0.055,
              clearProps: 'transform,opacity,visibility,filter',
            }, '-=.42');
          }
        }

        if (hero) {
          const role = hero.querySelector('.hero-role');
          const lines = Array.from(hero.querySelectorAll<HTMLElement>('h1 [data-line]'));
          const supporting = ['.hero-description', '.hero-actions', '.hero-proof', '.scroll-cue']
            .map((selector) => hero.querySelector<HTMLElement>(selector)).filter(Boolean);
          const objects = Array.from(hero.querySelectorAll<HTMLElement>('.hero-object'));
          const timeline = gsap.timeline({ defaults: { ease: motion.easeOut }, delay: compact ? 0.06 : 0.1 });
          if (role) timeline.fromTo(role, { y: 13, autoAlpha: 0, filter: 'blur(6px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.45, clearProps: 'transform,opacity,visibility,filter' });
          if (lines.length) timeline.fromTo(lines, { yPercent: 110, rotateX: compact ? 0 : -5, autoAlpha: 0, filter: 'blur(7px)', transformOrigin: '50% 100%' }, { yPercent: 0, rotateX: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.075, clearProps: 'transform,opacity,visibility,filter' }, '-=.22');
          if (supporting.length) timeline.fromTo(supporting, { y: compact ? 13 : 18, autoAlpha: 0, filter: 'blur(5px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.64, stagger: 0.08, clearProps: 'transform,opacity,visibility,filter' }, '-=.45');
          if (objects.length) timeline.fromTo(objects, { scale: 0.9, rotate: (index) => index ? 4 : -4, autoAlpha: 0, filter: 'blur(8px)' }, { scale: 1, rotate: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.08, clearProps: 'transform,opacity,visibility,filter' }, '-=.78');
        }

        const headingGroups = new Map<HTMLElement, HTMLElement[]>();
        root.querySelectorAll<HTMLElement>('[data-line]').forEach((line) => {
          const heading = line.closest<HTMLElement>('h1, h2, h3, [data-heading]');
          if (!heading || heading.closest('[data-hero]')) return;
          const lines = headingGroups.get(heading) ?? [];
          lines.push(line);
          headingGroups.set(heading, lines);
        });

        headingGroups.forEach((lines, heading) => {
          gsap.fromTo(lines, { yPercent: 106, rotateX: compact ? 0 : -3, autoAlpha: 0, filter: 'blur(6px)', transformOrigin: '50% 100%' }, {
            yPercent: 0, rotateX: 0, autoAlpha: 1, filter: 'blur(0px)', duration: compact ? 0.64 : motion.heading,
            ease: motion.easeOut, stagger: compact ? 0.05 : 0.075, clearProps: 'transform,opacity,visibility,filter',
            scrollTrigger: { trigger: heading, start: 'top 89%', once: true },
          });
        });

        root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
          if (element.closest('[data-stagger], [data-hero]') || element.hasAttribute('data-line')) return;
          gsap.fromTo(element, { y: compact ? 12 : 18, autoAlpha: 0, filter: 'blur(6px)' }, {
            y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: compact ? 0.58 : motion.reveal,
            ease: motion.easeOut, clearProps: 'transform,opacity,visibility,filter',
            scrollTrigger: { trigger: element, start: 'top 89%', once: true },
          });
        });

        root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((collection) => {
          const cards = Array.from(collection.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
          if (!cards.length) return;
          const isProjects = collection.classList.contains('projects-grid');
          const isProcess = collection.classList.contains('process-grid');
          const timeline = gsap.timeline({ scrollTrigger: { trigger: collection, start: 'top 86%', once: true } });
          timeline.fromTo(cards, {
            y: compact ? 14 : isProjects ? 30 : 22,
            scale: compact ? 1 : isProjects ? 0.985 : 0.99,
            autoAlpha: 0,
            filter: compact ? 'blur(3px)' : 'blur(7px)',
          }, {
            y: 0, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: compact ? 0.58 : motion.reveal,
            ease: motion.easeOut, stagger: { amount: Math.min((cards.length - 1) * (compact ? 0.055 : motion.stagger), isProjects ? 0.35 : 0.42) },
            clearProps: 'transform,opacity,visibility,filter',
          });

          if (isProjects) {
            const images = cards.map((card) => card.querySelector('img')).filter((image): image is HTMLImageElement => image instanceof HTMLImageElement);
            timeline.fromTo(images, { scale: compact ? 1.018 : 1.045 }, { scale: 1, duration: compact ? 0.65 : 0.95, ease: motion.easeOut, stagger: { amount: compact ? 0.18 : 0.3 }, clearProps: 'transform' }, '<');
          }
          if (isProcess && !compact) {
            timeline.fromTo(cards.slice(0, -1), { '--line-scale': 0 }, { '--line-scale': 1, duration: 0.46, ease: motion.easeOut, stagger: 0.07 }, '-=.22');
          }
        });
      });

      media.add('(min-width: 1000px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((element) => {
          const distance = readDistance(element.dataset.parallax, 8, -12, 12);
          gsap.fromTo(element, { yPercent: -distance / 2 }, { yPercent: distance / 2, ease: 'none', scrollTrigger: { trigger: element.parentElement ?? element, start: 'top bottom', end: 'bottom top', scrub: 0.65 } });
        });

        const hero = root.querySelector<HTMLElement>('[data-hero]');
        if (!hero) return;
        const heroContent = hero.querySelector<HTMLElement>('.hero-content');
        if (heroContent) gsap.to(heroContent, { yPercent: 7, autoAlpha: 0.35, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 18%', scrub: 0.6 } });

        const layers = Array.from(hero.querySelectorAll<HTMLElement>('[data-depth]')).map((element) => {
          const depth = readDistance(element.dataset.depth, 8, -10, 10);
          return { element, depth, xTo: gsap.quickTo(element, 'x', { duration: 0.62, ease: motion.easeOut }), yTo: gsap.quickTo(element, 'y', { duration: 0.62, ease: motion.easeOut }) };
        });
        if (!layers.length) return;
        let bounds = hero.getBoundingClientRect();
        const updateBounds = () => { bounds = hero.getBoundingClientRect(); };
        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return;
          const relativeX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
          const relativeY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
          layers.forEach(({ depth, xTo, yTo }) => { xTo(relativeX * depth); yTo(relativeY * depth); });
        };
        const reset = () => layers.forEach(({ xTo, yTo }) => { xTo(0); yTo(0); });
        hero.addEventListener('pointerenter', updateBounds, { passive: true });
        hero.addEventListener('pointermove', onMove, { passive: true });
        hero.addEventListener('pointerleave', reset);
        window.addEventListener('resize', updateBounds, { passive: true });
        window.addEventListener('scroll', updateBounds, { passive: true });
        window.addEventListener('blur', reset);
        return () => {
          hero.removeEventListener('pointerenter', updateBounds);
          hero.removeEventListener('pointermove', onMove);
          hero.removeEventListener('pointerleave', reset);
          window.removeEventListener('resize', updateBounds);
          window.removeEventListener('scroll', updateBounds);
          window.removeEventListener('blur', reset);
        };
      });
    }, root);

    let active = true;
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => {
      active = false;
      ambientObserver.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
      root.classList.remove('is-page-hidden');
      media.revert();
      context.revert();
    };
  }, [scope]);
}
