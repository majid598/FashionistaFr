import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Input from "../Components/customComponents/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducers/cartReducer";
import { toast } from "react-toastify";

const Shipping = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const changeHandler = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const countries = Country.getAllCountries();

  const states = State.getStatesOfCountry("PK");

  const submitHandler = (e) => {
    e.preventDefault();

    if (shippingInfo.address.length <= 0)
      return toast.error("Please Add Address");

    if (shippingInfo.zip.length <= 3)
      return toast.error("Invalid City Code");

    dispatch(saveShippingInfo(shippingInfo));
    navigate("/pay");
  };

  const cities = [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Benazirabad",
    "Mirpur Khas",
    "Shikarpur",
    "Jacobabad",
    "Khairpur",
    "Dadu",
    "Tando Allahyar",
    "Tando Adam Khan",
    "Umerkot",
    "Shahdadkot",
    "Badin",
    "Ghotki",
    "Daharki",
    "Tando Muhammad Khan",
    "Kamber Ali Khan",
    "Kotri",
    "Mirpur Mathelo",
    "Kandhkot",
    "Shahdadpur",
    "Moro",
    "Tando Jam",
    "Pano Akil",
    "Sanghar",
    "Thul",
    "Rohri",
    "Ratodero",
    "Sehwan Sharif",
    "Hala",
    "Sakrand",
    "Matli",
    "Kashmore",
    "Mehar",
    "Thatta",
    "Mehrabpur",
    "Gambat",
    "Khipro",
  ];

  useEffect(() => {
    if (items.length <= 0) return navigate("/cart");
  }, [items]);

  return (
    <div className="h-calc w-full flex items-center justify-center">
      <div className="w-1/4 h-3/4 bg-white/10 p-12">
        <form className="flex flex-col gap-5" onSubmit={submitHandler}>
          <Input
            name={"address"}
            holder={"address"}
            value={shippingInfo.address}
            changeHandler={changeHandler}
          />
          <select
            name="country"
            value={shippingInfo.country}
            onChange={changeHandler}
            className="w-full p-2 border-white/30 border-2 text-zinc-300 outline-none hover:border-white/50 bg-transparent cursor-pointer focus:border-white rounded-sm"
          >
            <option>Country</option>
            {countries.map((country) => (
              <option
                value={country.name}
                key={country.name}
                className="text-zinc-700"
              >
                {country.name}
              </option>
            ))}
          </select>

          <select
            name={"state"}
            value={shippingInfo.state}
            onChange={changeHandler}
            className="w-full p-2 border-white/30 border-2 outline-none text-zinc-300 hover:border-white/50 bg-transparent cursor-pointer focus:border-white rounded-sm"
          >
            <option>State</option>
            {states.map((state) => (
              <option
                value={state.name}
                key={state.name}
                className="text-zinc-700"
              >
                {state.name}
              </option>
            ))}
          </select>
          <select
            name={"city"}
            value={shippingInfo.city}
            onChange={changeHandler}
            className="w-full p-2 border-white/30 border-2 text-zinc-300 outline-none hover:border-white/50 bg-transparent cursor-pointer focus:border-white rounded-sm"
          >
            <option className="text-zinc-700">City</option>
            {cities.map((city, index) => (
              <option className="text-zinc-700" value={city} key={index}>
                {city}
              </option>
            ))}
          </select>
          {/* <Input
            name={"city"}
            holder={"City"}
            value={shippingInfo.city}
            changeHandler={changeHandler}
          /> */}
          <Input
            type={"number"}
            name={"zip"}
            holder={"City Code"}
            value={shippingInfo.zip}
            changeHandler={changeHandler}
          />
          <button className="mt-8 bg-sky-500 p-3 font-bold rounded-md">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
