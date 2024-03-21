import { GoDash } from "react-icons/go";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import { IoLogoTwitter } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="h-[60vh] bg-white/20 w-full px-14">
      <div className="left flex gap-10 h-[calc(60vh-5rem)] w-full">
        <div className="left w-3/4 py-20  grid grid-cols-4">
          <div className="flex flex-col">
            <h2 className="font-semibold">GENDER WISE</h2>
            <h4>Men's</h4>
            <h4>Women's</h4>
            <h4>Unisex</h4>
            <h4>Kids</h4>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">HOT ON SHOP</h2>
            <h4>Accessories</h4>
            <h4>Clothing</h4>
            <h4>Food Items</h4>
            <h4>Computers</h4>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">IMPORTANT LINKS</h2>
            <h4>About Us</h4>
            <h4>Contact Us</h4>
            <h4>Our Features</h4>
            <h4>Help?</h4>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">STORE</h2>
            <h4>Highest Price</h4>
            <h4>Most Popular</h4>
            <h4>Top Rated</h4>
            <h4>Most Sold</h4>
          </div>
        </div>
        <div className="right w-1/4 px-12 py-24">
          <h2 className="font-bold text-xl">FASHIONISTA</h2>
          <p>
            The Latest trend clothes, accessories, premium shoes and many more
            products premium products with best shipping
          </p>
          <motion.img
            initial={{ x: "100%" }}
            whileInView={{ x: "0" }}
            src="./assets/pay.png"
            className="rounded-xl mt-4"
            alt=""
          />
        </div>
      </div>
      <div className="bottom w-full h-20 flex items-center justify-between">
        <div className="left flex items-center">
          <h2 className="font-semibold">© 2024 Fashionista </h2>
          <GoDash />
          <h2 className="font-semibold">@ma8055965@gmail.com </h2>
        </div>
        <div className="right flex text-xl items-center gap-2">
          <Link>
            <FaInstagram />
          </Link>
          <Link>
            <GrLinkedinOption />
          </Link>
          <Link>
            <IoLogoTwitter />
          </Link>
          <Link>
            <FaFacebookF />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
