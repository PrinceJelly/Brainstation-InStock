import WarehouseList from "./WarehouseList";
import ComponentHeader from "../Reusable/ComponentHeader";
import SearchInputHeader from "../Reusable/SearchInputHeader";
import Button from "../Reusable/Button";
import { Link } from "react-router-dom";
import { getWarehouseList } from "../Utils/Axios";
import React, { useEffect, useState } from "react";

function WarehousePage() {
  const [warehouseState, updateList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getWarehouseList().then((res) => updateList(res));
  }, []);

  const handleDeleteWarehouse = () => {
    getWarehouseList().then((res) => updateList(res));
  };

  useEffect(() => {
    if (warehouseState !== null) {
      const results = warehouseState.filter((warehouse) => {
        return (
          warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          warehouse.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSearchResults(results);
    }
  }, [warehouseState, searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <article className="container warehouse">
      <ComponentHeader text="Warehouses" addClass="warehouse__header">
        <div className="warehouse__input-container">
          <SearchInputHeader
            addClass="search-bar"
            placeholder="Search..."
            handleChange={handleChange}
          />
          <Link to="/warehouse/add">
            <Button addClass="btn__add">+ Add New Warehouse</Button>
          </Link>
        </div>
      </ComponentHeader>
      <WarehouseList
        className="warehouse-list"
        warehouseState={searchTerm ? searchResults : warehouseState}
        handleDeleteWarehouse={handleDeleteWarehouse}
      />
    </article>
  );
}

export default WarehousePage;
