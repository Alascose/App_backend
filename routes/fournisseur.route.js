import express from "express";
import {
  createFournisseur,
  getFournisseur,
} from "../controllers/fournisseur.controller.js";
const router = express.Router();
router.get("/", getFournisseur);
router.post("/", createFournisseur);
export default router;
