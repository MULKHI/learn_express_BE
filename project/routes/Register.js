const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../connection");

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user baru
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
 *               - nama
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nama:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register berhasil
 */
router.post("/register", async (req, res) => {
  const { email, password, nama } = req.body;

  if (!email || !password || !nama) {
    return res.status(400).json({
      status: 400,
      message: "Email, password, dan nama wajib diisi",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (email, password, nama) VALUES (?, ?, ?)";

  db.query(sql, [email, hashedPassword, nama], (err) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "Register gagal",
      });
    }

    return res.status(201).json({
      status: 201,
      message: "Register berhasil",
    });
  });
});

module.exports = router;
