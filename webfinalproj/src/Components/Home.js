import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Header/Navbar";
import { useNavigate } from "react-router-dom";
import Card from "./Common/PostCard/FeedCard";
import image3 from "../assets/images/artist.jpg";
import CreatePost from "../Components/Post";
import UserList from "./Common/PostCard/Users";
import "./Home.css";
import PersonCard from "../Components/PersonCards";

function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [allPosts, setallPosts] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  async function fetchallPosts() {
    try {
      const response = await fetch(`${BASE_URL}/post/getallposts`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        // if(data!=null)
        setallPosts(
          data.post.map((post) => ({
            // email: post.email,
            userName: post.userName ? post.userName : post.email,
            userImg: post.userImg ? post.userImg : image3,
            postName: post.postName,
            postimgUrl: post.postimgUrl,
            postType: post.postType ? post.postType : "image",
            timestamp: post.timestamp ? post.timestamp : "2023-12-05T12:34:56",
            _id: post._id,
          }))
        );

        console.log(data.post[0].timestamp);
      } else {
        throw new Error("Failed to fetch email");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
      // Handle errors
    }
  }

  async function fetchallUsers() {
    try {
      const response = await fetch(`${BASE_URL}/user/getAll`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // if(data!=null)
        setallUsers(
          data.map((post) => ({
            userName: post.fullName,
            userImg: post.profileImage,
            userEmail: post.email,
            userRole: post.role,
            _id: post._id,
          }))
        );
      } else {
        throw new Error("Failed to fetch User");
      }
    } catch (error) {
      console.error("Error fetching User:", error);
      // Handle errors
    }
  }
  async function fetchProfile(email) {
    console.log(email + "dvsvsdvdsvdsvdvd");
    try {
      const response = await fetch(
        `${BASE_URL}/user/profile/${email}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        // console.log(data.password+"dsvfsdvsdffsdgdg");
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Handle errors
    }
  }

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await fetch(`${BASE_URL}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid === false) {
            navigate("/");
          } else {
            setUserEmail(data.email);
            fetchProfile(data.email);
          }
        } else {
          throw new Error("Failed to fetch email");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
        // Handle errors
      }
    }

    async function fetchallPosts() {
      try {
        const response = await fetch(`${BASE_URL}/post/getallposts`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          // if(data!=null)
          setallPosts(
            data.post.map((post) => ({
              email: post.email,
              userName: post.userName ? post.userName : post.email,
              userImg: post.userImg ? post.userImg : image3,
              postName: post.postName,
              postimgUrl: post.postimgUrl,
              postType: post.postType ? post.postType : "image",
              timestamp: post.timestamp
                ? post.timestamp
                : "2023-12-05T12:34:56",
              _id: post._id,
            }))
          );

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
    fetchallPosts();
    fetchallUsers();
  }, []);
  console.log(allPosts);
  console.log("Users");
  console.log(allUsers);

  return (
    <div>
      <Navbar userImg={profile?.profileImage ? profile.profileImage : image3} />
      <div className="home-container">
        <div className="main-content">
          <div className="person-card-container">
            <PersonCard
              userName={profile ? profile.fullName : userEmail} // Assuming the logged-in user's email is the username
              userImg={profile?.profileImage ? profile.profileImage : image3} // Use the logged-in user's profile picture
              userEmail={userEmail}
              userRole={profile ? profile.role : "User"} // You may need to fetch the user role from the server
            />
          </div>

          <div>
            <CreatePost
              userProfilePicture={
                profile?.profileImage ? profile.profileImage : image3
              }
              onPostCreated={fetchallPosts}
            />

            {/* <h1>{allPosts[0]}</h1> */}

            {allPosts && allPosts.length > 0 ? (
              allPosts
                .slice()
                .reverse()
                .map((post, index) => (
                  <Card
                    key={index}
                    userName={post.userName}
                    userImg={post.userImg}
                    postContent={post.postName}
                    postUrl={post.postimgUrl}
                    mediaType={post.postType}
                    timestamp={post.timestamp}
                    email={post.email}
                  />
                ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="user-list">
          {allUsers && allUsers.length > 0 ? (
            <UserList users={allUsers} />
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;