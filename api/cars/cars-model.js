const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ id: id }).first();
};

const getByVin = (vinNumber) => {
  return db("cars").where({ vin: vinNumber }).first();
};

const create = async (car) => {
  const [id] = await db("cars").insert(car);
  return await getById(id);
};

module.exports = { getAll, getById, create, getByVin };
