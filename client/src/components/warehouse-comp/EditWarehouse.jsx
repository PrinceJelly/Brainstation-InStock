import Form from "../Reusable/Form";
import ComponentHeader from "../Reusable/ComponentHeader";
import InputField from "../Reusable/SearchInput";
import Btn from "../Reusable/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { Link } from "react-router-dom";
import Modal from "../modal/WarehouseEditModal";

const editWarehouse = (editedWarehouse) => {
  axios.patch(`http://localhost:8080/warehouses`, editedWarehouse);
};

export default function EditWarehouse({ routerProps }) {
  const [showing, setShowing] = useState(false);
  const id2 = routerProps.match.params.id;
  const [warehouseData2, updateDetails2] = useState(null);
  const phoneValidator = /^(\d)?[ ]*[\(\.\-]?(\d{3})[\)\.\-]?[ ]*(\d{3})[\.\- ]?(\d{4})[ ]*(x|ext\.?)?[ ]*(\d{1,7})?$/;

  useEffect(() => {
    axios
      .get(`${serverUrl}/warehouses/${id2}`)
      .then((resp) => {
        updateDetails2(resp.data);
      })
      .catch((err) => console.log(err));
  }, [id2]);

  const clearError = ({ target }) => {
    target.classList.remove("validationerror");
  };

  const editCheck = ({ target }) => {
    let passedChecks = false;

    if (!target.nameinput.value.trim()) {
      target.nameinput.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.addressinput.value.trim()) {
      target.addressinput.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.cityinput.value.trim()) {
      target.cityinput.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.countryinput.value.trim()) {
      target.countryinput.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.contactnameinput.value.trim()) {
      target.contactnameinput.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (!target.positioninput.value.trim()) {
      target.positioninput.parentElement.classList.toggle("validationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (
      !target.numberinput.value.match ||
      !target.numberinput.value.match(phoneValidator)
    ) {
      target.numberinput.parentElement.classList.toggle("phonevalidationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (
      !target.emailinput.value.trim() ||
      !target.emailinput.value.includes("@")
    ) {
      target.emailinput.parentElement.classList.toggle("emailvalidationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }

    return passedChecks;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editCheck(event)) {
      const editedWarehouse = {
        id: id2,
        name: event.target.nameinput.value,
        address: event.target.addressinput.value,
        city: event.target.cityinput.value,
        country: event.target.countryinput.value,
        contact: {
          name: event.target.contactnameinput.value,
          position: event.target.positioninput.value,
          phone: event.target.numberinput.value,
          email: event.target.emailinput.value,
        },
      };
      setShowing(true);
      editWarehouse(editedWarehouse, id2);
    }
  };

  return warehouseData2 === null ? (
    <p>Loading Warehouse Deets</p>
  ) : (
    <>
      <article className="container wh-details">
        {showing ? <Modal setShowing={setShowing} /> : ""}
        <ComponentHeader
          text="Edit Warehouse"
          backArrow="y"
          prevPage={`/warehouse/${id2}`}
        />

        <Form handleSubmit={handleSubmit}>
          <div className="form__left">
            <h2 className="form__subheader">Warehouse Details</h2>
            <label className="form__labels">
              Warehouse Name{" "}
              <InputField
                removeError={clearError}
                name="nameinput"
                addClass="form__forminput"
                value={
                  warehouseData2
                    ? warehouseData2.warehouseDetails.name
                    : "loading"
                }
              />
            </label>
            <label className="form__labels">
              Street Address{" "}
              <InputField
                addClass="form__forminput"
                name="addressinput"
                value={
                  warehouseData2
                    ? warehouseData2.warehouseDetails.address
                    : "loading"
                }
              />
            </label>

            <label className="form__labels">
              City
              <InputField
                name="cityinput"
                addClass="form__forminput"
                value={
                  warehouseData2
                    ? warehouseData2.warehouseDetails.city
                    : "loading"
                }
              />
            </label>

            <label className="form__labels">
              Country
              <InputField
                name="countryinput"
                addClass="form__forminput"
                value={
                  warehouseData2
                    ? warehouseData2.warehouseDetails.country
                    : "loading"
                }
              />
            </label>
          </div>
          <div className="form__right">
            <h2 className="form__subheader">Contact Details</h2>
            <label className="form__labels">
              Contact Name
              <InputField
                name="contactnameinput"
                addClass="form__forminput"
                value={
                  warehouseData2
                    ? warehouseData2.warehouseDetails.contact.name
                    : "loading"
                }
              />
            </label>

            <label className="form__labels">
              Position
              <InputField
                name="positioninput"
                addClass="form__forminput"
                value={
                  warehouseData2
                    ? warehouseData2.warehouseDetails.contact.position
                    : "loading"
                }
              />
            </label>

            <label className="form__labels">
              Phone Number{" "}
              <InputField
                name="numberinput"
                type="tel"
                addClass="form__forminput"
                value={
                  warehouseData2
                    ? warehouseData2.warehouseDetails.contact.phone
                    : "loading"
                }
              />
            </label>

            <label className="form__labels">
              Email
              <InputField
                name="emailinput"
                addClass="form__forminput"
                value={
                  warehouseData2
                    ? warehouseData2.warehouseDetails.contact.email
                    : "loading"
                }
              />
            </label>
          </div>
          <div className="form__buttons">
            <Link
              to={`/warehouse/${id2}`}
              className="btn__cancel form__cancelbutton"
            >
              Cancel
            </Link>
            <Btn
              addClass="btn__save form__savebutton"
            >
              Save
            </Btn>
          </div>
        </Form>
      </article>
    </>
  );
}
