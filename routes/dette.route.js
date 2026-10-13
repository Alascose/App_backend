import express from "express";
import {
  getDette,
  createDette,
  editeDette,
  deleteDette,
} from "../controllers/dette.controller.js";
const router = express.Router();
router.get("/", getDette);
router.post("/", createDette);
router.put("/:id", editeDette);
router.delete("/:id", deleteDette);
export default router;
