const { mergeResolvers } = require("@graphql-tools/merge");
const UsuariosResolvers = require("./Usuarios");
const ProductosResolvers = require("./Productos");

const resolvers = [UsuariosResolvers,ProductosResolvers];

module.exports = mergeResolvers(resolvers);
