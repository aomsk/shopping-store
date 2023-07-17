import { createContext, useState } from "react";

export interface ICartContext {
  productId: number;
  quantity: number;
}

export type CartContextType = {
  products: ICartContext[];
  addProductToCart: (producrt: ICartContext) => void;
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: Props) => {
  const [products, setProducrts] = useState<ICartContext[]>([]);

  const addProductToCart = (producrt: ICartContext) => {
    const newProduct: ICartContext = {
      productId: producrt.productId,
      quantity: producrt.quantity,
    };
    setProducrts((prve) => [...prve, newProduct]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>{children}</CartContext.Provider>
  );
};
