## Next Example App
Example of a Next.js App

## Motivation
Help others to set up a Next.js app quickly without having to go through Next.js' official "Getting Started" documentation

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


## Credits
[Next.js' Getting Started Guide](https://nextjs.org/learn/basics/getting-started)

## License

ISC © [Aneesa Awaludin]()
