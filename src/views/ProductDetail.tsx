import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Products } from "../utils/interface";

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
    <div className="">
      <h1 className="text-xl font-bold">{product?.title}</h1>
    </div>
  );
}

export default ProductDetail;
