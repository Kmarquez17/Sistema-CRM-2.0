const { mergeResolvers } = require("@graphql-tools/merge");
const UsuariosResolvers = require("./Usuarios");
const ProductosResolvers = require("./Productos");
const ClientesResolvers = require("./Clientes");

const resolvers = [UsuariosResolvers, ProductosResolvers,ClientesResolvers];

module.exports = mergeResolvers(resolvers);
