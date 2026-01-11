# 📚 API CRUD Mahasiswa — `learn_express_BE`

API backend sederhana untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data **Mahasiswa** menggunakan **Node.js** dan **Express.js**.

📌 Repository ini dibuat untuk pembelajaran Express.js dan sebagai referensi API dasar mahasiswa.

---

## 🚀 Fitur

✨ API ini sudah mendukung:

* 📥 **Create** mahasiswa baru
* 📤 **Read** data semua mahasiswa & detail mahasiswa
* ✏️ **Update** data mahasiswa
* ❌ **Delete** mahasiswa

---

## 🧰 Teknologi yang Digunakan

* **Node.js**
* **Express.js**
* **NPM scripts**
* **MySQLs**

---

## 🛠️ Cara Install & Menjalankan

1. **Clone repository**

```bash
git clone https://github.com/MULKHI/learn_express_BE.git
```

2. **Masuk ke folder project**

```bash
cd learn_express_BE
```

3. **Install dependencies**

```bash
npm install
```

4. **Jalankan server**

```bash
npm start
```

atau (jika menggunakan nodemon)

```bash
npm run dev
```

Server akan berjalan di **[http://localhost:PORT]((http://localhost:3001/api-docs/))** *(ganti PORT sesuai konfigurasi kamu)*.

---

## 📦 Struktur Folder (Contoh)

```
.
├── project/
│   ├── src/
│   │   ├── routes/        # Definisi endpoint API
│   │   ├── controllers/   # Logic backend
│   │   └── models/        # Skema data / mock
│   ├── test/              # Unit & integration test
│   ├── package.json
│   └── ...
└── README.md
```

*(Ubah sesuai struktur folder di repo kamu)*

---

## 🧪 API Endpoints

| Method | Endpoint             | Keterangan                      |
| ------ | -------------------- | ------------------------------- |
| GET    | `/api/mahasiswa`     | List semua mahasiswa            |
| GET    | `/api/mahasiswa/:id` | Detail mahasiswa berdasarkan ID |
| POST   | `/api/mahasiswa`     | Buat mahasiswa baru             |
| PUT    | `/api/mahasiswa/:id` | Update data mahasiswa           |
| DELETE | `/api/mahasiswa/:id` | Hapus mahasiswa                 |

> Sesuaikan nama path/endpoint ditempat kamu jika berbeda.

---

## 📌 Testing

*(Jika kamu punya script test)*

Jalankan test dengan:

```bash
npm test
```

---

## 🤝 Kontribusi

Terima kasih sudah mampir!
Kalau kamu ingin **menambah fitur**, **memperbaiki bug**, atau **menambah dokumentasi**, silakan fork project ini dan buat pull request 🚀

