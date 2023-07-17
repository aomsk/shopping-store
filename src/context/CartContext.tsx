import { createContext, useState } from "react";

export interface ICartContext {
  id: number;
  image: string;
  price: number;
  title: string;
  quantity: number;
}

export type CartContextType = {
  productsInCart: ICartContext[];
  addProductToCart: (producrt: ICartContext) => void;
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: Props) => {
  const [productsInCart, setProducrts] = useState<ICartContext[]>([]);

  const addProductToCart = (producrt: ICartContext) => {
    const newProduct: ICartContext = {
      id: producrt.id,
      image: producrt.image,
      price: producrt.price,
      title: producrt.title,
      quantity: producrt.quantity,
    };
    setProducrts((prve) => [...prve, newProduct]);
  };

  return (
    <CartContext.Provider value={{ productsInCart, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// import { createContext, useState } from "react";
// import { Products } from "../utils/interface";

// export interface ICartContext {
//   productId: number;
//   quantity: number;
// }

// export type CartContextType = {
//   productsInCart: ICartContext[];
//   addProductToCart: (producrt: ICartContext) => void;
// };

// type Props = {
//   children: JSX.Element | JSX.Element[];
// };

// export const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider = ({ children }: Props) => {
//   const [productsInCart, setProducrts] = useState<ICartContext[]>([]);

//   const addProductToCart = (producrt: ICartContext) => {
//     const newProduct: ICartContext = {
//       productId: producrt.productId,
//       quantity: producrt.quantity,
//     };
//     setProducrts((prve) => [...prve, newProduct]);
//   };

//   return (
//     <CartContext.Provider value={{ productsInCart, addProductToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
