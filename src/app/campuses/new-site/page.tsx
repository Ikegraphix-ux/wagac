import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'New Site — Basic Education | WAG Angels Academy',
};

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.6703848465102!2d-1.6958719259740458!3d6.680848022923898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb9937bce7a9d3%3A0x24b1095c28b40837!2sWAG%20Angel%27s%20Academy%20(New%20Site)!5e0!3m2!1sen!2sgh!4v1792659516235!5m2!1sen!2sgh';

const programmes = [
  { name: 'Lower Primary', classes: 'Basic 1–3', number: '01' },
  { name: 'Upper Primary', classes: 'Basic 4–6', number: '02' },
  { name: 'Junior High School', classes: 'Basic 7–9', number: '03' },
];

const heroImages = [
  {
    src: '/images/newsite.jpg',
    alt: 'WAG Angels Academy New Site campus building',
  },
  {
    src: '/images/GRADUATION PIC.jpeg',
    alt: 'Students and staff at a school celebration',
  },
  { src: '/images/exc.jpg', alt: 'Students on a school outing' },
  { src: '/images/64.jpg', alt: 'Pupils on a school outing' },
];

export default function NewSite() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#064b35] py-14 text-white sm:py-20">
        <HeroSlideshow images={heroImages} />
        <div
          aria-hidden="true"
          className="hero-gradient-motion absolute inset-0"
        />
        <div className="container relative z-10 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow !text-[#c9ed80]">
              New Site · Basic Education
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Growing skills. Building futures.
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-emerald-50/85">
              Our New Site at Atwima Takyiman serves learners from Basic 1
              through Basic 9.
            </p>
            <p className="mt-5 flex gap-2 text-sm">
              <MapPin size={18} className="shrink-0" />
              Atwima Takyiman
            </p>
            <Link
              href="/admissions#enquiry"
              className="btn btn-primary mt-7"
            >
              Ask about admissions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Our programmes"
            title="Basic 1 to Basic 9"
            description="Explore the basic education journey. The groupings below are for easy navigation; contact the school for class placement and current availability."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {programmes.map((programme) => (
              <article
                key={programme.number}
                className="rounded-2xl border border-emerald-950/10 bg-white p-6"
              >
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-full bg-[#eaf5ee] font-black text-[#07583e]">
                  {programme.number}
                </div>
                <h2 className="text-xl font-extrabold">{programme.name}</h2>
                <p className="mt-2 font-bold text-[#e6292e]">
                  {programme.classes}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {programme.name === 'Lower Primary' &&
                    'Build foundational literacy, numeracy and learning habits.'}
                  {programme.name === 'Upper Primary' &&
                    'Strengthen subject knowledge, curiosity and independent learning.'}
                  {programme.name === 'Junior High School' &&
                    'Extend subject learning and prepare for the next stage of education.'}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 rounded-3xl bg-[#f1f7f1] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Learning for the future</p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#064b35]">
                A broad curriculum, practical skills and personal growth
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Across Basic 1 to Basic 9, learners develop skills across
                languages, mathematics, science, technology, creative
                subjects and more. Learning is supported by opportunities to
                build confidence, collaboration and responsibility.
              </p>
            </div>
            <Link href="/academics" className="btn btn-green justify-self-start">
              Explore subjects and activities <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-16 grid items-start gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Find us"
                title="Visit the New Site"
                description="Find WAG Angel's Academy (New Site) at Atwima Takyiman."
              />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=WAG+Angel%27s+Academy+New+Site+Atwima+Takyiman"
                target="_blank"
                rel="noreferrer"
                className="btn btn-green mt-6"
              >
                Get directions <ArrowRight size={16} />
              </a>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-emerald-950/10 bg-white sm:aspect-[16/10]">
              <iframe
                title="Map showing WAG Angels Academy New Site"
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-[#f1f7f1] p-6 sm:p-8">
            <h2 className="text-xl font-extrabold">Speak with our team</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Ask about class placement, admission requirements and the school
              year.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="tel:+233243462861" className="btn btn-green">
                <Phone size={16} /> +233 24 346 2861
              </a>
              <Link href="/admissions#enquiry" className="btn btn-primary">
                Admissions enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
