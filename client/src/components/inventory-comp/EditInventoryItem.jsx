import Form from "../Reusable/Form";
import ComponentHeader from "../Reusable/ComponentHeader";
import InputField from "../Reusable/SearchInput";
import Btn from "../Reusable/Button";
import TextArea from "../Reusable/TextArea";
import DropDownList from "../Reusable/DropDownList";
import RadioStockBtn from "../Reusable/RadioStockBtn";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getInventoryItemEdit, patchInventoryItem } from "../Utils/Axios";
import Modal from "../modal/InventoryItemEditModal";

export default function EditInventoryItem({ routerProps, removeError }) {
  const invId = routerProps.match.params.id;

  const [data, updateData] = useState(null);
  const [stock, updateStock] = useState(null);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    getInventoryItemEdit(invId).then((resp) => {
      updateData(resp);
      resp.inventoryItem.quantity > 0
        ? updateStock("In Stock")
        : updateStock("Out of Stock");
    });
  }, [invId]);

  const handleStockClick = (e) => {
    const value = e.target.value;
    if (stock === "value") {
      return "";
    }
    updateStock(value);
  };

  const formValidation = ({ target }) => {
    let passedChecks = false;

    if (!target.itemName.value.trim()) {
      target.itemName.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.itemDesc.value.trim()) {
      target.itemDesc.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.categoryDD.value.trim()) {
      target.cityinput.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.categoryDD.value.trim()) {
      target.cityinput.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.warehouseDD.value.trim()) {
      target.warehouseDD.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }

    return passedChecks;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let qty = 0;

    if (stock === "In Stock" && event.target.itemQty.value) {
      qty = event.target.itemQty.value;
    } else if (stock === "In Stock") {
      qty = data.inventoryItem.quantity;
    } else {
      qty = 0;
    }

    if (formValidation(event, qty)) {
      const editedInventory = {
        id: data.inventoryItem.id,
        warehouseID: data.inventoryItem.warehouseID,
        warehouseName: data.inventoryItem.warehouseName,
        itemName: event.target.itemName.value
          ? event.target.itemName.value
          : data.inventoryItem.itemName,
        description: event.target.itemDesc.value
          ? event.target.itemDesc.value
          : data.inventoryItem.description,
        category: event.target.categoryDD.value
          ? event.target.categoryDD.value
          : data.inventoryItem.category,
        status: event.target.stock.value,
        quantity: parseInt(qty),
      };

      patchInventoryItem(data.inventoryItem.id, editedInventory).then(
        (resp) => {
          getInventoryItemEdit(resp.id);
          setShowing(true);
        }
      );
    }
  };

  return data === null ? (
    <h1 className="component-head__header" style={{ textAlign: "center" }}>
      Loading Inventory Details
    </h1>
  ) : (
    <article className="container wh-details">
      {showing ? <Modal setShowing={setShowing} /> : ""}
      <ComponentHeader
        text="Edit Inventory Item"
        backArrow="y"
        prevPage={`/inventory/${invId}`}
      />

      <Form handleSubmit={handleSubmit}>
        <div className="form__left">
          <h2 className="form__subheader">Item Details</h2>

          <label className="form__labels">
            Item Name
            <InputField
              name="itemName"
              addClass="form__forminput"
              value={data ? data.inventoryItem.itemName : "Loading"}
              placeholder=""
              removeError={removeError}
              errorClass="validationerror"
            />
          </label>

          <label className="form__labels">
            Description
            <TextArea
              name="itemDesc"
              addClass="form__forminput"
              value={data ? data.inventoryItem.description : "Loading"}
              placeholder=""
              removeError={removeError}
              errorClass="validationerror"
            />
          </label>

          <label className="form__labels">
            Category
            <DropDownList
              name="categoryDD"
              options={data.categories}
              selectedOption={data.inventoryItem.category}
            />
          </label>
        </div>
        <div className="form__right">
          <h2 className="form__subheader">Item Availability</h2>

          <label className="form__labels">
            Status
            <span className="form__radio-container">
              <RadioStockBtn
                labelName="In stock"
                value="In Stock"
                handleClick={handleStockClick}
                checked={stock === "In Stock"}
              />
              <RadioStockBtn
                labelName="Out of stock"
                value="Out of Stock"
                handleClick={handleStockClick}
                checked={stock === "Out of Stock"}
              />
            </span>
          </label>

          {stock === "In Stock" ? (
            <label className="form__labels">
              Quantity
              <InputField
                type="number"
                name="itemQty"
                addClass="form__forminput"
                value={data ? data.inventoryItem.quantity : "Loading"}
                placeholder=""
                removeError={removeError}
                errorClass="validationerror"
              />
            </label>
          ) : (
            ""
          )}

          <label className="form__labels">
            Warehouse
            <DropDownList
              name="warehouseDD"
              options={data.locations}
              selectedOption={data.inventoryItem.warehouseName}
              disabled="y"
            />
          </label>
        </div>
        <div className="form__buttons">
          <Link
            to={`/inventory/${invId}`}
            className="btn__cancel form__cancelbutton"
          >
            Cancel
          </Link>
          <Btn addClass="btn__save form__savebutton">Save</Btn>
        </div>
      </Form>
    </article>
  );
}
