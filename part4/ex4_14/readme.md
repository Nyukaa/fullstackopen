installing

```
npm install supertest --save-dev
```

running

```
npm test -- tests/blog_api.test.js
```

to package json

````
"start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development node --watch index.js",
    "test": "cross-env NODE_ENV=test node --test",
    ```
````
