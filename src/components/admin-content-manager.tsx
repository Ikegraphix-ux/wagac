'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  type DocumentData,
  type Firestore,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  type FirebaseStorage,
} from 'firebase/storage';
import { auth } from '@/lib/firebase';

const collections = [
  { id: 'public_content', label: 'Pages & content', editable: true },
  { id: 'campuses', label: 'Campuses', editable: true },
  { id: 'news', label: 'News', editable: true },
  { id: 'events', label: 'Events', editable: true },
  { id: 'gallery', label: 'Gallery', editable: true },
  { id: 'enquiries', label: 'Admissions enquiries', editable: false },
] as const;

type CollectionId = (typeof collections)[number]['id'];
type Entry = { id: string; data: DocumentData };

const initialValues: Record<CollectionId, DocumentData> = {
  public_content: { title: '', body: '', published: false },
  campuses: { name: '', address: '', programmes: [], published: true },
  news: { title: '', summary: '', body: '', published: false },
  events: { title: '', date: '', description: '', published: false },
  gallery: { title: '', imageUrl: '', published: false },
  enquiries: {},
};

function serializeFirestoreValue(value: unknown): unknown {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(serializeFirestoreValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        serializeFirestoreValue(entry),
      ]),
    );
  }
  return value;
}

function toJson(value: DocumentData): string {
  return JSON.stringify(serializeFirestoreValue(value), null, 2);
}

function titleFor(entry: Entry): string {
  for (const key of ['title', 'name', 'parentName']) {
    if (typeof entry.data[key] === 'string' && entry.data[key].trim()) {
      return entry.data[key];
    }
  }
  return entry.id;
}

