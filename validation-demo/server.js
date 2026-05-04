const express = require('express');
const app = express();

const validateUser = require('./middleware/validateUser');

app.use(express.json());

/* =========================
   REGISTER ROUTE
========================= */
app.post('/register', validateUser, (req, res) => {
  // hanya jalan jika validasi lolos
  res.status(200).json({
    success: true,
    message: "User registered successfully",
    data: req.body
  });
});

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});