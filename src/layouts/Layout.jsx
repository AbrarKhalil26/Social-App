import React from "react";
import AppNavbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AppFooter from "./Footer";

export default function Layout() {
  return (
    <main className="dark:bg-gray-900 dark:text-gray-100">
      <AppNavbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <AppFooter />
    </main>
  );
}
