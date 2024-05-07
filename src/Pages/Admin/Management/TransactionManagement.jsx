import AdminLayout from "../../../Components/Admin/AdminLayout";
import { useState } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAdminSingleOrderQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/api/api";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader";
import { server } from "../../../redux/store";
import moment from "moment/moment";

const TransactionManagement = () => {
  const navigate = useNavigate();
  const orderId = useParams().id;
  const { data, isLoading, isError } = useGetAdminSingleOrderQuery(orderId);
  const [isDelete, setisDelete] = useState(false);
  const [updateStatus] = useUpdateOrderStatusMutation();

  const order = data?.order;
  const user = data?.user;

  const handleDelete = () => {
    setisDelete(true);
  };
  const handlRole = () => {
    setisRole(true);
  };
  const handleClose = () => {
    setisDelete(false);
  };

  const updateHandler = async () => {
    await updateStatus(orderId)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        navigate("/admin/transactions");
      })
      .catch((err) => toast.error(err.data.message));
  };

  if (isError) return toast.error("Order Not Found");

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-calc w-full p-20 px-40">
      <div className="w-full h-full bg-white/10 overflow-hidden rounded-3xl flex">
        <div className="h-full w-3/5 p-10 relative">
          <div className="flex justify-between">
            <h2>Order_ID: - {order._id}</h2>
            <h2>
              Status: -{" "}
              <span
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
              </span>
            </h2>
          </div>
          <h2 className="mt-2">Amount: -{order.totalAmount} PKR</h2>
          <h2 className="mt-2">Order_Items:</h2>
          <div className="h-[45vh] overflow-y-scroll">
            {order.orderItems?.map((item, index) => (
              <div
                key={index}
                className="h-40 w-full bg-white/5 rounded-xl mt-5 p-4 flex"
              >
                <img
                  src={item.img}
                  className="h-full w-36 rounded-xl"
                  alt=""
                />
                <div className="px-4">
                  <h2>Name</h2>
                  <h2>Price</h2>
                  <h2>Quantity</h2>
                </div>
                <div className="px-4">
                  <h2>:</h2>
                  <h2>:</h2>
                  <h2>:</h2>
                </div>
                <div className="px-4">
                  <h2>{item.name}</h2>
                  <h2>{item.price} PKR</h2>
                  <h2>{item.quantity}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[2px] h-full py-10 absolute right-0 top-0">
            <div className="w-full rounded-3xl h-full bg-white/10"></div>
          </div>
        </div>
        <div className="h-full w-2/5 py-20 flex flex-col items-center">
          <div className="bg-zinc-400 border-2 border-white w-24 h-24 rounded-full overflow-hidden">
            <img src={user?.profile} className="w-full h-full" alt="" />
          </div>
          <div className="w-full mt-5 flex gap-2 px-20">
            <div className="">
              <h2>Name:</h2>
              <h2>Role:</h2>
              <h2>Email:</h2>
              <h2>Joined:</h2>
            </div>
            <div className="">
              <h2>- </h2>
              <h2>- </h2>
              <h2>- </h2>
              <h2>- </h2>
            </div>
            <div className="">
              <h2>{user?.name}</h2>
              <h2>{user?.role}</h2>
              <h2>{user?.email}</h2>
              <h2>{moment(user?.createdAt).calendar()}</h2>
            </div>
          </div>
          <div className="w-full px-20 mt-20">
            <button
              onClick={updateHandler}
              className="w-full rounded-md hover:bg-sky-600 transition-all duration-300 p-3 bg-sky-500 text-white font-bold"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionManagement;
