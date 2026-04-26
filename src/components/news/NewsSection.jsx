import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { news } from "../../data/news.js";
import ArrowButton from "../ui/ArrowButton.jsx";
import PillButton from "../ui/PillButton.jsx";
import NewsArtwork from "./NewsArtwork.jsx";

const GAP = 24;
const DURATION = 0.92;
const EASE = "expo.out";

function getOrderedNews(index) {
  return news.map((_, offset) => news[(index + offset) % news.length]);
}

function getCardSizes(containerWidth) {
  if (containerWidth < 640) {
    return {
      active: containerWidth,
      inactive: containerWidth,
      gap: GAP,
      titleActive: 34,
      titleInactive: 27,
      excerptActive: 150,
      excerptInactive: 78,
      metaActive: 84,
    };
  }

  if (containerWidth < 1024) {
    return {
      active: Math.min(560, Math.max(460, containerWidth * 0.72)),
      inactive: Math.min(340, Math.max(300, containerWidth * 0.44)),
      gap: GAP,
      titleActive: containerWidth < 768 ? 34 : 42,
      titleInactive: 27,
      excerptActive: 150,
      excerptInactive: 78,
      metaActive: 84,
    };
  }

  return {
    active: Math.min(640, Math.max(560, containerWidth * 0.48)),
    inactive: Math.min(360, Math.max(320, containerWidth * 0.26)),
    gap: GAP,
    titleActive: 42,
    titleInactive: 27,
    excerptActive: 150,
    excerptInactive: 78,
    metaActive: 84,
  };
}

function getCardVars(isActive, sizes) {
  const titleSize = isActive ? sizes.titleActive : sizes.titleInactive;

  return {
    "--news-title-percent": `${(titleSize / sizes.titleInactive) * 100}%`,
    "--news-excerpt-height": `${
      isActive ? sizes.excerptActive : sizes.excerptInactive
    }px`,
    "--news-meta-height": `${isActive ? sizes.metaActive : 0}px`,
    "--news-meta-opacity": isActive ? 1 : 0,
  };
}

