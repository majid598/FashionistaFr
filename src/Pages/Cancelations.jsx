import { useSelector } from "react-redux";
import {
  useCancelOrderMutation,
  useCancelationsQuery,
  useGetUserOrdersQuery,
} from "../redux/api/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Cancelations = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useCancelationsQuery(user._id);

  const orders = data?.orders;

  return (
    <div className="w-full h-calc p-20 px-64">
      <div className="bg-white/5 border-2 overflow-hidden border-white/30 w-full h-full rounded-2xl">
        <div className="px-10 py-2 bg-white/10 w-full flex -between">
          <h2 className="w-2/6">ID</h2>
          <h2 className="w-1/5 text-start">Amount</h2>
          <h2 className="w-1/6">Items</h2>
          {/* <h2>Discount</h2> */}
          {/* <h2>Quantity</h2> */}
          <h2 className="w-1/5 text-start">Staus</h2>
          <h2 className="w-1/5 text-start px-6">Action</h2>
        </div>
        {orders?.map((order, index) => (
          <div
            key={index}
            className="w-full mt-5 px-10 py-2 items-center flex -between"
          >
            <h2 className="w-2/6">{order._id}</h2>
            <h2 className="w-1/5 text-start">{order.totalAmount}</h2>
            <h2 className="w-1/6">{order.orderItems.length}</h2>
            {/* <h2>{order.discount}</h2> */}
            {/* <h2>{order.orderItems?.map((item) => item.quantity)}</h2> */}
            <h2
              className={`font-semibold w-1/5 text-start ${
                order.status === "Delivered"
                  ? "text-purple-500"
                  : order.status === "Shipped"
                  ? "text-green-500"
                  : order.status === "Canceled"
                  ? "text-red-500"
                  : "text-sky-500"
              }`}
            >
              {order.status}
            </h2>
            <div className="w-1/5 flex justify-start px-6">
                <button
                  className="bg-red-500 hover:bg-red-600 transition-all duration-300 w-28 py-1 text-sm font-semibold text-center rounded-lg"
                >
                  Cancel
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cancelations;
