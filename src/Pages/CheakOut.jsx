import { useDispatch, useSelector } from "react-redux";
import Input from "../Components/customComponents/Input";
import { Country } from "country-state-city";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../redux/api/api";
import { toast } from "react-toastify";
import { clearCart } from "../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";

const CheakOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { shippingInfo, items, total } = useSelector((state) => state.cart);
  // console.log(shippingInfo, items, total);

  const [newOrder, { isLoading }] = useCreateOrderMutation();

  const countries = Country.getAllCountries();

  const [country, setCountry] = useState("");

  const [paymentDetails, setPaymentDetails] = useState({
    card: "",
    expiretion: "",
    cvc: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    // Limit the input length for cardNumber, cvv, and expirationDate
    let formattedValue = value;

    // Remove all non-digit characters
    formattedValue = formattedValue.replace(/\D/g, "");

    // Add space every 4 characters for cardNumber
    if (name === "card") {
      formattedValue = formattedValue.replace(/\s/g, ""); // Remove existing spaces
      formattedValue = formattedValue.replace(/(.{4})/g, "$1 ").trim(); // Add space every 4 characters
    }

    if (name === "expiretion") {
      formattedValue = formattedValue.replace(/\s/g, ""); // Remove existing spaces

      // Only add slash if there are more than 2 characters
      if (formattedValue.length > 2) {
        formattedValue = formattedValue
          .replace(/(\d{2})(\d{0,2})/, "$1/$2")
          .trim(); // Add slash after first two characters
      }
    }

    setPaymentDetails({
      ...paymentDetails,
      [name]: formattedValue,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (paymentDetails.card.length < 19)
      return toast.error("Invalid CardNumber");

    if (paymentDetails.expiretion.length < 5)
      return toast.error("Invalid Card ExpiretionDate");

    if (paymentDetails.cvc.length < 3) return toast.error("Invalid CVV");

    const orderData = {
      userId: user._id,
      shippingInfo,
      orderItems: items,
      totalAmount: total,
    };

    newOrder(orderData)
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        dispatch(clearCart());
        navigate("/user/orders");
        // Handle successful order creation, reset cart, redirect, etc.
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        // Handle error
      });
  };

  useEffect(() => {
    if (items.length <= 0) return navigate("/cart");
  }, [items]);

  return (
    <div className="h-calc flex justify-center items-center w-full">
      <div className="w-[30rem] h-3/5 rounded-3xl bg-white/10 p-10 px-20">
        <form
          onSubmit={submitHandler}
          action=""
          className="w-full h-full flex flex-col gap-5 justify-center"
        >
          <div className="relative">
            <label>Card Number</label>
            <Input
              type="text"
              holder={"1234 1234 1234 1234"}
              value={paymentDetails.card}
              name={"card"}
              maxLength={19}
              changeHandler={changeHandler}
            />
            <div className="absolute w-/5 h-11 flex gap-1 items-center px-3 bottom-0 right-0">
             <div className="h-full w-9 rounded-md"><img src="/assets/visa.webp" className="w-full h-full" alt="" /></div>
             <div className="h-full w-9 rounded-md"><img src="/assets/card.png" className="w-full h-full" alt="" /></div>
             <div className="h-full w-9 rounded-md"><img src="/assets/bank.png" className="w-full h-full" alt="" /></div>
            </div>
          </div>
          <div className="">
            <div className="flex gap-2">
              <label className="w-1/2">Expiretion</label>
              <label className="w-1/2">CVC</label>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                holder={"MM / YY"}
                style={"!w-1/2"}
                value={paymentDetails.expiretion}
                name={"expiretion"}
                maxLength={5}
                changeHandler={changeHandler}
              />
              <Input
                type="text"
                holder={"CVC"}
                style={"!w-1/2"}
                value={paymentDetails.cvc}
                maxLength={3}
                name={"cvc"}
                changeHandler={changeHandler}
              />
            </div>
          </div>
          <select
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-3 border-white/30 border-2 text-zinc-300 outline-none hover:border-white/50 bg-transparent cursor-pointer focus:border-white rounded-sm"
          >
            <option value={"Country"} className="text-zinc-700">
              Select Country
            </option>
            {countries.map((item) => (
              <option
                value={item.name}
                key={item.name}
                className="text-zinc-700"
              >
                {item.name}
              </option>
            ))}
          </select>
          <button className="mt-2 bg-sky-500 hover:bg-sky-600 transition-all duration-300 p-3 font-bold rounded-md">
            {isLoading ? "Processing..." : "Confrim"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheakOut;
