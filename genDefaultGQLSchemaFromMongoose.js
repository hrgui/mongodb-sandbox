const {schemaComposer} = require('graphql-compose');
const {composeWithMongoose} = require('graphql-compose-mongoose');


module.exports = (mongooseModel, customizationOptions = {}) => {
  const modelName = mongooseModel.modelName.toLowerCase();
  const collectionName = mongooseModel.collection.name;
  // STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
  const tc = composeWithMongoose(mongooseModel, customizationOptions);

  // STEP 3: Add needed CRUD User operations to the GraphQL Schema
  // via graphql-compose it will be much much easier, with less typing
  schemaComposer.Query.addFields({
    [`${modelName}ById`]: tc.getResolver('findById'),
    [`${modelName}ByIds`]: tc.getResolver('findByIds'),
    [`${modelName}`]: tc.getResolver('findOne'),
    [`${collectionName}`]: tc.getResolver('findMany'),
    [`${modelName}Count`]: tc.getResolver('count'),
    [`${modelName}Connection`]: tc.getResolver('connection'),
    [`${modelName}Pagination`]: tc.getResolver('pagination'),
  });

  schemaComposer.Mutation.addFields({
    [`${modelName}CreateOne`]: tc.getResolver('createOne'),
    [`${modelName}CreateMany`]: tc.getResolver('createMany'),
    [`${modelName}UpdateById`]: tc.getResolver('updateById'),
    [`${modelName}UpdateOne`]: tc.getResolver('updateOne'),
    [`${modelName}UpdateMany`]: tc.getResolver('updateMany'),
    [`${modelName}RemoveById`]: tc.getResolver('removeById'),
    [`${modelName}RemoveOne`]: tc.getResolver('removeOne'),
    [`${modelName}RemoveMany`]: tc.getResolver('removeMany'),
  });

  const graphqlSchema = schemaComposer.buildSchema();
  return graphqlSchema;
}