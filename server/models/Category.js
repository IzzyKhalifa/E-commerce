const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    id: {
      type: Number,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: String,
      allowNull: false,
    },
  },
);

const Category = model('Category', categorySchema);

module.exports = Category;
