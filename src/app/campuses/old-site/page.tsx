import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { SchoolImage } from '@/components/school-image';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'Old Site — Early Years | WAG Angels Academy',
};

const programmes = ['Crèche', 'Nursery', 'KG1', 'KG2'];
const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d291.5299079659546!2d-1.6550250257259347!3d6.703420221344141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb974631ba6e31%3A0xd7dd93be14901a59!2sWAG%20ANGEL%27S%20ACADEMY%20(Old%20Site)!5e0!3m2!1sen!2sgh!4v1792659455333!5m2!1sen!2sgh';

const heroImages = [
  {
    src: '/images/dance.jpg',
    alt: 'Students performing at a school event',
  },
  {
    src: '/images/GRADUATION PIC.jpeg',
    alt: 'Students and staff at a school celebration',
  },
  { src: '/images/64.jpg', alt: 'Pupils on a school outing' },
];

export default function OldSite() {
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
            <p className="eyebrow !text-[#c9ed80]">Old Site · Early Years</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              A warm beginning for every learner.
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-emerald-50/85">
              Our Old Site serves children in their early years, with
              programmes from Crèche through KG2.
            </p>
            <p className="mt-5 flex gap-2 text-sm">
              <MapPin size={18} className="shrink-0" />
              Kwadaso-Nsoum, Sofoline, off Complex Road
            </p>
            <Link
              href="/admissions#enquiry"
              className="btn btn-primary mt-7"
            >
              Ask about admissions <ArrowRight size={16} />
            </Link>
          </div>
          <SchoolImage
            src="/images/dance.jpg"
            alt="Students performing at a school event"
            className="h-64 rounded-3xl sm:h-80"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Our programmes"
            title="Early Years Campus"
            description="Contact the school to discuss your child’s age, readiness and the most suitable programme."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((programme, index) => (
              <article
                key={programme}
                className="rounded-2xl border border-emerald-950/10 bg-white p-5"
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#eaf5ee] font-black text-[#07583e]">
                  0{index + 1}
                </div>
                <h2 className="text-xl font-extrabold">{programme}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Early learning and development programme.
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 rounded-3xl bg-[#f1f7f1] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Learning through discovery</p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#064b35]">
                A strong start for curious young learners
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Early learning builds the foundations children need to grow.
                Through age-appropriate lessons, play, stories and guided
                activities, learners develop communication, early numeracy,
                creativity and confidence.
              </p>
            </div>
            <Link href="/academics" className="btn btn-green justify-self-start">
              Explore our curriculum <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-16 grid items-start gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Find us"
                title="Visit the Old Site"
                description="Find WAG ANGEL'S ACADEMY (Old Site) at Kwadaso-Nsoum, Sofoline, off Complex Road."
              />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=WAG+ANGEL%27S+ACADEMY+Old+Site"
                target="_blank"
                rel="noreferrer"
                className="btn btn-green mt-6"
              >
                Get directions <ArrowRight size={16} />
              </a>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-emerald-950/10 bg-white sm:aspect-[16/10]">
              <iframe
                title="Map showing WAG Angels Academy Old Site"
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-[#f1f7f1] p-6 sm:p-8">
            <h2 className="text-xl font-extrabold">
              Want to visit or ask a question?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Call the school or send an admissions enquiry. Please confirm
              opening hours and visit arrangements with the school before
              travelling.
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
