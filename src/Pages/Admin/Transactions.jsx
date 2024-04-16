import { Link } from "react-router-dom";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { useGetAllOrdersQuery } from "../../redux/api/api";
import { toast } from "react-toastify";
// import { products } from "../../Products";

export const Order = {
  _id: Math.random(),
  customer: "Majid ali",
  amount: "23424",
  discount: "234",
  quantity: "3",
  Status: "Processing",
};

// const orders = [
//   {
//     customer: "Majid ali",
//     amount: "23424",
//     discount: "234",
//     quantity: "3",
//     Status: "Processing",
//   },
//   {
//     customer: "Sajid ali",
//     amount: "22324",
//     discount: "250",
//     quantity: "1",
//     Status: "Shipped",
//   },
//   {
//     customer: "lalu",
//     amount: "22324",
//     discount: "250",
//     quantity: "1",
//     Status: "Deliverd",
//   },
// ];

const Transactions = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  const orders = data?.orders;

  if (isError) return toast.error("Orders Not Found");

  return (
    <AdminLayout>
      <div className="w-[75vw] h-calc p-20 bg-white/10">
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
          <div className="w-full h-[64vh] overflow-y-scroll flex flex-col pb-10">
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
                  {order.status === "Delivered" ? (
                    <button
                      disabled
                      className="bg-sky-500 disabled:opacity-70 disabled:cursor-not-allowed w-28 py-1 text-sm font-semibold text-center rounded-lg"
                    >
                      Details
                    </button>
                  ) : (
                    <Link
                      to={`/admin/transaction/${order._id}`}
                      className="bg-sky-500 w-28 py-1 text-sm font-semibold text-center rounded-lg"
                    >
                      Details
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Transactions;
