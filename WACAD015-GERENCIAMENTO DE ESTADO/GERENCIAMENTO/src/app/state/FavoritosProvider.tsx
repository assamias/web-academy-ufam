"use client";
import { useState, createContext, useContext } from "react";

interface IFavoritosContext {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const FavoritosContext = createContext<IFavoritosContext>({
  favoritos: [],
  setFavoritos: () => {},
});

interface FavoritosProviderProps {
  children: React.ReactNode;
}

export const useFavoritosContext = () => {
  const favoritosContext = useContext(FavoritosContext);

  if (favoritosContext === undefined) {
    throw new Error(
      "useFavoritosContext deve ser usado dentro de um FavoritosProvider"
    );
  }

  return favoritosContext;
};

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  const values = {
    favoritos,
    setFavoritos,
  };

  return (
    <FavoritosContext.Provider value={values}>
      {children}
    </FavoritosContext.Provider>
  );
};

export default FavoritosProvider;
