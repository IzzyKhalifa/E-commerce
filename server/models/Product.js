const { Schema, model } = require('mongoose');

const productSchema = new Schema (
  {
    id: {
      type: Number,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: String,
      allowNull: false,
    },
    price: {
      type: Number,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: Number,
      allowNull: false,
      default: 10,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: Number,
      reference: {
        model: 'category',
        key: 'id'
      }
    }
  },
);

const Product = model('Product' , productSchema);

module.exports = Product;
