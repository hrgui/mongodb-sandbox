require('./bootstrap');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {mergeSchemas} = require('graphql-tools');
const songSchema = require('./song');

const schema = mergeSchemas({
  schemas: [
    songSchema
  ]
});

const server = new ApolloServer({ schema });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);