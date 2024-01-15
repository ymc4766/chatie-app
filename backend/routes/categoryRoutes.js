import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  allCategory,
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", protect, createCategory);
router.get("/", protect, allCategory);
router
  .route("/:id")
  .delete(protect, deleteCategory)
  .get(protect, getCategory)
  .put(protect, updateCategory);

export default router;
