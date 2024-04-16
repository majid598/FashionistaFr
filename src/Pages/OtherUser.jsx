import { Link, useParams } from "react-router-dom";
import { useGetOtherUserProfileQuery } from "../redux/api/api";

const OtherUser = () => {
  const userId = useParams().id;
  const { data, isLoading, isError } = useGetOtherUserProfileQuery(userId);
  const user = data?.user;

  return (
    <div className="h-calc">
      <div className="w-full pt-20 py-10 flex justify-center">
        <Link
          to={`/user/${user?._id}/profile`}
          className="w-52 inline-block border-2 border-white/70 h-52 overflow-hidden rounded-full"
        >
          <img src={user?.profile} className="w-full h-full" alt="" />
        </Link>
      </div>
      <div className="w-full flex justify-center gap-4">
        <div>
          <h3 className="text-2xl">Name: </h3>
          <h3 className="text-2xl">Username: </h3>
        </div>
        <div>
          <h3 className="text-2xl">{user?.name}</h3>
          <h3 className="text-2xl">{user?.username}</h3>
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
