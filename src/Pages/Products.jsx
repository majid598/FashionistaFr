import { BiSolidDashboard } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  useGetAllProductsQuery,
  useGetAllCategoriesQuery,
} from "../redux/api/api";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const Products = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery("");
  const { data: allCategories } = useGetAllCategoriesQuery("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  if (isError) return toast.error("Cannot Fetch The Products");
  const products = data?.products;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products?.filter((product) => {
    if (selectedCategory === "all") {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        product.category.toLowerCase() === selectedCategory &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  useEffect(() => {
    setCategories(allCategories?.categories);
  }, []);

  console.log(categories);

  return (
    <div className="w-full min-h-screen -calc">
      <div className="uper h-60 flex items-end px-12 py-8 justify-between bg-white/10">
        <h1 className="text-4xl font-mono">Our Products</h1>
        <div className="w-2/4 relative">
          <SearchIcon className="absolute text-2xl top-1/2 left-2 text-zinc-300 -translate-y-1/2" />
          <input
            className="w-full bg-transparent pl-10 outline-none border-[1px] rounded-sm p-2"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search For Products"
          />
          {searchTerm.length > 0 && (
            <div className="w-full h-auto z-50 absolute top-12 flex flex-col">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  className="w-full p-3 bg-white/10 hover:bg-zinc-700"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-transparent outline-none">
            <option>Sort</option>
          </select>
          <Link>
            <BiSolidDashboard />
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex w-full gap-20">
        <div className="left w-1/4 bg-white/10 min-h-screen">
          <div className="flex-col px-12 items-start py-10 flex">
            <button
              className={`py-1 hover:bg-zinc-800 w-full ${
                selectedCategory === "all" && "bg-zinc-800"
              } text-start px-2 rounded-md`}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </button>
            {categories?.map((category) => (
              <button
                className={`py-1 hover:bg-zinc-800 w-full ${
                  selectedCategory === category && "bg-zinc-800"
                } text-start px-2 rounded-md capitalize`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {selectedCategory === "all" ? (
              <div className="w-3/4 grid grid-cols-3 px-10 gap-10 py-10 pb-20 overflow-x-hidden-screen">
                {products?.map((product) => (
                  <ProductCard key={product} product={product} />
                ))}
              </div>
            ) : (
              <div className="w-3/4 grid grid-cols-3 px-10 gap-10 py-10 pb-20 overflow-x-hidden-screen">
                {filteredProducts.map((product) => (
                  <ProductCard key={product} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
