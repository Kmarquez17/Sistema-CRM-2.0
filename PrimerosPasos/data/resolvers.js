const cursos = [
  {
    titulo: "JavaScript Moderno Guía Definitiva Construye +10 Proyectos",
    tecnologia: "JavaScript ES6",
  },
  {
    titulo: "React – La Guía Completa: Hooks Context Redux MERN +15 Apps",
    tecnologia: "React",
  },
  {
    titulo: "Node.js – Bootcamp Desarrollo Web inc. MVC y REST API’s",
    tecnologia: "Node.js",
  },
  {
    titulo: "ReactJS Avanzado – FullStack React GraphQL y Apollo",
    tecnologia: "React",
  },
];

const resolvers = {
  Query: {
    obtenerCursos: (_,{inputs}, ctx) => {
      console.log(ctx);
     const resultado = cursos.filter((curso)=>curso.tecnologia === inputs.tecnologia)
     return resultado
    },
    // obtenerTecnologia: () => cursos,
  },
};

module.exports = resolvers;
