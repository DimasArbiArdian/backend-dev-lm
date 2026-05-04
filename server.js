const express = require('express');
const app = express();

const errorHandler = require('./middleware/JSerrorHandler');
const AppError = require('./utils/AppError');

app.use(express.json());

/* =========================
   ROUTE SUCCESS
========================= */
app.get('/success', (req, res) => {
  res.json({
    success: true,
    message: "API berjalan normal"
  });
});

/* =========================
   ROUTE ERROR (MANUAL)
========================= */
app.get('/error', (req, res, next) => {
  return next(new AppError("Ini error dari route /error", 500));
});

/* =========================
   ROUTE VALIDATION
========================= */
app.get('/user', (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return next(new AppError("Query 'name' wajib diisi", 400));
  }

  res.json({
    success: true,
    message: `Hello ${name}`
  });
});

/* =========================
   ROUTE ASYNC ERROR
========================= */
app.get('/async-error', async (req, res, next) => {
  try {
    throw new Error("Async error terjadi");
  } catch (err) {
    next(err);
  }
});

/* =========================
   404 HANDLER
========================= */
app.use((req, res, next) => {
  next(new AppError("Route tidak ditemukan", 404));
});

/* =========================
   ERROR HANDLER (WAJIB PALING BAWAH)
========================= */
app.use(errorHandler);

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});