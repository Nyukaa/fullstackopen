# Ultimate Hooks (React + Vite)

A minimal React + Vite project focusing on building and using custom hooks to solve practical tasks in Part 7.

## Prerequisites

- Node.js LTS (>= 18)
- npm or pnpm

## Setup

```bash
# install dependencies
npm install
# or
pnpm install
```

## Scripts

```bash
# start dev server with HMR
npm run dev

# type-check (if TypeScript)
npm run typecheck

# lint with ESLint
npm run lint

# build for production
npm run build

# preview production build locally
npm run preview
```

## Development tips

- Keep hooks pure and reusable: no UI logic inside hooks.
- Prefer useEffect cleanup for subscriptions/timeouts.
- Memoize values/functions with useMemo/useCallback only when necessary.
- Write small tests for hook behavior (if test setup exists).

## Project structure (typical)

```
src/
  main.tsx
  App.tsx
  hooks/
    useXxx.ts
    useYyy.ts
  components/
    ...
```

## Environment

- Vite for bundling and dev server
- React with Fast Refresh
- ESLint for code quality
- Optional: SWC or Babel via @vitejs/plugin-react

## How to contribute

- Create focused hooks in src/hooks
- Document hook inputs/outputs in JSDoc
- Add usage examples in components

## License

This project is for educational purposes.
