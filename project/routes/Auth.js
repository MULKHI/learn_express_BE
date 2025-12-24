const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../connection");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@mail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Email atau password salah
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Email dan password wajib diisi",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "Server error",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        status: 401,
        message: "Email atau password salah",
      });
    }

    const user = results[0];

    // bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: "Email atau password salah",
      });
    }

    // buat token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.json({
      status: 200,
      message: "Login success",
      token,
    });
  });
});

module.exports = router;
