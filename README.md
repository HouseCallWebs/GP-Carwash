# GP Mobile Car Wash & Detail

Marketing site + interactive quote tool for GP Mobile Car Wash & Detail, a mobile
detailing business serving a 35-mile radius around Lincoln, NE.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, Resend (contact +
quote form email delivery).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3060.

## Environment variables

Create `.env.local` with:

```
RESEND_API_KEY=your_resend_api_key
```

Contact and quote form submissions are emailed to `gpmobilecarwash@gmail.com` via
the API routes in `app/api/contact` and `app/api/quote`.

## Deploy

Deployed to Vercel. Set `RESEND_API_KEY` as an environment variable in the Vercel
project settings.
