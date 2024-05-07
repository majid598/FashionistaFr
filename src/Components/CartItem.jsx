import { FaTrash } from "react-icons/fa6";
import { GoDash, GoPlus } from "react-icons/go";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeCartItem,
  removeFromCart,
  updateQuantity,
} from "../redux/reducers/cartReducer";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  console.log(item);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
    toast.success(`${item.name} Removed From Cart`);
  };

  const handleIncrement = () => {
    if (item.quantity >= item.stock) return;
    dispatch(addToCart(item));
  };

  const handleDecrement = () => {
    if (item.quantity <= 1) return;
    dispatch(removeCartItem({ id: item.id }));
  };

  const [quantity, setQuantity] = useState(1);
  return (
    <div className="w-full h-40 bg-white/5 border-b-2 border-white/30 rounded-lg px-5 flex justify-between mb-10 items-center">
      <div className="flex gap-10 h-full py-5 w-4/6">
        <div className="w-32 h-full rounded-lg overflow-hidden">
          <img src={item.img} className="w-full h-full object-cover" alt="" />
        </div>
        <div>
          <h2 className="text-zinc-300">{item?.name}</h2>
          <h2 className="text-zinc-300 font-semibold">PKR {item?.price}</h2>
        </div>
      </div>
      <div className="w-1/6 h-full flex items-center justify-center gap-5 bg--300 relative">
        <button
          onClick={() => handleRemove(item?.id)}
          className="absolute top-4 right-4"
        >
          <FaTrash />
        </button>
        <button onClick={handleDecrement}>
          <GoDash />
        </button>
        <input
          type="number"
          readOnly
          className="w-1/6 text-zinc-300 bg-transparent outline-none h-1/6 rounded-md text-center"
          value={item?.quantity}
        />
        <button onClick={handleIncrement}>
          <GoPlus />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
