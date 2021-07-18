const inventoryModel = require('../models/inventoryModel');
const warehouseModel = require("../models/warehouseModel");

/*Helper function to return a portion of data for larget data sets. 
Parameters are (data array, object key to filter on, filename for save)
File will be saved in the data folder*/
const { filterData } = require("../dataFilter");

//Update list of warehouses and categories
function updateWhAndCat(){
    filterData(warehouseModel.listWarehouses(), "name", "wh-locations");
    filterData(inventoryModel.listInventories(), "category", "inv-categories");
};

//Return all inventories
function getAllInventory(req, res){
    updateWhAndCat();
    res.status(200).json(inventoryModel.listInventories());
};

//Return up to date listing of warehouse names and categories
function getWhAndCat(req, res){
    res.status(200).json(inventoryModel.getWhAndCat());
};

//Get inventory item by id. If string is returned, save and return as an object with the error string
function getInventoryById(req, res){
    const result = inventoryModel.getInventoryById(req.params.id);
  
    if (result && typeof result !== "string") {
      return res.status(200).json(result);
    }
  
    res.status(400).json({ error: result });
}

//Get the single inventory item for edit component
function getInventoryForEdit(req, res){
    const result = inventoryModel.getInvForEdit(req.params.id);
    if (
      result &&
      typeof result !== "string" &&
      result.categories.length > 0 &&
      result.locations.length > 0
    ) {
      return res.status(200).json(result);
    }
  
    res.status(400).json({ error: result });
}

//Add new inventory item to the file
function addNewInvItem (req, res){
    if (
      !req.body.warehouseName ||
      !req.body.itemName ||
      !req.body.description ||
      !req.body.category ||
      !req.body.status ||
      !req.body.quantity
    ) {
      res.status(400).json({
        error: "POST body must contain all required properties",
        requiredProperties: [
          "warehouseName, itemName, description, category, status, quantity",
        ],
      });
    }

    res.json(inventoryModel.addItem(req.body));
}

//Edit properties of a single inventory item. If string is returned, save and return as an object with the error string
function editInvItem(req, res){
    if (!req.body) {
      return res.status(400).json({
        error: "Patch body must contain all required properties",
        requiredProperties: [
          "item name",
          "description",
          "category",
          "status",
          "warehouse location",
        ],
      });
    }
  
    const result = inventoryModel.editInvItem(req.body);
  
    if (result && typeof result !== "string") {
      return res.status(200).json(result);
    }
  
    res.status(400).json({ error: result });
}

//Delete inventory item
function deleteInvItem(req, res){
    res.json(inventoryModel.InventoryDelete(req.params.id));
}

module.exports={
    getAllInventory,
    getWhAndCat,
    getInventoryById,
    getInventoryForEdit,
    addNewInvItem,
    editInvItem,
    deleteInvItem,
}