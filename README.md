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

## Credits
[Next.js' Getting Started Guide](https://nextjs.org/learn/basics/getting-started)

## License

ISC © [Aneesa Awaludin]()
