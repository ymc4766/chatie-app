import Category from "../models/categoryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    const existingCategory = await Category.findOne({ title });

    if (existingCategory) {
      res.status(400);
      throw new Error("Category already exists");
    }
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

export const allCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("user")
      .sort("-createdAt");
    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.json(error);
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await Category.deleteOne({ _id: category._id });
      res.json({ message: "Category removed Succesfuly ..." });
    }
  } catch (error) {
    res.json(error);
  }
});

//fetch a single category
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id)
      .populate("user", "name")
      .sort("-createdAt");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});
