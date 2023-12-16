import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import Card from '../Common/PostCard/FeedCard';
import image3 from '../../assets/images/artist.jpg';
import './PortfolioPage.css';
import UploadWidget from "../Common/UploadWidget/UploadWidget"
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PortfolioPage = ({}) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("dfda");
  const [skills, setSkills] = useState("dfad");
  const [about, setAbout] = useState("absbado")
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [gigsInfo, setGigsInfo] = useState("adfad");
  const [allPosts,setallPosts]=useState([]);
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get('userEmail');
  const [differentUser, setDifferentUser] = useState(!!userEmail); // Set to true if userEmail exists, false otherwise
  const [profile, setProfile] = useState(null);

  const [postimgUrl, setpostimgUrl] = useState("dfdf");

  const [posts, setPosts] = useState([]);
  // const UploadWidget = ({ label, onTest }) => {
  const samplePost = {
    user: {
      name: "John Doe",
      profilePicture: image3,
    },
    content:
      "Algorithms are the building blocks of coding! As programmers, it's crucial to have a solid understanding of these powerful tools 🚀. Let's take a moment to appreciate some of the most important algorithms that shape our coding journeys. Join me on this emoji-filled adventure!",
    timestamp: "2 hours ago",
  };
  const [artistProfile, setArtistProfile] = useState({
    profileImage: '',
    coverPhoto: '',
    fullName: '',
    about: '',
    skills: '',
    gigsInfo: ''
  });

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
  useEffect(() => {

    async function fetchUserEmail() {
      try {
          const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            credentials: 'include', // Send cookies with the request
          });
          
          if (response.ok) {
            const data = await response.json();
    
            if (data.valid === true) {
              // Use the userEmail prop if it exists; otherwise, use the email from the API
              const fetchedEmail = userEmail || data.email;
              setEmail(fetchedEmail);
            } else {
              navigate("/home");
            }
          } else {
            throw new Error('Failed to fetch email');
          }
        } catch (error) {
          console.error('Error fetching email:', error);
          // Handle errors
        }
      }

  // Flag to check if the component is still mounted
  async function fetchProfile() {
    try {
      console.log(email);
      const response = await fetch(`${BASE_URL}/user/profile/${email}`, {
        method: "GET",
        credentials: "include", 
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // if(data!=null)
        setProfile(data.role);
        setArtistProfile(data);          
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Handle errors
    }
  }

  async function fetchallPosts() {
    try {
      console.log('in fetchall');
      const response = await fetch(`${BASE_URL}/post/getallposts?email=${email}`, {
        method: "GET",
        credentials: "include", 
      });

      if (response.ok) {
        const data = await response.json();
        // if(data!=null)
        setallPosts(data.post.map(post => ({
          email: post.email,
          userName: post.userName? post.userName : post.email,
          userImg: post.userImg? post.userImg:image3,
          postName: post.postName,
          postimgUrl: post.postimgUrl,
          postType: post.postType? post.postType : "image",
          timestamp: post.timestamp ? post.timestamp: "2023-12-05T12:34:56",
          _id: post._id
        })));
        
        console.log(data.post[0].timestamp);
        
      } else {
        throw new Error("Failed to fetch email");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
      // Handle errors
    }
  }
  

    fetchUserEmail();

    // Cleanup function to set the isMounted flag to false when the component is unmounted
    // return () => {
    //   isMounted = false;
    // };
      if (email) {
        fetchProfile();
        fetchallPosts();
      }

      

  }, [email]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    setArtistProfile({
      ...artistProfile,
      [e.target.name]: e.target.value,

    });
  };

const handleSave = async (result)  => {
  const fullName = artistProfile.fullName;
  const about = artistProfile.about;
  const skills = artistProfile.skills;
  const gigsInfo = artistProfile.gigsInfo;

  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ email, coverImage, profileImage, fullName, about, skills, gigsInfo }),
    });
    // console.log();
    const data = await response.json();
    if (response.ok) {
    //  alert(data.message);
      notify(data.message,true);
      //  navigate('/home');
    } else {
      notify(`Profile edit failed: ${data.message}`,false);
    //  alert(`Post Upload failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error during Profile Update", error);
    notify("An error occurred during Profile Update",false);
   // alert("An error occurred during Post Upload.");
  }
  setEditMode(false);
  
};

