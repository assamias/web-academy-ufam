"use client";
import { useEffect } from "react";

function BootstrapClient() {
  useEffect(() => {
    // @ts-expect-error TS7016 -- Ignorar erro de tipagem para importação de módulo JS
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}

export default BootstrapClient;
