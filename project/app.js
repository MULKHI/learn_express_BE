const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app
  .route("/mahasiswa")

  // GET ALL
  .get((req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, results) => {
      if (err) return response(500, err, "Error fetching data", res);
      return response(200, results, "List Mahasiswa", res);
    });
  })

  // CREATE
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

  // UPDATE
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

  // DELETE
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

// ROOT
app.get("/", (req, res) => {
  response(200, "API v1 Ready To Go", "SUCCESS", res);
});

// SEARCH BY NIM
app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, results) => {
    if (err) return response(500, err, "Error fetching data", res);
    response(200, results, "Mahasiswa by nim " + nim, res);
  });
});

module.exports = app;
