const express = require("express");
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get("/", inventoryController.getAllInventory);

router.get("/whcat", inventoryController.getWhAndCat);

router.get("/:id", inventoryController.getInventoryById);

router.get("/:id/edit", inventoryController.getInventoryForEdit);

router.post("/", inventoryController.addNewInvItem);

router.patch("/:id/edit", inventoryController.editInvItem);

router.delete("/:id", inventoryController.deleteInvItem);

module.exports = router;
