import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useDeleteNotificationMutation } from "../../redux/api/api";
import { toast } from "react-toastify";

const Notification = ({ notification }) => {
  const [deleteNotification] = useDeleteNotificationMutation();
  const deleteHandler = () => {
    deleteNotification(notification._id)
      .unwrap()
      .then(() => {
        console.log("Product deleted successfully");
        toast.success("Notification deleted successfully");
      })
      .catch((error) => {
        toast.error("Failed to delete  Notification");
        console.error("Failed to delete product", error);
      });
  };

  return (
    <Stack width={"100%"} bgcolor={"gray"} height={100} position={"relative"}>
      <Typography variant="h5" textAlign={"center"} mt={"1rem"}>
        {notification.message}
      </Typography>
      <Button
        onClick={deleteHandler}
        style={{
          position: "absolute",
          right: 10,
          bottom: 0,
          color: "red",
          fontWeight: "bold",
        }}
      >
        Delete
      </Button>
    </Stack>
  );
};

export default Notification;
