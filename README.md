This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## DB

Database setup for local development:

1. cd .\agora-mentorship\
2. run command: docker-compose up docker-compose-local.yml
3. run command: yarn prisma migrate dev --name init (where `init` can be any name for the migration)

Seeding:

1. cd .\agora-mentorship\
2. add/alter data in prisma/data.json as required, maintaining the existing format.
3. run command: npx prisma db seed --preview-feature
