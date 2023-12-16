import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faVideo,
  faFile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./Post.css";
import UploadWidget from "./Common/UploadWidget/UploadWidget";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CreatePost = ({ userProfilePicture, onPostCreated }) => {
  const [mediaType, setMediaType] = useState(null);
  const [postimgUrl, setpostimgUrl] = useState("");
  const [postName, setpostName] = useState("");
  const [postType, setpostType] = useState("");
  const [email, setemail] = useState(null);
  const [preview, setPreview] = useState(false);
  const preimageStyle = {
    maxWidth: "500px",
    maxHeight: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const videoStyle = {
    width: "100%", // Set your desired width
    height: "auto", // The 'auto' value maintains the aspect ratio
    maxWidth: "400px", // Set your desired max-width
  };

  const openMediaModal = (type) => {
    setMediaType(type);
  };

  const closeMediaModal = () => {
    setMediaType(null);
  };

  const handleFileUpload = (files) => {
    setpostimgUrl((prevFiles) => [...prevFiles, ...files]);
    closeMediaModal();
  };

  const notify = (message,suc) => {
    if(suc)
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    else
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  
  }
  const handlePost = async () => {
    // console.log("Post Data:", {
    //   userEmail,
    //   postContent,
    //   postimgUrl
    // });

    console.log(postName);

    try {
      const response = await fetch(`${BASE_URL}/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, postName, postimgUrl, postType }),
      });

      const data = await response.json();
      if (response.ok) {
        notify(data.message,true);
       // alert(data.message);

        onPostCreated();
        //  navigate('/home');
      } else {
        if(postName)
        notify(`Post Upload failed: ${data.message}`,false);
      else{
        notify(`Post Upload failed: Post Name can't be empty!`,false);
      }
     //   alert(`Post Upload failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during Post Upload:", error);
      notify("An error occurred during Post Upload.",false);
    //  alert("An error occurred during Post Upload.");
    }

    setpostName("");
    setpostimgUrl("");
    setpostType("");
    setPreview(false);
  };
  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await fetch(`${BASE_URL}`, {
          method: "GET",
          credentials: "include", // Send cookies with the request
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.valid === false) {
          } else setemail(data.email);
        } else {
          throw new Error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
        // Handle errors
      }
    }

    fetchUserEmail();
  }, []);

  const handleOntTest = (result) => {
    if (result != null) {
      setPreview(true);
      // console.log("url"+result);
      setpostimgUrl(result.secure_url);
      console.log(result.secure_url);
      setpostType(result.resource_type);
    }
  };

  return (
    <div className="create-post-container">
      <div className="user-image-container">
        <div className="dividethem">
          <img
            className="user-image"
            src={userProfilePicture}
            alt="User Profile"
          />
          {"       "}
          <textarea
            className="post-box"
            placeholder="Start a post..."
            value={postName}
            onChange={(e) => setpostName(e.target.value)}
          ></textarea>
        </div>
        {preview ? (
          <div>
            {postType === "image" ? (
              <div className="image1234">
                <img
                  src={postimgUrl}
                  alt="Preview"
                  id="imagePreview"
                  style={preimageStyle}
                ></img>
              </div>
            ) : (
              <div className="video-container">
                <video controls style={videoStyle}>
                  <source src={postimgUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="media-buttons">
        <UploadWidget onTest={handleOntTest}></UploadWidget>
        <button className="media-button post-button" onClick={handlePost}>
          <FontAwesomeIcon icon={faPaperPlane} className="media-type-icon" />
          Post
        </button>
      </div>
      {/* Modal or form for uploading media */}
      <br></br>
      {mediaType && (
        <div className="media-modal">
          <h3>
            <FontAwesomeIcon
              icon={mediaType === "file" ? faFile : faImage}
              className="media-type-icon"
            />
            Upload{" "}
            {mediaType === "file"
              ? "Files"
              : mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
          </h3>
          {/* Add your file input or media-specific form here */}
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <button onClick={closeMediaModal}>Close</button>
        </div>
      )}
      {/* Section to display uploaded files */}
      {/* {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded Files</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )} */}
        <ToastContainer />
    </div>
  );
};

CreatePost.propTypes = {
  userProfilePicture: PropTypes.string.isRequired,
};

export default CreatePost;
