import { useFileHandler } from "6pp";
import { useState } from "react";
import AdminLayout from "../../../Components/Admin/AdminLayout";
import Input from "../../../Components/customComponents/Input";
import { useNewProductMutation } from "../../../redux/api/productApi";
import { toast } from "react-toastify";

const NewProduct = () => {
  const [newProduct] = useNewProductMutation();

  const [productDetails, setproductDetails] = useState({
    name: "",
    price: 0,
    photo: "",
    stock: 1,
    description: "",
    category: "",
  });

  const changeHandler = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await newProduct(productDetails);
      if (data.success) {
        setproductDetails({
          name: "",
          price: 0,
          stock: 0,
          description: "",
          category: "",
        });
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Can't Create a Product");
    }
  };

  const btn = () => {
    document.getElementById("file").click();
  };
  return (
    <AdminLayout>
      <div className="w-fix h-calc p-20 bg-white/10">
        <div className="w-full h-full bg-white/5 flex gap-10">
          <form className="w-full flex gap-10" onSubmit={submitHandler}>
            <div className="w-3/5 flex justify-between relative p-10 bg-white/10 h-full">
              <div className="w-44 h-44 bg-white">
                <img src="" className="w-full h-full" alt="" />
              </div>
              <input
                type="file"
                id="file"
                name="photo"
                onChange={changeHandler}
                // value={productDetails.photo}
                hidden
              />
              <button
                type="button"
                onClick={btn}
                className="px-4 rounded-sm bg-white/30 border-[1px] border-white/70 top-20 left-1/2 absolute h-12"
              >
                Choose Photo
              </button>
            </div>
            <div className="w-2/5 flex flex-col gap-4 h-full p-10 bg-white/10 text-black">
              <Input
                name="name"
                holder="Name"
                value={productDetails.name}
                changeHandler={changeHandler}
              />
              <Input
                type="number"
                name="price"
                holder="Price"
                value={productDetails.price}
                changeHandler={changeHandler}
              />
              <Input
                type="number"
                name="stock"
                holder="stock"
                value={productDetails.stock}
                changeHandler={changeHandler}
              />
              <Input
                holder="Category"
                name="category"
                value={productDetails.category}
                changeHandler={changeHandler}
              />
              <textarea
                id=""
                className="resize-none w-full p-2 border-2 border-white/30 outline-none bg-transparent hover:border-white/50 focus:border-white text-zinc-300 focus:border-2 rounded-sm"
                cols="30"
                rows="4"
                placeholder="Description"
                value={productDetails.description}
                name="description"
                onChange={changeHandler}
              ></textarea>
              <button
                type="submit"
                className="w-full font-bold text-white p-3 text-xl mt-6 rounded-sm bg-sky-500"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
