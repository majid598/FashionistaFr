import { height } from '../Components/customComponents/custom'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={`w-full h-${height} flex items-center justify-center text-white flex-col gap-5`}>
      <h1 className=" text-4xl font-bold">Page 404 Not Found</h1>
      <Link to={"/"} className="text-black bg-white font-bold text-xl px-7 py-3 hover:scale-90 transition-all duration-300 rounded-full">GoBack</Link>
    </div>
  );
};

export default NotFound;