const handleOntTest = (result) => {
  if(result!=null){
   // console.log("url"+result);
    setProfileImage(result.secure_url);
    setCoverImage(result.secure_url);
  }
};

return (
  <div> 
  <div className="profile-page">
  <Navbar userImg={artistProfile.profileImage} />

      
          <div className="profile-header">
        {/* Conditional rendering for Cover Photo Upload */}
         
          {editMode ? (
            
            <>
             <div className="upload-widget-container">
            <h6>Upload Cover Picture</h6> 
           
              <UploadWidget 
                onTest={(result) => {
                  <button>Upload Cover Picture</button> 
                  if(result?.secure_url) {
                    setCoverImage(result.secure_url);
                  }
                }}
              />
              {/* <button>Upload Cover Photo</button> */}
              </div>
            </>
          ) : (
            <div className="cover-photo" style={{ backgroundImage: `url(${coverImage || artistProfile.coverImage})` }}></div>
          )}
        
           {editMode ? (
            <>
           < div className="upload-container">
             <h6>Upload Profile Picture</h6> 
              <UploadWidget 
                onTest={(result) => {
                  if(result?.secure_url) {
                    
                    setProfileImage(result.secure_url);
                  }
                }}
              />
              {/* <button>Upload Profile Picture</button> */}
              </div>
            </>
          ) : (
            <div className="profile-image-container">
            <img src={artistProfile.profileImage || image3} alt="Profile" className="profile-image" />
            </div>
          )}
        
      


        {/* Edit Profile Button */}
        {!editMode && !differentUser && (
          <button onClick={handleEdit} className="edit-profile-btn">Edit Profile</button>
        )}
         </div>
       
      <div className="profile-container">
        {/* Profile Details */}
        <div className="profile-details">
          {/* Full Name */}
            {editMode ? (
              <textarea
                name="fullName"
                value={artistProfile.fullName}
                onChange={handleChange}
              />
            ) : (
              <div className="animated-text">
{
  !differentUser ? (
    <h2>
      Hello,{' '}
      <span className="profile-fullname">
        {artistProfile.fullName
          ? artistProfile.fullName
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          : 'Your Name'}
      </span>
      !
    </h2>
  ) : (
    <h2>
      <span className="profile-fullname">
        {artistProfile.fullName
          ? artistProfile.fullName
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          : 'Your Name'}
      </span>
      's profile
    </h2>
  )
}

             
            </div>
            )}
          

         {/* About Section */}
         <div className="section about">
            <h2>About</h2>
            {editMode ? (
              <textarea
                name="about"
                value={artistProfile.about}
                onChange={handleChange}
              />
            ) : (
              <p>{artistProfile.about || 'A little about me...'}</p>
            )}
          </div>

          {/* Skills Section */}
          <div className="section skills">
            <h2>Skills</h2>
            {editMode ? (
              <textarea
                name="skills"
                value={artistProfile.skills}
                onChange={handleChange}
              />
            ) : (
              <p>{artistProfile.skills || 'My skills include...'}</p>
            )}
          </div>

          {/* Experience Section */}
          <div className="section experience">
            <h2>Experience</h2>
            {editMode ? (
              <textarea
                name="gigsInfo"
                value={artistProfile.gigsInfo}
                onChange={handleChange}
              />
            ) : (
              <p>{artistProfile.gigsInfo || 'My professional experience...'}</p>
            )}
          </div>


          {/* Save and Cancel Buttons in Edit Mode */}
          {editMode && !differentUser && (
              <div className="edit-buttons">
              <button onClick={handleSave} className="save-btn">Save Changes</button>
              <button onClick={() => setEditMode(false)} className="cancel-btn">Cancel</button>
            </div>
          )}
        </div>
        

        {/* Posts Section */}
        <div className="posts-section">
          {/* Post Cards */}
          {allPosts.slice().reverse().map((post, index) => (
            <Card
              key={index}
              // userName={post.userName}
              userImg={artistProfile.profileImage}
              postContent={post.postName}
              postUrl={post.postimgUrl}
              mediaType={post.postType}
              timestamp={post.timestamp}
            />
          ))}
         
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

      
export default PortfolioPage;