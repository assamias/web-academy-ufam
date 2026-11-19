import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

// Mock do componente Link do Next.js para renderizar como uma tag <a> comum no Jest
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("Componente Navbar", () => {
  test("deve renderizar o título principal do projeto", () => {
    render(<Navbar />);

    const brandElement = screen.getByText("Vitrine WA");
    expect(brandElement).toBeInTheDocument();
  });

  test("deve renderizar os links de navegação com os textos corretos", () => {
    render(<Navbar />);

    const inicioLink = screen.getByText("Início");
    const favoritosLink = screen.getByText("Lista de Favoritos");

    expect(inicioLink).toBeInTheDocument();
    expect(favoritosLink).toBeInTheDocument();
  });

  test("deve redirecionar para os caminhos (href) corretos ao clicar nos links", () => {
    render(<Navbar />);

    const brandLink = screen.getByText("Vitrine WA").closest("a");
    const inicioLink = screen.getByText("Início").closest("a");
    const favoritosLink = screen.getByText("Lista de Favoritos").closest("a");

    expect(brandLink).toHaveAttribute("href", "/");
    expect(inicioLink).toHaveAttribute("href", "/");
    expect(favoritosLink).toHaveAttribute("href", "/favorites");
  });

  test("deve renderizar o botão do menu responsivo (toggler) para telas menores", () => {
    render(<Navbar />);

    const buttonElement = screen.getByRole("button", { name: /abrir menu/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("data-bs-toggle", "collapse");
  });
});
