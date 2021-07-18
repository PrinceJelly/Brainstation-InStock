import { Link } from "react-router-dom";
import Icon from "../Reusable/react-svg-library";
import Modal from "../modal/InventoryDeleteModal";
import React, { useState } from "react";
import Button from "../Reusable/Button";
export default function InventoryListItem({
  data,
  warehouseFlag,
  handleDeleteInventoryItem,
}) {
  const [showing, setShowing] = useState(false);
  return (
    <li className="list-item">
      {showing ? (
        <Modal
          setShowing={setShowing}
          inventoryName={data.itemName}
          inventoryID={data.id}
          handleDeleteInventoryItem={handleDeleteInventoryItem}
        />
      ) : (
        ""
      )}

      <span className="list-item__separator">
        <p className="list-item__sub-header">INVENTORY ITEM</p>
        <Link to={`/inventory/${data.id}`} className="list-item__inv-link">
          {data.itemName}
          <Icon name="chevron_right-24px.svg" addClass="list-item__chev" />
        </Link>
      </span>

      <span className="list-item__separator">
        <p className="list-item__sub-header">STATUS</p>
        <p className={`${data.quantity > 0 ? "in-stock" : "oof-stock"}`}>
          {data.status.toUpperCase()}
        </p>
      </span>

      <span className="list-item__separator">
        <p className="list-item__sub-header">CATEGORY</p>
        <p className="wh-details__text">{data.category}</p>
      </span>

      <span className="list-item__separator">
        <p className="list-item__sub-header">QTY</p>
        <p className="wh-details__text">{data.quantity}</p>
      </span>

      {warehouseFlag === "y" ? (
        <span className="list-item__separator">
          <p className="list-item__sub-header">WAREHOUSE</p>
          <p className="wh-details__text">{data.warehouseName}</p>
        </span>
      ) : (
        ""
      )}
      <div className="list-item__modify-container">
        <Button
          addClass="list-item__delete-button"
          handleClick={() => setShowing(true)}
        >
          <Icon
            name="delete_outline-24px.svg"
            addClass="list-item__del-edit-icon"
          />
        </Button>

        <Link
          to={`/inventory/${data.id}/edit`}
          className="list-item__del-edit-link"
        >
          <Icon name="edit-24px.svg" addClass="list-item__del-edit-icon" />
        </Link>
      </div>
    </li>
  );
}
