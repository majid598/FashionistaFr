import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNewUserMutation } from "../redux/api/userApi";
import { toast } from "react-toastify";

const Signup = () => {
  const [newUser] = useNewUserMutation();

  const [user, setuser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const data = newUser(user);
    if (data.success) {
      setuser({
        name: "",
        username: "",
        email: "",
        password: "",
      });
    } else {
      toast.error(data.message);
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
            placeholder="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            placeholder="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <input
            type="text"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="text"
            className="p-2 bg-transparent outline-none border-[1px] border-white/30 rounded-md"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={handleChange}
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
