const Producto = require("../../models/Producto");

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
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new Error("No es un ID valido");
      }
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
  },
};
