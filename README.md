# WAG Angels Academy website starter

A responsive Next.js + React + TypeScript + Tailwind CSS website for WAG Angels Academy. It includes the school crest, mobile navigation, homepage, About and Academics pages, both campus pages with Google Maps, admissions enquiries, and a Firebase-authenticated content dashboard.

## Requirements
- Node.js 20.9+ recommended
- A Firebase project for admin authentication, Firestore, Storage, and Analytics

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The public pages run without Firebase credentials. The admin route will show setup instructions until Firebase is configured.

## Firebase setup
1. Create a Firebase project and register a web app.
2. Enable **Authentication → Email/Password**.
3. Copy the web app configuration into `.env.local` using `.env.example` as the key list. Set `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` to enable Analytics; other Firebase features work without it.
4. Deploy `firestore.rules` and `storage.rules` using the Firebase CLI or console. Configure Firebase App Check before accepting public submissions.
5. Create Firebase accounts only for people trusted with the dashboard and admissions data.
6. Configure backups, monitoring, and a privacy notice before launch. Do not place service-account credentials in this web app or commit `.env.local`.

The admin dashboard is available to **any signed-in Firebase user**, with no custom admin claim required. It provides JSON-based create, edit, and delete screens for `public_content`, `campuses`, `news`, `events`, and `gallery`, supports image uploads to Firebase Storage, and allows read-only review of admissions enquiries. Firestore and Storage rules allow any authenticated account to manage content and read enquiries. **This is broad access:** anyone able to create or obtain a Firebase account may be able to access family enquiry details, edit website content, or upload images. Do not use this configuration if Firebase account creation is open to the public. News, events, and gallery items appear on the homepage only when their `published` field is `true`.

## Admissions form
When Firebase is configured, admissions enquiries are stored in the `enquiries` Firestore collection and are visible to every signed-in Firebase user. Without Firebase configuration, the form retains its email-app fallback. Before production, deploy the Firestore rules, enable App Check, and confirm the school's process for responding to enquiries, data retention, and privacy notices.

## School images
Approved school photos and the academy crest are stored in `public/images/`. Hero areas use a responsive image slideshow with manual controls and reduced-motion support.

## Academics
The Academics page summarizes NaCCA-aligned basic-school subject areas and enrichment activities. Confirm current subject offerings and extracurricular activities with school management, as availability may vary by level and school year.

## Current verified school details in this starter
- Name: WAG Angels Academy
- Motto: Leaving No Child Behind
- Phone: +233 24 346 2861
- Old Site: Kwadaso-Nsoum, Sofoline, off Complex Road — Crèche, Nursery, KG1, KG2
- New Site: Atwima Takyiman — Basic 1 through Basic 9

Mission and vision text is draft website copy and should be approved by school management. Email, opening hours, fees, map coordinates, and social accounts have intentionally not been invented.

## Suggested next steps
- Connect Firestore collections for campuses, pages, news, events, gallery and enquiries.
- Build content editing and image upload forms in admin.
- Add privacy policy, contact email and campus-specific directions after management confirms details.
- Test keyboard navigation, mobile layouts, form abuse protection and security rules before deployment.
