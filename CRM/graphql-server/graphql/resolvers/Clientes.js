const Cliente = require("../../models/Cliente");

module.exports = ClientesResolvers = {
  Query: {
    obtenerClientes: async (_, {}, ctx) => {
      //console.log(ctx);
      if (!ctx.usuario) {
        throw new Error("El usuario ya no esta Authorizado...!");
      }
      try {
        const clientes = await Cliente.find({});
        return clientes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerClientesVendedor: async (_, {}, ctx) => {
      //Verificar que en el token no venga undefined
      if (!ctx.usuario) {
        throw new Error("El usuario ya no esta Authorizado...!");
      }
      try {
        const clientes = await Cliente.find({
          vendedor: ctx.usuario.id.toString(),
        });

        return clientes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerCliente: async (_, { id }, ctx) => {
      if (!ctx.usuario) {
        throw new Error("El usuario ya no esta Authorizado...!");
      }
      //Revisar si el cliente existe
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("El cliente no existe...!");
      }

      //Quien lo creo puede verlo
      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("Este cliente no esta asociado a tu cuenta...!");
      }
      return cliente;
    },
  },
  Mutation: {
    nuevoCliente: async (_, { input }, ctx) => {
      //Verificar que en el token no venga undefined
      if (!ctx.usuario) {
        throw new Error("El usuario ya no esta Authorizado...!");
      }

      //Verificar si el cliente esta registrado
      const { email } = input;

      let cliente = await Cliente.findOne({ email });

      if (cliente) {
        throw new Error("El cliente ingresado ya esta registrado");
      }
      let nuevoCliente = new Cliente(input);

      //Asignar vendedor
      nuevoCliente.vendedor = ctx.usuario.id;

      // Guardar BD

      try {
        const resultado = await nuevoCliente.save();

        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarCliente: async (_, { id, input }, ctx) => {
      //Verificar que en el token no venga undefined
      if (!ctx.usuario) {
        throw new Error("El usuario ya no esta Authorizado...!");
      }

      //Verificar si el usuario existe
      let cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("El cliente no existe...!");
      }
      //Verificar si el vendedor es el que esta editando
      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("Este cliente no esta asociado a tu cuenta...!");
      }

      //Actualizar BD?
      cliente = await Cliente.findByIdAndUpdate({ _id: id }, input, {
        new: true,
      });

      return cliente;
    },
    eliminarCliente: async (_, { id }, ctx) => {
      //Verificar que en el token no venga undefined
      if (!ctx.usuario) {
        throw new Error("El usuario ya no esta Authorizado...!");
      }

      //Verificar si el usuario existe
      let cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("El cliente no existe...!");
      }
      //Verificar si el vendedor es el que esta editando
      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("Este cliente no esta asociado a tu cuenta...!");
      }

      //Eliminar BD

      await Cliente.findByIdAndDelete({ _id: id });
      return "Cliente eliminado...!";
    },
  },
};
