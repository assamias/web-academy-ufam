"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../state/AuthProvider";
import { useEffect } from "react";

type Inputs = {
  nome: string;
  email: string;
  emailConfirmar: string;
  senha: string;
};

export default function Cadastro() {
  const router = useRouter();
  const { userEmail } = useAuth();

  // Redirecionar usuário logado
  useEffect(() => {
    if (userEmail) router.push("/");
  }, [userEmail, router]);

  const {
    register,
    handleSubmit,
    watch,   
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = () => {
    router.push("/login");
  };

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">

            <form onSubmit={handleSubmit(onSubmit)} className="w-100" style={{ maxWidth: 450 }}>
              
              {/* Nome */}
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  {...register("nome", { required: "O nome é obrigatório" })}
                />
                {errors.nome && <span className="text-danger">{errors.nome.message}</span>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  {...register("email", { required: "O email é obrigatório" })}
                />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
              </div>

              {/* Confirmar Email */}
              <div className="mb-3">
                <label className="form-label">Confirmar Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  {...register("emailConfirmar", {
                    required: "Esse campo é obrigatório",
                    validate: (value) =>
                      value === watch("email") || "Os emails não coincidem"
                  })}
                />
                {errors.emailConfirmar && <span className="text-danger">{errors.emailConfirmar.message}</span>}
              </div>

              {/* Senha */}
              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  {...register("senha", {
                    required: "A senha é obrigatória",
                    minLength: { value: 6, message: "Mínimo de 6 caracteres" }
                  })}
                />
                {errors.senha && <span className="text-danger">{errors.senha.message}</span>}
              </div>

              {/* Botão */}
              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success btn-lg">
                  Confirmar seu cadastro
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/login" className="btn btn-link">
                  Já possuo cadastro
                </Link>
              </div>

            </form>

          </div>
        </div>
      </div>
    </main>
  );
}
