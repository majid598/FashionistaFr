import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../redux/store";
import { userExists } from "../redux/reducers/userReducer";
import Loader from "../Components/Loader";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/api/v1/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(userExists(true));
      toast.success(response.data?.message);
      setIsLoading(false);
      // You can save the token to localStorage or use Redux for state management
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const response = await axios.post(
        `${server}/api/v1/user/login`,
        {
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
      dispatch(userExists(true));
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="h-calc flex flex-col items-center justify-center">
      {isLoading && <Loader />}
      <h1 className="text-3xl">Log in to continue shopping</h1>
      <div className="w-2/5 h-white/10 flex flex-col p-16 gap-3">
        <form className="w-full flex flex-col gap-3" onSubmit={handlerSubmit}>
          <input
            type="text"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link className="mt- text-center">Forgotten Account ?</Link>
          <input
            type="submit"
            value={"Log in"}
            className="w-full py-2 bg-sky-500 font-bold mt-2 rounded-md cursor-pointer"
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
          Don't have an account ?
          <Link
            to={"/signup"}
            className="underline font-semibold hover:text-green-600"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
