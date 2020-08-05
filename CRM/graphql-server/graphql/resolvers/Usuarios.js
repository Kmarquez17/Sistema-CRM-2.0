const Usuario = require("../../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });

const crearToken = (usuario, secreta, expiresIn) => {
  // console.log(usuario);
  const { id, nombre, apellido, email } = usuario;

  return jwt.sign({ id, nombre, apellido, email }, secreta, { expiresIn });
};

module.exports = UsuariosResolvers = {
  Query: {
    obtenerUsuario: async (_, { token }) => {
      const usuarioID = await jwt.verify(token, process.env.SECRETA);
      return usuarioID;
    },
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input;
      //Revisar si el usuario ya esta registrado
      const existeUsuario = await Usuario.findOne({ email });

      if (existeUsuario) {
        throw new Error("El usuario ya esta registrado");
      }

      //Hash pass
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);
      try {
        //Guardarlo en la base de datos
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        throw new Error("Hubo un error");
      }
    },
    autenticarUsuario: async (_, { input }) => {
      //Si el usuario existe

      const { email, password } = input;
      //Revisar si el usuario ya esta registrado
      const existeUsuario = await Usuario.findOne({ email });

      if (!existeUsuario) {
        throw new Error("El usuario no esta registrado");
      }
      //revisar si el pass es correcto
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeUsuario.password
      );

      if (!passwordCorrecto) {
        throw new Error("El password es incorrecto");
      }

      return {
        token: crearToken(existeUsuario, process.env.SECRETA, "1h"),
      };

      //crear el token
    },
  },
};