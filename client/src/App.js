import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import WarehousePage from "./components/warehouse-comp/WarehousePage";
import WarehouseDetailsPage from "./components/warehouse-comp/WarehouseDetailsPage";
import AddWarehouse from "./components/warehouse-comp/AddWarehouse";
import EditWareHouse from "./components/warehouse-comp/EditWarehouse";
import InventoryPage from "./components/inventory-comp/InventoryPage";
import InventoryItemDetail from "./components/inventory-comp/InventoryItemDetail";
import EditInventoryItem from "./components/inventory-comp/EditInventoryItem";
import AddInventoryItem from "./components/inventory-comp/AddInventoryItem";
import PageNotFound from "./components/PageNotFound";

export const serverUrl = "http://localhost:8080";

class App extends Component {
  removeValidationError = (element, classN) => {
    const field = element.target.parentElement;
    if (field.classList.contains(classN)) {
      field.classList.remove(classN);
    }
  };

  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          component={WarehousePage}
          // Warehouse Component
        />
        <Route
          path="/warehouse/add"
          exact
          render={() => {
            return <AddWarehouse removeError={this.removeValidationError} />;
          }}
        />

        <Route
          path="/warehouse/:id/edit"
          render={(routerProps) => {
            return (
              <EditWareHouse
                routerProps={routerProps}
                removeError={this.removeValidationError}
              />
            );
          }}
        />
        <Route
          path="/warehouse/:id"
          exact
          render={(routerProps) => {
            return <WarehouseDetailsPage routerProps={routerProps} />;
          }}
        />

        <Route path="/inventory" exact component={InventoryPage} />

        <Route
          path="/inventory/add"
          exact
          render={(routerProps) => {
            return (
              <AddInventoryItem
                routerProps={routerProps}
                removeError={this.removeValidationError}
              />
            );
          }}
        />

        <Route
          path="/inventory/:id"
          exact
          render={(routerProps) => {
            return <InventoryItemDetail routerProps={routerProps} />;
          }}
        />

        <Route
          path="/inventory/:id/edit"
          render={(routerProps) => {
            return (
              <EditInventoryItem
                routerProps={routerProps}
                removeError={this.removeValidationError}
              />
            );
          }}
        />

        <Route exact path={["/warehouse", "/warehouse/"]}>
          <Redirect to="/" />
        </Route>

        <Route path="/*"><PageNotFound/></Route>
      </Switch>
    );
  }
}

export default App;
