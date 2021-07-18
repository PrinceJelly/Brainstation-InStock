import WarehouseItem from "./WarehouseItem";

import LoadingGif from "../Reusable/Loading";
import SortBar from "../Reusable/SortBar";

export default function WarehouseList({
  warehouseState,
  handleDeleteWarehouse,
}) {
  return warehouseState === null ? (
    <LoadingGif className="loading-gif" />
  ) : (
    <section className="warehouse__section">
      <ul className="warehouse__list">
        <SortBar
          type="wh-list"
          addClass="sortbar--wh-details warehouse__details"
        />
        {warehouseState &&
          warehouseState.map((warehouseList) => {
            return (
              <WarehouseItem
                key={warehouseList.id}
                warehouseData={warehouseList}
                handleDeleteWarehouse={handleDeleteWarehouse}
              />
            );
          })}
      </ul>
    </section>
  );
}
