const express = require('express');
const app = express();
const PORT = 3000;

// middleware parsing JSON
app.use(express.json());

// 🔹 ROUTE SUCCESS
app.get('/success', (req, res) => {
  res.json({
    success: true,
    message: "API berjalan dengan baik 🚀"
  });
});

// 🔹 ROUTE ERROR (manual throw)
app.get('/error', (req, res, next) => {
  const err = new Error("Terjadi kesalahan pada server!");
  err.status = 500;
  next(err); // kirim ke middleware
});

// 🔹 ROUTE VALIDATION ERROR
app.get('/validation', (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    const err = new Error("Name query wajib diisi!");
    err.status = 400;
    return next(err);
  }

  res.json({
    success: true,
    message: `Hello ${name}`
  });
});

// 🔴 404 handler
app.use((req, res, next) => {
  const err = new Error("Route tidak ditemukan");
  err.status = 404;
  next(err);
});

// 🔥 IMPORT ERROR MIDDLEWARE
const errorHandler = require('./middleware/errorHandler');

// 🔥 WAJIB paling bawah
app.use(errorHandler);

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});