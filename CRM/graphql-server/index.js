const { ApolloServer } = require("apollo-server");
const conectarDB = require("./config/db");
const schema = require("./graphql");

//Conectar base de datos
conectarDB();

const server = new ApolloServer({
  schema,
});

server.listen().then(({ url }) => {
  console.log(`Server run dev ${url}`);
});
