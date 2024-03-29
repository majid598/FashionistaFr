import { FaStar, FaTruckMoving } from "react-icons/fa6";
import { GiBoxUnpacking, GiSightDisabled } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { product } from "./Products";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Product = () => {
  const navigate = useNavigate();
  const cartHandler = () => {
    toast.success("Item Added To Cart");
  };

  const buyNow = () => {
    toast.success("Item Added To Cart");
    setTimeout(() => {
      navigate("/cart");
    }, 300);
  };

  const [mainImage, setmainImage] = useState(product.imgs[0]);

  return (
    <div className="h-calc p-20">
      <div className="w-full h-full gap-16 overflow-hidden flex rounded-2xl">
        <div className="left w-3/5 flex gap-5 bg-white/10 rounded-2xl p-10">
          <div className="w-2/4 h-full">
            <div className="h-3/4 w-full rounded-2xl overflow-hidden">
              <img src={`.${mainImage}`} className="w-full h-full" alt="" />
            </div>
            <div className="flex gap-4 mt-10">
              {product.imgs.map((img) => (
                <button
                  className="w-16 h-16 bg-white rounded-md overflow-hidden focus:border-sky-500 border-2 border-transparent"
                  onClick={() => setmainImage(img)}
                >
                  <img src={`.${img}`} alt="" className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          <div className="w-2/4 px-10 h-full">
            <h2 className="text-zinc-300">Product information</h2>
            <h3 className="text-zin-400 font-semibold">{product.title}</h3>
            <div className="flex w-full h-10 mt-3 items-center gap-2">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-zinc-500" />
              <h2 className="text-zinc-300">( 4 )</h2>
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`px-4 py-2 ${
                  product.stock > 0
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-600"
                } font-semibold mt-2`}
              >
                {product.stock > 0 ? "InStock" : "OutOfStock"}
              </div>
              <div className="px-5 py-3 rounded-full border-[1px] border-zinc-500 font-semibold mt-2">
                PKR {product.price}
              </div>
            </div>
            <div className="mt-14 text-zinc-300">
              <h2 className="font-semibold">Description</h2>
              <p className="mt-3">{product.desc}</p>
            </div>
          </div>
        </div>
        <div className="right w-2/6 bg-white/10 px-16 py-20 rounded-2xl">
          {product.category === "tshirt" && (
            <>
              <h2>Color</h2>
              <div className="flex gap-2 mt-2">
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-green-500 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-purple-600 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-zinc-200 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-red-700 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-sky-500 rounded-full"></div>
                </button>
              </div>
              <h2 className="mt-3">Size</h2>
              <div className="flex justify-between mt-2">
                <button
                  disabled
                  className="rounded-md disabled:focus:ring-0 disabled:cursor-not-allowed focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2"
                >
                  S
                </button>
                <button className="rounded-md focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2">
                  M
                </button>
                <button className="rounded-md focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2">
                  L
                </button>
                <button className="rounded-md focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2">
                  XXL
                </button>
                <button className="rounded-md focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2">
                  XXXL
                </button>
              </div>
            </>
          )}
          <div className={`flex flex-col`}>
            <div>
              <div className="flex gap-4 mt-10 justify-between">
                <button
                  onClick={cartHandler}
                  className="bg-green-400 py-3 w-3/4 font-bold rounded-full"
                >
                  Add to Cart
                </button>
                <button className="px-5">
                  <GoHeart className="text-4xl" />
                </button>
              </div>
              <button
                onClick={buyNow}
                className="bg-green-400 py-3 w-full font-bold rounded-full mt-10"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div
            className={`text-zinc-300 w-full grid grid-cols-2 ${
              product.category === "tshirt" ? "mt-10" : "mt-20"
            }`}
          >
            <div className="w-full">
              <h2 className="flex gap-2 items-center">
                <span className="text-[10px] font-extrabold">stripe</span>
                Secure Payment
              </h2>
              <div className="flex items-center gap-2">
                <FaTruckMoving /> <h2> Free Shipping</h2>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center gap-2">
                <FaCrown /> <h2>Premium Products</h2>
              </div>
              <div className="flex gap-2 items-center">
                <GiBoxUnpacking /> <h2>Safe Packing</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
