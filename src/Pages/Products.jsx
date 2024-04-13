import { BiSolidDashboard } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/api/api";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

export const product = {
  _id: Date.now() + Math.random(),
  price: 699,
  title: "LUXUARY WATCH",
  imgs: ["./assets/watch.jpg", "./assets/3.jpg", "./assets/5.jpg"],
  category: "watch",
  desc: "this is the most sold product on our site it has four variants white, red, blue, and the yellow",
  stock: 1,
};

// export const products = [
//   {
//     _id: Date.now() + Math.random(),
//     price: "699",
//     title: "LUXUARY WATCH",
//     stock: 2,
//     img: "./assets/watch.jpg",
//     category: "watch",
//     reviews: 2,
//   },
//   {
//     _id: Date.now() + Math.random(),
//     price: "3909",
//     title: "VIVO Y24",
//     stock: 4,
//     img: "./assets/mo.jpg",
//     category: "mobile",
//     reviews: 6,
//   },
//   {
//     _id: Date.now() + Math.random(),
//     price: "699",
//     title: "MACBOOK",
//     stock: 8,
//     img: "./assets/macbook.webp",
//     category: "laptop",
//     reviews: 4,
//   },
// ];


const Products = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery("");

  if (isError) return toast.error("Cannot Fetch The Products");

  return (
    <div className="w-full min-h-screen -calc">
      <div className="uper h-60 flex items-end px-12 py-8 justify-between bg-white/10">
        <h1 className="text-4xl font-mono">Our Products</h1>
        <div className="w-2/4 relative">
          <SearchIcon className="absolute text-2xl top-1/2 left-2 text-zinc-300 -translate-y-1/2" />
          <input
            className="w-full bg-transparent pl-10 outline-none border-[1px] rounded-sm p-2"
            type="search"
            placeholder="Search For Products"
          />
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
        <div className="left w-1/4 bg-white/10 min-h-screen"></div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-3/4 grid grid-cols-3 px-10 gap-10 py-10 pb-20 overflow-x-hidden-screen">
            {data?.products.map((product) => (
              <ProductCard key={product} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
