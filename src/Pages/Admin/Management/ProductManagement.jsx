import AdminLayout from "../../../Components/Admin/AdminLayout";
import { useFileHandler } from "6pp";
import { useState } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Input from "../../../Components/customComponents/Input";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/api/api";
import { server } from "../../../redux/store";
import { toast } from "react-toastify";

const ProductManagement = () => {
  const navigate = useNavigate();

  const productId = useParams().id;

  const { data, isLoading } = useGetProductByIdQuery(productId);
  const [deleteProduct] = useDeleteProductMutation();

  const [productDetails, setproductDetails] = useState({
    productId,
    name: data?.product?.name,
    price: data?.product?.price,
    stock: data?.product?.stock,
    description: data?.product?.description,
    category: data?.product?.category,
  });

  const changeHandler = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const file = useFileHandler("multiple");
  const btn = () => {
    document.getElementById("file").click();
  };

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const { data } = await deleteProduct(productId);
      toast.success(data?.message);
      console.log(data);
      setIsDelete(false);
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some thing went wrong");
    }
  };

  const handleClose = () => {
    setIsDelete(false);
  };
  const [updateProduct] = useUpdateProductMutation();
  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct(productDetails)
      .unwrap()
      .then((data) => {
        navigate("/admin/products");
        toast.success(data?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <AdminLayout>
      <div className="w-fix h-calc p-20 bg-white/10">
        <div className="w-full h-full bg-white/5 flex gap-10 relative">
          {isDelete && (
            <Dialog open={handleDelete} onClose={handleClose}>
              <div className="w-[25vw] h-[25vh] p-5 bg-[#d1d1d1]">
                <Typography variant="h6" className="text-red-500">
                  Confrim Delete
                </Typography>
                <Typography className="mt-10" style={{ marginTop: 20 }}>
                  Are Shure You Want To Delete This Product ?
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-end"}
                  height={"60%"}
                >
                  <Button
                    style={{ color: "red" }}
                    className="h-10"
                    onClick={() => {
                      setIsDelete(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleDelete} className="h-10">
                    Delete
                  </Button>
                </Stack>
              </div>
            </Dialog>
          )}
          <Tooltip title="Delete Product">
            <IconButton
              onClick={() => {
                setIsDelete(true);
              }}
              style={{
                position: "absolute",
                color: "red",
                cursor: "pointer",
                zIndex: "99",
                right: -20,
                top: -20,
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <form className="w-full flex gap-10" onSubmit={submitHandler}>
            <div className="w-3/5 relative p-10 bg-white/10 h-full">
              <div className="flex gap-20">
                <div className="w-44 h-44 bg-white">
                  <img
                    src={`${server}/${data?.product?.images[0]}`}
                    className="w-full h-full"
                    alt=""
                  />
                </div>
                <input
                  type="file"
                  id="file"
                  onChange={file.changeHandler}
                  hidden
                />
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={btn}
                    className="px-4 rounded-sm bg-white/30 border-[1px] border-white/70 top- left-1/2  h-12"
                  >
                    Change Photo
                  </button>
                  <h2 className="mt-4">Name : {data?.product?.name}</h2>
                  <h2 className="mt-4">Price : {data?.product?.price}</h2>
                  <h2 className="mt-4">Stock : {data?.product?.stock}</h2>
                </div>
              </div>
              <div className="w-full h-12 mt-6 flex">
                {data?.product?.images?.map((img) => (
                  <button
                    type="button"
                    className="w-12 h-full focus:ring-4 rounded-xl p-1 border-sky-500"
                  >
                    <div className="w-full h-full bg-white/70 overflow-hidden rounded-xl">
                      <img
                        src={`${server}/${img}`}
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                  </button>
                ))}
              </div>
              <h1 className="mt-4">Description</h1>
              <p className="w-3/4 mt-4">{data?.product?.description}</p>
            </div>
            <div className="w-2/5 flex flex-col gap-4 h-full p-10 bg-white/10 text-black">
              <Input
                name={"name"}
                holder={"Name"}
                value={productDetails.name}
                changeHandler={changeHandler}
              />
              <Input
                type="number"
                holder="price"
                name="price"
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
                name="description"
                id=""
                className="resize-none w-full p-2 border-2 border-white/30 outline-none bg-transparent hover:border-white/50 focus:border-white text-zinc-300 focus:border-2 rounded-sm"
                cols="30"
                rows="4"
                placeholder="Description"
                value={productDetails.description}
                onChange={changeHandler}
              ></textarea>
              <button
                type="submit"
                className="w-full font-bold text-white p-3 text-xl mt-6 rounded-sm bg-sky-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;
