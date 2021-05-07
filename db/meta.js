const mongoose = require('mongoose');
const db = require('./index.js');
const findOrCreate = require('mongoose-findorcreate');

const productsMetaSchema = new mongoose.Schema({
  product_id: String,
  rating_1: {type: Number, default: 0},
  rating_2: {type: Number, default: 0},
  rating_3: {type: Number, default: 0},
  rating_4: {type: Number, default: 0},
  rating_5: {type: Number, default: 0},
  recommended_false: {type: Number, default: 0},
  recommended_true: {type: Number, default: 0}
})
productsMetaSchema.plugin(findOrCreate);

const ProductsMeta = mongoose.model('ProductsMeta', productsMetaSchema);

module.exports = ProductsMeta;