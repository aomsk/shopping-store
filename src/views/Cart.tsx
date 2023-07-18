import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Products } from "../utils/interface";

// Context
import { CartContext, CartContextType } from "../context/CartContext";

function Cart() {
  const {
    productsInCart,
    addQuantity,
    subtractQuantity,
    removeProductFromCart,
    removeAllproducs,
    totalPrice,
    totalAmount,
    formatMoney,
  } = useContext(CartContext) as CartContextType;
  const navigate = useNavigate();
  const [products, setproducts] = useState<Products[]>([]);

  const handleAddQuantity = (productId: number | undefined) => {
    addQuantity(productId as number);
  };

  const handleSubtractQuantity = (productId: number | undefined) => {
    subtractQuantity(productId as number);
  };

  const handleRemoveProductFromCart = (productId: number | undefined) => {
    removeProductFromCart(productId as number);
  };

  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_PRODUCTS_API}/products`)
      .then((response) => {
        if (response.status === 200) {
          setproducts(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData().catch((error) => {
      console.log(error);
    });
  }, [productsInCart]);

  const productsInCartFilter = productsInCart.map((cartItem) =>
    products.find((product) => product.id === cartItem.productId)
  );

  return (
    <div className="container mx-auto xl:px-48">
      <div className="p-5 text-end">
        <h1 className="text-xl xl:text-2xl font-semibold">Total Price : {formatMoney(totalPrice)} $</h1>
        <h1 className="text-xl xl:text-2xl font-semibold">Amount : {totalAmount}</h1>
        {productsInCart.length > 0 && (
          <button className="btn btn-outline btn-error btn-sm mt-2" onClick={removeAllproducs}>
            Delete ALl
          </button>
        )}
      </div>
      {productsInCartFilter.length > 0 ? (
        productsInCartFilter.map((product, index) => {
          return (
            <div className="card card-side bg-base-100 shadow-xl m-5 xl:pl-8 pl-5" key={index}>
              <figure>
                <img src={product?.image} alt="" className="w-full md:w-[100px] lg:w-[100px] xl:w-[100px]" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product?.title}</h2>
                <p>Price : {product?.price}</p>
                <p>Quantity : {productsInCart[index]?.quantity}</p>
                <div className="card-actions justify-end">
                  <div className="join">
                    <button className="btn join-item" onClick={() => handleAddQuantity(product?.id)}>
                      +
                    </button>
                    <button className="btn join-item" onClick={() => handleSubtractQuantity(product?.id)}>
                      -
                    </button>
                    <button
                      className="btn btn-error join-item"
                      onClick={() => handleRemoveProductFromCart(product?.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center mt-48">
          <h1 className="text-center text-xl xl:text-2xl font-semibold">Cart Empty</h1>
          <button type="button" className="btn mt-4" onClick={() => navigate("/")}>
            Back To Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
