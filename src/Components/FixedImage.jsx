import LocomotiveScroll from "locomotive-scroll";
const fixedImage = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div
      data-scroll
      data-scroll-speed="2"
      className="w-full h-screen object-cover absolute top-0 left-0 -z-[99]"
    >
      <img
        className="w-full h-full object-cover"
        src="./assets/bg.jpg"
        alt=""
      />
    </div>
  );
};

export default fixedImage;
