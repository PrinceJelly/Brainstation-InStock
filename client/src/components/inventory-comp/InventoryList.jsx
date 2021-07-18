import InventoryItemList from "./InventoryListItem";
import LoadingGif from "../Reusable/Loading";
import SortBar from "../Reusable/SortBar";

export default function InventoryList({
  inventoryState,
  handleDeleteInventoryItem,
}) {
  return inventoryState === null ? (
    <LoadingGif className="loading-gif" />
  ) : (
    <ul className="inv-list">
      <SortBar type="inv-list" addClass="sortbar--wh-details" />
      {inventoryState &&
        inventoryState.map((inventoryItemList) => {
          return (
            <InventoryItemList
              key={inventoryItemList.id}
              data={inventoryItemList}
              warehouseFlag={"y"}
              handleDeleteInventoryItem={handleDeleteInventoryItem}
            />
          );
        })}
    </ul>
  );
}
