import { FaTrash } from "react-icons/fa6";
import { product } from "../Pages/Products";
import { GoDash, GoPlus } from "react-icons/go";
import { useState } from "react";

const CartItem = () => {
  const [quantity, setquantity] = useState(1);
  return (
    <div className="w-full h-40 flex justify-between mb-10 items-center">
      <div className="flex gap-10 w-4/6">
        <div className="w-40 h-full">
          <img src={product.img} alt="" />
        </div>
        <div>
          <h2 className="text-zinc-300">{product.title}</h2>
          <h2 className="text-zinc-300 font-semibold">PKR {product.price}</h2>
        </div>
      </div>
      <div className="w-1/6 h-full flex items-center justify-center gap-5 bg--300 relative">
        <button className="absolute top-4 right-4">
          <FaTrash />
        </button>
        <button onClick={() => setquantity(quantity - 1)}>
          <GoDash />
        </button>
        <input
          type="number"
          readOnly
          className="w-1/6 text-zinc-300 bg-transparent outline-none h-1/6 rounded-md text-center"
          value={quantity}
        />
        <button onClick={() => setquantity(quantity + 1)}>
          <GoPlus />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
