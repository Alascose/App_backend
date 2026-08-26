import express from "express";
import {
  getProduit,
  createProduit,
} from "../controllers/produit.controller.js";
const router = express.Router();
router.get("/", getProduit);
router.post("/", createProduit);
export default router;
