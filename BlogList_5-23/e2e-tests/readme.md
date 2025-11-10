create new dir e2e-tests and inside

```
npm init playwright@latest
Initializing project in '.'
✔ Do you want to use TypeScript or JavaScript? · JavaScript
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (Y/n) · false
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
```

i added for tests in backend

"start:test": "cross-env NODE_ENV=test node --watch index.js",

```
npm install cross-env --save-dev
```

Playwright не запускает сервер сам. перед запуском тестов

```

# в одном терминале
npm run start:test   # запустить backend в режиме test

# в другом
npm run dev          # запустить frontend (Vite)


```

из папки e2e-tests:

```
npx playwright test
or
npx playwright test --project=chromium

в UI-режиме
npm run test -- --ui

```

Посмотреть отчёт (report)

```
npx playwright show-report

or
npm run test:report
```

just one test

```
npm test -- -g "login fails with wrong password"

```

Можно записывать "видео-трассу" теста:

```
npm run test -- --trace on
```

Если тест падает

```
npm test -- -g 'one of those can be made nonimportant' --debug

```

Если тест большой, долго "прокликивать" его по шагам

```

await page.pause();

```

Тест создаёт новую заметку слишком быстро,
не дожидаясь, пока предыдущая появится на странице.

```

await page.getByText(content).waitFor() // 👈 ждём, пока заметка появится

```

Все клики и вводы "записываются" в виде готового кода теста,
который можно скопировать из окна инспектора.

```
npx playwright codegen URL

npx playwright codegen http://localhost:5173/

```
