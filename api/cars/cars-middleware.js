const carsModel = require("./cars-model");
const yup = require("yup");
const vinValidator = require("vin-validator");
const carSchema = yup.object().shape({
  vin: yup.string().required("vin is missing"),
  make: yup.string().required("make is missing"),
  model: yup.string().required("model is missing"),
  mileage: yup
    .number("mileage of car must be a number")
    .required("mileage is missing"),
});

const checkCarId = async (req, res, next) => {
  try {
    const obj = await carsModel.getById(req.params.id);
    if (obj) {
      next();
    } else {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    }
  } catch (err) {
    next(err);
  }
};
const checkVinNumberValid = async (req, res, next) => {
  try {
    const varMi = await carsModel.getByVin(req.body.vin);
    if (varMi) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = async (req, res, next) => {
  try {
    await carSchema.validate(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = (req, res, next) => {
  try {
    const isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
