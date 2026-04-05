This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local Development

This project can run fully in local mode without Cloudflare services.

1. Use Node 22 LTS when possible for the most stable development experience
2. Copy `.env.example` to `.env.local` if you want custom admin credentials
3. Run `npm install`
4. Run `npm run dev`

If Next.js dev cache gets stuck, run:

```bash
npm run dev:clean
```

Default admin credentials in local mode:

```text
username: admin
password: admin123
```

Local mode stores products and logs in `data/products.json` and `data/logs.json`, and stores uploaded files in `public/uploads`.

## Supabase Setup

The app now supports Supabase as the primary database and storage provider.

1. Create a Supabase project
2. Run the SQL in `supabase-schema.sql` in the Supabase SQL Editor
3. Create a public storage bucket named `product-images` or set `SUPABASE_STORAGE_BUCKET`
4. Add these values to `.env.local`

```text
SUPABASE_URL=...
SUPABASE_SECRET_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_STORAGE_BUCKET=product-images
```

5. Start the app with `npm run dev`
6. Check the data source status at `/api/status/data`

If Supabase is not configured, the app automatically falls back to local file storage.
If Supabase is configured but the schema has not been created yet, the app will report a warning and may fall back to local data until you run `supabase-schema.sql` in the Supabase SQL Editor.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
