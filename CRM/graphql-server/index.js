const { ApolloServer } = require("apollo-server");
const conectarDB = require("./config/db");
const schema = require("./graphql");

const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

//Conectar base de datos
conectarDB();

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    // console.log(req.headers["authorization"]);
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const usuario = jwt.verify(token, process.env.SECRETA);
        // console.log(usuario);

        return {usuario}
      } catch (error) {
        console.log(error);
      }
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server run dev ${url}`);
});
