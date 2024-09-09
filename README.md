
- database: social_media_db
- collection: posts

- npm init -y
- npm install express mongoose multer body-parser

#### Steps
- Setup MySQL Database: Create a database and a posts table with fields for the id, message, and image_url to store post details
- Install Required Packages: npm init -y, npm install express mysql multer body-parser
- Creating the posts table:

CREATE DATABASE social_media_db;

USE social_media_db;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) NOT NULL,
  image_url VARCHAR(255)
);


#### API Endpoints (index.js)
- Create Post (with image): POST /posts (Form-data: message, image)
- Get All Posts: GET /posts
- Get Single Post: GET /posts/:id
- Update Post (with new image): PUT /posts/:id (Form-data: message, image)
- Delete Post: DELETE /posts/:id
