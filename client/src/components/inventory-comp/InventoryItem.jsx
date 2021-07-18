import Icon from "../Reusable/react-svg-library";
import { Link } from "react-router-dom";

export default function InventoryItem({ data, warehouseFlag }) {
  return (
    <li className="list-item">
      <span className="list-item__separator">
        <p className="list-item__sub-header">INVENTORY ITEM</p>
        <Link to={`/inventory/${data.id}`} className="list-item__inv-link">
          {data.itemName}
          <Icon name="chevron_right-24px.svg" addClass="list-item__chev" />
        </Link>
      </span>

      <span className="list-item__separator">
        <p className="list-item__sub-header">STATUS</p>
        <p
          className={`list-item__text
           ${
            data.quantity > 0 ? "in-stock" : "oof-stock"
          }`}
        >
          {data.status.toUpperCase()}
        </p>
      </span>

      <span className="list-item__separator">
        <p className="list-item__sub-header">CATEGORY</p>
        <p className="list-item__text
        ">{data.category}</p>
      </span>

      <span className="list-item__separator">
        <p className="list-item__sub-header">QTY</p>
        <p className="list-item__text
        ">{data.quantity}</p>
      </span>

      {warehouseFlag === "y" ? (
        <span className="list-item__separator">
          <p className="list-item__sub-header">WAREHOUSE</p>
          <p className="list-item__text
          ">{data.warehouseName}</p>
        </span>
      ) : (
        ""
      )}
      <div className="list-item__modify-container">
        <Link
          to={`/inventory/${data.id}/delete`}
          className="list-item__inv-link"
        >
          <Icon name="delete_outline-24px.svg" />
        </Link>
        <Link to={`/inventory/${data.id}/edit`} className="list-item__inv-link">
          <Icon name="edit-24px.svg" />
        </Link>
      </div>
    </li>
  );
}
