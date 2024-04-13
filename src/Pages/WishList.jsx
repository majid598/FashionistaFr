import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/store";
import { toast } from "react-toastify";

const WishList = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavoriteProducts = () => {
      return JSON.parse(localStorage.getItem("Favorites")) || [];
    };
    const favoriteProducts = getFavoriteProducts();
    setFavorites(favoriteProducts);
  }, []);

  console.log(favorites);

  const removeFromLocalStorage = (index, product) => {
    favorites.splice(index, 1);
    const updatedArrayJson = JSON.stringify(favorites);
    localStorage.setItem("Favorites", updatedArrayJson);
    navigate("/wishlist");
    toast.success(`${product.name} Removed From WishList`);
  };

  return (
    <div className="w-full h-calc px-56 py-12">
      <div className="w-full h-full bg-white/10 rounded-3xl p-10 px-32">
        <h1 className="text-center text-2xl font-medium tracking-widest">
          My WishList
        </h1>
        {favorites.length < 1 ? (
          <div className="flex w-full h-[60vh] items-center justify-center">
            <h2 className="text-2xl">No Items in Wishlist</h2>
          </div>
        ) : (
          <div className="flex flex-col w-full h-[60vh] pt-5 overflow-y-scroll gap-2">
            {favorites.map((product, index) => (
              <div className="w-full min-h-40 flex justify-between p-5 border-b bg-white/5 border-white/30 rounded-lg">
                <div key={index} className="flex h-full">
                  <img
                    src={`${server}/${product.img}`}
                    className="h-full w-32"
                    alt=""
                  />
                  <div className="flex flex-col justify-between">
                    <h2 className="px-4">{product.name}</h2>
                    <button
                      onClick={() => removeFromLocalStorage(index, product)}
                      className="px-4 text-red-500 transition-all duration-300 hover:text-red-600"
                    >
                      remove
                    </button>
                  </div>
                </div>{" "}
                <h2 className="px-6">{product.price} PKR</h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
