import React, { use } from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import "@testing-library/jest-dom";

// Função para retornar um Link mockado
jest.mock("next/link", () => {
  const MockedLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };
  MockedLink.displayName = "MockedLink";
  return MockedLink;
});

// Função para que o usePathname retorne uma rota específica durante os testes
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}));

describe("Navbar Component", () => {
  it('deve renderizar a tag principal com a role "navigation"', () => {
    render(<Navbar />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it('deve conter um link com o texto "Vitrine WA" que redireciona para "/"', () => {
    render(<Navbar />);
    const textLink = screen.getByText("Vitrine WA");
    expect(textLink).toBeInTheDocument();
    expect(textLink).toHaveAttribute("href", "/");
  });

  it('deve renderizar o link "Lista de Favoritos" que redireciona para "/favoritos"', () => {
    render(<Navbar />);
    const favoritosLink = screen.getByText("Lista de Favoritos");
    expect(favoritosLink).toBeInTheDocument();
    expect(favoritosLink).toHaveAttribute("href", "/favoritos");
  });
  it('deve renderizar o link "Início" que redireciona para "/"', () => {
    render(<Navbar />);
    const inicioLink = screen.getByText("Início");
    expect(inicioLink).toBeInTheDocument();
    expect(inicioLink).toHaveAttribute("href", "/");
  });
  it("deve renderizar o botão de toggler do menu com os atributos corretos", () => {
    render(<Navbar />);
    const togglerButton = screen.getByRole("button", { name: /abrir menu/i });
    expect(togglerButton).toBeInTheDocument();
    expect(togglerButton).toHaveAttribute("data-bs-toggle", "collapse");
    expect(togglerButton).toHaveAttribute("data-bs-target", "#navbarCollapse");
    expect(togglerButton).toHaveAttribute("aria-controls", "navbarCollapse");
    expect(togglerButton).toHaveAttribute("aria-expanded", "false");
  });
});
