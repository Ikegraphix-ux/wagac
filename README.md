# WAG Angels Academy website starter

A responsive Next.js + React + TypeScript + Tailwind CSS website for WAG Angels Academy. It includes the school crest, mobile navigation, homepage, About and Academics pages, both campus pages with Google Maps, admissions enquiry page, and a Firebase-authenticated admin entry/dashboard shell.

## Requirements
- Node.js 20.9+ recommended
- A Firebase project for admin authentication and future content management

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The public pages run without Firebase credentials. The admin route will show setup instructions until Firebase is configured.

## Firebase setup before enabling admin
1. Create a Firebase project and register a web app.
2. Enable **Authentication → Email/Password**.
3. Copy the web app configuration into `.env.local` using `.env.example` as the key list.
4. Deploy `firestore.rules` and `storage.rules` using the Firebase CLI or console.
5. Create admin users deliberately and assign the `role: "admin"` custom claim from a trusted server using the Firebase Admin SDK. Never allow users to set their own claims from the browser. Force-refresh their ID token after claims are set.
6. Configure App Check, backups, monitoring, and a privacy notice before launch.

The included admin dashboard is a **starter shell**, not a complete CMS. Its sign-in flow checks a Firebase custom claim, but no content CRUD/upload screens or server-side admin provisioning are implemented yet. Database and Storage rules must be deployed; a client-side role check alone is not security.

## Admissions form
The current form prepares an email using the visitor's local email app. It does not store the submission or send it automatically. Before production, confirm the school's receiving email and connect a validated server-side endpoint or Firestore create flow with abuse protection, retention limits and a privacy notice.

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
