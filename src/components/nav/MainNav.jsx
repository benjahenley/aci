import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import MegaPanel from "./MegaPanel.jsx";
import PillButton from "../ui/PillButton.jsx";
import { navPanels } from "../../data/navPanels.js";

const ITEMS = [
  { label: "Servicios", href: "/servicios", dropdown: true },
  { label: "Sectores", href: "#sectores", dropdown: true },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Sostenibilidad", href: "#sostenibilidad" },
  { label: "Novedades", href: "#novedades" },
];

const HOVER_GRACE = 140; // ms — cursor travel from nav item to panel

function ChevronDown({ open }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={[
        "size-2.5 transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      ].join(" ")}
      aria-hidden
      fill="none">
      <path
        d="M2 4.5 6 8.5 10 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  // Intent-aware open/close: cursor can travel from the nav item to the panel
  // without the panel snapping shut.
  const open = (label) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenItem(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenItem(null), HOVER_GRACE);
  };

  const activePanel = openItem ? navPanels[openItem] : null;

  return (
    <header
      id="top"
      onPointerLeave={scheduleClose}
      className={[
        "sticky top-0 z-40 transition-all duration-300",
        scrolled || openItem
          ? "border-b border-hairline bg-bone/85 backdrop-blur-md"
          : "bg-bone/0",
      ].join(" ")}>
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-8 px-6 md:px-10">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {ITEMS.map((item) => {
              const hasPanel = item.dropdown && navPanels[item.label];
              const isOpen = openItem === item.label;
              const isRoute = item.href.startsWith("/");
              const linkClass = [
                "group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                isOpen ? "text-red" : "text-charcoal/85 hover:text-red",
              ].join(" ");
              const inner = (
                <>
                  {item.label}
                  {item.dropdown && (
                    <span
                      className={[
                        "transition-colors",
                        isOpen
                          ? "text-red"
                          : "text-charcoal/40 group-hover:text-red",
                      ].join(" ")}>
                      <ChevronDown open={isOpen} />
                    </span>
                  )}
                </>
              );
              return (
                <li
                  key={item.label}
                  onPointerEnter={() =>
                    hasPanel ? open(item.label) : scheduleClose()
                  }>
                  {isRoute ? (
                    <Link to={item.href} className={linkClass}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={item.href} className={linkClass}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <PillButton as="a" href="#contacto" className="hidden md:inline-flex">
            Solicitar propuesta
          </PillButton>
        </div>
      </div>

      <MegaPanel
        panel={activePanel}
        isOpen={Boolean(activePanel)}
        onPointerEnter={() => openItem && open(openItem)}
        onPointerLeave={scheduleClose}
      />
    </header>
  );
}
