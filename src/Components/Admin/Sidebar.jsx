import { useLocation, Link } from "react-router-dom";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { product } from "../../Pages/Products";
import { user } from "../../main";
import { Order } from "../../Pages/Admin/Transactions";
const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <RiDashboardFill />,
  },
  {
    name: "Products",
    path: "/admin/products",
    path2: "/admin/product/new",
    path3: `/admin/product/${product._id}`,
    icon: <RiShoppingBag3Fill />,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    path2: `/admin/user/${user._id}`,
    icon: <IoIosPeople />,
  },
  {
    name: "Transactions",
    path: "/admin/transactions",
    path2: `/admin/transaction/${Order._id}`,
    icon: <AiFillFileText />,
  },
];
const adminCharts = [
  {
    name: "Bar",
    path: "/admin/messages",
    icon: <FaChartBar />,
  },
  {
    name: "Pie",
    path: "/admin/messages",
    icon: <FaChartPie />,
  },
  {
    name: "Line",
    path: "/admin/messages",
    icon: <FaChartLine />,
  },
];
const adminApps = [
  {
    name: "StopWatch",
    path: "/admin/stopwatch",
    icon: <FaStopwatch />,
  },
  {
    name: "Coupon",
    path: "/admin/coupon",
    icon: <RiCoupon3Fill />,
  },
  {
    name: "Toss",
    path: "/admin/toss",
    icon: <FaGamepad />,
  },
];
const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar w-1/5 py-10 h-calc overflow-y-scroll bg-white/10 px-10">
      <div className="w-full flex flex-col items-center gap-4 ">
        <h2 className="w-full text-start text-xl tracking-[2px] uppercase font-light">
          Dashboard
        </h2>
        {adminTabs.map((tab) => (
          <Link
            key={tab}
            to={tab.path}
            className={`w-full ${
              location.pathname === tab.path
                ? "bg-white/90 text-zinc-800 font-bold"
                : "hover:bg-white/30"
            } flex items-center ${
              location.pathname === tab.path2 &&
              "bg-white/90 text-zinc-800 font-bold"
            } ${
              location.pathname === tab.path3 &&
              "bg-white/90 text-zinc-800 font-bold"
            } px-6 py-4 gap-2 hover:bg-white/90 hover:text-zinc-800 font-semibold rounded-xl`}
            ss
          >
            {tab.icon} {tab.name}
          </Link>
        ))}
      </div>
      <div className="w-full flex flex-col items-center gap-4 ">
        <h2 className="w-full text-start text-xl tracking-[2px] uppercase font-light">
          Charts
        </h2>
        {adminCharts.map((chart) => (
          <Link
            key={chart}
            to={chart.path}
            className={`w-full ${
              location.pathname === chart.path
                ? "bg-white/90 text-zinc-800 font-bold"
                : "hover:bg-white/30"
            } flex items-center px-6 py-4 gap-2 hover:bg-white/90 hover:text-zinc-800 font-semibold rounded-xl`}
            ss
          >
            {chart.icon} {chart.name}
          </Link>
        ))}
      </div>
      <div className="w-full flex flex-col items-center gap-4 ">
        <h2 className="w-full text-start text-xl tracking-[2px] uppercase font-light">
          Apps
        </h2>
        {adminApps.map((app) => (
          <Link
            key={app}
            to={app.path}
            className={`w-full ${
              location.pathname === app.path
                ? "bg-white/90 text-zinc-800 font-bold"
                : "hover:bg-white/30"
            } flex items-center px-6 py-4 gap-2 hover:bg-white/90 hover:text-zinc-800 font-semibold rounded-xl`}
            ss
          >
            {app.icon} {app.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
