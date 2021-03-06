import Layout from "../components/Layout";

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

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

const Index = () => {
  const router = useRouter();
  //Consulta de Apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  if (loading) {
    return <p>Loading...</p>
  }

  if (!data) {
    router.push("/login");
    return null;
  }

  //console.log(data);
  

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="/nuevocliente">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Cliente</a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-5">Nombre</th>
              <th className="w-1/5 py-5">Empresa</th>
              <th className="w-1/5 py-5">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">
                  {cliente.nombre} {cliente.apellido}
                </td>
                <td className="border px-4 py-2">{cliente.empresa}</td>
                <td className="border px-4 py-2">{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Index;
