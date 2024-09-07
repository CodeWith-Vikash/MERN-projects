import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const baseurl = "http://localhost:3000";
  // function to upload blob on cloudinary
  const uploadBlob = async (blobUrl) => {
    try {
      // Fetch the blob data
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", blob, "image.png"); // Append blob with a filename

      // Upload the file to your backend server
      const uploadResponse = await fetch("http://localhost:3000/api/upload", {
        // Update with your backend URL
        method: "POST",
        body: formData,
      });

      const result = await uploadResponse.json();
      console.log(result);
      return result.url;
      // result.url will contain the URL of the uploaded image on Cloudinary
    } catch (error) {
      console.error("Error uploading blob to server:", error);
    }
  };

  // function to upload image on cloudinary
  const uploadFile = async (file, setFileUrl, setmediaType) => {
    setimgloading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${baseurl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      setFileUrl(response.data.url);
      setimgloading(false);
      return response.data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      setmediaType("text");
      toast.error("File upload unsuccessful");
      setimgloading(false);
    }
  };
  return (
    <MainContext.Provider value={{ uploadBlob, uploadFile,baseurl }}>
      {children}
    </MainContext.Provider>
  );
};
