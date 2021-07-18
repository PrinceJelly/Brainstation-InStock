import axios from "axios";

const server_url = "http://localhost:8080/";

// -----------------------------------------Warehouse Requests-----------------------------------
export const getWarehouseList = () => {
  return axios
    .get(`${server_url}warehouses`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getInventoryList = () => {
  return axios
    .get(`${server_url}inventories`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const warehouseDeleteID = (id) => {
  return axios
    .delete(`${server_url}warehouses/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const inventorydeleteID = (id) => {
  return axios
    .delete(`${server_url}inventories/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getWarehouseById = (id) => {
  return axios
    .get(`${server_url}warehouses/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// -----------------------------------------Inventory Requests-----------------------------------

export const getInventoryItem = (id) => {
  return axios
    .get(`${server_url}inventories/${id}`)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
};

export const getInventoryItemEdit = (id) => {
  return axios
    .get(`${server_url}inventories/${id}/edit`)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
};

export const patchInventoryItem = (id, obj) => {
  return axios
    .patch(`${server_url}inventories/${id}/edit`, obj)
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
};
