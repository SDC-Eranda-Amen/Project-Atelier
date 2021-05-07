const mongoose = require('mongoose');
const db = require('./index.js');

const productsMetaSchema = new mongoose.Schema({
  product_id: String,
  meta: [{rating: Number, recommend: Boolean}],
  characteristics: [{name: String, id: String, reviews: [{id: String, value: Number}]}]
}, {collection: 'official_product_meta'})

const ProductsMeta = mongoose.model('official_product_meta', productsMetaSchema);

module.exports = ProductsMeta;