import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// Context
import { CartContext, CartContextType } from "../context/CartContext";

function Cart() {
  const { productsInCart } = useContext(CartContext) as CartContextType;
  const navigate = useNavigate();

  return (
    <div className="container mx-auto xl:px-48">
      <div className="p-5 text-end">
        <h1 className="text-xl xl:text-2xl font-semibold">Total Price : xxx$</h1>
        <h1 className="text-xl xl:text-2xl font-semibold">Amount : {productsInCart.length}</h1>
      </div>
      {productsInCart.length > 0 ? (
        productsInCart.map((product) => {
          return (
            <div className="card card-side bg-base-100 shadow-xl m-5 xl:pl-8 pl-5" key={product.id}>
              <figure>
                <img
                  src={product.image}
                  alt=""
                  className="w-full md:w-[100px] lg:w-[100px] xl:w-[100px]"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p>Price : {product.price}</p>
                <p>Quantity : {product.quantity}</p>
                <div className="card-actions justify-end">
                  <div className="join">
                    <button className="btn join-item">+</button>
                    <button className="btn join-item">-</button>
                    <button className="btn btn-error join-item">Delete</button>
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