function NewsCard({ item, featured = false, sizes }) {
  return (
    <article
      className={[
        "group relative h-full w-full overflow-hidden rounded-[18px] bg-charcoal text-paper",
        "shadow-[0_30px_90px_-58px_rgba(26,26,26,0.75)]",
      ].join(" ")}>
      <NewsArtwork />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,26,0.1)_0%,rgba(26,26,26,0.46)_48%,rgba(26,26,26,0.92)_100%)]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        <div />

        <div style={{ fontSize: sizes.titleInactive }}>
          <h3
            data-news-title
            className="font-display font-[430] leading-[1.05] text-paper"
            style={{
              fontSize: "var(--news-title-percent)",
            }}>
            {item.title}
          </h3>
          <p
            data-news-excerpt
            className="mt-4 max-w-[48ch] overflow-hidden text-[15px] leading-[1.6] text-paper/68"
            style={{
              maxHeight: "var(--news-excerpt-height)",
            }}>
            {item.excerpt}
          </p>

          <div
            data-news-meta
            aria-hidden={!featured}
            className={[
              "mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 overflow-hidden border-t border-paper/15 pt-5 text-[13px] text-paper/66",
              featured ? "" : "pointer-events-none",
            ].join(" ")}
            style={{
              height: "var(--news-meta-height)",
              opacity: "var(--news-meta-opacity)",
            }}>
            <span className="grid size-9 place-items-center rounded-full bg-paper text-charcoal">
              A
            </span>
            <span>{item.author}</span>
            <span className="h-3 w-px bg-paper/20" aria-hidden />
            <span>{item.date}</span>
            <a
              href="#contacto"
              tabIndex={featured ? undefined : -1}
              className="ml-auto font-medium text-paper underline decoration-red decoration-2 underline-offset-4">
              Leer más
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function NewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [motion, setMotion] = useState(null);
  const [sizes, setSizes] = useState({
    active: 640,
    inactive: 340,
    gap: GAP,
    titleActive: 42,
    titleInactive: 27,
    excerptActive: 150,
    excerptInactive: 78,
    metaActive: 84,
  });
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const cardRefs = useRef(new Map());
  const isAnimatingRef = useRef(false);
  const activeId = news[activeIndex].id;
  const progressIndex = motion ? motion.to : activeIndex;
  const progress = (progressIndex + 1) / news.length;

  const ordered = motion
    ? motion.direction > 0
      ? getOrderedNews(motion.from)
      : [
          news[motion.to],
          ...getOrderedNews(motion.from).filter(
            (item) => item.id !== news[motion.to].id,
          ),
        ]
    : getOrderedNews(activeIndex);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const measure = () => {
      const next = getCardSizes(viewport.getBoundingClientRect().width);
      setSizes((current) =>
        current.active === next.active &&
        current.inactive === next.inactive &&
        current.gap === next.gap &&
        current.titleActive === next.titleActive
          ? current
          : next,
      );
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, []);

  useLayoutEffect(() => {
    gsap.set(progressRef.current, {
      scaleX: (activeIndex + 1) / news.length,
      transformOrigin: "left center",
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (!motion) return undefined;

    const track = trackRef.current;
    const outgoing = cardRefs.current.get(news[motion.from].id);
    const incoming = cardRefs.current.get(news[motion.to].id);
    if (!track || !outgoing || !incoming) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const shift = sizes.inactive + sizes.gap;
    const initialX = motion.direction > 0 ? 0 : -shift;
    const targetX = motion.direction > 0 ? -shift : 0;

    cardRefs.current.forEach((node, id) => {
      const isOutgoing = id === news[motion.from].id;
      gsap.set(node, {
        width: isOutgoing ? sizes.active : sizes.inactive,
        opacity: isOutgoing ? 1 : 0.82,
        ...getCardVars(isOutgoing, sizes),
      });
    });
    gsap.set(track, { x: initialX });

    if (prefersReducedMotion) {
      flushSync(() => {
        setActiveIndex(motion.to);
        setMotion(null);
      });
      gsap.set(track, { x: 0 });
      isAnimatingRef.current = false;
      return undefined;
    }

    // The width tween and track tween start together so the leaving card
    // contracts while the incoming card creates the new editorial focal point.
    const timeline = gsap.timeline({
      defaults: { duration: DURATION, ease: EASE },
      onComplete: () => {
        isAnimatingRef.current = false;
        flushSync(() => {
          setActiveIndex(motion.to);
          setMotion(null);
        });
        gsap.set(track, { x: 0 });
      },
    });

    timeline
      .to(track, { x: targetX, autoRound: false }, 0)
      .to(
        outgoing,
        {
          width: sizes.inactive,
          opacity: 0.82,
          ...getCardVars(false, sizes),
          autoRound: false,
        },
        0,
      )
      .to(
        incoming,
        {
          width: sizes.active,
          opacity: 1,
          ...getCardVars(true, sizes),
          autoRound: false,
        },
        0.05,
      )
      .to(
        progressRef.current,
        {
          scaleX: (motion.to + 1) / news.length,
          duration: DURATION * 0.85,
          ease: "power3.out",
        },
        0,
      );

    return () => timeline.kill();
  }, [motion, sizes]);

  const go = (step) => {
    if (isAnimatingRef.current) return;

    const to = (activeIndex + step + news.length) % news.length;
    isAnimatingRef.current = true;
    setMotion({
      direction: step > 0 ? 1 : -1,
      from: activeIndex,
      to,
    });
  };

  return (
    <section id="novedades" className="bg-bone py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <div className="mx-auto max-w-[780px] text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Bitácora ACI
          </span>
          <h2 className="mt-5 font-display text-[42px] font-[430] leading-[1.05] text-charcoal md:text-[56px]">
            Novedades y casos
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-[16px] leading-[1.65] text-ink-mute">
            Conocé los proyectos, contratos y novedades de ACI mientras la
            operación empieza a crecer en Buenos Aires.
          </p>
          <div className="mt-8">
            <PillButton as="a" href="#contacto" variant="light">
              Ver todas las novedades
            </PillButton>
          </div>
        </div>

        <div ref={viewportRef} className="mt-14 overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-start gap-6 pb-4 will-change-transform">
            {ordered.map((item) => {
              const isFeatured = item.id === activeId;
              return (
                <div
                  key={item.id}
                  ref={(node) => {
                    if (node) cardRefs.current.set(item.id, node);
                    else cardRefs.current.delete(item.id);
                  }}
                  className="h-[440px] shrink-0 md:h-[460px]"
                  style={{
                    width: isFeatured ? sizes.active : sizes.inactive,
                    opacity: isFeatured ? 1 : 0.82,
                    ...getCardVars(isFeatured, sizes),
                  }}>
                  <NewsCard item={item} featured={isFeatured} sizes={sizes} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center">
          <div
            className="h-[3px] w-full overflow-hidden rounded-full bg-red-soft md:max-w-[520px]"
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}>
            <div
              ref={progressRef}
              className="h-full w-full origin-left rounded-full bg-red"
            />
          </div>
          <div className="flex items-center gap-2 md:ml-auto">
            <ArrowButton direction="left" onClick={() => go(-1)} />
            <ArrowButton direction="right" filled onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
