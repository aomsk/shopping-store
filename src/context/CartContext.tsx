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
  addQuantity: (productId: number) => void;
  subtractQuantity: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
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
          title: "Product Already Exists In Cart",
          showConfirmButton: false,
          timer: 1500,
        });
        setProductsInCart([...productsInCart]);
      }
    });
  };

  const addQuantity = (productId: number) => {
    setProductsInCart((prve) =>
      prve.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const subtractQuantity = (productId: number) => {
    setProductsInCart((prve) =>
      prve.map((item) =>
        item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeProductFromCart = (productId: number) => {
    setProductsInCart((prve) => prve.filter((item) => item.productId !== productId));
  };

  return (
    <CartContext.Provider
      value={{ productsInCart, addProductToCart, addQuantity, subtractQuantity, removeProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
