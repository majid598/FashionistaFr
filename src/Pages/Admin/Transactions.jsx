import { Link } from "react-router-dom";
import AdminLayout from "../../Components/Admin/AdminLayout";
// import { products } from "../../Products";

export const Order = {
  _id: Math.random(),
  customer: "Majid ali",
  amount: "23424",
  discount: "234",
  quantity: "3",
  Status: "Processing",
};

const orders = [
  {
    customer: "Majid ali",
    amount: "23424",
    discount: "234",
    quantity: "3",
    Status: "Processing",
  },
  {
    customer: "Sajid ali",
    amount: "22324",
    discount: "250",
    quantity: "1",
    Status: "Shipped",
  },
  {
    customer: "lalu",
    amount: "22324",
    discount: "250",
    quantity: "1",
    Status: "Deliverd",
  },
];

const Transactions = () => {
  return (
    <AdminLayout>
      <div className="w-[75vw] h-calc p-20 bg-white/10">
        <div className="bg-white/5 border-2 overflow-hidden border-white/30 w-full h-full rounded-2xl">
          <div className="px-10 py-2 bg-white/10 grid w-full grid-cols-6">
            <h2>Customer</h2>
            <h2>Amount</h2>
            <h2>Discount</h2>
            <h2>Quantity</h2>
            <h2>Staus</h2>
            <h2>Action</h2>
          </div>
          {orders.map((order) => (
            <div
              key={order}
              className="grid w-full grid-cols-6 mt-5 px-10 py-2 items-center"
            >
              <h2>{order.customer}</h2>
              <h2>{order.amount}</h2>
              <h2>{order.discount}</h2>
              <h2>{order.quantity}</h2>
              <h2
                className={`font-semibold ${
                  order.Status === "Processing" && "text-sky-500"
                }`}
              >
                {order.Status}
              </h2>
              <Link
                to={`/admin/transaction/${Order._id}`}
                className="bg-sky-500 w-28 py-1 text-sm font-semibold text-center rounded-lg"
              >
                Manage
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Transactions;
