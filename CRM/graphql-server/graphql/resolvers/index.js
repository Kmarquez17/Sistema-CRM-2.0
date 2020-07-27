const { mergeResolvers } = require("merge-graphql-schemas");
const UsuariosResolvers = require("./Usuarios");

const resolvers = [UsuariosResolvers];

module.exports = mergeResolvers(resolvers);
