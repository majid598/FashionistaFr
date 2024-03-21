import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-full flex justify-between">
      <Sidebar />
      {children}
    </div>
  );
};

export default AdminLayout;
