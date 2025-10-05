const request = require("supertest");
const app = require("../project/app");

describe("API Mahasiswa", () => {
  it("GET / should return API ready", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  it("GET /mahasiswa should return list", async () => {
    const res = await request(app).get("/mahasiswa");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // body harus array
    expect(Array.isArray(res.body[0].payload)).toBe(true); // payload di index 0
  });

  it("POST /mahasiswa should insert data", async () => {
    const res = await request(app).post("/mahasiswa").send({
      nim: 999,
      nama_lengkap: "Test User",
      kelas: "22A",
      alamat: "Jl. Testing",
    });
    expect(res.statusCode).toBe(201);
  });

  it("PUT /mahasiswa should update data", async () => {
    const res = await request(app).put("/mahasiswa").send({
      nim: 999,
      nama_lengkap: "Updated User",
      kelas: "22B",
      alamat: "Jl. Updated",
    });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /mahasiswa should delete data", async () => {
    const res = await request(app).delete("/mahasiswa").send({ nim: 999 });
    expect(res.statusCode).toBe(200);
  });
});
