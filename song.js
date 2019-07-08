const genDefaultGQLSchemaFromMongoose = require('./genDefaultGQLSchemaFromMongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = genDefaultGQLSchemaFromMongoose(mongoose.model('Song', new Schema({
  name: String
})));
