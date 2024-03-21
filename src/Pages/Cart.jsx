import { useState } from "react";
import CartItem from "../Components/CartItem";
import { product } from "./Products";
import { Link } from "react-router-dom";
import { VscError } from "react-icons/vsc";

const Cart = () => {
  const [couponCode, setcouponCode] = useState("");
  const [isValidCouponCode, setisValidCouponCode] = useState(false);

  const cartItems = [1, 2];
  const subtotal = product.price;
  const tax = Math.round(subtotal * 0.18);
  const shippingCharges = 120;
  const disscount = 100;
  const total = subtotal + tax + shippingCharges - disscount;

  return (
    <div className="h-calc p-20 flex gap-10">
      <div className="w-4/6 bg-whie/10 h-full overflow-x-hidden overflow-y-scroll">
        {cartItems.length < 1 && <h2 className="text-3xl">No Items In Cart</h2>}
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="w-2/6 bg-white/10 h-full flex gap-2 items-center justify-center">
        <aside className="w-full h-full flex text-zinc-300 flex-col justify-center p-[4rem] relative">
          <p className="text-[1.1rem]">Subtotal: PKR {subtotal}</p>
          <p className="text-[1.1rem]">
            ShippingCharges: PKR {shippingCharges}
          </p>
          <p className="text-[1.1rem]">Tax: PKR {tax}</p>
          <p className="text-[1.1rem]">
            Disscount: <em className="text-red-500"> - PKR {disscount}</em>
          </p>
          <p className="text-[1.1rem]">
            <b>Total: PKR {total}</b>
          </p>
          <input
            type="text"
            className="p-[1rem] border-[1px] border-white/20 bg-transparent text-zinc-300 outline-none mt-10"
            value={couponCode}
            onChange={(e) => setcouponCode(e.target.value)}
            placeholder="Coupon Code"
          />

          {couponCode &&
            (isValidCouponCode ? (
              <span className="text-green-600 absolute mt-5 w-[19.6rem] top-[60%] items-center gap-2 flex justify-center">
                PKR {disscount} off using the
                <code className="font-extrabold self-end">{couponCode}</code>
              </span>
            ) : (
              <span className="text-red-500 absolute flex w-[19.6rem] top-[60%] mt-5 justify-center items-center gap-2">
                Invalid Coupon <VscError />
              </span>
            ))}

          <div className="w-full bg-transparent h-28 relative">
            {cartItems?.length > 0 && (
              <Link
                to="/shipping"
                className="p-5 w-full absolute uppercase bg-sky-600 rounded-md mt-16 text-center font-bold hover:opacity-80"
              >
                Cheakout
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
