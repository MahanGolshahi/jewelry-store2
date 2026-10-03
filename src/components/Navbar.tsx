"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات" },
  { href: "/portfolio", label: "نمونه کارها" },
  { href: "/order", label: "ثبت سفارش" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/about", label: "درباره ما" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1a3a2a] shadow-2xl shadow-black/30"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 border-[#c9a84c] bg-[#1a3a2a]">
            💎
          </div>
          <div className="text-right">
            <div className="text-[#f0d080] font-bold text-lg leading-tight">طلافروشی زرین</div>
            <div className="text-[#c9a84c] text-xs opacity-80">Zarrin Gold</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 text-sm text-gray-200 hover:text-[#f0d080] transition-colors duration-200 rounded-lg hover:bg-white/10 font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+982112345678" className="flex items-center gap-2 text-[#f0d080] text-sm font-medium hover:text-white transition-colors">
            <span>📞</span>
            <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
          </a>
          <Link
            href="/order"
            className="px-5 py-2 rounded-full text-sm font-bold text-[#1a3a2a] transition-all duration-300 hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)" }}
          >
            ثبت سفارش
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="منو"
        >
          <div className="w-6 h-0.5 bg-[#f0d080] mb-1.5 transition-all duration-300" style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "" }}></div>
          <div className="w-6 h-0.5 bg-[#f0d080] mb-1.5 transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }}></div>
          <div className="w-6 h-0.5 bg-[#f0d080] transition-all duration-300" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "" }}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a3a2a] border-t border-[#c9a84c]/30 px-4 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-gray-200 hover:text-[#f0d080] hover:bg-white/10 rounded-lg transition-colors font-medium text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[#c9a84c]/30 flex flex-col gap-3">
            <a href="tel:+982112345678" className="flex items-center gap-2 text-[#f0d080] text-sm font-medium">
              <span>📞</span>
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
            <Link
              href="/order"
              className="block text-center px-5 py-2.5 rounded-full text-sm font-bold text-[#1a3a2a]"
              style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)" }}
              onClick={() => setMenuOpen(false)}
            >
              ثبت سفارش آنلاین
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
