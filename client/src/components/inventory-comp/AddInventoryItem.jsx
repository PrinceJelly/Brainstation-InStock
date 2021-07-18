import Form from "../Reusable/Form";
import ComponentHeader from "../Reusable/ComponentHeader";
import InputField from "../Reusable/SearchInput";
import Btn from "../Reusable/Button";
import TextArea from "../Reusable/TextArea";
import DropDownList from "../Reusable/DropDownList";
import RadioStockBtn from "../Reusable/RadioStockBtn";
import Modal from "../modal/InventoryItemEditModal";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

export default function AddInventoryItem({ removeError }) {
  const [showing, setShowing] = useState(false);
  const [stock, updateStock] = useState("In Stock");
  const [whcat, setWhCat] = useState(null);

  const postItem = (newItem) => {
    axios
      .post(`http://localhost:8080/inventories`, newItem)

      .catch((err) => console.log(err));
  };

  const getWhAndCat = () => {
    axios
      .get("http://localhost:8080/inventories/whcat")
      .then((res) => {
        setWhCat(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWhAndCat();
  }, []);

  const handleStockClick = (e) => {
    updateStock(e.target.value);
  };

  const editCheck = ({ target }) => {
    let passedChecks = false;

    if (!target.warehouseDD.value.trim()) {
      target.warehouseDD.parentElement.classList.toggle("validationerror");
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

    if (!stock) {
      target.stock[0].parentElement.parentElement.classList.toggle(
        "validationerror"
      );
      passedChecks = false;
    } else {
      passedChecks = true;
    }

    if (stock === "In Stock" && !target.itemQty.value) {
      target.itemQty.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }

    return passedChecks;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editCheck(event)) {
      const newItem = {
        warehouseName: event.target.warehouseDD.value,
        itemName: event.target.itemName.value,
        description: event.target.itemDesc.value,
        category: event.target.categoryDD.value,
        status: stock,
        quantity: stock === "In Stock" ? event.target.itemQty.value : 0,
      };
      setShowing(true);
      postItem(newItem);
    }
  };

  return (
    <article className="container wh-details">
      {showing ? <Modal setShowing={setShowing} /> : ""}
      <ComponentHeader
        text="Add New Inventory Item"
        backArrow="y"
        prevPage={`/inventory`}
      />

      <Form handleSubmit={handleSubmit}>
        <div className="form__left">
          <h2 className="form__subheader">Item Details</h2>

          <label className="form__labels">
            Item Name
            <InputField
              name="itemName"
              addClass="form__forminput"
              removeError={removeError}
              errorClass="validationerror"
              placeholder="Item Name"
            />
          </label>

          <label className="form__labels">
            Description
            <TextArea
              name="itemDesc"
              addClass="form__forminput"
              removeError={removeError}
              errorClass="validationerror"
              placeholder="Please enter a brief item description..."
            />
          </label>

          <label className="form__labels">
            Category
            {whcat ? (
              <DropDownList name="categoryDD" options={whcat.categories} />
            ) : (
              ""
            )}
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
                removeError={removeError}
                errorClass="validationerror"
              />
            </label>
          ) : (
            ""
          )}
          <label className="form__labels">
            Warehouse
            {whcat ? (
              <DropDownList name="warehouseDD" options={whcat.whlocation} />
            ) : (
              ""
            )}
          </label>
        </div>
        <div className="form__buttons">
          <Link to={`/inventory`} className="btn__cancel form__cancelbutton">
            Cancel
          </Link>
          <Btn
            addClass="btn__save form__savebutton"
          >
            + Add Item
          </Btn>
        </div>
      </Form>
    </article>
  );
}
