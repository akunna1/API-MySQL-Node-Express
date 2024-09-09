const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('uploads'));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'social_media_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// CREATE a new post
app.post('/posts', upload.single('image'), (req, res) => {
  const { message } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!message) return res.status(400).send('Message is required');

  const sql = 'INSERT INTO posts (message, image_url) VALUES (?, ?)';
  db.query(sql, [message, image_url], (err, result) => {
    if (err) throw err;
    res.send('Post created successfully');
  });
});

// READ all posts
app.get('/posts', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// READ a specific post by ID
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM posts WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) return res.status(404).send('Post not found');
    res.json(result[0]);
  });
});

// UPDATE a post by ID
app.put('/posts/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = 'UPDATE posts SET message = ?, image_url = ? WHERE id = ?';
  db.query(sql, [message, image_url, id], (err, result) => {
    if (err) throw err;
    res.send('Post updated successfully');
  });
});

// DELETE a post by ID
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM posts WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Post deleted successfully');
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
