import { Link } from "react-router-dom";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { user as User } from "../../main";

const users = [
  {
    _id: Math.random(),
    name: "majid ali",
    username: "raju",
    email: "majid@gmail.com",
    profile: "./assets/4.jpg",
    role: "user",
    gender: "female",
  },
  {
    _id: Math.random(),
    name: "sagid ali",
    username: "saju",
    email: "sajid@gmail.com",
    profile: "./assets/5.jpg",
    gender: "male",
    role: "user",
  },
];

const Customers = () => {
  return (
    <AdminLayout>
      <div className="w-[75vw] h-calc p-20 bg-white/10">
        <div className="bg-white/5 border-2 overflow-hidden border-white/30 w-full h-full rounded-2xl">
          <div className="px-10 py-2 bg-white/10 grid w-full grid-cols-6">
            <h2>Photo</h2>
            <h2>Name</h2>
            <h2>Gender</h2>
            <h2>Email</h2>
            <h2>Role</h2>
            <h2>Action</h2>
          </div>
          {users.map((user) => (
            <div
              key={user}
              className="grid w-full grid-cols-6 mt-5 px-10 py-2 items-center"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-300 overflow-hidden">
                <img
                  src={`.${user.profile}`}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
              <h2>{user.name}</h2>
              <h2>{user.gender}</h2>
              <h2>{user.email}</h2>
              <h2>{user.role}</h2>
              <Link
                to={`/admin/user/${User._id}`}
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

export default Customers;
