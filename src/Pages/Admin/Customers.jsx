import { Link } from "react-router-dom";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../redux/api/api";

const Customers = () => {
  const { data, isLoading } = useGetAllUsersQuery("");

  console.log(data);
  return (
    <AdminLayout>
      <div className="w-[75vw] h-calc p-20 bg-white/10">
        <div className="bg-white/5 border-2 overflow-hidden border-white/30 w-full h-full rounded-2xl">
          <div className="px-10 py-2 bg-white/10 flex w-full">
            <h2 className="w-2/12">Photo</h2>
            <h2 className="w-1/5">Name</h2>
            <h2 className="w-1/3">Email</h2>
            <h2 className="w-1/6">Role</h2>
            <h2 className="">Action</h2>
          </div>
          {data?.users.map((user, index) => (
            <div
              key={index}
              className="flex w-full mt-5 px-10 py-2 items-center"
            >
              <div className="w-2/12">
                <div className="w-16 h-16 rounded-full bg-zinc-300 overflow-hidden">
                  <img src={user.profile} className="w-full h-full" alt="" />
                </div>
              </div>
              <h2 className="w-1/5">{user.name}</h2>
              <h2 className="w-1/3">{user.email}</h2>
              <h2 className="w-1/6">{user.role}</h2>
              <Link
                to={`/admin/user/${user._id}`}
                className="bg-sky-500 w-28 hover:bg-sky-600 transition-all duration-300 py-1 text-sm font-semibold text-center rounded-lg"
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

export default Customers;
