import React, { useState, useEffect } from "react";
import WarehouseDetailsSummary from "./WarehouseDetailsSummary";
import InventoryListItem from "../inventory-comp/InventoryListItem";
import { Link } from "react-router-dom";
import Icon from "../Reusable/react-svg-library";
import SortBar from "../Reusable/SortBar";
import {getWarehouseById} from '../Utils/Axios';

import ComponentHeader from "../Reusable/ComponentHeader";

export default function WarehouseDetailsPage({ routerProps }) {
  const id = routerProps.match.params.id;

  const [warehouseData, updateDetails] = useState(null);

  useEffect(() => {
    getWarehouseById(id).then((resp) => updateDetails(resp));
  }, [id]);

  const handleDeleteInventoryItem = () => {
    getWarehouseById(id).then((resp) => updateDetails(resp));
  };

  return warehouseData === null ? (
    <h1 className="component-head__header" style={{ textAlign: "center" }}>
      Loading Warehouse Details
    </h1>
  ) : (
    <article className="container wh-details">
      <ComponentHeader
        text={warehouseData.warehouseDetails.name}
        backArrow="y"
        prevPage="/"
      >
        <Link
          to={routerProps.match.url + "/edit"}
          className="btn__edit component-head__edit-btn"
        >
          <Icon
            name="edit-24px-white.svg"
            addClass="component-head__edit-icon"
          />
          <span className="component-head__edit-text">Edit</span>
        </Link>
      </ComponentHeader>
      <WarehouseDetailsSummary data={warehouseData.warehouseDetails} />
      <SortBar addClass="sortbar--wh-details" />
      <ul className="inv-list">
        {warehouseData.warehouseInv.map((item) => {
          return (
            <InventoryListItem
              key={item.id}
              data={item}
              handleDeleteInventoryItem={handleDeleteInventoryItem}
            />
          );
        })}
      </ul>
    </article>
  );
}
