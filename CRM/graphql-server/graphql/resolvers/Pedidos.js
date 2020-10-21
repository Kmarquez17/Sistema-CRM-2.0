const Pedido = require("../../models/Pedido");
const Producto = require("../../models/Producto");
const Cliente = require("../../models/Cliente");

const verificarUsuario = (usuario) => {
  //Verificar si el pedido existe  
  if (!usuario) {
    throw new Error("El usuario ya no esta Authorizado...!");
  }
};

const dataPedido = async (id) => {
  //Verificar si el pedido existe
  const pedido = await Pedido.findById(id);

  if (!pedido) {
    throw new Error("El pedido no exite...!");
  }
  return pedido;
};

module.exports = PedidosResolvers = {
  Query: {
    obtenerPedidos: async () => {
      try {
        const pedidos = await Pedido.find({});
        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerPedidosVendedor: async (_, {}, ctx) => {
      verificarUsuario(ctx.usuario);
      try {
        const pedidos = await Pedido.find({ vendedor: ctx.usuario.id });
        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerPedido: async (_, { id }, ctx) => {
      verificarUsuario(ctx.usuario);
      const pedido = await dataPedido(id);

      //Solo puede verlo quien lo creo
      if (pedido.vendedor.toString() !== ctx.usuario.id) {
        throw new Error(
          "El vendedor no tiene permiso de ver el detalle de este pedido"
        );
      }
      //Retornar el resultado

      return pedido;
    },
    obtenerPedidosEstado: async (_, { estado }, ctx) => {
      verificarUsuario(ctx.usuario);

      try {
        const pedidos = await Pedido.find({ vendedor: ctx.usuario.id, estado });

        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    nuevoPedido: async (_, { input }, ctx) => {
      const { cliente } = input;
      verificarUsuario(ctx.usuario);

      // console.log(ctx.usuario);

      //Verificar si el cliente existe o no
      let clienteExiste = await Cliente.findById(cliente);
      if (!clienteExiste) {
        throw new Error("El cliente no existe...!");
      }
      //Verificar que el cliente sea del vendedor
      if (clienteExiste.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("Este cliente no esta asociado a tu cuenta...!");
      }

      /**Tratar  de validar que cuando un producto sea malo del array que se envia uno
       * sale malo no actualizar el stock de los demas
       */

      //Revisar  que el stock este disponible
      for await (const articulo of input.pedido) {
        const { id } = articulo;
        const producto = await Producto.findById(id);
        if (articulo.cantidad === 0) {
          throw new Error(`La cantidad del producto a comprar mayor a cero`);
        }

        if (articulo.cantidad > producto.existencia) {
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
      try {
        const resultado = await newPedido.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarPedido: async (_, { id, input }, ctx) => {
      const { cliente } = input;
      verificarUsuario(ctx.usuario);
      const existePedido = await dataPedido(id);

      const clienteExiste = await Cliente.findById(cliente);

      if (!clienteExiste) {
        throw new Error("El cliente no existe");
      }

      //Verificar cliente  y pedido pertenecen al vendedor
      if (clienteExiste.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("Este cliente no esta asociado a tu cuenta...!");
      }

      //Revisar  que el stock este disponible
      for await (const articulo of existePedido.pedido) {
        const { id } = articulo;
        const producto = await Producto.findById(id);
        if (articulo.cantidad === 0) {
          throw new Error(`La cantidad del producto a comprar mayor a cero`);
        }

        /**Actualizar el stock cuando el estado sea distinto tanto en la BD y el input */
        if (input.estado !== existePedido.estado) {
          /*Si el estado cancelado viene del input se suma lo que se pidio cuando se creo el pedido*/
          if (input.estado === "CANCELADO") {
            producto.existencia += articulo.cantidad;
          } else {
            /**Se vuelve a sumar cuando el estado cancelado viene de la BD
             * en caso no se hace nada ya que pendiente y completado son la resta en el  stock
             * de productos
             */
            if (existePedido.estado === "CANCELADO") {
              producto.existencia -= articulo.cantidad;
            }
          }
        }

        await producto.save();
      }
      //Actualizar pedido
      const resultado = await Pedido.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return resultado;
    },
    eliminarPedido: async (_, { id }, ctx) => {
      verificarUsuario(ctx.usuario);
      const existePedido = await dataPedido(id);

      //Vertificar si el vendedor lo intenta borrar
      if (existePedido.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("El vendedor no tiene permiso para eliminar el pedido");
      }

      // eliminar BD

      await Pedido.findOneAndDelete({ _id: id });

      return "Pedido eliminado";
    },
  },
};
