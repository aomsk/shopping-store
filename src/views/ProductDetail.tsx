import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Products } from "../utils/interface";
import { AiFillStar } from "react-icons/ai";

// Context
import { CartContext, CartContextType } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Products>();

  // Context
  const { addProductToCart } = useContext(CartContext) as CartContextType;

  const handleAddProductToCart = (productId: number | undefined, price: number | undefined) => {
    if (productId !== undefined && price !== undefined) {
      addProductToCart({ productId, quantity: 1, price });
    }
  };
  // -------------

  const getProductData = async () => {
    await axios
      .get(`${import.meta.env.VITE_PRODUCTS_API}/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductData().catch((error) => {
      console.log(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:px-10 xl:pt-10">
      <div className="flex justify-center">
        <img src={product?.image} alt="" className="w-[150px] xl:w-[300px] h-fit pt-2" />
      </div>
      <div className="p-6">
        <h1 className="text-xl xl:text-2xl font-bold">{product?.title}</h1>
        <div className="badge badge-outline mt-5">{product?.category}</div>
        <span className="flex items-center mt-5">
          <AiFillStar className="mr-1 text-2xl" />
          {product?.rating.rate}
        </span>
        <p className="mt-5 text-justify">{product?.description}</p>
        <div className="flex items-end mt-10">
          <p className="text-xl xl:text-2xl font-bold mr-10">Price: {product?.price}$</p>
          <button
            type="button"
            className="btn btn-sm btn-primary btn-outline rounded-full mr-1"
            onClick={() => handleAddProductToCart(product?.id, product?.price)}
          >
            Buy Now
          </button>
          <button type="button" className="btn btn-sm rounded-full" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
