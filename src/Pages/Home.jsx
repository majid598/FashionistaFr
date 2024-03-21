import FixedImage from "../Components/FixedImage";
import {
  innerText,
  innerText2,
  innerText3,
} from "../Components/customComponents/custom";
import { motion } from "framer-motion";
import HomeCard from "../Components/HomeCard";
import Card from "../Components/Card";
import { FaTruckMoving, FaHeartCrack } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full bg-cover bg-no-repeat pt-20 relative">
      <FixedImage />
      <div className={`w-full h-[calc(100vh-5rem)]`}></div>
      <div className={`w-full m-0 relative -top-16 flex flex-col p-20 gap-60`}>
        <div className="w-full flex justify-between items-end gap-10">
          <HomeCard w={"27vw"} h="50vh" img="./assets/5.jpg" delay={0.2} />
          <HomeCard
            w={"22vw"}
            h="45vh"
            top={"50px"}
            img="./assets/watch.jpg"
            delay={0.5}
          />
          <HomeCard w={"27vw"} h="50vh" img="./assets/3.jpg" delay={0.7} />
        </div>
        <div className="lotu w-full flex justify-between items-end px-20 gap-52">
          <HomeCard w={"1/2"} h="60vh" img="./assets/1.jpg" delay={0.2} />
          <HomeCard
            w={"1/2"}
            h="50vh"
            top={"60px"}
            img="./assets/4.jpg"
            delay={0.5}
          />
        </div>
        <div className="w-full flex justify-center items-end">
          <HomeCard w={"30vw"} h="60vh" img="./assets/2.jpg" delay={0.3} />
        </div>
      </div>
      <h2 className="after text-center text-4xl font-mono after:w-24 after:h-1 after:bg-white after:absolute relative after:-bottom-6 after:rounded-full after:left-1/2 after:-translate-x-1/2">
        Our Features
      </h2>
      <div className="flex flex-col items-center py-24">
        <div className="flex gap-10 px-40 pb-16">
          <Card
            heading={"Best Delivery"}
            innerText={innerText}
            Icon={<FaTruckMoving />}
            delay={0.2}
          />
          <Card
            heading={"Money Back"}
            innerText={innerText2}
            Icon={<GiTakeMyMoney />}
            delay={0.5}
          />
          <Card
            heading={"Service"}
            innerText={innerText3}
            Icon={<FaHeartCrack />}
            delay={0.7}
          />
        </div>
        <motion.div
          className="mt-5"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link
            to={"/products"}
            className="px-8 py-4 font-bold bg-white/10 rounded-md"
          >
            SHOP
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
