// import { createContext, useState } from "react";

// export interface ICartContext {
//   id: number;
//   image: string;
//   price: number;
//   title: string;
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
//       id: producrt.id,
//       image: producrt.image,
//       price: producrt.price,
//       title: producrt.title,
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

import { createContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export interface ICartContext {
  productId: number;
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
  const [productsInCart, setProductsInCart] = useState<ICartContext[]>([]);

  const addProductToCart = (producrt: ICartContext) => {
    const newProduct: ICartContext = {
      productId: producrt.productId,
      quantity: producrt.quantity,
    };

    setProductsInCart((prve) => [...prve, newProduct]);
    void MySwal.fire({
      icon: "success",
      title: "Add Product To Cart Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    productsInCart.map((item) => {
      if (item.productId === newProduct.productId) {
        void MySwal.fire({
          icon: "warning",
          title: "Product already exists in cart",
          showConfirmButton: false,
          timer: 1500,
        });
        setProductsInCart([...productsInCart]);
      }
    });
  };

  return (
    <CartContext.Provider value={{ productsInCart, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
