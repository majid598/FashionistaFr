import { motion } from "framer-motion";
import { CgShoppingCart } from "react-icons/cg";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
// import { user } from "../main";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userNotExists } from "../redux/reducers/userReducer";
import { server } from "../redux/store";

// const user = false

const Header = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProfile, setIsProfile] = useState(false);
  const handlerDialog = () => {
    setIsProfile(true);
  };
  const handledismiss = () => {
    setIsProfile(false);
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="text-white bg-transparent shadow-sm shadow-white z-50 relative px-48 h-20 w-full">
      <motion.div
        initial={{ y: "-100%" }}
        whileInView={{ y: "0" }}
        className="w-full h-full justify-between items-center flex"
      >
        <div className="flex gap-8 items-center uppercase h-full">
          <Link to={"/"} className="font-bold text-2xl">
            FASHIONISTA
          </Link>
          <div className="links flex gap-5 py-4 items-end h-full font-semibold">
            <Link to={"/products"}>Products</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
            <Link to={"faq"}>Faq</Link>
          </div>
        </div>
        <div
          className="h-full items-center flex py-4 gap-4"
          onMouseLeave={handledismiss}
        >
          <Tooltip title="Cart">
            <Link to={"/cart"}>
              <CgShoppingCart className="text-2xl text-white" />
            </Link>
          </Tooltip>
          {user ? (
            <button
              onMouseEnter={handlerDialog}
              className="border-2 border-white rounded-full"
            >
              {user?.profile ? (
                <img
                  src={user?.profile}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUser className="text-xl" />
              )}
            </button>
          ) : (
            <Link to={"/login"}>
              <PiSignInBold className="text-2xl text-white" />
            </Link>
          )}
        </div>
        {isProfile && (
          <div
            className="w-52 h-72 bg-white text-zinc-700 absolute right-0 top-20"
            onMouseEnter={handlerDialog}
            onMouseLeave={handledismiss}
          >
            <Link
              to={"/user/profile"}
              onClick={() => setIsProfile(false)}
              className="w-full h-1/5 flex items-center justify-center font-semibold border-b-[1px] hover:bg-black/30 cursor-pointer"
            >
              My Profile
            </Link>
            {user?.role === "admin" ? (
              <>
                <Link
                  to={"/admin/transactions"}
                  onClick={() => setIsProfile(false)}
                  className="w-full h-1/5 flex items-center justify-center font-semibold border-b-[1px] hover:bg-black/30 cursor-pointer"
                >
                  Transactions
                </Link>
                <Link
                  to={"/admin/dashboard"}
                  onClick={() => setIsProfile(false)}
                  className="w-full h-1/5 flex gap-2 items-center justify-center font-semibold border-b-[1px] hover:bg-black/30 cursor-pointer"
                >
                  <RiDashboardFill /> Dashboard
                </Link>
                <Link
                  to={"/orders/history"}
                  onClick={() => setIsProfile(false)}
                  className="w-full h-1/5 flex gap-2 items-center justify-center font-semibold border-b-[1px] hover:bg-black/30 cursor-pointer"
                >
                  Orders History
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/user/orders"}
                  onClick={() => setIsProfile(false)}
                  className="w-full h-1/5 flex items-center justify-center font-semibold border-b-[1px] hover:bg-black/30 cursor-pointer"
                >
                  My Orders
                </Link>
                <Link
                  to={"/cancelations"}
                  onClick={() => setIsProfile(false)}
                  className="w-full h-1/5 flex items-center justify-center font-semibold border-b-[1px] hover:bg-black/30 cursor-pointer"
                >
                  Cancelations
                </Link>
                <Link
                  to={"/wishlist"}
                  onClick={() => setIsProfile(false)}
                  className="w-full h-1/5 flex items-center justify-center font-semibold border-b-[1px] hover:bg-black/30 cursor-pointer"
                >
                  WishList
                </Link>
              </>
            )}
            <button
              onClick={logoutHandler}
              className="w-full h-1/5 gap-2 flex items-center justify-center font-semibold border-b-[1px] hover:bg-black/30 cursor-pointer"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Header;
