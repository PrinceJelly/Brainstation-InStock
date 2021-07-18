const warehouse = require('../models/warehouseModel');

function getAllWarehouses (_req, res)  {
  res.status(200).json(warehouse.listWarehouses());
};

function getWhAndInvByID(req, res) {
  res.status(200).json(warehouse.getWhInvById(req.params.id));
};

function postNewWarehouse(req, res) {
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact
  ) {
    res.status(400).json({
      error: "POST body must contain all required properties",
      requiredProperties: ["name, address,city,country,contact"],
    });
  }
  res.json(warehouse.addWarehouse(req.body));
};

function patchWarehouseByID(req, res) {
  res.status(201).send(warehouse.getPatchWhById(req.body));
};

function deleteWarehouseByID(req, res)  {
  res.status(202).json(warehouse.warehouseDelete(req.params.id));
};
module.exports = {
    getAllWarehouses,
    getWhAndInvByID,
    postNewWarehouse,
    patchWarehouseByID,
    deleteWarehouseByID
}
