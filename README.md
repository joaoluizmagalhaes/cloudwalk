# Next.js Project with TailwindCSS, Headless UI, and SWAPI Integration

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and enhanced with several powerful technologies and design practices.

## Enhancements and Technologies

### TailwindCSS

This project utilizes [TailwindCSS](https://tailwindcss.com/) for styling. TailwindCSS is a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center`, and `rotate-90` that can be composed to build any design, directly in your markup.

### Headless UI

For interactive components like dropdowns and comboboxes, we've incorporated [Headless UI](https://headlessui.dev/), a completely unstyled, fully accessible UI component library designed to integrate beautifully with TailwindCSS.

### SWAPI Integration

We leverage the [Star Wars API (SWAPI)](https://swapi.dev/) to fetch data about planets and characters from the Star Wars universe. Given the API's paginated response for planets and people, we implemented functions to fetch all planets initially, and then proceed to fetch characters. The first page of characters is rendered immediately, while the rest are loaded in the background, ensuring a responsive and dynamic user experience.

### Firebase Deployment

The project is deployed on [Firebase](https://firebase.google.com/), providing a fast and secure hosting for the app. Firebase hosting not only offers a simple deployment solution but also serves the app over a secure connection and at a scale.

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
 