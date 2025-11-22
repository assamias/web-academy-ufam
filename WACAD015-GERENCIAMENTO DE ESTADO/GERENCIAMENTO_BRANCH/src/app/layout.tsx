import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import FavoritosProvider from "./state/FavoritosProvider";
import AuthProvider from "./state/AuthProvider";

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
          <FavoritosProvider>
            <Navbar />
            {children}
            <BootstrapClient />
          </FavoritosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
