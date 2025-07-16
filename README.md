# API-MySQL-Node-Express

This project demonstrates how to create a social media post API using MySQL, Express.js, and Node.js. The API supports CRUD operations including image upload.

---

## Features

* Create posts with a message and an image URL
* Retrieve all posts or a single post by ID
* Update posts with new messages and images
* Delete posts

---

## Technologies Used

* Node.js
* Express.js
* MySQL
* Multer (for handling image uploads)
* Body-parser (to parse request bodies)

---

## Database Setup

Create the database and posts table:

```sql
CREATE DATABASE social_media_db;

USE social_media_db;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) NOT NULL,
  image_url VARCHAR(255)
);
```

---

## Installation

1. Initialize npm and install dependencies:

```bash
npm init -y
npm install express mysql multer body-parser
```

2. Configure your MySQL connection in your Node.js app.

3. Start the server:

```bash
node index.js
```

---

## API Endpoints

| Method | Endpoint     | Description                              |
| ------ | ------------ | ---------------------------------------- |
| POST   | `/posts`     | Create a new post with image             |
| GET    | `/posts`     | Retrieve all posts                       |
| GET    | `/posts/:id` | Retrieve a single post by ID             |
| PUT    | `/posts/:id` | Update a post with new message and image |
| DELETE | `/posts/:id` | Delete a post by ID                      |

---

## Notes

* Image uploads are handled with Multer middleware.
* Requests including images must be sent as multipart/form-data.
* Images are saved and the URL stored in the database.
* Message field stores the text content of the post.

