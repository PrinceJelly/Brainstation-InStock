const express = require("express");
const app = express();
const warehousesRoutes = require("./routes/warehouses");
const inventoriesRoutes = require("./routes/inventories");
const cors = require("cors");

//parsing req.body json
app.use(express.json());
app.use(cors());

//homepage of api
app.get("/", (req, res) => {
  res.send("<h2>Welcome to InStock's API</h2>");
});

app.use("/warehouses", warehousesRoutes);
app.use("/inventories", inventoriesRoutes);

app.get("/*", (req, res) => {
  res.send("<h1>This is not the warehouse you're looking for</h1>");
});

app.listen(8080, () => {
  console.log('listening at http://localhost"8080');
});
