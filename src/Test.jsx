import React, { useState } from "react";
import axios from "axios";
import { server } from "./redux/store";

function UploadProfilePic() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    await axios
      .post(`${server}/api/v1/user/upload`, formData)
      .then((response) => {
        console.log("Upload successful:", response.data);
        // Handle success
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        // Handle error
      });
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button>Upload</button>
      </form>
    </div>
  );
}

export default UploadProfilePic;
