const mongoose = require('mongoose');
const db = require('./index.js');

const productsMetaSchema = new mongoose.Schema({
  _id: String,
  meta: [{rating: Number, recommend: Boolean}],
}, {collection: 'official_product_meta'})

const ProductsMeta = mongoose.model('official_product_meta', productsMetaSchema);

module.exports = ProductsMeta;