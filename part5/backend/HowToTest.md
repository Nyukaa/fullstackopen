installing

```
npm install supertest --save-dev
```

running

```
npm test -- tests/blog_api.test.js

or
npm test -- tests/token_api.test.js
```

Как проверить в Postman на POST /api/blogs с токеном

1 Сначала получаем токен:

```
Method: POST
URL: http://localhost:3001/api/login
Body (JSON):
{
"username": "Alisa",
"password": "secret123"
}
```

В ответе будет поле token.

2 Затем создаём блог с токеном:

```
Method: POST
URL: http://localhost:3001/api/blogs

Headers:
Authorization: Bearer < my token>


Body (JSON):
{
"title": "Blog from Postman",
"author": "Anna",
"url": "http://example.com/postman",
"likes": 10
}
```

Ожидаемый результат:
Status: 201 Created
Ответ содержит созданный блог с полем user, указывающим на пользователя.

3 Method: DELETE

```
URL: http://localhost:3001/api/blogs/<id_созданного_блога>
Headers: Authorization: Bearer <твой токен>
Body: пустой
```
