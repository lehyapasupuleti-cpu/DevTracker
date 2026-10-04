# DevTracker – Your Learning OS
**Learn → Track → Complete → Grow 🚀**

A mobile-first React app to log daily learning, track progress, keep a streak and unlock achievements. No backend; data lives in LocalStorage.

## Features
Dashboard with circular progress, Today's Mission, add/edit/delete learning days, instant search, status filters, streak system, 5 achievements, weekly CSS chart, dark mode (saved), Reset All Data, sample data on first launch.

## Technologies
React 18, Vite, JavaScript, CSS, Hooks, LocalStorage.

## Install & run
```
npm install
npm run dev
```
## Build
```
npm run build      # output in dist/
npm run preview
```
## Deploy
- **GitHub Pages:** build, then publish `dist/` (e.g. `npx gh-pages -d dist`). `base: './'` is already set.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Vercel:** import the repo; framework Vite; it detects everything.

## Future improvements
Full-stack version with React + Node.js + Express + MongoDB: user authentication, cloud storage, multi-device sync, user profiles, online learning history, advanced analytics. Also: Lucide icons, PWA install, reminders.
