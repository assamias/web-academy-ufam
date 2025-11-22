"use client";
import Link from "next/link";
import { useAuth } from "../../state/AuthProvider";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const noNavBar = ["/login", "/cadastro"];
  const { userEmail, logout } = useAuth();

  if (noNavBar.includes(pathname)) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loja WA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/favoritos">
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          {userEmail ? (
            // Exibir quando o usuário está logado
            <div className="d-flex align-items-center">
              {/* Exibe o email do usuário */}
              <span className="me-3 text-muted d-none d-md-block">
                Olá, {userEmail}
              </span>

              {/* Botão Sair (Logout) */}
              <button
                type="button"
                className="btn btn-danger" // Cor diferente para logout
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          ) : (
            // Exibir quando o usuário não está logado
            <Link className="nav-link" href="/login">
              <button type="button" className="btn btn-primary">
                Login / Cadastro
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
