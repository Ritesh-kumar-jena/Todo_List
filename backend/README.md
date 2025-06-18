# Todo List Backend API

This is the backend for a Todo List application built with **Node.js**, **Express**, and **MongoDB**.

## 🌐 Features

- User Registration (unique username & email)
- Create / Read / Update / Delete Todos
- Add notes to todos
- Filter, sort, and paginate todos
- Assign todos to users with tags & priority
- MongoDB persistence with Mongoose

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Dotenv
- CORS

## 📁 Folder Structure

```
├── Controller/
│   ├── userRoutes.js
│   └── todoRoutes.js
├── Model/
│   ├── userModel.js
│   └── todoModel.js
├── db.js
├── index.js
├── .env
└── package.json
```

## 🛠️ Setup Instructions

1. Clone the repository

```bash
git clone <https://github.com/Ritesh-kumar-jena/Todo_List.git>
cd backend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```
port=3000
database=<your_mongodb_url>
```

4. Run the server

```bash
npm run dev
```

Server will run on `http://localhost:3000`

## 📮 API Endpoints

### Users

- `POST /api/users` - Create new user
- `GET /api/users` - Get all users

### Todos

- `POST /api/todos` - Create new todo
- `GET /api/todos/:userId` - Get todos by user
- `GET /api/todos` - Get all todos (with filter, sort, pagination)
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/notes` - Add note to todo

## 🧪 Query Parameters for `/api/todos`

- `userId` – filter by user
- `tag` – filter by tag
- `priority` – low | medium | high
- `completed` – true | false
- `sortBy` – createdAt (default)
- `order` – asc | desc
- `page` – page number (default: 1)
- `limit` – results per page (default: 10)

---

Made with ❤️ by Ritesh