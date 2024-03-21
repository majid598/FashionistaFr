import {
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { user } from "../../main";
import { useState } from "react";
import Notification from "../../Components/Admin/Notification";

const Dashboard = () => {
  const [isNotification, setisNotification] = useState(false);

  const handleNotification = () => {
    setisNotification(true);
  };
  const handleClose = () => {
    setisNotification(false);
  };

  return (
    <AdminLayout>
      <div className="h-calc w-fix bg-white/10 px-10">
        <div className="w-full h-14 border-b-[1px] flex border-white/30">
          <div className="w-11/12 h-full relative">
            <SearchIcon className="absolute top-1/2 left-2 text-zinc-300 -translate-y-1/2" />
            <input
              type="text"
              className="w-full h-full p-2 pl-10 border-none outline-none bg-transparent text-zinc-300"
              placeholder="Type to Search..."
            />
          </div>
          <div className="w-1/12 h-full flex items-center px-3 justify-between">
            <IconButton onClick={handleNotification}>
              <NotificationsIcon className="text-zinc-300" />
            </IconButton>
            {isNotification && (
              <Dialog open={handleNotification} onClose={handleClose}>
                <div className="w-96 h-96 bg-white">
                  <Notification />
                </div>
              </Dialog>
            )}
            <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
              <img
                src={`../.${user.profile}`}
                className="w-full h-full"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-full flex mt-8 justify-between">
          <div className="w-1/5 h-32 bg-white/30 rounded-xl"></div>
          <div className="w-1/5 h-32 bg-white/30 rounded-xl"></div>
          <div className="w-1/5 h-32 bg-white/30 rounded-xl"></div>
          <div className="w-1/5 h-32 bg-white/30 rounded-xl"></div>
        </div>
        <div className="flex w-full h-[55vh] mt-10 gap-10">
          <div className="w-3/4 h-full bg-white/30 rounded-xl"></div>
          <div className="w-1/4 h-full bg-white/30 rounded-xl"></div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
