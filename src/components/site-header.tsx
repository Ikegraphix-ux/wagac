'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/academics', label: 'Academics' },
  { href: '/campuses/old-site', label: 'Old Site' },
  { href: '/campuses/new-site', label: 'New Site' },
  { href: '/admissions', label: 'Admissions' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#03452f] text-xs text-white">
        <div className="container flex min-h-9 items-center justify-between gap-3">
          <a
            className="inline-flex items-center gap-2 py-2 font-semibold"
            href="tel:+233243462861"
          >
            <Phone size={13} /> +233 24 346 2861
          </a>
          <span className="hidden tracking-wide sm:block">
            Quality Education · Discipline · Excellence · Integrity
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-white/95 backdrop-blur">
        <div className="container flex min-h-[82px] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/wag-angels-crest.jpg"
              alt="WAG Angels Academy crest — Leaving No Child Behind"
              width={68}
              height={68}
              className="h-[58px] w-[58px] shrink-0 object-contain"
              priority
            />
            <span className="min-w-0">
              <span className="block text-sm font-black tracking-wide text-[#064b35] sm:text-base">
                WAG ANGELS ACADEMY
              </span>
              <span className="mt-1 block text-[11px] italic text-gray-600">
                Leaving No Child Behind
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 transition hover:text-[#e6292e]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admissions#enquiry"
              className="btn btn-primary !px-5 !py-3"
            >
              Enquire Now <span aria-hidden="true">→</span>
            </Link>
          </nav>

          <button
            className="focus-ring rounded-lg p-2 text-[#07583e] lg:hidden"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-gray-100 bg-white px-5 py-3 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-gray-100 py-3 text-sm font-semibold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admissions#enquiry"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-4 w-full"
            >
              Enquire Now
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
