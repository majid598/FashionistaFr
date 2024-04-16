import AdminLayout from "../../../Components/Admin/AdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useFileHandler } from "6pp";
import { useState } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useDeleteUserMutation,
  useEditUserRoleMutation,
  useGetUserByIdQuery,
} from "../../../redux/api/api";
import axios from "axios";
import { server } from "../../../redux/store";
import { toast } from "react-toastify";

const UserManagement = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const userId = useParams();

  const { data, isLoading } = useGetUserByIdQuery(userId.id);

  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = async () => {
    await deleteUser(userId.id)
      .unwrap()
      .then((data) => {
        toast.success(data?.message);
        navigate("/admin/customers");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };

  const [isDelete, setisDelete] = useState(false);
  const [role, setRole] = useState(data?.user?.role);

  const [editRole] = useEditUserRoleMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userId: userId.id,
      role,
    };
    editRole(data)
      .unwrap()
      .then((data) => {
        navigate("/admin/customers");
        toast.success(data?.message);
      })
      .catch((err) => toast.error(error?.data?.message));
  };

  const handleDelete = () => {
    setisDelete(true);
  };
  const handleClose = () => {
    setisDelete(false);
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
                  Are Shure You Want To Delete This Customer ?
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
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button className="h-10" onClick={deleteHandler}>
                    Delete
                  </Button>
                </Stack>
              </div>
            </Dialog>
          )}
          <Tooltip title="Delete Product">
            <IconButton
              onClick={handleDelete}
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
          <div className="w-3/5 relative p-10 bg-white/10 h-full">
            <div className="flex gap-20">
              <div className="w-44 h-44 bg-white">
                <img
                  src={data?.user?.profile}
                  className="w-full h-full"
                  alt=""
                />
              </div>{" "}
              <div className="flex flex-col">
                <h2 className="mt-4 flex items-center text-zinc-300 justify-between gap-3">
                  <span className="font-semibold">Name:</span>{" "}
                  {data?.user?.name}
                </h2>
                <h2 className="mt-4 flex items-center text-zinc-300 justify-between gap-3">
                  <span className="font-semibold">UserName:</span>{" "}
                  {data?.user?.username}
                </h2>
                <h2 className="mt-4 flex items-center text-zinc-300 justify-between gap-3">
                  <span className="font-semibold">Role:</span>{" "}
                  {data?.user?.role}
                </h2>
                <h2 className="mt-4 flex items-center text-zinc-300 justify-between gap-3">
                  <span className="font-semibold">Gender:</span>{" "}
                  {data?.user?.gender}
                </h2>
                <h2 className="mt-4 flex items-center text-zinc-300 justify-between gap-3">
                  <span className="font-semibold">Email:</span>{" "}
                  {data?.user?.email}
                </h2>
                <div>
                  <h2>Joined At: {data?.user?.createdAt}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-4 h-full p-10 bg-white/10">
            <Typography variant="h4">Edit User Role ?</Typography>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  className="outline-none bg-transparent border rounded-sm p-2 w-full text-zinc-300"
                  name="role"
                  placeholder={"role"}
                  readOnly
                  value={role}
                  onClick={() => setMenu((prev) => !prev)}
                />
                {menu && (
                  <div className="w-1/2 py-4 mt-2 rounded-lg bg-white/5 flex flex-col">
                    <button
                      onClick={() => {
                        setRole("user");
                        setMenu(false);
                      }}
                      className="w-full hover:bg-white/10 py-2 text-start px-4"
                    >
                      user
                    </button>
                    <button
                      onClick={() => {
                        setRole("admin");
                        setMenu(false);
                      }}
                      className="w-full hover:bg-white/10 py-2 text-start px-4"
                    >
                      admin
                    </button>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                variant="contained"
                style={{
                  padding: "1rem 0",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
