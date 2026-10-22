import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-[#03452f] text-white">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/wag-angels-crest.jpg"
              alt="WAG Angels Academy crest"
              width={60}
              height={60}
              className="h-[60px] w-[60px] rounded bg-white object-contain"
            />
            <div>
              <p className="font-extrabold tracking-wide">
                WAG ANGELS ACADEMY
              </p>
              <p className="text-xs italic text-emerald-100">
                Leaving No Child Behind
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-50/80">
            Supporting every child’s educational journey from early childhood
            through Basic 9.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Quick Links</h3>
          <div className="grid gap-3 text-sm text-emerald-50/85">
            <Link href="/about">About Us</Link>
            <Link href="/academics">Academics</Link>
            <Link href="/campuses/old-site">Old Site — Early Years</Link>
            <Link href="/campuses/new-site">New Site — Basic 1–9</Link>
            <Link href="/admissions">Admissions</Link>
            <Link href="/admin">Staff Admin</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Contact & Campuses</h3>
          <a
            href="tel:+233243462861"
            className="mb-3 flex items-center gap-2 text-sm"
          >
            <Phone size={16} /> +233 24 346 2861
          </a>
          <p className="mb-3 flex gap-2 text-sm leading-6 text-emerald-50/85">
            <MapPin size={17} className="mt-1 shrink-0" />
            <span>Old Site: Kwadaso-Nsoum, Sofoline, off Complex Road</span>
          </p>
          <p className="flex gap-2 text-sm text-emerald-50/85">
            <MapPin size={17} className="shrink-0" />
            <span>New Site: Atwima Takyiman</span>
          </p>
          <Link
            href="/admissions#enquiry"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-emerald-300 underline-offset-4"
          >
            Ask us a question <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container flex flex-col justify-between gap-2 py-4 text-xs text-emerald-100/75 sm:flex-row">
          <span>
            © {new Date().getFullYear()} WAG Angels Academy. All rights
            reserved.
          </span>
          <span>
            Privacy-conscious by design · School information subject to
            confirmation
          </span>
        </div>
      </div>
    </footer>
  );
}
