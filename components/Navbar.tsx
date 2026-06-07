"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, type MouseEvent } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#services", label: "Services" },
  { href: "/#classes", label: "Live Classes" },
  { href: "/#about", label: "About me" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const scrollToSection = (href: string) => {
    if (!href.startsWith("/#") || window.location.pathname !== "/") return false;

    const target = document.getElementById(href.slice(2));
    if (!target) return false;

    const navOffset = 86;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
    return true;
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (scrollToSection(href)) {
      event.preventDefault();
    }
    closeMenu();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <nav
        className="mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_auto_auto] items-center gap-3 px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-5"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="focus-ring inline-flex items-center gap-3 text-black"
          aria-label="Looks By Manish Kachru home"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/12 bg-black font-sans text-[11px] font-semibold tracking-[-0.04em] text-white"
          >
            MK
          </span>
          <span className="font-logo text-[12px] font-normal uppercase leading-none tracking-[0.08em] sm:text-[14px]">
            LOOKSBYMANISH KACHRU .
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-8 lg:flex">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="focus-ring group relative font-sans text-[12px] font-medium leading-none tracking-[-0.01em] text-[#666666] transition-colors duration-200 hover:text-black"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="justify-self-end"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <Link
            href="/bridals#booking"
            onClick={closeMenu}
            className="focus-ring inline-flex rounded-[5px] bg-black px-4 py-3 font-sans text-[12px] font-medium leading-none text-white transition-colors duration-200 hover:bg-[#262626] sm:text-[14px]"
          >
            Book Your Session
          </Link>
        </motion.div>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-black/12 text-black transition-colors hover:bg-black/[0.04] lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <div className="mx-auto grid w-full max-w-[1200px] gap-1 px-5 py-4 sm:px-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="focus-ring px-1 py-3 font-sans text-[15px] font-medium text-black"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
