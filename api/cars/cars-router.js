const express = require("express");
const carsMd = require("./cars-middleware");
const carsModel = require("./cars-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const cars = await carsModel.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", carsMd.checkCarId, async (req, res, next) => {
  try {
    const car = await carsModel.getById(req.params.id);
    res.json(car);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  carsMd.checkCarPayload,
  carsMd.checkVinNumberUnique,
  carsMd.checkVinNumberValid,
  async (req, res, next) => {
    try {
      const car = await carsModel.create(req.body);
      res.status(201).json(car);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
