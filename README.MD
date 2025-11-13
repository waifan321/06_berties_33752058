# Berties Books

Sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

## Overview

This small Express application demonstrates a simple book-store web app using EJS templates and a MySQL (mysql2) connection pool. It supports:
- Listing books from the database (`/books/list`)
- Adding a new book via a form (`/books/addbook` → POST `/books/bookadded`)
- Searching (placeholder) (`/books/search`)
- Simple user registration example (`/users/register`)

## Requirements

- Node.js (v14+ recommended)
- MySQL server accessible locally

## Setup

1. Install project dependencies:

```powershell
npm install
```

2. Create the database and tables (use the provided SQL):

```sql
-- run in MySQL client
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;
-- see `create_db.sql` for table and user creation
```

You can also run the included `create_db.sql` and `insert_test_data.sql` scripts with your MySQL client to create the schema and insert sample data.

3. Ensure the database user credentials in `index.js` match your local MySQL setup.

4. Start the app:

```powershell
node index.js
```

Visit `http://localhost:8000` in your browser.

## Routes

- `/` — Home page (`views/index.ejs`)
- `/about` — About page (`views/about.ejs`)
- `/books/list` — List all books (`views/list.ejs`)
- `/books/addbook` — Form to add a book (`views/addbook.ejs`)
- `POST /books/bookadded` — Inserts a book and shows confirmation (`views/bookadded.ejs`)
- `/books/search` — Search form (`views/search.ejs`) (placeholder)
- `/users/register` — Register form (`views/register.ejs`)

## Notes and tips

- The app uses a global `db` pool (defined in `index.js`) that route modules access as `db`.
- The sample SQL uses a `books` table with columns `id`, `name`, and `price` (DECIMAL).
- If you prefer a POST-Redirect-GET pattern for the add-book flow, convert the POST handler to redirect to a GET confirmation route after inserting.
- To run automated tests or CI, set up a test database and adjust credentials before running.

If you'd like, I can also:
- Add a short script to run the SQL files automatically
- Improve the README with screenshots of the UI
- Add prettier/ESLint configuration and scripts

