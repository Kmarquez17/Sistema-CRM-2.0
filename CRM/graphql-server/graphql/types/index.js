const { mergeTypeDefs } = require("@graphql-tools/merge");

const Usuarios = require("./Usuarios.graphql");
const Productos = require("./Productos.graphql");
const Clientes = require("./Clientes.graphql");
const Pedidos = require("./Pedidos.graphql");

const typeDefs = [Usuarios, Productos, Clientes, Pedidos];

// https://www.graphql-tools.com/docs/merge-typedefs

module.exports = mergeTypeDefs(typeDefs);
