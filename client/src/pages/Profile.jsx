import React, { useState, useEffect } from "react";
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import generateUsername from "generate-username-from-email";
import "../styles/profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user } = useAuthContext();
  const email = user?.email;
  const id = user?.id;

  const username = generateUsername(email);

  const [newUsername, setNewUsername] = useState(user?.username);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [change, setChange] = useState(false);

  useEffect(() => {
    const oldUser = localStorage.getItem("user");
    const newUser = JSON.parse(oldUser);
    newUser.username = newUsername;
    localStorage.setItem("user", JSON.stringify(newUser));
  }, [change]);

  async function updateUser() {
    try {
      const response = await axios.patch("/api/user/update", {
        _id: id,
        username: newUsername,
        fname,
        lname,
        mobile,
        country,
        state,
        district,
        address1,
        address2,
        pincode,
      });

      if (response.status === 200) {
        setChange(true);

        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Profile update failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    }
  }

  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateUser();
  };

  return (
    <Helmet title="Profile">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="profile"
              />
              <span className="font-weight-bold">
                {user?.username?.length === 0 ? username : user?.username}
              </span>
              <span className="text-black-50">{email}</span>
              <span> </span>
              <button onClick={handleClick} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Surname</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Surname"
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-4">
                      <label className="labels">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Country"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="labels">State</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter State"
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="labels">District</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter District"
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mt-2">
                    <label className="labels">Address Line 1</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Address Line 1"
                      onChange={(e) => setAddress1(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Address Line 2</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Address Line 2"
                      onChange={(e) => setAddress2(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-12 mt-2">
                    <label className="labels">Pin Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Pin Code"
                      onChange={(e) => setPincode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Email ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={email}
                      readOnly="readonly"
                      value={email}
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <button className="btn find__car-btn w-50" type="submit">
                    Update Profile
                  </button>

                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Orders</h4>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Helmet>
  );
};

export default Profile;
