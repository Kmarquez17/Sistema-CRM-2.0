const Pedido = require("../../models/Pedido");
const Producto = require("../../models/Producto");
const Cliente = require("../../models/Cliente");

module.exports = ProductosResolvers = {
  Query: {},
  Mutation: {
    nuevoPedido: async (_, { input }, ctx) => {
      if (!ctx.usuario) {
        throw new Error("El usuario ya no esta Authorizado...!");
      }
      //Verificar si el cliente existe o no
      const { cliente } = input;

      let clienteExiste = await Cliente.findById(cliente);
      if (!clienteExiste) {
        throw new Error("El cliente no existe...!");
      }
      //Verificar que el cliente sea del vendedor
      if (clienteExiste.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("Este cliente no esta asociado a tu cuenta...!");
      }
      
      
      /**Tratar de validar que cuando un producto sea malo del array que se envia uno 
       * sale malo no actualizar el stock de los demas
       */

      //Revisar  que el stock este disponible
      for await (const articulo of input.pedido) {
        const { id } = articulo;
        const producto = await Producto.findById(id);
        console.log(producto.existencia);
        if (articulo.cantidad === 0) {
          throw new Error(`La cantidad del producto a comprar mayor a cero`);
        }

        if (articulo.cantidad > producto.existencia) {
          contador += 1
          throw new Error(
            `El articulo: ${producto.nombre} excede la cantidad disponible`
          );
        } else {
          //Restar la cantidad del producto
          producto.existencia -= articulo.cantidad;
          await producto.save();
        }
      }      
      //Crear un nuevo pedido
      const newPedido = await new Pedido(input);
      //Asignarle un vendedor
      newPedido.vendedor = ctx.usuario.id;

      //Guardar BD
      const resultado = await newPedido.save();
      return resultado;
    },
  },
};
