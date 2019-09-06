## Next Example App
Example of a Next.js App

## Motivation
Help others to set up a Next.js app quickly without having to go through Next.js' official "Getting Started" documentation

## Next.js Features
- Pages Layout
- Hot Module Replacement (HMR)

## vs Create React App
- Manual Pages Layout
- Client-side routing

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

## Credits
[Next.js' Getting Started Guide](https://nextjs.org/learn/basics/getting-started)

## License

ISC © [Aneesa Awaludin]()
