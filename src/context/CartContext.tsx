import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export interface ICartContext {
  productId: number;
  quantity: number;
  price: number;
}

export type CartContextType = {
  productsInCart: ICartContext[];
  addProductToCart: (producrt: ICartContext) => void;
  addQuantity: (productId: number) => void;
  subtractQuantity: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
  removeAllproducs: () => void;
  formatMoney: (money: number) => string;
  checkout: () => void;
  totalPrice: number;
  totalAmount: number;
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: Props) => {
  const [productsInCart, setProductsInCart] = useState<ICartContext[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigate = useNavigate();

  // Calculate total and amount
  useEffect(() => {
    const initialsumTotalPriceValue = 0;
    const sumTotalPrice = productsInCart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      initialsumTotalPriceValue
    );
    setTotalPrice(sumTotalPrice);

    const initialQuatityValue = 0;
    const sumAmount = productsInCart.reduce((sum, product) => sum + product.quantity, initialQuatityValue);
    setTotalAmount(sumAmount);
  }, [productsInCart]);

  // Format total price
  const formatMoney = (money: number) => {
    return money
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  // Add product to cart
  const addProductToCart = (producrt: ICartContext) => {
    const newProduct: ICartContext = {
      productId: producrt.productId,
      quantity: producrt.quantity,
      price: producrt.price,
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

  // Add quantity
  const addQuantity = (productId: number) => {
    setProductsInCart((prve) =>
      prve.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  // subtract quantity
  const subtractQuantity = (productId: number) => {
    setProductsInCart((prve) =>
      prve.map((item) =>
        item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Remove products from cart
  const removeProductFromCart = (productId: number) => {
    setProductsInCart((prve) => prve.filter((item) => item.productId !== productId));
  };

  // Remove all products from cart
  const removeAllproducs = () => {
    const swalWithTailwindColors = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-error",
      },
      buttonsStyling: false,
    });
    void swalWithTailwindColors
      .fire({
        title: "Are you sure?",
        text: "to remove all products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setProductsInCart([]);
          void MySwal.fire("Deleted!", "Products has been deleted.", "success");
        }
      });
  };

  const checkout = () => {
    const swalWithTailwindColors = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-error",
      },
      buttonsStyling: false,
    });
    void swalWithTailwindColors
      .fire({
        title: "Are you sure?",
        text: "to check out all products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setProductsInCart([]);
          void MySwal.fire("Check Out!", "Products has been check out.", "success");
          navigate("/checkout");
        }
      });
  };

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        addProductToCart,
        addQuantity,
        subtractQuantity,
        removeProductFromCart,
        removeAllproducs,
        formatMoney,
        totalPrice,
        totalAmount,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
