Готовая версия (blog.js)

```• node blog.js <password> выведет все блоги.
•	node blog.js <password> "My title" "Author name" "http://example.com" 5 добавит новый блог.
```

1. Устанавливаешь dotenv
   `npm install dotenv`

2. Создаёшь файл .env в корне проекта

В него кладёшь чувствительные данные (его в git не коммитим — добавь в .gitignore):

```
MONGODB_URI=mongodb+srv://annashitikova_db_user:<PASSWORD>@cluster0.zcy90zd.mongodb.net/bloglist?retryWrites=true&w=majority&appName=Cluster0
PORT=3003
```

(замени <PASSWORD> на твой настоящий пароль к Atlas-пользователю)

3. Подключаешь dotenv в коде (например в app.js или blog.js)

```
require('dotenv').config()
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI
```

библиотеки lodash

```
npm install lodash
```
