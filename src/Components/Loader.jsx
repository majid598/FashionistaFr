import { ColorRing } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-calc w-full">
      <ColorRing
        height="100"
        width="100"
        // radius="9"
        color="green"
        ariaLabel="loading"
        // wrapperStyle
        // wrapperClass
      />
    </div>
  );
};

export default Loader;
