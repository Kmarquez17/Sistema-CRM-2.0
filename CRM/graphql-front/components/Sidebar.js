import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path ? "bg-blue-800 p-2" : "p-2";
  };
  
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={isActive("/")}>
          <Link href="/">
            <a className="text-white block">Clientes</a>
          </Link>
        </li>
        <li className={isActive("/pedidos")}>
          <Link href="/pedidos">
            <a className="text-white block">Pedidos</a>
          </Link>
        </li>
        <li className={isActive("/productos")}>
          <Link href="/productos">
            <a className="text-white block">Productos</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
