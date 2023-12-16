import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCaretDown } from 'react-icons/fa'; 

const BASE_URL = process.env.REACT_APP_BASE_URL;

function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.value !== "") {
      e.target.classList.add('option-selected');
    } else {
      e.target.classList.remove('option-selected');
    }
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (formData.password === formData.confirmPassword) {
    //   console.log("Form data:", formData);
    // } 
    // else {
    //   console.error("Passwords do not match");
    // }
  };
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/Login");
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

  const signup = async () => {
    const email = formData.email;
    const password = formData.password;
    const fullName = formData.fullName;
    const role = formData.role;

    try {
      const response = await fetch(`${BASE_URL}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, role, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        notify(data.message,true);
      //  alert(data.message);
      //    navigate('/login');
      } else {
        notify(`SignUp failed: ${data.message}`,false);
     //   alert(`SignUp failed: ${data.message}`);
      }
    } catch (error) {
      notify("An error occurred during signUp.",false);
      console.error("Error during signUp:", error);
      //alert("An error occurred during signUp.");
    }
  };


  return (
    <>

<style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .custom-dropdown {
            position: relative;
          }

          .custom-dropdown select {
            appearance: none; /* This is necessary to remove the default arrow in most browsers */
            -webkit-appearance: none; /* For Safari */
            -moz-appearance: none; /* For Firefox */
            padding-right: 1.5em; /* Make room for custom arrow */
          }

          .custom-dropdown .fa-caret-down {
            position: absolute;
            right: 0.75em;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            color: #7c4dff;
          }
          .role-select option {
            font-weight: bold;
          }
          
          .role-select option:first-child {
            font-weight: bold;
          }
          .role-select.option-selected option:first-child {
            font-weight: normal;
          }
        
        `}
      </style>
      <div className=" d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #00008b 0%, #c3cfe2 100%)' }}>

      <div className="card-signup " style={{  maxWidth: '900px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', backgroundColor: 'white' }}>

          <div className="row g-0">
            <div className="col-md-6">
              <div className="card-body p-5">
                <h3 className="card-title text-center" style={{ color: '#333' }}>Sign Up</h3>
                <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* <div className="mb-3">
                    <input
                      type="text"
                      name="role"
                      className="form-control"
                      placeholder="Role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    />
                  </div> */}
                        <div className="mb-3 custom-dropdown">
                          <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled hidden>Select Role</option>
                            <option value="Artist">Artist</option>
                            <option value="Musician">Musician</option>
                            <option value="Dancer">Dancer</option>
                            <option value="Employer">Employer</option>
                          </select>
                          <FaCaretDown className="fa-caret-down" />
                        </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" onClick={signup} className="btn btn-primary w-100" style={{backgroundColor: '#7c4dff' }}>
                    Create new account
                  </button>
                  <button type="button" className="btn btn-primary w-100" onClick={handleSignup} style={{ marginTop: '10px' }}>
                    Already a user? Log in
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#7c4dff' }}>
            <div className="text-center w-100">
              <h3 className="text-white mb-3" style={{ animation: 'fadeIn 2s ease-in-out' }}>Hey, Welcome!</h3>
              <p className="text-white px-5" style={{ animation: 'fadeIn 2s ease-in-out' }}>Join us and share your art with the world.</p>
                </div>
                </div>
          </div>
        </div>
        <ToastContainer />
      </div>
   
    </>
  );
}


export default SignUpForm;