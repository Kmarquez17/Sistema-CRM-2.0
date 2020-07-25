const { gql } = require("apollo-server");

const typeDefs = gql`
  type Curso {
    titulo: String
  }
  type Tecnologia {
    tecnologia: String
  }
 

  input CursoInput {
    tecnologia: String
  }
  type Query {
    obtenerCursos(inputs: CursoInput!): [Curso]
    # obtenerTecnologia: [Tecnologia]
  }
`;

module.exports = typeDefs;
