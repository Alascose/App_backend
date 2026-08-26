import express from "express";
import { getVente, createVente } from "../controllers/vente.controller.js";
const router = express.Router();
router.get("/", getVente);
router.post("/", createVente);
export default router;
