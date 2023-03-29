const express = require("express");
const carsRouter = require("./cars/cars-router");

const server = express();

server.use(express.json());

server.use("/api/cars", carsRouter);

server.use((req, res) => {
  res.status(400).send("Aradığınız adres bulunamadı");
});

server.use((err, req, res, next) => {
  let status = err.status || 400;
  res.status(status).json({ message: err.message || "İşlem yapılamadı" });
});

module.exports = server;
