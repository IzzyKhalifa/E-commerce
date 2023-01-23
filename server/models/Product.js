const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 10,
  },
  category_name: {
    type: String,
    reference: {
      model: "category",
      key: "id",
    },
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
