const Cliente = require("../../models/Cliente");

module.exports = ClientesResolvers = {
  Query: {},
  Mutation: {
    nuevoCliente: async (_, { input }) => {
      //Verificar si el cliente esta registrado
      
      const { email } = input;
      
      let cliente = await Cliente.findOne({ email });
      
      if (cliente) {
          throw new Error("El cliente ingresado ya esta registrado");
        }
        let nuevoCliente = new Cliente(input);
        
        //Asignar vendedor
        nuevoCliente.vendedor = "5f1ef103ff66f65458aea971";
        console.log(nuevoCliente);
        console.log('AJA');

      // Guardar BD

      try {
        const resultado = await nuevoCliente.save();

        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
