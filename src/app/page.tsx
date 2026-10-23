import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Eye,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
} from 'lucide-react';
import { SchoolImage } from '@/components/school-image';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { SectionHeading } from '@/components/section-heading';
import { FirebaseUpdates } from '@/components/firebase-updates';

const values = [
  {
    name: 'Inclusion',
    icon: HeartHandshake,
    desc: 'Every child deserves to belong and thrive.',
  },
  {
    name: 'Excellence',
    icon: Star,
    desc: 'Building strong foundations for lifelong learning.',
  },
  {
    name: 'Integrity',
    icon: ShieldCheck,
    desc: 'Growing in honesty, respect and responsibility.',
  },
  {
    name: 'Learning',
    icon: BookOpen,
    desc: 'Curiosity and confidence in every classroom.',
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#03452f] text-white">
        <HeroSlideshow
          images={[
            { src: '/images/64.jpg', alt: 'Pupils on a school outing' },
            { src: '/images/exc.jpg', alt: 'Students enjoying an outing' },
            {
              src: '/images/GRADUATION PIC.jpeg',
              alt: 'Students and staff at a school celebration',
            },
            {
              src: '/images/newsite.jpg',
              alt: 'WAG Angels Academy New Site campus building',
            },
          ]}
        />
        <div
          aria-hidden="true"
          className="hero-gradient-motion absolute inset-0"
        />
        <div className="container relative z-10 flex min-h-[570px] items-center py-16 sm:py-20 lg:min-h-[620px]">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.15em]">
              <Sparkles size={14} className="text-lime-300" />
              Welcome to WAG Angels Academy
            </p>
            <h1 className="text-4xl font-black leading-[1.06] tracking-[-.045em] sm:text-5xl lg:text-6xl">
              Every Child Matters.
              <br />
              <span className="text-[#c9ed80]">Every Future Counts.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-emerald-50/90 sm:text-lg">
              From early childhood through Basic 9, we are committed to
              supporting every child’s educational journey in a caring and
              encouraging learning environment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="#campuses">
                Explore Our Campuses <ArrowRight size={17} />
              </Link>
              <Link className="btn btn-outline" href="/admissions">
                Enquire About Admission
              </Link>
            </div>
            <p className="mt-7 text-sm font-semibold text-emerald-100">
              Our promise:{' '}
              <span className="italic">“Leaving No Child Behind”</span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-emerald-900/5 bg-white py-16 sm:py-20">
        <div className="container grid gap-8 md:grid-cols-3">
          <article className="rounded-2xl bg-[#f4f8f2] p-6">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#07583e] text-white">
              <Target />
            </div>
            <h2 className="text-xl font-extrabold">Our Mission</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              To provide inclusive, quality and holistic education that
              recognizes each child’s abilities, nurtures their talents and
              builds strong moral values—so no child is left behind.
            </p>
          </article>

          <article className="rounded-2xl bg-[#f4f8f2] p-6">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#07583e] text-white">
              <Eye />
            </div>
            <h2 className="text-xl font-extrabold">Our Vision</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              To become a leading centre of excellence in basic education,
              empowering every child to learn, grow and reach their full
              potential.
            </p>
          </article>

          <article className="rounded-2xl bg-[#f4f8f2] p-6">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#07583e] text-white">
              <Star />
            </div>
            <h2 className="text-xl font-extrabold">Our Core Values</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Inclusion',
                'Excellence',
                'Integrity',
                'Discipline',
                'Respect',
                'Compassion',
              ].map((value) => (
                <span
                  key={value}
                  className="rounded-full bg-[#dcefdc] px-3 py-1.5 text-xs font-bold text-[#07583e]"
                >
                  {value}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Creating a safe, respectful and encouraging place to learn.
            </p>
          </article>
        </div>
      </section>

      <section id="campuses" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Find your campus"
            title="Two Campuses, One Vision"
            description="Choose the campus that matches your child’s stage of learning."
            center
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <CampusCard
              tag="OLD SITE"
              title="Early Years Campus"
              location="Kwadaso-Nsoum, Sofoline, off Complex Road"
              programmes={['Crèche', 'Nursery', 'KG1', 'KG2']}
              imageSrc="/images/dance.jpg"
              imageAlt="Students performing at a school event"
              href="/campuses/old-site"
            />
            <CampusCard
              tag="NEW SITE"
              title="Basic Education Campus"
              location="Atwima Takyiman"
              programmes={['Basic 1–3', 'Basic 4–6', 'Basic 7–9']}
              imageSrc="/images/newsite.jpg"
              imageAlt="WAG Angels Academy New Site campus building"
              href="/campuses/new-site"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#064b35] py-14 text-white">
        <div className="container">
          <SectionHeading
            eyebrow="The WAG difference"
            title="A caring place to learn and grow"
            description="We want children to feel supported, build confidence and develop skills for their next steps."
            light
          />
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ name, icon: Icon, desc }) => (
              <div key={name} className="border-l border-white/20 pl-4">
                <Icon className="mb-4 text-[#c9ed80]" size={27} />
                <h3 className="font-extrabold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/75">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FirebaseUpdates />

      <section className="py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Life at WAG Angels"
              title="Room to discover, learn and shine"
              description="See moments from celebrations, performances and outings across our school community."
            />
            <Link href="/about#gallery" className="btn btn-green mt-6">
              Explore School Life <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SchoolImage
              src="/images/GRADUATION PIC.jpeg"
              alt="Students and staff at a school celebration"
              className="h-40 rounded-2xl sm:h-52"
            />
            <SchoolImage
              src="/images/dance.jpg"
              alt="Students performing at a school event"
              className="mt-7 h-40 rounded-2xl sm:h-52"
            />
            <SchoolImage
              src="/images/exc.jpg"
              alt="WAG Angels students gathered on a school outing"
              className="h-40 rounded-2xl sm:h-52"
            />
            <SchoolImage
              src="/images/64.jpg"
              alt="WAG Angels pupils together outdoors"
              className="-mt-7 h-40 rounded-2xl sm:h-52"
            />
          </div>
        </div>
      </section>

      <section className="px-5 pb-16">
        <div className="container overflow-hidden rounded-[2rem] bg-[#eaf5ee]">
          <div className="grid items-center gap-6 p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-3">Admissions enquiries</p>
              <h2 className="section-title">
                Let’s take the next step together.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Contact our team to ask about the right campus and class for
                your child.
              </p>
            </div>
            <Link
              href="/admissions#enquiry"
              className="btn btn-primary justify-self-start"
            >
              Make an Enquiry <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CampusCard({
  tag,
  title,
  location,
  programmes,
  imageSrc,
  imageAlt,
  href,
}: {
  tag: string;
  title: string;
  location: string;
  programmes: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <SchoolImage
        src={imageSrc}
        alt={imageAlt}
        className="h-52 w-full sm:h-60"
      />
      <div className="p-6 sm:p-7">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-black tracking-[.14em] text-white ${
            tag === 'OLD SITE' ? 'bg-[#07583e]' : 'bg-[#e6292e]'
          }`}
        >
          {tag}
        </span>
        <h3 className="mt-4 text-2xl font-extrabold text-[#064b35]">
          {title}
        </h3>
        <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-600">
          <MapPin size={17} className="mt-1 shrink-0 text-[#e6292e]" />
          {location}
        </p>
        <p className="mb-2 mt-5 text-xs font-extrabold uppercase tracking-wider text-[#07583e]">
          Programmes
        </p>
        <div className="flex flex-wrap gap-2">
          {programmes.map((programme) => (
            <span
              key={programme}
              className="rounded-full bg-[#eaf5ee] px-3 py-1.5 text-xs font-bold text-[#07583e]"
            >
              {programme}
            </span>
          ))}
        </div>
        <Link href={href} className="btn btn-green mt-6">
          View Campus Details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
