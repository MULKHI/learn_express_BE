const express = require("express");
const MahasiswaRouter = express.Router();
const db = require("../connection");
const response = require("../response");
const authMiddleware = require("../middleware/auth"); // 🔐 TAMBAH INI

/**
 * @swagger
 * tags:
 *   name: Mahasiswa
 *   description: Manajemen data mahasiswa
 */

/**
 * @swagger
 * /mahasiswa:
 *   get:
 *     summary: Ambil semua data mahasiswa
 *     tags: [Mahasiswa]
 *     security:
 *       - bearerAuth: []   # 🔐 JWT WAJIB
 *     responses:
 *       200:
 *         description: Berhasil mengambil data mahasiswa
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /mahasiswa:
 *   post:
 *     summary: Tambah data mahasiswa
 *     tags: [Mahasiswa]
 *     security:
 *       - bearerAuth: []   # 🔐 JWT WAJIB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nim
 *               - nama_lengkap
 *               - kelas
 *               - alamat
 *             properties:
 *               nim:
 *                 type: string
 *               nama_lengkap:
 *                 type: string
 *               kelas:
 *                 type: string
 *               alamat:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mahasiswa berhasil ditambahkan
 */

/**
 * @swagger
 * /mahasiswa:
 *   put:
 *     summary: Update data mahasiswa
 *     tags: [Mahasiswa]
 *     security:
 *       - bearerAuth: []   # 🔐 JWT WAJIB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nim
 *             properties:
 *               nim:
 *                 type: string
 *               nama_lengkap:
 *                 type: string
 *               kelas:
 *                 type: string
 *               alamat:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mahasiswa berhasil diupdate
 *       404:
 *         description: Mahasiswa tidak ditemukan
 */

/**
 * @swagger
 * /mahasiswa:
 *   delete:
 *     summary: Hapus data mahasiswa
 *     tags: [Mahasiswa]
 *     security:
 *       - bearerAuth: []   # 🔐 JWT WAJIB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nim
 *             properties:
 *               nim:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mahasiswa berhasil dihapus
 *       404:
 *         description: Mahasiswa tidak ditemukan
 */

// 🔐 SEMUA ENDPOINT MAHASISWA WAJIB JWT
MahasiswaRouter.use(authMiddleware);

MahasiswaRouter.route("/")

  .get((req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, results) => {
      if (err) return response(500, err, "Error fetching data", res);
      return response(200, results, "List Mahasiswa", res);
    });
  })

  .post((req, res) => {
    const { nim, nama_lengkap, kelas, alamat } = req.body;
    if (!nim || !nama_lengkap || !kelas || !alamat) {
      return response(400, null, "All fields are required", res);
    }

    const sql =
      "INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (?, ?, ?, ?)";
    db.query(sql, [nim, nama_lengkap, kelas, alamat], (err, results) => {
      if (err) return response(500, err, "Error inserting data", res);
      if (results.affectedRows > 0) {
        return response(
          201,
          { isSuccess: true, id: nim },
          "Mahasiswa created",
          res
        );
      }
      return response(500, "Insertion failed", "Error inserting data", res);
    });
  })

  .put((req, res) => {
    const { nim, nama_lengkap, kelas, alamat } = req.body;
    if (!nim) return response(400, null, "NIM is required", res);

    const sql = `UPDATE mahasiswa SET nama_lengkap = ?, kelas = ?, alamat = ? WHERE nim = ?`;
    db.query(sql, [nama_lengkap, kelas, alamat, nim], (err, results) => {
      if (err) return response(500, err, "Error updating data", res);
      if (results.affectedRows > 0) {
        return response(
          200,
          { isSuccess: true, id: nim },
          "Mahasiswa updated",
          res
        );
      }
      return response(404, "NIM not found", "Error updating data", res);
    });
  })

  .delete((req, res) => {
    const { nim } = req.body;
    if (!nim) return response(400, null, "NIM is required", res);

    const sql = `DELETE FROM mahasiswa WHERE nim = ?`;
    db.query(sql, [nim], (err, results) => {
      if (err) return response(500, err, "Error deleting data", res);
      if (results.affectedRows > 0) {
        return response(
          200,
          { isSuccess: true, id: nim },
          "Mahasiswa deleted",
          res
        );
      }
      return response(404, "NIM not found", "Error deleting data", res);
    });
  });

module.exports = MahasiswaRouter;
