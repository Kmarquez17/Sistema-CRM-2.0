const { mergeTypeDefs } = require("@graphql-tools/merge");

const Usuarios = require("./Usuarios.graphql");

const typeDefs = [Usuarios];

module.exports = mergeTypeDefs(typeDefs);
