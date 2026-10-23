'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  collection,
  getDocs,
  limit,
  query,
  where,
  type DocumentData,
} from 'firebase/firestore';
import { CalendarDays, Image as ImageIcon, Newspaper } from 'lucide-react';
import { db } from '@/lib/firebase';

type UpdateItem = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  date?: string;
};

type Updates = {
  news: UpdateItem[];
  events: UpdateItem[];
  gallery: UpdateItem[];
};

function toUpdateItem(id: string, data: DocumentData): UpdateItem {
  return {
    id,
    title:
      typeof data.title === 'string'
        ? data.title
        : typeof data.name === 'string'
          ? data.name
          : 'WAG Angels Academy update',
    description:
      typeof data.summary === 'string'
        ? data.summary
        : typeof data.description === 'string'
          ? data.description
          : typeof data.body === 'string'
            ? data.body
            : '',
    imageUrl: typeof data.imageUrl === 'string' ? data.imageUrl : undefined,
    date:
      typeof data.date === 'string'
        ? data.date
        : typeof data.eventDate === 'string'
          ? data.eventDate
          : undefined,
  };
}

async function loadCollection(name: keyof Updates): Promise<UpdateItem[]> {
  if (!db) return [];
  const result = await getDocs(
    query(collection(db, name), where('published', '==', true), limit(4)),
  );
  return result.docs.map((entry) => toUpdateItem(entry.id, entry.data()));
}

export function FirebaseUpdates() {
  const [updates, setUpdates] = useState<Updates>({
    news: [],
    events: [],
    gallery: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!db) return;
    let cancelled = false;

    async function loadUpdates() {
      try {
        const [news, events, gallery] = await Promise.all([
          loadCollection('news'),
          loadCollection('events'),
          loadCollection('gallery'),
        ]);
        if (!cancelled) setUpdates({ news, events, gallery });
      } catch (loadError) {
        console.error('Firebase public updates could not be loaded.', loadError);
        if (!cancelled) {
          setError('School updates are temporarily unavailable.');
        }
      }
    }

    void loadUpdates();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasUpdates =
    updates.news.length > 0 ||
    updates.events.length > 0 ||
    updates.gallery.length > 0;

  if (!hasUpdates && !error) return null;

  return (
    <section className="bg-[#f7faf6] py-16 sm:py-20">
      <div className="container">
        <p className="eyebrow">From our community</p>
        <h2 className="section-title mt-3">News, events and school life</h2>
        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">
            {error}
          </p>
        )}
        {updates.news.length > 0 && (
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <Newspaper size={20} /> News
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {updates.news.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-emerald-950/10 bg-white p-5"
                >
                  <h4 className="font-extrabold">{item.title}</h4>
                  {item.description && (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
        {updates.events.length > 0 && (
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <CalendarDays size={20} /> Events
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {updates.events.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-emerald-950/10 bg-white p-5"
                >
                  {item.date && (
                    <p className="text-xs font-bold uppercase tracking-wide text-[#07583e]">
                      {item.date}
                    </p>
                  )}
                  <h4 className="mt-2 font-extrabold">{item.title}</h4>
                  {item.description && (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
        {updates.gallery.length > 0 && (
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <ImageIcon size={20} /> Gallery
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {updates.gallery.map((item) => (
                <figure key={item.id}>
                  {item.imageUrl ? (
                    <div className="relative h-40 overflow-hidden rounded-2xl bg-white sm:h-52">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid h-40 place-items-center rounded-2xl bg-white text-slate-400 sm:h-52">
                      <ImageIcon aria-hidden="true" />
                    </div>
                  )}
                  <figcaption className="mt-2 text-sm font-bold">
                    {item.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
