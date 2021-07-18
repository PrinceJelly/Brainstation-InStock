const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//Filepaths for relevant json data
const warehousesFile = path.join(__dirname, "../data/warehouses.json");
const inventoriesFile = path.join(__dirname, "../data/inventories.json");


/************************************* MODELS ******************************************/

/*********************************** CONTRUCTOR  **************************************/

function Warehouse(name, address, city, country, contact) {
  this.id = uuidv4();
  this.name = name;
  this.address = address;
  this.city = city;
  this.country = country;
  this.contact = {
    name: contact.name,
    position: contact.position,
    phone: contact.phone,
    email: contact.email,
  };
}

//list all inventories data, returns array of all inventories
function listInventories() {
  return JSON.parse(fs.readFileSync(inventoriesFile));
}

/********************************** Get all warehouses ************************************/
function listWarehouses() {
  const warehouses = fs.readFileSync(warehousesFile);
  return JSON.parse(warehouses);
}

/*********************** Get warehouse by ID and associated inventory ************************/

function getWhInvById(id) {
    //Read files
    const warehousesArr = listWarehouses();
    const inventoryArr = listInventories();

    //Get warehouse by id
    const warehouse = warehousesArr.filter((warehouse) => warehouse.id === id);

    //Get associated inventory objects
    const warehouseInventory = inventoryArr.filter((item) =>
        item.warehouseID === id ? item : ""
    );

    const summary = {
        warehouseDetails: warehouse[0],
        warehouseInv: warehouseInventory,
    };

    if (warehouse.length) {
        return summary;
    } else {
        return { Error: `No warehouses found with the id: ${id}` };
    }
}
/******************************** Post a new warehouse  ***********************************/
function addWarehouse(body) {
  const warehouseArr = listWarehouses();
  const warehouse = new Warehouse(
    body.name,
    body.address,
    body.city,
    body.country,
    body.contact
  );
  warehouseArr.push(warehouse);

  fs.writeFileSync(warehousesFile, JSON.stringify(warehouseArr));
}


/************************* Get warehouse by ID and modify ********************************/

function getPatchWhById(body) {
  //Read files
const warehousesArr = listWarehouses();
    

  let warehouse = warehousesArr
    .filter((warehouse) => warehouse.id === body.id)
    .pop();
  //code to ensure if we change name of warehouse, that the name gets updated in inventories as well
  if (body.name) {
    const inventoryArr = listInventories();
    let inventory = inventoryArr.filter(
      (inventory) => inventory.warehouseID === warehouse.id
    );
    inventory = inventory.map((item) => {
      return { ...item, warehouseName: body.name };
    });

    let inventory2 = inventoryArr.filter(
      (inventory) => inventory.warehouseID !== warehouse.id
    );
    inventory2 = [...inventory2, ...inventory];

    fs.writeFileSync(inventoriesFile, JSON.stringify(inventory2));
  }

  //Get warehouse by id to modify
  warehouse = {
    id: warehouse.id,
    name: body.name ? body.name : warehouse.name,
    address: body.address ? body.address : warehouse.address,
    city: body.city ? body.city : warehouse.city,
    country: body.country ? body.country : warehouse.country,
    contact: {
      name: body.contact.name ? body.contact.name : warehouse.contact.name,
      position: body.contact.position
        ? body.contact.position
        : warehouse.contact.position,
      phone: body.contact.phone ? body.contact.phone : warehouse.contact.phone,
      email: body.contact.email ? body.contact.email : warehouse.contact.email,
    },
  };

  const warehouse2 = warehousesArr.filter(
    (warehouse) => warehouse.id !== body.id
  );
  warehouse2.push(warehouse);

  fs.writeFileSync(warehousesFile, JSON.stringify(warehouse2));

  return warehouse;
}

/********************************  Deletes a warehouse item by ID ***************************/

function warehouseDelete(id) {
  const warehouseArr = listWarehouses();
  const inventoryArr = listInventories();
  
  const inventoryIndex = inventoryArr.filter(
    (inventory) => inventory.warehouseID !== id
  );
  const warehouseIndex = warehouseArr.findIndex(
    (warehouse) => warehouse.id === id
  );

  let warehouseUpdate = [];
  warehouseUpdate.push(warehouseArr.splice(0, warehouseIndex));
  warehouseUpdate.push(warehouseArr.splice(warehouseIndex + 1));

  warehouseUpdate = warehouseUpdate.flat();

  fs.writeFileSync(warehousesFile, JSON.stringify(warehouseUpdate));
  fs.writeFileSync(inventoriesFile, JSON.stringify(inventoryIndex));
  return warehouseUpdate;
}


module.exports = {
    listWarehouses,
    addWarehouse,
    getPatchWhById,
    getWhInvById,
    warehouseDelete,
}

