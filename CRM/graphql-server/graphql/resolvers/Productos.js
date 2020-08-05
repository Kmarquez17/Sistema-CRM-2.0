const Producto = require("../../models/Producto");

// const verificarProducto = async (id) => {
//   const producto = await Producto.findById(id);
//   if (!producto) {
//     throw new Error("Producto no encontrado...!");
//   }

//   return producto;
// };

module.exports = ProductosResolvers = {
  Query: {
    obtenerProductos: async () => {
      try {
        const productos = await Producto.find({});
        return productos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerProducto: async (_, { id }) => {
      //Revisar si el producto existe
      const producto = await Producto.findById(id);
      if (!producto) {
        throw new Error("Producto no encontrado...!");
      }

      return producto;
    },
  },
  Mutation: {
    nuevoProducto: async (_, { input }) => {
      try {
        const producto = new Producto(input);
        //Almacenar a la BD
        const resultado = await producto.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarProducto: async (_, { id, input }) => {
      //Revisar si el producto existe
      let producto = await Producto.findById(id);

      if (!producto) {
        throw new Error("Producto no encontrado...!");
      }

      //Actualizarlo en la base de datos

      producto = await Producto.findByIdAndUpdate({ _id: id }, input, {
        new: true,
      });

      return producto;
    },

    eliminarProducto: async (_, { id }) => {
      //Revisar si el producto existe
      let producto = await Producto.findById(id);

      if (!producto) {
        throw new Error("Producto no encontrado...!");
      }

      //Eliminamos el producto
      await Producto.findByIdAndDelete({ _id: id });

      return "Producto eliminado...!";
    },
  },
};
