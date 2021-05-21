import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const USUARIO_LOGUEADO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      nombre
      apellido
    }
  }
`;

const Header = () => {
  const router = useRouter();
  const { data, loading, client } = useQuery(USUARIO_LOGUEADO);

  if (loading) return null;

  //Si no hay informacion
  if (!data) {
    return router.push("/login");
  }
  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    client.clearStore()
    localStorage.removeItem("token");
    router.push("/login");
    return null; 
  };

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola: {nombre} {apellido}
      </p>

      <button
        onClick={() => {
          cerrarSesion();
        }}
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        type="button"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
