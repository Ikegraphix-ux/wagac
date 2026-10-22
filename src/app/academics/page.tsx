import type { Metadata } from 'next';
import { BookOpen, Brush, Dumbbell, Microscope, Music2, Users } from 'lucide-react';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { SchoolImage } from '@/components/school-image';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'Academics | WAG Angels Academy',
  description:
    'Explore the NaCCA-aligned curriculum and enrichment activities at WAG Angels Academy.',
};

const primarySubjects = [
  'English Language',
  'Ghanaian Language',
  'Mathematics',
  'Science',
  'Our World Our People',
  'Computing',
  'Religious and Moral Education',
  'Creative Arts',
  'Physical Education',
  'French',
];

const juniorHighSubjects = [
  'English Language',
  'Ghanaian Language',
  'French',
  'Mathematics',
  'Science',
  'Social Studies',
  'Computing',
  'Career Technology',
  'Creative Arts and Design',
  'Religious and Moral Education',
  'Physical Education',
];

const activities = [
  {
    title: 'Sports and movement',
    description:
      'Games, fitness and team activities that encourage healthy habits, confidence and cooperation.',
    icon: Dumbbell,
  },
  {
    title: 'Music and performance',
    description:
      'Opportunities to explore rhythm, singing, dance, drama and performance.',
    icon: Music2,
  },
  {
    title: 'Creative arts',
    description:
      'Drawing, painting, crafts and design projects that help learners express their ideas.',
    icon: Brush,
  },
  {
    title: 'Reading and literacy',
    description:
      'Reading practice, storytelling and age-appropriate activities that build a love of books.',
    icon: BookOpen,
  },
  {
    title: 'STEM exploration',
    description:
      'Practical science, problem-solving and simple technology activities for curious learners.',
    icon: Microscope,
  },
  {
    title: 'Culture and community',
    description:
      'Cultural celebrations, leadership opportunities, school events and community experiences.',
    icon: Users,
  },
];

function SubjectGroup({
  title,
  description,
  subjects,
}: {
  title: string;
  description: string;
  subjects: string[];
}) {
  return (
    <article className="rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8">
      <h3 className="text-2xl font-extrabold text-[#064b35]">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{description}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {subjects.map((subject) => (
          <li
            key={subject}
            className="flex items-start gap-3 rounded-xl bg-[#f4f8f2] px-4 py-3 text-sm font-semibold text-[#17342a]"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e6292e]"
            />
            {subject}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Academics() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#064b35] py-16 text-white sm:py-24">
        <HeroSlideshow
          images={[
            {
              src: '/images/GRADUATION PIC.jpeg',
              alt: 'Students and staff at a school celebration',
            },
            {
              src: '/images/dance.jpg',
              alt: 'Students performing at a school event',
            },
            { src: '/images/64.jpg', alt: 'Pupils on a school outing' },
          ]}
        />
        <div
          aria-hidden="true"
          className="hero-gradient-motion absolute inset-0"
        />
        <div className="container relative z-10">
          <p className="eyebrow !text-[#c9ed80]">Learning at WAG Angels</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Strong foundations for every learner.
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-emerald-50/90">
            Our academic journey supports children from their early years
            through Basic 9, building knowledge, confidence and a lifelong
            curiosity for learning.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Our curriculum"
            title="Learning aligned with NaCCA"
            description="Our basic-school subject areas follow Ghana’s National Council for Curriculum and Assessment (NaCCA) standards-based curriculum. The learning journey progresses from foundational skills in primary to the Common Core Programme at Junior High School."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <SubjectGroup
              title="Primary · Basic 1–6"
              description="Learners build strong foundations across languages, numeracy, science, creative and practical learning."
              subjects={primarySubjects}
            />
            <SubjectGroup
              title="Junior High · Basic 7–9"
              description="The Common Core Programme broadens subject learning and develops skills for further education and everyday life."
              subjects={juniorHighSubjects}
            />
          </div>

          <div className="mt-6 rounded-2xl bg-[#eaf5ee] p-5 text-sm leading-6 text-slate-700">
            <strong className="text-[#064b35]">For families:</strong> Subject
            options and language availability may vary by level and school
            year. Please contact the school to confirm the current timetable
            and programme for your child.
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8f2] py-16 sm:py-20">
        <div className="container grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Early learning"
              title="A caring start for young learners"
              description="In the early years, children learn through guided play, conversation, stories and hands-on discovery. Activities build early language and literacy, numeracy, social skills, creativity and physical development."
            />
            <p className="mt-5 leading-7 text-slate-600">
              As children move into primary school, these foundations support
              their growing confidence in reading, writing, mathematics and
              exploring the world around them.
            </p>
          </div>
          <SchoolImage
            src="/images/GRADUATION PIC.jpeg"
            alt="Children and teachers celebrating together at school"
            className="h-64 rounded-3xl sm:h-80"
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Beyond the classroom"
            title="Enrichment and extracurricular activities"
            description="Learning also happens through creativity, movement, teamwork and connection with our community."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-emerald-950/10 bg-white p-6"
              >
                <Icon className="mb-4 text-[#07583e]" size={26} />
                <h3 className="text-lg font-extrabold text-[#064b35]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-500">
            Activities and clubs are subject to the school calendar, age group
            and current availability. Please ask the school which activities
            are running this term.
          </p>
        </div>
      </section>

      <section className="bg-[#064b35] py-12 text-white">
        <div className="container grid items-center gap-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow !text-[#c9ed80]">Plan the next step</p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Find the right learning journey for your child.
            </h2>
          </div>
          <a href="/admissions#enquiry" className="btn btn-primary justify-self-start">
            Ask about admissions
          </a>
        </div>
      </section>
    </main>
  );
}
