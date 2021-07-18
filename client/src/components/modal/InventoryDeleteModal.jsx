import Button from "../Reusable/Button";
import Modal from "../Reusable/Modal";
import { inventorydeleteID } from "../Utils/Axios";
import Icon from "../Reusable/react-svg-library";

export default function ModalDelete({
  setShowing,
  inventoryName,
  inventoryID,
  handleDeleteInventoryItem,
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
          <h1 className="modal__header">
            Delete {inventoryName} inventory item?
          </h1>
          <p className="modal__paragraph">
            Please confirm that you’d like to delete {inventoryName} from the
            inventory list. You won’t be able to undo this action.
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
            addClass="btn__delete  modal__btn"
            handleClick={() => {
              inventorydeleteID(inventoryID).then((res) => {
                handleDeleteInventoryItem();
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
