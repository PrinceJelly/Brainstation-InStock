import Button from "../Reusable/Button";
import Modal from "../Reusable/Modal";
import { warehouseDeleteID } from "../Utils/Axios";
import Icon from "../Reusable/react-svg-library";

export default function ModalDelete({
  setShowing,
  warehouseName,
  warehouseID,
  handleDeleteWarehouse,
}) {
  return (
    <main className="modal">
      <Modal>
          <Button
            addClass="modal__delete-button"
            handleClick={() => setShowing(false)}
          >
            <Icon name="close-24px.svg" />
          </Button>
        <div className="modal__content">
          <h1 className="modal__header">Delete {warehouseName} warehouse?</h1>
          <p className="modal__paragraph">
            Please confirm you'd like to delete the {warehouseName} {""}
            from the list of warehouses. You won't be able to undo this action.
          </p>
        </div>
        <span className="modal__btn-container">
          <Button
            addClass="btn__cancel modal__btn"
            handleClick={() => setShowing(false)}
          >
            Cancel
          </Button>
          <Button
            addClass="btn__delete modal__btn"
            handleClick={() => {
              warehouseDeleteID(warehouseID).then((res) => {
                handleDeleteWarehouse();
              });
            }}
          >
            Delete
          </Button>
        </span>
      </Modal>
    </main>
  );
}
