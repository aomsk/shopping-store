/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState, ChangeEvent, useContext } from "react";

// Components
import Card from "../components/Card";
import BadgeCategory from "../components/BadgeCategory";

// Util
import { Products } from "../utils/interface";

// Context
import { CartContext, CartContextType } from "../context/CartContext";

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
  const [search, setSearch] = useState<string>("");

  const { addProductToCart } = useContext(CartContext) as CartContextType;

  const handleAddProductToCart = (productId: number) => {
    addProductToCart({ productId, quantity: 1 });
  };

  const getProductData = async () => {
    if (selectCategory === "all") {
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
    if (selectCategory !== "all") {
      await axios
        .get(`${import.meta.env.VITE_PRODUCTS_API}/products/category/${selectCategory}`)
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data);
            setSearch("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSelectCategory("all");
  };

  useEffect(() => {
    getProductData().catch((error) => {
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
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-5 w-full">
          {categories.map((category, index) => {
            return (
              <BadgeCategory
                key={index}
                category={category}
                selectCategory={selectCategory}
                setSelectCategory={setSelectCategory}
              />
            );
          })}
        </div>
        <div className="w-full p-5">
          {search.length > 0 ? (
            ""
          ) : (
            <p className="text-2xl font-semibold text-end">Products: {products.length}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 p-5">
        {products &&
          products
            .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
            .map((product) => {
              return (
                <Card
                  key={product.id}
                  {...product}
                  handleAddProductToCart={handleAddProductToCart}
                />
              );
            })}
      </div>
    </>
  );
}

export default Home;
