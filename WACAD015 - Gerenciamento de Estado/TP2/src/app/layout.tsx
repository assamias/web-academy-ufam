import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import FavoritesProvider from "./contexts/FavoritesContext/FavoritesProvider";
import AuthProvider from "./contexts/AuthContext/AuthProvider";

export const metadata: Metadata = {
  title: "WA Loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
            <ToastContainer />
            <BootstrapClient />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
