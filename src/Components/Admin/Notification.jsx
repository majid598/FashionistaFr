import { Button, Stack, Typography } from "@mui/material";

const Notification = () => {
  return (
    <Stack width={"100%"} bgcolor={"gray"} height={100} position={"relative"}>
      <Typography variant="h5" textAlign={"center"} mt={"1rem"}>
        Mr Raju Deleted A Product
      </Typography>
      <Button
        style={{
          position: "absolute",
          right: 10,
          bottom: 0,
          color: "red",
          fontWeight: "bold",
        }}
      >
        Close
      </Button>
    </Stack>
  );
};

export default Notification;
