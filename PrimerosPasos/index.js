const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./data/schema");
const resolvers = require("./data/resolvers");

// A map of functions which return data for the schema.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const miContext = "Kevin El maquina";

    return {
      miContext,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server run dev ${url}`);
});

module.exports = typeDefs;
