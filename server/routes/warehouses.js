const express = require("express");
const router = express.Router();
const warehouseController = require('../controllers/warehouseController')
//----------------------------------Routes----------------------------------------------------------
router.get("/", warehouseController.getAllWarehouses);

router.get("/:id", warehouseController.getWhAndInvByID);

router.post("/", warehouseController.postNewWarehouse); 

router.patch("/", warehouseController.patchWarehouseByID);

router.delete("/:id", warehouseController.deleteWarehouseByID);


module.exports = router;