export function AdminContentManager({
  db,
  storage,
}: {
  db: Firestore | null;
  storage: FirebaseStorage | null;
}) {
  const [collectionId, setCollectionId] =
    useState<CollectionId>('public_content');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editor, setEditor] = useState(() =>
    JSON.stringify(initialValues.public_content, null, 2),
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const activeCollection = collections.find(
    (item) => item.id === collectionId,
  );

  useEffect(() => {
    if (!db) {
      setError('Firestore is not available. Check the Firebase configuration.');
      return;
    }
    let cancelled = false;
    setBusy(true);
    setError('');
    setNotice('');

    getDocs(query(collection(db, collectionId), limit(100)))
      .then((snapshot) => {
        if (!cancelled) {
          setEntries(
            snapshot.docs.map((snapshotEntry) => ({
              id: snapshotEntry.id,
              data: snapshotEntry.data(),
            })),
          );
        }
      })
      .catch((loadError: unknown) => {
        console.error(`Could not load the ${collectionId} collection.`, loadError);
        if (!cancelled) {
          setError('Could not load this collection. Check the deployed rules and try again.');
        }
      })
      .finally(() => {
        if (!cancelled) setBusy(false);
      });

    return () => {
      cancelled = true;
    };
  }, [collectionId, db, refreshKey]);

  function startNewEntry() {
    setSelectedId(null);
    setEditor(JSON.stringify(initialValues[collectionId], null, 2));
    setError('');
    setNotice('');
  }

  function selectEntry(entry: Entry) {
    setSelectedId(entry.id);
    setEditor(toJson(entry.data));
    setError('');
    setNotice('');
  }

  function parseEditor(): DocumentData | null {
    try {
      const parsed: unknown = JSON.parse(editor);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        setError('The editor must contain a JSON object.');
        return null;
      }
      return parsed as DocumentData;
    } catch {
      setError('The editor contains invalid JSON. Correct it before saving or uploading.');
      return null;
    }
  }

  async function saveEntry() {
    if (!db || !activeCollection?.editable) return;
    const data = parseEditor();
    if (!data) return;

    setBusy(true);
    setError('');
    setNotice('');
    try {
      const entryRef = selectedId
        ? doc(db, collectionId, selectedId)
        : doc(collection(db, collectionId));
      await setDoc(entryRef, {
        ...data,
        ...(!selectedId && { createdAt: serverTimestamp() }),
        updatedAt: serverTimestamp(),
      });
      setSelectedId(entryRef.id);
      setNotice('Changes saved.');
      setRefreshKey((key) => key + 1);
    } catch (saveError) {
      console.error(`Could not save to the ${collectionId} collection.`, saveError);
      setError('Could not save changes. Check your admin access and try again.');
    } finally {
      setBusy(false);
    }
  }

  async function removeEntry() {
    if (!db || !selectedId || !activeCollection?.editable) return;
    if (!window.confirm('Delete this record permanently?')) return;

    setBusy(true);
    setError('');
    setNotice('');
    try {
      await deleteDoc(doc(db, collectionId, selectedId));
      setSelectedId(null);
      setEditor(JSON.stringify(initialValues[collectionId], null, 2));
      setNotice('Record deleted.');
      setRefreshKey((key) => key + 1);
    } catch (deleteError) {
      console.error(`Could not delete from the ${collectionId} collection.`, deleteError);
      setError('Could not delete this record. Check your admin access and try again.');
    } finally {
      setBusy(false);
    }
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!storage || !auth?.currentUser) {
      setError('Firebase Storage is not available for this admin session.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Choose a JPEG, PNG, or WebP image.');
      return;
    }
    if (file.size >= 5 * 1024 * 1024) {
      setError('Choose an image smaller than 5 MB.');
      return;
    }
    const data = parseEditor();
    if (!data) return;

    setUploading(true);
    setError('');
    setNotice('');
    try {
      const safeName = file.name.replace(/[^\w.-]/g, '_');
      const imageRef = ref(
        storage,
        `school-images/${auth.currentUser.uid}/${crypto.randomUUID()}-${safeName}`,
      );
      await uploadBytes(imageRef, file, { contentType: file.type });
      const imageUrl = await getDownloadURL(imageRef);
      setEditor(JSON.stringify({ ...data, imageUrl }, null, 2));
      setNotice('Image uploaded. Save the record to publish its URL.');
    } catch (uploadError) {
      console.error('Could not upload the school image.', uploadError);
      setError('Could not upload this image. Check the Storage rules and try again.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-emerald-950/10 bg-white p-5 sm:p-6">
      <div>
        <p className="eyebrow">Firebase content</p>
        <h2 className="mt-2 text-2xl font-black">Content management</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Manage published website content and review admissions enquiries. Records are
          JSON documents; set <code>published</code> to <code>true</code> to show news,
          events, or gallery items on the homepage.
        </p>
      </div>

      <label className="mt-5 block max-w-sm text-sm font-bold">
        Collection
        <select
          value={collectionId}
          onChange={(event) => {
            const nextCollection = event.target.value as CollectionId;
            setCollectionId(nextCollection);
            setSelectedId(null);
            setEditor(JSON.stringify(initialValues[nextCollection], null, 2));
            setError('');
            setNotice('');
          }}
          className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal"
        >
          {collections.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">
          {notice}
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-extrabold">Records (up to 100)</h3>
            {activeCollection?.editable && (
              <button
                type="button"
                onClick={startNewEntry}
                className="btn btn-green !px-4 !py-2 text-xs"
              >
                New record
              </button>
            )}
          </div>
          {busy && <p className="mt-3 text-sm text-slate-500">Loading records…</p>}
          {!busy && entries.length === 0 && (
            <p className="mt-3 text-sm text-slate-500">No records in this collection yet.</p>
          )}
          <ul className="mt-3 space-y-2">
            {entries.map((entry) => (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (activeCollection?.editable) selectEntry(entry);
                    else setSelectedId(entry.id);
                  }}
                  aria-pressed={selectedId === entry.id}
                  className="w-full rounded-xl border border-slate-200 p-3 text-left transition hover:border-[#07583e] aria-pressed:border-[#07583e] aria-pressed:bg-[#eaf5ee]"
                >
                  <span className="block truncate text-sm font-bold">
                    {titleFor(entry)}
                  </span>
                  <span className="mt-1 block truncate text-xs text-slate-500">
                    {entry.id}
                  </span>
                </button>
                {!activeCollection?.editable && selectedId === entry.id && (
                  <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs leading-5">
                    {toJson(entry.data)}
                  </pre>
                )}
              </li>
            ))}
          </ul>
        </div>

        {activeCollection?.editable ? (
          <div>
            <h3 className="font-extrabold">
              {selectedId ? `Edit ${selectedId}` : 'New record'}
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Use valid JSON. Recommended fields depend on the collection; news, events,
              and gallery records need <code>published: true</code> to appear publicly.
            </p>
            <label className="sr-only" htmlFor="content-json">
              Content record JSON
            </label>
            <textarea
              id="content-json"
              value={editor}
              onChange={(event) => setEditor(event.target.value)}
              spellCheck={false}
              rows={18}
              className="mt-3 block w-full rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-5 text-slate-50 outline-none focus:border-[#07583e]"
            />
            {collectionId === 'gallery' && (
              <label className="mt-3 block text-sm font-bold">
                Upload a school image (JPEG, PNG, WebP; under 5 MB)
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={uploading}
                  onChange={uploadImage}
                  className="mt-2 block w-full rounded-xl border border-slate-200 p-3 text-sm font-normal"
                />
              </label>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={busy || uploading}
                onClick={saveEntry}
                className="btn btn-green disabled:opacity-60"
              >
                {busy ? 'Saving…' : 'Save record'}
              </button>
              {selectedId && (
                <button
                  type="button"
                  disabled={busy || uploading}
                  onClick={removeEntry}
                  className="btn border border-red-200 text-red-700 disabled:opacity-60"
                >
                  Delete record
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-[#f7faf6] p-4 text-sm leading-6 text-slate-600">
            Admissions enquiries are read-only here. Handle family contact details
            according to the school’s privacy and retention policies.
          </div>
        )}
      </div>
    </section>
  );
}
