import Icon from "../Reusable/react-svg-library";
import { Link } from "react-router-dom";
import Button from "../Reusable/Button";
import React, { useState } from "react";
import Modal from "../modal/WarehouseDeleteModal";

export default function WarehouseItem({
  warehouseData,
  handleDeleteWarehouse,
}) {
  const { id, name, address, city, country, contact } = warehouseData;
  const [showing, setShowing] = useState(false);

  return (
    <li className="warehouse__item">
      {showing ? (
        <Modal
          setShowing={setShowing}
          warehouseName={warehouseData.name}
          warehouseID={warehouseData.id}
          handleDeleteWarehouse={handleDeleteWarehouse}
        />
      ) : (
        ""
      )}
      <div className="warehouse-list__container">
        <span className="warehouse-list__col-1">
          <span className="warehouse-list__separator warehouse-list__separator--link">
            <p className="warehouse-list__sub-header">warehouse</p>
            <Link
              to={`/warehouse/${id}`}
              className="warehouse-list__item--link"
            >
              {name}
              <Icon
                name="chevron_right-24px.svg"
                addClass="warehouse-list__chev-icon"
              />
            </Link>
          </span>

          <span className="warehouse-list__separator">
            <p className="warehouse-list__sub-header">address</p>
            <address className="warehouse-list__item">
              {address}, {city}, {country}
            </address>
          </span>
        </span>
        <span className="warehouse-list__col-2">
          <span className="warehouse-list__separator warehouse-list__seperator--name">
            <p className="warehouse-list__sub-header">contact name</p>
            <p className="warehouse-list__item">{contact.name}</p>
          </span>

          <span className="warehouse-list__separator">
            <p className="warehouse-list__sub-header">contact information</p>
            <p className="warehouse-list__item">{contact.phone}</p>
            <p className="warehouse-list__item">{contact.email}</p>
          </span>
        </span>
      </div>
      <div className="warehouse-list__icon-container">
        <span className="warehouse-list__icon-seperator">
          <Button
            addClass="list-item__delete-button"
            handleClick={() => setShowing(true)}
          >
            <Icon
              name="delete_outline-24px.svg"
              addClass="warehouse-list__del-edit-icon"
            />
          </Button>
          <Link to={`/warehouse/${id}/edit`}>
            <Icon
              name="edit-24px.svg"
              addClass="warehouse-list__del-edit-icon"
            />
          </Link>
        </span>
      </div>
    </li>
  );
}
