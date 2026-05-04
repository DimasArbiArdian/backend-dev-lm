const express = require('express');
const app = express();

const PORT = 3000;

// 🔥 Middleware Logger (WAJIB dari step 4)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // lanjut ke route berikutnya
});

// 🟢 Route: Home
app.get('/', (req, res) => {
  res.send('Welcome to Route Handling!');
});

// 🟢 Route: About (HTML)
app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1>');
});

// 🟢 Dynamic Route (params)
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Viewing Product ID: ${id}`);
});

// 🟢 Query String
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`Searching for: ${query}`);
});

// 🔴 404 Handler (WAJIB paling bawah)
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// 🚀 Run server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});