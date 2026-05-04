const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  // =========================
  // 1. CHECK REQUIRED FIELDS
  // =========================
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Semua field wajib diisi (name, email, password)"
    });
  }

  // =========================
  // 2. VALIDASI NAME
  // hanya huruf & spasi
  // =========================
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) {
    return res.status(400).json({
      success: false,
      message: "Nama hanya boleh berisi huruf dan spasi"
    });
  }

  // =========================
  // 3. VALIDASI EMAIL
  // =========================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Format email tidak valid"
    });
  }

  // =========================
  // 4. VALIDASI PASSWORD
  // min 8 karakter + special char
  // =========================
  const passwordRegex = /^(?=.*[!@#$%^&*]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password minimal 8 karakter dan mengandung simbol"
    });
  }

  // =========================
  // LULUS VALIDASI
  // =========================
  next();
};

module.exports = validateUser;