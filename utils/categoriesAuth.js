const Category = require("../models/Category");

/**
 *
 * CATEGORY MIDDLEWARES
 *
 *
 */
const categoryCreate = async (category, res) => {
  try {
    const name = await Category(category.name);

    const newCategory = new Category({
      name,
    });
    await newCategory.save();
    return res.status(201).json({
      message: "New Category added",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Can't add category right now !",
      success: false,
    });
  }
};

/**
 *
 *
 * Fetch All Categories
 *
 */

const fetchCategories = async (category, res) => {
  try {
    const categories = await Category.find(category.name);
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
