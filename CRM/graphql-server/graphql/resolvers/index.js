const { mergeResolvers } = require("@graphql-tools/merge");
const UsuariosResolvers = require("./Usuarios");
const ProductosResolvers = require("./Productos");
const ClientesResolvers = require("./Clientes");
const PedidosResolvers = require("./Pedidos");

const resolvers = [
  UsuariosResolvers,
  ProductosResolvers,
  ClientesResolvers,
  PedidosResolvers,
];

module.exports = mergeResolvers(resolvers);
