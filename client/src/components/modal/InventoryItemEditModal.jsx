import Button from "../Reusable/Button";
import Modal from "../Reusable/Modal";
import Icon from "../Reusable/react-svg-library";
import { Link } from "react-router-dom";
export default function ModalAdd({ setShowing }) {
  return (
    <main className="modal">
      <Modal>
          <Button
            addClass="modal__delete-button"
            handleClick={() => {
              setShowing(false);
            }}
          >
            <Icon name="close-24px.svg" />
          </Button>
        <div className="modal__content">
          <h1 className="modal__header">Success!</h1>
          <p className="modal__paragraph">
            Your changes have been recorded successfully. Please click
            "continue" to return to form.
          </p>
        </div>
        <span className="modal__btn-container">
          <Link to="/inventory">
            <Button
              addClass="btn__cancel modal__btn"
              handleClick={() => {
                setShowing(false);
              }}
            >
              Continue
            </Button>
          </Link>
        </span>
      </Modal>
    </main>
  );
}
