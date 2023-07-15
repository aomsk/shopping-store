/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Products } from "../utils/interface";

const categories: string[] = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
  "all",
];

function Home() {
  const [products, setProducts] = useState<Products[]>([]);
  const [selectCategory, setSelectCategory] = useState("all");

  const getProductDatasync = async () => {
    if (selectCategory !== "") {
      await axios
        .get(`${import.meta.env.VITE_PRODUCTS_API}/products/category/${selectCategory}`)
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (selectCategory === "all" || selectCategory === "") {
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
    }
  };

  useEffect(() => {
    getProductDatasync().catch((error) => {
      console.log(error);
    });
  }, [selectCategory]);

  return (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-end items-center p-3">
        <div className="form-control w-full xl:w-[600px] xl:mr-5 xl:ml-0">
          <label className="label">
            <span className="label-text">What do you want?</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-5 w-full">
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className={
                  selectCategory === category
                    ? "badge badge-neutral ml-1 xl:ml-5 cursor-pointer"
                    : "badge badge-outline ml-1 xl:ml-5 cursor-pointer"
                }
                onClick={() => setSelectCategory(category)}
              >
                {category}
              </div>
            );
          })}
        </div>
        <div className="w-full p-4">
          <p className="text-2xl font-semibold text-end">Products: {products.length}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 p-5">
        {products &&
          products.map((product) => {
            return <Card key={product.id} {...product} />;
          })}
      </div>
    </>
  );
}

export default Home;
