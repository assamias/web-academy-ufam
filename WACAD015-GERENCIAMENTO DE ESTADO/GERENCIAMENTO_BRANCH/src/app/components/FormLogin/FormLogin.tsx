"use client";
import { useAuth } from "../../state/AuthProvider";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  senha: string;
};

export default function FormLogin() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data.email);
  };

  return (
    <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Digite seu e-mail
          </label>
          <input
            type="email"
            className="form-control form-control-lg"
            id="email"
            aria-describedby="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">Esse campo é obrigatório</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">
            Digite sua senha
          </label>
          <input
            type="password"
            className="form-control form-control-lg"
            id="senha"
            {...register("senha", { required: true, minLength: 6 })}
          />
          {errors.senha?.type === "required" && (
            <span className="text-danger">Esse campo é obrigatório</span>
          )}

          {errors.senha?.type === "minLength" && (
            <span className="text-danger">Minímo de 6 (seis) caracteres </span>
          )}
        </div>

        <div className="d-grid col-12">
          <button type="submit" className="btn btn-success">
            Entrar
          </button>
        </div>

        <div className="text-center mt-3">
          <Link href="/cadastro" className="btn btn-link">
            Não possuo cadastro
          </Link>
        </div>
      </form>
    </div>
  );
}
