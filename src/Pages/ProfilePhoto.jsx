import { useNavigate, useParams } from "react-router-dom";
import { useGetOtherUserProfilePicQuery } from "../redux/api/api";
import { FaArrowLeft } from "react-icons/fa";

const ProfilePhoto = () => {
  const navigate = useNavigate();
  const userId = useParams().id;
  const { data, isLoading, isError } = useGetOtherUserProfilePicQuery(userId);
  const redirect = `/user/${data?.user?._id}`;
  return (
    <div className="h-calc overflow-hidden relative">
      <button
        onClick={() => navigate(redirect)}
        className="z-50 absolute top-10 left-10 rounded-full bg-white/70 p-3"
      >
        <FaArrowLeft className="text-black" />
      </button>
      <img src={data?.user?.profile} className="w-full h-full" alt="" />
    </div>
  );
};

export default ProfilePhoto;
