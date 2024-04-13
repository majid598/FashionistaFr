import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDebugValue, useState } from "react";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/userReducer";

const Signup = () => {
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/user/new`,
        userDetails,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(userExists(response?.data?.user));
      toast.success(response?.data?.message);
      console.log(response?.data?.user);
      // You can save the token to localStorage or use Redux for state management
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      // console.log(user);
      const response = await axios.post(
        `http://localhost:5000/api/v1/user/new`,
        {
          name: user.displayName,
          profile: user.photoURL,
          username: user.displayName,
          email: user.email,
          password: user.displayName,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(userExists(response?.data?.user));
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error("Sign up fail");
    }
  };

  return (
    <div className="h-calc flex flex-col items-center justify-center">
      <h1 className="text-3xl">Sign up to shopping</h1>
      <div className="w-2/5 flex flex-col p-16 gap-3">
        <form onSubmit={handlerSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            name="name"
            placeholder="name"
            value={userDetails.name}
            onChange={changeHandler}
          />
          <input
            type="text"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            placeholder="username"
            name="username"
            value={userDetails.username}
            onChange={changeHandler}
          />
          <input
            type="text"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            placeholder="email"
            name="email"
            value={userDetails.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            placeholder="password"
            name="password"
            value={userDetails.password}
            onChange={changeHandler}
          />
          <input
            type="submit"
            value={"Sign up"}
            className="w-full py-2 bg-sky-500 rounded-md mt-4 cursor-pointer"
          />
        </form>
        <hr className="mt-5" />
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center rounded-md border-sky-500 border-[1px] mt-10"
        >
          <div className="w-1/5 flex items-center justify-center text-xl">
            <FcGoogle />
          </div>
          <div className="w-4/5 h-full  py-2 px-5 bg-sky-500 font-bold">
            Continue With Google
          </div>
        </button>
        <div className="flex gap-2 justify-center mt-4 text-zinc-300 items-center">
          Already have an account ?
          <Link
            to={"/login"}
            className="underline font-semibold hover:text-green-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
