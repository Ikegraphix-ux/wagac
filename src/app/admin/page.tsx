'use client';

import { useEffect, useState, type FormEvent } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import {
  CalendarDays,
  FileText,
  Images,
  LockKeyhole,
  LogOut,
  MessageSquareText,
  ShieldCheck,
} from 'lucide-react';
import { AdminContentManager } from '@/components/admin-content-manager';
import { auth, db, firebaseConfigured, storage } from '@/lib/firebase';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [roleChecked, setRoleChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!auth) {
      setRoleChecked(true);
      return;
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setRoleChecked(false);
      if (!currentUser) {
        setIsAdmin(false);
        setRoleChecked(true);
        return;
      }

      void currentUser
        .getIdTokenResult(true)
        .then((token) => {
          setIsAdmin(
            token.claims.role === 'admin' || token.claims.admin === true,
          );
        })
        .catch((tokenError: unknown) => {
          console.error('Could not verify the admin claim.', tokenError);
          setIsAdmin(false);
        })
        .finally(() => setRoleChecked(true));
    });
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth) return;
    setBusy(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (loginError) {
      console.error('Admin sign-in failed.', loginError);
      setError(
        'Sign-in failed. Check your details or ask the system administrator to verify your account.',
      );
    } finally {
      setBusy(false);
    }
  }

  if (!firebaseConfigured) {
    return (
      <main className="min-h-[65vh] px-5 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-amber-200 bg-amber-50 p-7">
          <LockKeyhole className="mb-4 text-amber-800" size={32} />
          <h1 className="text-2xl font-extrabold">Admin setup required</h1>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Firebase credentials are not configured yet. Add the web app values to
            <code> .env.local</code>, enable Email/Password Authentication, set an
            admin custom claim securely, and deploy this project&apos;s Firestore
            and Storage rules before using the dashboard.
          </p>
        </div>
      </main>
    );
  }

  if (!roleChecked) {
    return (
      <main className="grid min-h-[60vh] place-items-center">
        Checking secure session…
      </main>
    );
  }

  if (!user || !isAdmin) {
    return (
      <main className="min-h-[65vh] px-5 py-14">
        <form
          onSubmit={login}
          className="mx-auto max-w-md rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-sm sm:p-9"
        >
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf5ee] text-[#07583e]">
            <ShieldCheck />
          </div>
          <h1 className="text-3xl font-black">Staff admin</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sign in with an authorised school administrator account.
          </p>
          {error && (
            <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <label className="mt-6 block text-sm font-bold">
            Email
            <input
              required
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
            />
          </label>
          <label className="mt-4 block text-sm font-bold">
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"
            />
          </label>
          <button
            disabled={busy}
            className="btn btn-green mt-6 w-full disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in securely'}
          </button>
          {user && !isAdmin && (
            <p className="mt-4 text-sm text-red-700">
              This account does not have the required administrator role. Contact the
              system administrator.
            </p>
          )}
          <p className="mt-5 text-xs leading-5 text-slate-500">
            Access is restricted by Firebase Authentication and admin claims. Do not
            create public administrator accounts.
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-[65vh] bg-[#f7faf6] px-5 py-10">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">WAG Angels Academy</p>
            <h1 className="mt-2 text-3xl font-black">Admin dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">
              Signed in as {user.email}
            </p>
          </div>
          <button
            onClick={() => {
              if (auth) void signOut(auth);
            }}
            className="btn btn-green"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FileText,
              title: 'Pages & content',
              description: 'Manage website content records',
            },
            {
              icon: CalendarDays,
              title: 'News & events',
              description: 'Publish school updates and announcements',
            },
            {
              icon: Images,
              title: 'Gallery',
              description: 'Upload and publish approved school photos',
            },
            {
              icon: MessageSquareText,
              title: 'Enquiries',
              description: 'Review admissions enquiries securely',
            },
          ].map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-emerald-950/10 bg-white p-5"
            >
              <Icon className="mb-4 text-[#07583e]" />
              <h2 className="font-extrabold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <AdminContentManager db={db} storage={storage} />

        <p className="mt-5 text-xs leading-5 text-slate-500">
          Firestore and Storage rules enforce administrator claims independently of
          this page. Handle admissions contact details according to the school&apos;s
          privacy and retention policies.
        </p>
      </div>
    </main>
  );
}
