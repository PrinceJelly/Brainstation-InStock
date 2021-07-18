const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//------------------------------Read Data-------------------------------------------

//Filepaths for relevant json data
const warehousesFile = path.join(__dirname, "../data/warehouses.json");
const inventoriesFile = path.join(__dirname, "../data/inventories.json");
const invCategoriesFile = path.join(__dirname, "../data/inv-categories.json");
const whLocationsFile = path.join(__dirname, "../data/wh-locations.json");

//list all inventories data, returns array of all inventories
function listInventories() {
    return JSON.parse(fs.readFileSync(inventoriesFile));
}

//list all warehouses data, returns array of all warehouses
function listWarehouses() {
  return JSON.parse(fs.readFileSync(warehousesFile));
}

//Read inventory category data, returns array of all categories for add/edit inventory
function invCategories() {
    return JSON.parse(fs.readFileSync(invCategoriesFile));
}

//Read warehouse location data, returns array of all the warehouse locations for add/edit inventory
function whLocations() {
    return JSON.parse(fs.readFileSync(whLocationsFile));
  }

//------------------------------Object Constructors-------------------------------------------

//add new inventory item constructor
function Item(
    warehouseName,
    itemName,
    description,
    category,
    status,
    quantity,
    id
) {
    this.id = uuidv4();
    this.warehouseID = id;
    this.warehouseName = warehouseName;
    this.itemName = itemName;
    this.description = description;
    this.category = category;
    this.status = status;
    this.quantity = quantity;
}
  
//------------------------------Return Data-------------------------------------------

//Get inventory item by id
function getInventoryById(id) {
    const inventoriesArr = listInventories();
    const inventoryItem = inventoriesArr.filter(
      (inventory) => inventory.id === id
    );
    if (inventoryItem.length) {
      return inventoryItem[0];
    } else {
      return `No inventory item found with the id: ${id}`;
    }
}

//Get inventory item and current category/warehouse data
function getInvForEdit(id) {
    const currentItem = getInventoryById(id);
  
    //save current data to variable for warehouse locations and inv categories
    const invCat = invCategories();
    const whLoc = whLocations();
  
    const result = {
      inventoryItem: currentItem,
      categories: invCat,
      locations: whLoc,
    };
  
    if (result.categories.length === 0 || result.locations.length === 0) {
      return `Internal Server Error`;
    }
  
    if (typeof currentItem !== "string" && result.inventoryItem.id) {
      return result;
    } else {
      return `No inventory item found with the id: ${id}`;
    }
}

//get new inventory categories function
function getWhAndCat() {
    const invCat = invCategories();
    const whLoc = whLocations();
    const result = { categories: invCat, whlocation: whLoc };
  
    return result;
  }

//------------------------------Edit Data-------------------------------------------

//Get inventory item and current category/warehouse data
function editInvItem(data) {
    const currentItem = getInventoryById(data.id);
    const otherItems = listInventories().filter((item) => item.id !== data.id);
    const newItem = {
      id: data.id,
      warehouseID: data.warehouseID,
      warehouseName: data.warehouseName,
      itemName: data.itemName,
      description: data.description,
      category: data.category,
      status: data.status,
      quantity: data.quantity,
    };
    otherItems.push(newItem);
  
    fs.writeFileSync(inventoriesFile, JSON.stringify(otherItems));
  
    if (currentItem.id) {
      return newItem;
    } else {
      return `No inventory item found with the id: ${id}`;
    }
}

function InventoryDelete(id) {
    const inventoryItemArr = listInventories();
    const inventoryItemIndex = inventoryItemArr.filter(
      (inventory) => inventory.id !== id
    );
    fs.writeFileSync(inventoriesFile, JSON.stringify(inventoryItemIndex));
    return inventoryItemIndex;
}

//add new inventory item function
function addItem(body) {
    const inventoryItemArr = listInventories();
  
    const warehouseID = listWarehouses().filter(
      (wh) => wh.name === body.warehouseName
    )[0].id;
  
    const item = new Item(
      body.warehouseName,
      body.itemName,
      body.description,
      body.category,
      body.status,
      body.quantity,
      warehouseID
    );
    inventoryItemArr.push(item);
  
    fs.writeFileSync(inventoriesFile, JSON.stringify(inventoryItemArr));
  
    return item;
}


module.exports={
    listInventories,
    invCategories,
    getInventoryById,
    getInvForEdit,
    getWhAndCat,
    editInvItem,
    InventoryDelete,
    addItem,
};