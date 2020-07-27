const { mergeResolvers } = require("@graphql-tools/merge");
const UsuariosResolvers = require("./Usuarios");

const resolvers = [UsuariosResolvers];

module.exports = mergeResolvers(resolvers);
