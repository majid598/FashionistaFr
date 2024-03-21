import { useState } from "react";
import { Country, State, City } from "country-state-city";
import Input from "../Components/customComponents/Input";

const Shipping = () => {
  const [shippingDetails, setshippingDetails] = useState({
    adress: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const changeHandler = (e) => {
    setshippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const countries = Country.getAllCountries();

  const states = State.getStatesOfCountry("PK");

  return (
    <div className="h-calc w-full flex items-center justify-center">
      <div className="w-3/12 h-3/4 bg-white/10 p-12">
        <form className="flex flex-col gap-5">
          <Input
            name={"adress"}
            holder={"Adress"}
            value={shippingDetails.adress}
            changeHandler={changeHandler}
          />
          <select
            name="country"
            value={shippingDetails.country}
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
            value={shippingDetails.state}
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
            value={shippingDetails.city}
            onChange={changeHandler}
            className="w-full p-2 border-white/30 border-2 text-zinc-300 outline-none hover:border-white/50 bg-transparent cursor-pointer focus:border-white rounded-sm"
          >
            <option>City</option>
            <option className="text-zinc-700">Moro</option>
            <option className="text-zinc-700">Karachi</option>
            <option className="text-zinc-700">Hydrabad</option>
            <option className="text-zinc-700">Sukkar</option>
            <option className="text-zinc-700">Noshahro</option>
            <option className="text-zinc-700">Mahar</option>
            <option className="text-zinc-700">Moro</option>
            <option className="text-zinc-700">Moro</option>
            <option className="text-zinc-700">Moro</option>
          </select>
          {/* <Input
            name={"city"}
            holder={"City"}
            value={shippingDetails.city}
            changeHandler={changeHandler}
          /> */}
          <Input
            type={"number"}
            name={"postalCode"}
            holder={"City Code"}
            value={shippingDetails.postalCode}
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
