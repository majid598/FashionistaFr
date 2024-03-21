import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const Card = ({ innerText, Icon, heading, delay }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="w-1/3 flex flex-col items-center p-8 gap-4 bg-white/10 rounded-2xl"
    >
      <div className="w-20 h-20 rounded-full flex items-center bg-white/20 justify-center text-3xl">
        {Icon}
      </div>
      <h2 className="font-semibold text-zinc-400">{heading}</h2>
      <p className="text-center text-zinc-300">{innerText}</p>
      <Link className="mt-4 flex items-center gap-4 text-zinc-400 font-semibold">
        Lern More <FaArrowRightLong />
      </Link>
    </motion.div>
  );
};

export default Card;
