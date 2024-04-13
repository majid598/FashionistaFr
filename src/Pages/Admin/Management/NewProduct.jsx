import { useFileHandler } from "6pp";
import { useState } from "react";
import AdminLayout from "../../../Components/Admin/AdminLayout";
import Input from "../../../Components/customComponents/Input";
import { useNewProductMutation } from "../../../redux/api/api";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [newProduct] = useNewProductMutation();
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages(files);
    setPreviewImages(imageURLs);
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("description", description);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const { data } = await newProduct(formData);
      toast.success(data?.message);
      navigate("/admin/products");
    } catch (err) {
      // setErrorMessage("Failed to create product");
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
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
              <div className="">
                <div className="w-44 h-44 bg-white">
                  <img
                    src={previewImages[0]}
                    className="w-full h-full"
                    alt=""
                  />
                </div>
                {previewImages.length > 1 && (
                  <div className="mt-5 flex gap-2">
                    {previewImages.map((img, i) => (
                      <img src={img} key={i} className="w-12 h-12" alt="" />
                    ))}
                  </div>
                )}
              </div>
              <input
                type="file"
                id="file"
                name="photo"
                onChange={handleImageChange}
                multiple
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
                value={name}
                changeHandler={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                name="price"
                holder="Price"
                value={price}
                changeHandler={(e) => setPrice(e.target.value)}
              />
              <Input
                type="number"
                name="stock"
                holder="stock"
                value={stock}
                changeHandler={(e) => setStock(e.target.value)}
              />
              <Input
                holder="Category"
                name="category"
                value={category}
                changeHandler={(e) => setCategory(e.target.value)}
              />
              <textarea
                id=""
                className="resize-none w-full p-2 border-2 border-white/30 outline-none bg-transparent hover:border-white/50 focus:border-white text-zinc-300 focus:border-2 rounded-sm"
                cols="30"
                rows="4"
                placeholder="Description"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
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
