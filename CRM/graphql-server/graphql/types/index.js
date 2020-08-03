const { mergeTypeDefs } = require("@graphql-tools/merge");

const Usuarios = require("./Usuarios.graphql");
const Productos = require("./Productos.graphql");

const typeDefs = [Usuarios,Productos];

// https://www.graphql-tools.com/docs/merge-typedefs

module.exports = mergeTypeDefs(typeDefs);
