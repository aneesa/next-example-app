## Next Example App
Example of a Next.js App

## Motivation
Help others to set up a Next.js app quickly without having to go through Next.js' official "Getting Started" documentation

## Credits
[Next.js' Getting Started Guide](https://nextjs.org/learn/basics/getting-started)

## Next.js Features
- Pages Layout
- Hot Module Replacement (HMR)
- Client-side Navigation

## vs Create React App
- Manually organize Pages Layout
- Manually add Client-side routing

## Setting Up
- Initialize and install React + Next
```
npm init -y
npm install --save react react-dom next
```

- Set up Pages Layout
```
mkdir pages
```

- Add Next's scripts to `package.json`
```
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

- Run app
```
npm run dev
```

- Open your browser at [http://localhost:3000](http://localhost:3000)
- 404 - Page not found
- Error pages are customizable

- Add default page `pages/index.js`
```
const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
);

export default Index;
```

- Default page should hot-reloaded

- Remove `</p>` from the code
- Syntax Error will be displayed - Next.js track errors and display in browser

## Navigating
- Add a new page `pages/about.js`
```
export default function About() {
  return (
    <div>
      <p>This is the about page</p>
    </div>
  );
}
```

- The URL is fixed based on the file name
- Open [http://localhost:3000/about](http://localhost:3000/about)
- We can use `<a />` tag to navigate but the browser will make a request to the server and refresh the page (Test it out to see the difference!)
- To support client-side navigation, use `next/link` to prefetch the page without refreshing

- Update `pages/index.js`
```
import Link from 'next/link';

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

export default Index;
```

- Refresh [http://localhost:3000](http://localhost:3000) to see the navigation link to the about page
- `location.history` is already handled
- `Link` is a Higher Order Component (HOC) which only accepts `href` and some similar props
- Component placed inside `Link` should accept an `onClick` prop

## Shared Components
- Create a component Header `components/Header.js`
```
import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;
```
- We can style using inline CSS

- Let's add `components/Layout.js` and import `Header`
```
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
```

- Use `Layout` in `index.js` and `about.js`
```
import Layout from '../components/Layout';

export default function Index() {
  return (
    <Layout>
      <p>Hello Next.js</p>
    </Layout>
  );
}
```
```
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <p>This is the about page</p>
    </Layout>
  );
}
```
- Refresh [http://localhost:3000](http://localhost:3000) to see the layout (Yay!)
- `components` is not a special directory

- Other ways of rendering child components
1. Layout as a Higher Order Component
```
// components/MyLayout.js

import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const withLayout = Page => {
  return () => (
    <div style={layoutStyle}>
      <Header />
      <Page />
    </div>
  );
};

export default withLayout;
```
```
// pages/index.js

import withLayout from '../components/MyLayout';

const Page = () => <p>Hello Next.js</p>;

export default withLayout(Page);
```
```
// pages/about.js

import withLayout from '../components/MyLayout';

const Page = () => <p>This is the about page</p>;

export default withLayout(Page);
```

2. Page content as a prop
```
// components/MyLayout.js

import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.content}
  </div>
);

export default Layout;
```
```
// pages/index.js

import Layout from '../components/MyLayout.js';

const indexPageContent = <p>Hello Next.js</p>;

export default function Index() {
  return <Layout content={indexPageContent} />;
}
```
```
// pages/about.js

import Layout from '../components/MyLayout.js';

const aboutPageContent = <p>This is the about page</p>;

export default function About() {
  return <Layout content={aboutPageContent} />;
}
```

## Dynamic Pages
- Update `pages/index.js` to display a list of posts
```
import Layout from '../components/Layout';
import Link from 'next/link';

const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);
export default function Blog() {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink title="Hello Next.js" />
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Deploy apps with Zeit" />
      </ul>
    </Layout>
  );
}
```

- Add `pages/post.js` to get data from `query strings`
```
import { useRouter } from 'next/router';
import Layout from '../components/Layout.js';

const Content = () => {
  const router = useRouter();
  return (
    <>
      <h1>{router.query.title}</h1>
      <p>This is the blog post content.</p>
    </>
  );
};

const Page = () => (
  <Layout>
    <Content />
  </Layout>
);

export default Page;
```
- Use `useRouter` to access the `router` object to get the query

## Clean URLs with Dynamic Routing
- Let's create a dynamic route by adding a new page to `pages/p/[id].js`
```
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function Post() {
  const router = useRouter();

  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  );
}
```

- To make a dynamic route, put brackets `[]` in the page name
- Access the name from the `router` object

- Let's add multiple links to use the dynamic route in `pages/index.js`
```
import Layout from '../components/Layout';
import Link from 'next/link';

const PostLink = props => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

export default function Blog() {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="hello-nextjs" />
        <PostLink id="learn-nextjs" />
        <PostLink id="deploy-nextjs" />
      </ul>
    </Layout>
  );
}
```
- The path of the page is passed in the `href`prop and the URL in the browser is passed in the `as` prop

## License

ISC © [Aneesa Awaludin]()
