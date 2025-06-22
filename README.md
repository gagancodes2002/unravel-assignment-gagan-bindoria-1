This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Starting with architecture : 

I am using Feature Sliced Design architecture, in this architecture we are trying to have one flows between the entities
- 1 shared - All shared libraries/api/database/comoponents/utils (Global Things)
- 2 app - As I am using NextJS, so we are going to use the app folder to utilize NextJS's structured route functionality
- 3 features - In our case, we have only one features which is 'rooms', in a real world application it can be products, sales, users etc.
 
Our usage flow would be like this : 
     
     {Shared}
     
      |    |
      v    v

{app}   -->  {features}

## UI Theme 
Used this "https://www.subframe.com/library/theme" to generate a UI theme styles to use with tailwind


<!-- 
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
