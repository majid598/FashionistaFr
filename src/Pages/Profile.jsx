import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = ({ user }) => {
  const [popup, setPopup] = useState(false);
  const [img, setImg] = useState("");
  const inp = () => {
    document.getElementById("inp").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImg(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("profile", img);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/user/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // dispatch(userExists(data.user));
      console.log(response.data);
      toast.success(response.data?.message);
      // You can save the token to localStorage or use Redux for state management
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    } finally {
      setPopup(false);
      setImg("");
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      {popup && (
        <div className="w-full h-[calc(100vh-5rem)] fixed flex items-center justify-center top-0 left-0 bg-black/60">
          <div className="w-2/5 h-3/5 bg-white rounded-2xl overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="w-full h-full flex flex-col items-center justify-between"
              >
                <input
                  hidden
                  type="file"
                  onChange={handleImageChange}
                  id="inp"
                />
                <div className="w-52 h-52 rounded-full overflow-hidden bg-white flex items-center justify-center mt-14">
                  {img ? (
                    <img src={img} alt="" />
                  ) : (
                    <button
                      onClick={inp}
                      type="button"
                      className="text-black hover:bg-black hover:text-white font-bold transition-all duration-300 px-6 py-1 rounded-md border border-black/30"
                    >
                      Choose
                    </button>
                  )}
                </div>
                <div className="w-full h-1/6 py-4 flex justify-end px-10 gap-4">
                  <button
                    onClick={() => setPopup(false)}
                    className="border text-black border-black/60 hover:bg-black hover:text-white font-bold transition-all duration-300 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white font-bold transition-all bg-green-500 hover:bg-green-600 duration-300 px-4 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
              <div className="w-3/4">
                {user?.phone ? user?.phone : "Not Given"}
              </div>
            </div>
            <div className="w-full px-8 flex items-center h-1/6">
              <div className="w-1/4">Money Spent</div>
              <div className="w-3/4">0</div>
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
            <div className="w-40 h-40 overflow-hidden border-white border-2 rounded-full bg-white/10">
              <img src={user.profile} className="w-full h-full" alt="" />
            </div>
            <button
              onClick={() => setPopup(true)}
              className="px-3 py-2 rounded-md border-[1px] bg-white/10"
            >
              Change
            </button>
          </div>
        </div>
        <div className="mb-32"></div>
      </div>
      {/* <Link to={"/admin/dashboard"}>dashboard</Link> */}
    </div>
  );
};

export default Profile;
