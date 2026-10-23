'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { SectionHeading } from '@/components/section-heading';
import { db } from '@/lib/firebase';

export default function Admissions() {
  const [sent, setSent] = useState(false);
  const [campus, setCampus] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [className, setClassName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    if (!db) {
      const body = `Admissions enquiry
Parent/Guardian: ${name}
Phone: ${phone}
Campus: ${campus}
Class: ${className}
Message: ${message}`;

      window.location.href = `mailto:?subject=${encodeURIComponent(
        'WAG Angels Academy admissions enquiry',
      )}&body=${encodeURIComponent(body)}`;
      setSent(true);
      return;
    }

    setBusy(true);
    try {
      await addDoc(collection(db, 'enquiries'), {
        name: name.trim(),
        phone: phone.trim(),
        campus,
        className: className.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setSent(true);
      setName('');
      setPhone('');
      setCampus('');
      setClassName('');
      setMessage('');
    } catch (submitError) {
      console.error('Could not save the admissions enquiry.', submitError);
      setError(
        'We could not submit your enquiry right now. Please try again or call the school directly.',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#064b35] py-14 text-white sm:py-20">
        <HeroSlideshow
          images={[
            {
              src: '/images/GRADUATION PIC.jpeg',
              alt: 'Students and staff at a school celebration',
            },
            { src: '/images/64.jpg', alt: 'Pupils outdoors together' },
            { src: '/images/exc.jpg', alt: 'Students on a school outing' },
          ]}
        />
        <div
          aria-hidden="true"
          className="hero-gradient-motion absolute inset-0"
        />
        <div className="container relative z-10 max-w-4xl">
          <p className="eyebrow !text-[#c9ed80]">
            Join our school community
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Start your child’s next chapter.
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-emerald-50/85">
            Tell us which campus and class you’re interested in. Our team can
            guide you through the next steps.
          </p>
          <a href="#enquiry" className="btn btn-primary mt-7">
            Make an enquiry <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Admissions"
              title="We’re happy to help"
              description="Contact the school to confirm current vacancies, fees, required documents and admission dates. These details are not published here because they have not yet been verified."
            />
            <a
              href="tel:+233243462861"
              className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-[#eaf5ee] p-4 font-bold text-[#07583e]"
            >
              <Phone size={20} /> +233 24 346 2861
            </a>
            <div className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
              <p>
                <strong className="text-[#17342a]">Old Site:</strong> Crèche,
                Nursery, KG1 and KG2.
              </p>
              <p>
                <strong className="text-[#17342a]">New Site:</strong> Basic 1
                through Basic 9.
              </p>
            </div>
          </div>

          <form
            id="enquiry"
            onSubmit={submit}
            className="scroll-mt-28 rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-2xl font-extrabold">Admissions enquiry</h2>
            <p className="mt-2 text-sm text-slate-500">
              {db
                ? 'Complete the fields below and your enquiry will be stored for the school to review.'
                : 'Complete the fields below. Your email app will open with the enquiry drafted; nothing is stored by this form.'}
            </p>
            {sent && (
              <p role="status" className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-800">
                <CheckCircle2 size={18} />
                {db
                  ? 'Your enquiry has been submitted. The school will contact you soon.'
                  : 'Your email app should open with the enquiry details. Please send the message to the school.'}
              </p>
            )}
            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold">
                Parent / guardian name
                <input
                  required
                  maxLength={100}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#07583e]"
                  placeholder="Your full name"
                />
              </label>
              <label className="text-sm font-bold">
                Phone number
                <input
                  required
                  maxLength={30}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#07583e]"
                  placeholder="e.g. 024 000 0000"
                />
              </label>
              <label className="text-sm font-bold">
                Preferred campus
                <select
                  required
                  value={campus}
                  onChange={(event) => setCampus(event.target.value)}
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-[#07583e]"
                >
                  <option value="">Choose a campus</option>
                  <option>Old Site — Early Years</option>
                  <option>New Site — Basic 1–9</option>
                </select>
              </label>
              <label className="text-sm font-bold">
                Class of interest
                <input
                  required
                  maxLength={100}
                  value={className}
                  onChange={(event) => setClassName(event.target.value)}
                  className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#07583e]"
                  placeholder="e.g. Nursery or Basic 4"
                />
              </label>
            </div>

            <label className="mt-5 block text-sm font-bold">
              Message (optional)
              <textarea
                maxLength={2000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#07583e]"
                placeholder="How can we help?"
              />
            </label>
            <button
              className="btn btn-primary mt-6 disabled:opacity-60"
              type="submit"
              disabled={busy}
            >
              {busy ? 'Submitting…' : db ? 'Submit enquiry' : 'Prepare enquiry'}
              {!busy && <ArrowRight size={16} />}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
