import express from "express";
import {
  getVente,
  createVente,
  EditeVente,
  deleteVente,
} from "../controllers/vente.controller.js";
const router = express.Router();
router.get("/", getVente);
router.post("/", createVente);
router.put("/:id", EditeVente);
router.delete("/:id", deleteVente);
export default router;
