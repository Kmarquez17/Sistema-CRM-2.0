import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      email
      vendedor
    }
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      empresa
      apellido
      email
      telefono
      vendedor
    }
  }
`;

const nuevocliente = () => {
  const [msj, setMsj] = useState(null);
  const router = useRouter();
  //Mutation para crear nuevo cliente
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      //Obtener el objeto de cache que se desea actualizar

      const { obtenerClientesVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_USUARIO,
      });

      //Res-Escribimos el cache
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      empresa: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del cliente es obligatorio"),
      apellido: Yup.string().required("El apellido del cliente es obligatorio"),
      email: Yup.string()
        .email("Email no válido")
        .required("El email del cliente es obligatorio"),
      empresa: Yup.string().required("El empresa del cliente es obligatorio"),
      telefono: Yup.string().required("El teléfono del cliente es obligatorio"),
    }),
    onSubmit: async (valores) => {
      try {
        const { nombre, apellido, email, empresa, telefono } = valores;

        const { data } = await nuevoCliente({
          variables: {
            input: { nombre, apellido, email, empresa, telefono },
          },
        });

        //console.log(data.nuevoCliente);
        //Redireccionar a clientes
        router.push("/");
      } catch (error) {
        setMsj(error.message);
        setTimeout(() => {
          setMsj(null);
        }, 3000);
      }
    },
  });

  const Alert = ({ error }) => (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  );

  const mostrarMsj = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{msj}</p>
      </div>
    );
  };

  return (
    <Layout>
      {msj && mostrarMsj()}
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            {formik.touched.nombre && formik.errors.nombre ? (
              <Alert error={formik.errors.nombre} />
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus-outline-none focus:shadow-outline"
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </div>

            {formik.touched.apellido && formik.errors.apellido ? (
              <Alert error={formik.errors.apellido} />
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus-outline-none focus:shadow-outline"
                id="apellido"
                name="apellido"
                type="text"
                placeholder="Apellido del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <Alert error={formik.errors.email} />
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus-outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Email del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            {formik.touched.empresa && formik.errors.empresa ? (
              <Alert error={formik.errors.empresa} />
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empresa"
              >
                Empresa
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus-outline-none focus:shadow-outline"
                id="empresa"
                name="empresa"
                type="text"
                placeholder="Empresa donde labora el cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              />
            </div>

            {formik.touched.telefono && formik.errors.telefono ? (
              <Alert error={formik.errors.telefono} />
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Teléfono
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus-outline-none focus:shadow-outline"
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="Teléfono del cliente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Resitrar cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default nuevocliente;
