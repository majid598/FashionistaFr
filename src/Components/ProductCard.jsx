import { Link } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import { server } from "../redux/store";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="mt-12 w-full h-[52vh]">
      <div className="w-full h-full p-4 bg-white/10 rounded-xl">
        {/* <button className="absolute">
          <GoHeart />
        </button> */}
        <div className="card w-full rounded-xl h-72 overflow-hidden relative">
          <img
            className="w-full h-full  hover:scale-125 transition-all duration-200"
            src={product.images[0]}
            alt=""
          />
        </div>
        <div className="flex mt-5 items-center justify-between text-sm">
          <h3 className="hover:underline text-zinc-300 w-4/5 capitalize">
            {product.name}
          </h3>
          <h2 className="flex gap-1">
            <span className="font-semibold">PKR</span> {product.price}
          </h2>
        </div>
        {product.numOfReviews > 0 ? (
          <div className="flex w-full h-10 mt-3 items-center gap-2">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-zinc-500" />
            <h2 className="text-zinc-300">( {product.numOfReviews} )</h2>
          </div>
        ) : (
          <h2 className="mt-5 text-sm">Not rating yet</h2>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
