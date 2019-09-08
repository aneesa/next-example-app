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
- Dynamic Pages
- Dynamic Routing
- Server Side Rendering
- Styling Components with CSS in JS

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
- The path of the page is passed in the `href` prop and the URL in the browser is passed in the `as` prop

## Fetching Data
- Install `isomorphic-unfetch`. It's a library we can use to fetch data from an API
```
npm install --save isomorphic-unfetch
```

- Create `tv/index.js` with the following content
```
import Layout from '../../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/tv/[id]" as={`/tv/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
```

- `getInitialProps` is a static async function you can add into any page and it works on both server and the client
- We can fetch the API from this function

- Add the new page to the `Header`
```
<Link href="/tv">
  <a style={linkStyle}>TV</a>
</Link>
```

- Now navigate to `TV` and refresh the page
- First time loading/refresh will render the page on the server do you should see the `Show data fetched...` log on the server's terminal
- Since the data has been fetched, it won't be fetched again from the client side

- Add detailed TV Show to `pages/tv/[id].js`
```
import Layout from '../../components/Layout';
import fetch from 'isomorphic-unfetch';

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium} />
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
```

- The `context` object inside `getInitialProps` has the query object we can use to get the id from the dynamic routing
- Now navigate to `TV`, then choose a show
- When we click on `<Link>`, the page transition takes place in the browser, without making a request to the server
- So this time, `Fetched show...` log is displayed on the browser console because the data is fetched from the client side

## Styling Components
- The styling techniques can be categorized into two broad methods
1. Traditional CSS-file-based styling (including SASS, PostCSS etc)
2. CSS in JS styling

- However, we have to take SSR into consideration when styling Next.js because there are a few practical issues to consider with the traditional CSS-file-based styling
- Instead, CSS in JS is recommended
- Next.js is preloaded with `style-jsx` where the CSS rules are scoped - the rules have no impact to anything other than the components, not even child components

- Update `pages/index.js`
```
import Layout from '../components/Layout';
import Link from 'next/link';

function getPosts() {
  return [
    { id: 'hello-nextjs', title: 'Hello Next.js' },
    { id: 'learn-nextjs', title: 'Learn Next.js is awesome' },
    { id: 'deploy-nextjs', title: 'Deploy apps with ZEIT' }
  ];
}

const PostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: 'Arial';
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);

export default function Blog() {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        {getPosts().map(post => (
          <PostLink key={post.id} post={post} />
        ))}
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  );
}
```

- Let's install `react-markdown` for the some global styling example (Check out [Global Selectors](https://github.com/zeit/styled-jsx#one-off-global-selectors) as well)
```
npm install --save react-markdown
```

- Update `pages/p/[id].js`
```
import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';

export default () => {
  const router = useRouter();
  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <div className="markdown">
        <Markdown
          source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
      `}
        />
      </div>
      <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};
```

- Styled jsx works as a babel plugin. It will parse all of the CSS and apply it in the build process. (With that our styles get applied without any overhead time)
- Check out [other styling solutions](https://github.com/zeit/next.js#css-in-js)

## License

ISC © [Aneesa Awaludin]()
