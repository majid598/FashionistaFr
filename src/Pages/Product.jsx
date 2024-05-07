import { FaStar, FaTruckMoving } from "react-icons/fa6";
import { GiBoxUnpacking, GiSightDisabled } from "react-icons/gi";
import { FaCrown, FaStarHalf } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAddReviewMutation, useGetProductByIdQuery } from "../redux/api/api";
import { server } from "../redux/store";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { Dialog } from "@mui/material";
import { Message } from "@mui/icons-material";

const Product = () => {
  const productId = useParams();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [input, setInput] = useState("");
  const [isAddReview, setIsAddReview] = useState(false);

  const [addReview] = useAddReviewMutation();

  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetProductByIdQuery(productId.id);

  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();
  const cartHandler = () => {
    if (data?.product?.stock <= 0) return toast.error("Out of stock");
    dispatch(
      addToCart({
        id: data?.product?._id,
        name: data?.product?.name,
        stock: data?.product?.stock,
        price: data?.product?.price,
        img: data?.product?.images[0],
      })
    );
    toast.success(`${data?.product?.name} Item Added To Cart`);
  };

  const buyNow = () => {
    if (data?.product?.stock <= 0) return toast.error("Out of stock");
    dispatch(
      addToCart({
        id: data?.product?._id,
        name: data?.product?.name,
        price: data?.product?.price,
        img: data?.product?.images[0],
      })
    );
    toast.success(`${data?.product?.name} Item Added To Cart`);
    setTimeout(() => {
      navigate("/cart");
    }, 300);
  };

  const [mainImage, setMainImage] = useState(data?.product?.images[0]);

  const favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
  function addToFavourites(product) {
    const isAlreadyFavorite = favorites.some(
      (item) => item._id === product._id
    );
    if (!isAlreadyFavorite) {
      favorites.push(product);
      localStorage.setItem("Favorites", JSON.stringify(favorites));
      toast.success(`${data?.product?.name} added to favorites!`);
    } else {
      toast.error(`${data?.product?.name} is already in favorites!`);
    }
  }

  const favouriteProduct = {
    _id: data?.product?._id,
    img: mainImage,
    name: data?.product?.name,
    price: data?.product?.price,
  };

  const handlerReview = (e) => {
    e.preventDefault();
    const userData = {
      _id: user._id,
      name: user.name,
      profile: user.profile,
    };
    const reviewData = {
      user: userData,
      productId: data?.product?._id,
      rating,
      comment,
    };

    addReview(reviewData)
      .unwrap()
      .then((data) => {
        setIsAddReview(false);
        setComment("");
        setRating(null);
        toast.success(data?.message);
      })
      .catch((err) => toast.error(err?.data?.message));
  };

  // console.log(comment)

  return (
    <div className="h-calc p-20 w-full">
      {isAddReview && (
        <Dialog
          open={() => setIsAddReview(true)}
          onClose={() => setIsAddReview(false)}
          PaperProps={{
            style: {
              backgroundColor: "white",
              boxShadow: "none",
              borderRadius: "1rem",
              width: "40vw",
            },
          }}
        >
          <form className="w-full" onSubmit={handlerReview}>
            <div className="flex w-full">
              <div className="p-5">
                <div className="p-2 bg-green-200 rounded-full">
                  <Message className="text-green-500" />
                </div>
              </div>
              <div className="w-full">
                <div className="pt-5">
                  <h2 className="font-semibold">Product Review</h2>
                </div>
                <div className="mt-5 flex justify-between">
                  <input
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="How was the Product"
                    className="p-2 rounded-md outline-none border-2 border-black/30"
                  />
                  <h2 className="uppercase text-xl font-bold pr-14 -rotate-12">
                    Fashionista
                  </h2>
                </div>
                <div className="flex gap-1 py-4 mb-2">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;

                    return (
                      <label key={ratingValue}>
                        <input
                          hidden
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                          className={`text-xl cursor-pointer ${
                            ratingValue <= (hover || rating)
                              ? "text-[#ffc107]"
                              : "text-[#aeaeae]"
                          }`}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="flex w-full px-10 justify-end items-center pt-5 gap-3 border-t border-black/30">
                  <button
                    type="button"
                    onClick={() => setIsAddReview(false)}
                    className="px-4 py-2 rounded-md border-2 border-black/40 font-semibold transition-all duration-300 hover:bg-black/30"
                  >
                    Cancel
                  </button>
                  <button
                    // onClick={() => setIsAddReview(false)}
                    className="px-4 py-2 rounded-md border-2 border-green-500 transition-all duration-300 hover:bg-green-600 hover:border-green-600 text-white bg-green-500 font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Dialog>
      )}
      <div className="w-full h-full gap-16 overflow-hidden flex rounded-2xl">
        <div className="w-3/5 h-full overflow-y-scroll pr-5">
          <div className="left w-full h-full flex gap-5 relative bg-white/10 rounded-2xl p-10">
            {user?.orders?.length > 0 && (
              <button
                onClick={() => setIsAddReview(true)}
                className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-300 font-semibold"
              >
                AddReview
              </button>
            )}
            <div className="w-2/4 h-full">
              <div className="h-3/4 w-full rounded-2xl overflow-hidden">
                <img
                  src={mainImage ? mainImage : data?.product?.images[0]}
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <div className="flex gap-4 mt-10">
                {data?.product?.images?.map((img) => (
                  <button
                    className="w-16 h-16 bg-white rounded-md overflow-hidden focus:border-sky-500 border-2 border-transparent"
                    onClick={() => setMainImage(img)}
                  >
                    <img src={img} alt="" className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>
            <div className="w-2/4 px-10 h-full">
              <h2 className="text-zinc-300">Product information</h2>
              <h3 className="text-zin-400 font-semibold">
                {data?.product.name}
              </h3>
              {data?.product?.numOfReviews > 0 ? (
                <h2 className="text-zinc-300 my-5 flex items-center gap-2">
                  Reviews{" "}
                  <span className="text-sm">
                    ( {data?.product?.numOfReviews} )
                  </span>
                </h2>
              ) : (
                <h2 className="mt-5">Not rating yet</h2>
              )}
              <div className="flex justify-between items-center">
                <div
                  className={`px-4 py-2 ${
                    data?.product?.stock > 0
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-600"
                  } font-semibold mt-2`}
                >
                  {data?.product?.stock > 0 ? "InStock" : "OutOfStock"}
                </div>
                <div className="px-5 py-3 rounded-full border-[1px] border-zinc-500 font-semibold mt-2">
                  PKR {data?.product?.price}
                </div>
              </div>
              <div className="mt-14 text-zinc-300">
                <h2 className="font-semibold">Description</h2>
                <p className="mt-3">{data?.product?.description}</p>
              </div>
            </div>
          </div>
          {data?.product?.reviews.length > 0 && (
            <div className="w-full mt-10 flex flex-col">
              {data?.product?.reviews?.map((review, index) => (
                <div
                  key={index}
                  className="w-full p-5 rounded-lg bg-white/10 flex
          "
                >
                  <div className="w-[8rem]">
                    <Link
                      to={`/user/${review.user._id}`}
                      className="w-24 h-24 inline-block rounded-full border-2 border-white/70 bg-zinc-300 overflow-hidden"
                    >
                      <img
                        src={review?.user?.profile}
                        className="w-full h-full"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-between">
                    <Link
                      to={`/user/${review.user._id}`}
                      className="hover:underline"
                    >
                      {review?.user?.name}
                    </Link>
                    <p>{review?.comment}</p>
                    <div className="flex gap-2 items-center">
                      <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={24}
                        isHalf={true}
                        value={review?.rating}
                        edit={false}
                        emptyIcon={<FaStar />}
                        halfIcon={<FaStarHalf />}
                        fullIcon={<FaStar className="text-yellow-500" />}
                        activeColor="#ffd51e"
                      />
                      ( {review.rating} )
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="right w-2/6 bg-white/10 px-16 py-20 rounded-2xl">
          {data?.product.category === "tshirt" && (
            <>
              <h2>Color</h2>
              <div className="flex gap-2 mt-2">
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-green-500 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-purple-600 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-zinc-200 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-red-700 rounded-full"></div>
                </button>
                <button className="w-10 h-10 rounded-full focus:ring-4 p-1">
                  <div className="w-full h-full bg-sky-500 rounded-full"></div>
                </button>
              </div>
              <h2 className="mt-3">Size</h2>
              <div className="flex justify-between mt-2">
                <button
                  disabled
                  className="rounded-md disabled:focus:ring-0 disabled:cursor-not-allowed focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2"
                >
                  S
                </button>
                <button className="rounded-md focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2">
                  M
                </button>
                <button className="rounded-md focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2">
                  L
                </button>
                <button className="rounded-md focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2">
                  XXL
                </button>
                <button className="rounded-md focus:border-zinc-200 py-2 px-5 border-zinc-700 border-2">
                  XXXL
                </button>
              </div>
            </>
          )}
          <div className={`flex flex-col`}>
            <div>
              <div className="flex gap-4 mt-10 justify-between">
                <button
                  onClick={cartHandler}
                  className="bg-green-400 py-3 w-3/4 font-bold rounded-full"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToFavourites(favouriteProduct);
                  }}
                  className="px-5"
                >
                  <GoHeart className={`text-4xl`} />
                </button>
              </div>
              <button
                onClick={buyNow}
                className="bg-green-400 py-3 w-full font-bold rounded-full mt-10"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div
            className={`text-zinc-300 w-full grid grid-cols-2 ${
              data?.product.category === "tshirt" ? "mt-10" : "mt-20"
            }`}
          >
            <div className="w-full">
              <h2 className="flex gap-2 items-center">
                <span className="text-[10px] font-extrabold">stripe</span>
                Secure Payment
              </h2>
              <div className="flex items-center gap-2">
                <FaTruckMoving /> <h2> Free Shipping</h2>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center gap-2">
                <FaCrown /> <h2>Premium Products</h2>
              </div>
              <div className="flex gap-2 items-center">
                <GiBoxUnpacking /> <h2>Safe Packing</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
