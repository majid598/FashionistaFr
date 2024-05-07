import { ColorRing } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-black/50 h-screen fixed z-[999] top-0 left-0 w-full">
      <ColorRing
        height="100"
        width="100"
        color="green"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
