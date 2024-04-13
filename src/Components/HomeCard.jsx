import { motion } from "framer-motion";

const HomeCard = ({ delay, w = "", top, h = "", img = "" }) => {
  return (
    <div
      className="rounded-lg relative"
      style={{ width: w, height: h, top: top }}
    >
      <motion.img
      id="img"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className="transition-all duration-200 w-full h-full rounded-lg"
        src={img}
        alt="Mr raju Website Creator"
      />
    </div>
  );
};

export default HomeCard;
