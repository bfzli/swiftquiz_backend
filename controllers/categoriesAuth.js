const Category = require("../models/Category");

/*
 * CATEGORY MIDDLEWARES
 */
const categoryCreate = async (categories, role, res) => {
  try {
    const newCategory = new Category({
      ...categories,
      role,
    });
    await newCategory.save();
    return res.status(201).json({
      message: "Finally , a fucking category created properly !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't save a category try again, check if it already exists",
      success: false,
    });
  }
};

/**
 * Fetch All Categories
 */

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    return res.status(404).json({
      message: "Can't fetch categories !",
      success: false,
    });
  }
};

const serializeCategory = (category) => {
  return {
    _id: category._id,
    name: category.name,
    updatedAt: category.updatedAt,
    createdAt: category.createdAt,
  };
};

module.exports = {
  categoryCreate,
  serializeCategory,
  fetchCategories,
};
