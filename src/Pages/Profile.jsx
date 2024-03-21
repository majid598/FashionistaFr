import { Link } from "react-router-dom";
import { user } from "../main";
import { useState } from "react";

const Profile = () => {
  const [img, setimg] = useState("");
  const inp = () => {
    document.getElementById("inp").click();
  };
  const file = (e) => {
    setimg(e.target.value);
    document.getElementById("frm").submit();
  };
  return (
    <div className="w-full min-h-screen">
      <div className="w-2/4 mx-auto">
        <div className="w-full h-[65vh] rounded-xl bg-white/10 mt-20">
          <div className="w-full h-1/6 px-8 flex flex-col justify-center">
            <h2 className="font-semibold text-zinc-300">User Information</h2>
            <h4 className="text-sm text-zinc-300">
              Personal details and Addresses.
            </h4>
          </div>
          <div className="h-5/6 w-full">
            <div className="w-full px-8 flex items-center h-1/6 bg-white/5">
              <div className="w-1/4">Name</div>
              <div className="w-3/4">{user.name}</div>
            </div>
            <div className="w-full px-8 flex items-center h-1/6">
              <div className="w-1/4">UserName</div>
              <div className="w-3/4">{user.username}</div>
            </div>
            <div className="w-full px-8 flex items-center h-1/6 bg-white/5">
              <div className="w-1/4">Email Address</div>
              <div className="w-3/4">{user.email}</div>
            </div>
            <div className="w-full px-8 flex items-center h-1/6">
              <div className="w-1/4">Phone</div>
              <div className="w-3/4">{user.phone}</div>
            </div>
            <div className="w-full px-8 flex items-center h-1/6">
              <div className="w-1/4">Money Spent</div>
              <div className="w-3/4">PKR 42342344.33</div>
            </div>
            <div className="w-full px-8 flex items-center h-1/6 bg-white/5">
              <div className="w-1/4">Address</div>
              <div className="w-3/4">NotGiven</div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2>Photo</h2>
          <div className="flex gap-10 mt-5 items-center">
            <div className="w-40 h-40 overflow-hidden rounded-full bg-white/10">
              <img src={`.${user.profile}`} className="w-full h-full" alt="" />
            </div>
            <form hidden id="frm">
              <input type="file" onChange={file} value={img} id="inp" />
            </form>
            <button
              onClick={inp}
              className="px-3 py-2 rounded-md border-[1px] bg-white/10"
            >
              Change
            </button>
          </div>
        </div>
        <div className="mb-32">

        </div>
      </div>
      {/* <Link to={"/admin/dashboard"}>dashboard</Link> */}
    </div>
  );
};

export default Profile;
