import express from "express";
import cors from "cors";
import categoriesRoute from "./routes/categorie.route.js";
import produitsRoute from "./routes/produit.route.js";
import reapprovisionnementRoute from "./routes/reapprovisionnement.route.js";
import venteRoute from "./routes/vente.route.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/categories", categoriesRoute);
app.use("/produits", produitsRoute);
app.use("/reapprovisionnement", reapprovisionnementRoute);
app.use("/ventes", venteRoute);
app.listen(4000, () => {
  console.log("API lancer sur le port: http://localhost:4000");
});
