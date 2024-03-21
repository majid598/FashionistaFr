import { Link } from "react-router-dom";
import AdminLayout from "../../../Components/Admin/AdminLayout";
import { products } from "../../Products";
import { FaPlus } from "react-icons/fa6";
import { product as Product } from "../../Products";

const AdminProducts = () => {
  return (
    <AdminLayout>
      <div className="w-fix relative h-calc p-20 bg-white/10">
        <Link
          to={"/admin/product/new"}
          className="absolute top-5 right-5 bg-sky-500 hover:bg-sky-600 text-xl text-white rounded-full flex items-center justify-center w-10 h-10"
        >
          <FaPlus />
        </Link>
        <div className="bg-white/5 border-2 overflow-hidden border-white/30 w-full h-full rounded-2xl">
          <div className="px-10 py-2 bg-white/10 grid w-full grid-cols-6">
            <h2>Photo</h2>
            <h2>Name</h2>
            <h2>Price</h2>
            <h2>Stock</h2>
            <h2>Category</h2>
            <h2>Action</h2>
          </div>
          {products.map((product) => (
            <div
              key={product}
              className="grid w-full grid-cols-6 mt-5 px-10 py-2 items-center"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-300 overflow-hidden">
                <img
                  src={`.${product.img}`}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
              <h2>{product.title}</h2>
              <h2>{product.price}</h2>
              <h2>{product.stock}</h2>
              <h2>{product.category}</h2>
              <Link
                to={`/admin/product/${Product._id}`}
                className="bg-sky-500 w-28 py-1 text-sm font-semibold text-center rounded-lg"
              >
                Manage
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
