import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Products } from "../utils/interface";
import { AiFillStar } from "react-icons/ai";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Products>();

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
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:px-10 xl:pt-10">
      <div className="flex justify-center">
        <img src={product?.image} alt="" className="w-[150px] xl:w-[300px] h-fit pt-2" />
      </div>
      <div className="p-10">
        <h1 className="text-4xl font-bold">{product?.title}</h1>
        <div className="badge badge-outline mt-5">{product?.category}</div>
        <span className="flex items-center mt-5">
          <AiFillStar className="mr-1 text-2xl" />
          {product?.rating.rate}
        </span>
        <p className="mt-5">{product?.description}</p>
        <div className="flex items-end mt-10">
          <p className="text-2xl font-bold mr-10">Price: {product?.price}$</p>
          <button type="button" className="btn">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
