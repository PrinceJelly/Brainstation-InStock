import Form from "../Reusable/Form";
import ComponentHeader from "../Reusable/ComponentHeader";
import InputField from "../Reusable/SearchInput";
import Btn from "../Reusable/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "../modal/WarehouseAddModal";
import React, { useState } from "react";
//can we rename the pass checks to something more consistent like PassedChecks

const postWarehouse = (newWarehouse) => {
  axios.post(`http://localhost:8080/warehouses`, newWarehouse);
};

export default function AddWarehouse({ removeError }) {
  const [showing, setShowing] = useState(false);
  const phoneValidator = /^(\d)?[ ]*[\(\.\-]?(\d{3})[\)\.\-]?[ ]*(\d{3})[\.\- ]?(\d{4})[ ]*(x|ext\.?)?[ ]*(\d{1,7})?$/;
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
      !target.numberinput.value.trim() ||
      !target.numberinput.value.match(phoneValidator)
    ) {
      target.numberinput.parentElement.classList.toggle("phonevalidationerror");
      passedChecks = false;
    } else {
      passedChecks = true;
    }
    if (
      !target.emailinput.value.trim() ||
      !target.emailinput.value.match("@")
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
      const newWarehouse = {
        name: event.target.nameinput.value,
        address: event.target.addressinput.value,
        city: event.target.cityinput.value,
        country: event.target.countryinput.value,
        contact: {
          name: event.target.contactnameinput.value,
          position: event.target.positioninput.value,
          phone: "+" + event.target.numberinput.value,
          email: event.target.emailinput.value,
        },
      };
      postWarehouse(newWarehouse);
      setShowing(true);
    }
  };
  return (
    <>
      <article className="container wh-details">
        {showing ? <Modal setShowing={setShowing} /> : ""}
        <ComponentHeader text="Add New Warehouse" backArrow="y" prevPage="/" />

        <Form id="addform" handleSubmit={handleSubmit}>
          <div className="form__left">
            <h2 className="form__subheader">Warehouse Details</h2>
            <label className="form__labels">
              Warehouse Name
              <InputField
                addClass="form__forminput"
                placeholder="Warehouse Name"
                name="nameinput"
                removeError={removeError}
                errorClass="validationerror"
              />
            </label>

            <label className="form__labels">
              Street Address
              <InputField
                addClass="form__forminput"
                placeholder="Street Address"
                name="addressinput"
                removeError={removeError}
                errorClass="validationerror"
              />
            </label>

            <label className="form__labels">
              City{" "}
              <InputField
                addClass="form__forminput"
                placeholder="City"
                name="cityinput"
                removeError={removeError}
                errorClass="validationerror"
              />
            </label>

            <label className="form__labels">
              Country{" "}
              <InputField
                addClass="form__forminput"
                placeholder="Country"
                name="countryinput"
                removeError={removeError}
                errorClass="validationerror"
              />
            </label>
          </div>
          <div className="form__right">
            <h2 className="form__subheader">Contact Details</h2>
            <label className="form__labels">
              Contact Name{" "}
              <InputField
                addClass="form__forminput"
                placeholder="Contact Name"
                name="contactnameinput"
                removeError={removeError}
                errorClass="validationerror"
              />
            </label>

            <label className="form__labels">
              Position
              <InputField
                addClass="form__forminput"
                placeholder="Position"
                name="positioninput"
                removeError={removeError}
                errorClass="validationerror"
              />
            </label>

            <label className="form__labels">
              Phone Number{" "}
              <InputField
                addClass="form__forminput"
                placeholder="Phone Number"
                name="numberinput"
                removeError={removeError}
                errorClass="phonevalidationerror"
              />
            </label>

            <label className="form__labels">
              Email
              <InputField
                addClass="form__forminput"
                placeholder="Email"
                name="emailinput"
                removeError={removeError}
                errorClass="emailvalidationerror"
              />
            </label>
          </div>
          <div className="form__buttons">
            <Link to={`/`} className="btn__cancel form__cancelbutton">
              Cancel
            </Link>
            <Btn
              addClass="btn__save form__savebutton"
            >
              + Add Warehouse
            </Btn>
          </div>
        </Form>
      </article>
    </>
  );
}
