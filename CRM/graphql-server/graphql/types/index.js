const { mergeTypes } = require("merge-graphql-schemas");

const Usuarios = require("./Usuarios.graphql");

const typeDefs = [Usuarios];

module.exports = mergeTypes(typeDefs);
