import express from "express";
import {
  getCategorie,
  createCategorie,
} from "../controllers/categorie.controller.js";
const router = express.Router();
router.get("/", getCategorie);
router.post("/", createCategorie);
export default router;
