import InventoryList from "./InventoryList";
import ComponentHeader from "../Reusable/ComponentHeader";
import SearchInputHeader from "../Reusable/SearchInputHeader";
import Button from "../Reusable/Button";
import { getInventoryList } from "../Utils/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function InventoryPage() {
  const [inventoryState, updateList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getInventoryList().then((res) => updateList(res));
  }, []);

  const handleDeleteInventoryItem = () => {
    getInventoryList().then((res) => updateList(res));
  };

  useEffect(() => {
    if (inventoryState !== null) {
      const results = inventoryState.filter((inventory) => {
        return (
          inventory.warehouseName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          inventory.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSearchResults(results);
    }
  }, [inventoryState, searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <article className="container inventory">
      <ComponentHeader text="Inventory" addClass="inventory__header">
        <div className="warehouse__input-container">
          <SearchInputHeader
            addClass="search-bar"
            placeholder="Search..."
            handleChange={handleChange}
          />
          <Link to="/inventory/add">
            <Button addClass="btn__add">+ Add New Item</Button>
          </Link>
        </div>
      </ComponentHeader>
      <InventoryList
        inventoryState={searchTerm ? searchResults : inventoryState}
        handleDeleteInventoryItem={handleDeleteInventoryItem}
      />
    </article>
  );
}

export default InventoryPage;
