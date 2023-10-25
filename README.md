This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Anything you need to know

First, run the development server:

```bash
npm run prisma generate
npm run dev
# or
yarn prisma generate
yarn dev
# or
pnpm run prisma generate
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Tech Stack

* Frontend:
  - JavaScript
  - React
  - Zustand
  - Tailwind

* Backend:
  - Nextjs 13
    
* Databases ORM:
  - MySQL
  - Prisma

* Other:
  - Git
  - GitHub
  - REST API
  - Planetscale provider



## Preview

Orders Page :
![image](https://github.com/vincentarck/equinox-test/assets/73167671/9f1a8a97-08f8-4a89-9306-455d1319c519)

Rent Cars Page
![image](https://github.com/vincentarck/equinox-test/assets/73167671/14d9d201-6550-4715-89f4-728e7cd5268b)

## Feature
* CREATE
  - Orders 
* READ
  - Cars
  - Orders
* UPDATE
  - Cars
* DELETE
  - Cars

## Deploy on Vercel

Vercell: https://equinox-rent-wzm12eo2n-vincentarck.vercel.app/
But the orders and update cars not working during those production, i still trace that problem and can't figuring out why 405 method not allowed in prod api when update and make order. Try in localhost instead

Trying for deploy in other provider but got unknown error, which require me to spend more time which cause i exceed the deadline task
![image](https://github.com/vincentarck/equinox-test/assets/73167671/55c15c68-b2fb-4bb3-82dc-a00b122eea7f)
