import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../Reusable/react-svg-library";
import ComponentHeader from "../Reusable/ComponentHeader";
import InventoryItemDetailContainer from "./InventoryItemDetailContainer";
import { getInventoryItem } from '../Utils/Axios';

export default function InventoryItemDetail({ routerProps }) {
  const id = routerProps.match.params.id;

  const [invItem, updateItem] = useState(null);

  useEffect(() => {
    getInventoryItem(id).then(resp => updateItem(resp));
  }, [id]);

  return invItem === null ? (
    <h1 className="component-head__header" style={{ textAlign: "center" }}>
      Loading Inventory Item
    </h1>
  ) : (
    <article className="container wh-details">
      <ComponentHeader
        text={invItem.itemName}
        backArrow="y"
        prevPage="/inventory"
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
      <InventoryItemDetailContainer data={invItem} />
    </article>
  );
}
