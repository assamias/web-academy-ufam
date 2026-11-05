"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";

export default function Example() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get("somekey");

  return (
    <>
      <h1>Exemplo de Rota Dinâmica</h1>
      <h2>Parâmetro da rota dinâmica: {params.slug}</h2>
      <h2>A rota atual é : {pathname}</h2>
      <h2>O valor retornado no query param é: {value}</h2>
    </>
  );
}
