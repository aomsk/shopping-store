import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Products } from "../utils/interface";

function Home() {
  const [products, setProducts] = useState<Products[]>([]);

  const getProductDatasync = async () => {
    await axios
      .get(`${import.meta.env.VITE_PRODUCTS_API}/products`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductDatasync().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 container mx-auto p-5">
      {products &&
        products.map((product) => {
          return <Card key={product.id} {...product} />;
        })}
    </div>
  );
}

export default Home;
