<p align="center">
  <a href="https://thonlabs.io?utm_source=github&utm_medium=clerk_javascript" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://thonlabs.io/thon-labs-logo-dark.png">
      <img src="https://thonlabs.io/thon-labs-logo-light.png" height="24">
    </picture>
  </a>
  <br />
</p>
<h1 align="center">
  ThonLabs - Next.js Integration Library
</h1>
<p align="center">
  <strong>
    ThonLabs is an all-in-one platform that
    establishes the foundation for any SaaS product, allowing founders and
    software engineers to focus on what truly matters: their own product
    development.
  </strong>
</p>
<p align="center">
  <strong>
    Create an account at <a href="https://thonlabs.io">thonlabs.io</a> to get started.
  </strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@thonlabs/nextjs">
    <img src="https://img.shields.io/npm/v/@thonlabs/nextjs" alt="npm version">
  </a>
  <a href="https://github.com/thon-labs/thonlabs-nextjs/blob/main/license.md">
    <img src="https://img.shields.io/github/license/thon-labs/thonlabs-nextjs" alt="npm license">
  </a>
</p>

## Getting Started

Integrating with ThonLabs is straightforward and efficient. Simply follow the steps below to begin your seamless integration journey. With six steps you will have a complete user management and authentication system.

| ThonLabs is fully compatible with Next.js 13, 14 and 15. Previous versions are not supported yet. |
| ------------------------------------------------------------------------------------------------- |

### Create an account and project

Go to [thonlabs.io](https://thonlabs.io) and create your account. Then, initialize a new project, ThonLabs automatically will provide you a "Development" environment, together with all necessary credentials.

### Install the library

Open you Next.js project and install the library, choose your preferred package manager.

```bash
npm install @thonlabs/nextjs
# or
yarn add @thonlabs/nextjs
# or
pnpm add @thonlabs/nextjs
```

### Using the library

**Before start: if you're using Next.js 13 or 14, all the imports should use the `v14` path, e.g.: `@thonlabs/nextjs/v14'`.**

#### Step 1: Setup the environment

Go to your desired environment at [ThonLabs Settings page](https://app.thonlabs.io) and copy the `Environment ID`, `Public Key` and `Base URL`.

#### Step 2: Wrap your app

Go to the root `layout.tsx` and wrap your app with the `ThonLabsProvider` component.

Import the `ThonLabsWrapper` component:

For v15:

```tsx
import { ThonLabsWrapper } from '@thonlabs/nextjs';
```

For v13 and v14:

```tsx
import { ThonLabsWrapper } from '@thonlabs/nextjs/v14';
```

Wrap your app with the `ThonLabsProvider` component:

```tsx
async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <ThonLabsWrapper
          environmentId="<your-environment-id>"
          publicKey="<your-public-key>"
          authDomain="<your-auth-domain>"
        >
          {children}
        </ThonLabsWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
```

#### Step 3: Setup the API routes

Create an `api` folder inside `app` folder.

Inside `api` folder, create a folder structure `/auth/[...thonlabs]` and create a `route.ts` with the following content:

For v15:

```tsx
export * from '@thonlabs/nextjs/api';
```

For v13 and v14:

```tsx
export * from '@thonlabs/nextjs/v14/api';
```

#### Step 4: Setup the Auth routes

Inside `app` folder, create a folder structure `/auth/[...thonlabs]` and create a `page.tsx` with the following content:

For v15:

```tsx
import { ThonLabsAuthPage } from '@thonlabs/nextjs';
export default ThonLabsAuthPage;
```

For v13 and v14:

```tsx
import { ThonLabsAuthPage } from '@thonlabs/nextjs/v14';
export default ThonLabsAuthPage;
```

#### Step 6: Middleware

The middleware validates the session and redirects the user to login page if necessary. You can bypass public routes.

Sibling to the `app` folder, create a `middleware.ts`.

Start importing the validation functions:

For v15:

```tsx
import {
  validateSession,
  redirectToLogin,
  thonLabsConfig,
} from '@thonlabs/nextjs/server';
```

For v13 and v14:

```tsx
import {
  validateSession,
  redirectToLogin,
  thonLabsConfig,
} from '@thonlabs/nextjs/v14/server';
```

Then update the `middleware.ts` with the following content:

```tsx
export async function middleware(req: NextRequest): Promise<NextResponse> {
  const redirect = await validateSession(req);
  if (redirect) {
    return redirectToLogin(redirect);
  }

  return NextResponse.next(thonLabsConfig(req));
}
```

**Optional:** you can bypass routes by passing an array of paths to the `validateSession` function, e.g.:

```tsx
const redirect = await validateSession(req, [
  '/public-route',
  '/public-route-2',
  '^(?!/admin)' // All pages excluding admin
]);
```
