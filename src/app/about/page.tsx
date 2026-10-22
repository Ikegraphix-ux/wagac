import type { Metadata } from 'next';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { SchoolImage } from '@/components/school-image';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'About Us | WAG Angels Academy',
};

const galleryImages = [
  {
    src: '/images/GRADUATION PIC.jpeg',
    alt: 'Students and staff at a school celebration',
    label: 'School celebration',
  },
  {
    src: '/images/exc.jpg',
    alt: 'WAG Angels students on a school outing',
    label: 'School outing',
  },
  {
    src: '/images/64.jpg',
    alt: 'WAG Angels pupils gathered outdoors',
    label: 'Pupils outdoors',
  },
  {
    src: '/images/LOGO.jpg',
    alt: 'Pupils in uniform taking part in a school parade',
    label: 'School parade',
  },
];

export default function About() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#064b35] py-14 text-white sm:py-20">
        <HeroSlideshow
          images={[
            { src: '/images/GRADUATION PIC.jpeg', alt: 'School celebration' },
            { src: '/images/exc.jpg', alt: 'Students on a school outing' },
            { src: '/images/64.jpg', alt: 'Pupils outdoors together' },
          ]}
        />
        <div aria-hidden="true" className="hero-gradient-motion absolute inset-0" />
        <div className="container relative z-10">
          <div>
            <p className="eyebrow !text-[#c9ed80]">About WAG Angels Academy</p>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl">
              Leaving no child behind.
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-emerald-50/85">
              WAG Angels Academy supports children from early childhood
              through Basic 9 across two campuses in Ghana.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <SchoolImage
            src="/images/HAED.jpeg"
            alt="Portrait of the WAG Angels Academy proprietress"
            className="h-[320px] rounded-3xl sm:h-[420px]"
          />
          <div>
            <p className="eyebrow">A message from our proprietress</p>
            <h2 className="section-title mt-3">
              Every child deserves the chance to shine.
            </h2>
            <blockquote className="mt-6 border-l-4 border-[#e6292e] pl-5 text-lg font-medium leading-8 text-[#17342a]">
              “At WAG Angels Academy, we believe every child has unique
              potential. Our promise is to nurture that potential through
              caring guidance, quality learning and a community where every
              child is valued.”
            </blockquote>
            <p className="mt-5 leading-7 text-slate-600">
              We are grateful to the families who trust us with their
              children’s growth. Together, we can help every learner build
              confidence, discover their strengths and take their next steps
              with purpose.
            </p>
            <p className="mt-6 font-extrabold text-[#064b35]">
              The Proprietress
              <span className="mt-1 block text-sm font-medium text-slate-500">
                WAG Angels Academy
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] py-16">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="A school with a child-centred promise"
              description="The school crest carries the year 2012 and the motto ‘Leaving No Child Behind’. The school’s detailed history, milestones and achievements should be added after confirmation by management."
            />
            <p className="mt-5 leading-7 text-slate-600">
              WAG Angels Academy serves families through its Old Site at
              Kwadaso-Nsoum, Sofoline, off Complex Road, and its New Site at
              Atwima Takyiman.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SchoolImage
              src="/images/GRADUATION PIC.jpeg"
              alt="Students and staff celebrating together at school"
              className="h-56 rounded-2xl"
            />
            <SchoolImage
              src="/images/dance.jpg"
              alt="Students performing at a school event"
              className="h-56 rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#f1f7f1] py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Our community"
            title="School life gallery"
            description="A glimpse of the celebrations, outings and activities that bring our school community together."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.map(({ src, alt, label }) => (
              <SchoolImage
                key={label}
                src={src}
                alt={alt}
                className="h-40 rounded-xl sm:h-52"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
