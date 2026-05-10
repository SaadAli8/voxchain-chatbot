import React, { useState } from "react";
import axios from "axios";
import Helpers from "../../config/Helpers";

import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}api/register`,
        {
          email: email,
          username: username,
          password: password,
        },
        Helpers.authHeaders
      );
      console.log("User registered:", response.data);
      Helpers.toast("success", "Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : "No response"
      );
      Helpers.toast("error", "Registration failed!");
    }
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="text-center mb-4">
              <a href="/" className="auth-logo mb-5 d-block">
                <img
                  src="assets/images/logo-dark.png"
                  alt=""
                  height="30"
                  className="logo logo-dark"
                />
                <img
                  src="assets/images/logo-light.png"
                  alt=""
                  height="30"
                  className="logo logo-light"
                />
              </a>
              <h4>Sign up</h4>
              <p className="text-muted mb-4">
                Get your VoxChain Chatbot account now.
              </p>
            </div>
            <div className="card">
              <div className="card-body p-4">
                <div className="p-3">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <div className="input-group bg-light-subtle rounded-3 mb-3">
                        <span
                          className="input-group-text text-muted"
                          id="basic-addon5"
                        >
                          <i className="ri-mail-line"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control form-control-lg bg-light-subtle border-light"
                          placeholder="Enter Email"
                          aria-label="Enter Email"
                          aria-describedby="basic-addon5"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <div className="input-group bg-light-subtle mb-3 rounded-3">
                        <span
                          className="input-group-text border-light text-muted"
                          id="basic-addon6"
                        >
                          <i className="ri-user-2-line"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg bg-light-subtle border-light"
                          placeholder="Enter Username"
                          aria-label="Enter Username"
                          aria-describedby="basic-addon6"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <div className="input-group bg-light-subtle mb-3 rounded-3">
                        <span
                          className="input-group-text border-light text-muted"
                          id="basic-addon7"
                        >
                          <i className="ri-lock-2-line"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control form-control-lg bg-light-subtle border-light"
                          placeholder="Enter Password"
                          aria-label="Enter Password"
                          aria-describedby="basic-addon7"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-primary waves-effect waves-light"
                        type="submit"
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-muted mb-0">
                        By registering you agree to the VoxChain Chatbot{" "}
                        <a href="/" className="text-primary">
                          Terms of Use
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <p>
                Already have an account ?{" "}
                <a href="/login" className="fw-medium text-primary">
                  {" "}
                  Signin{" "}
                </a>
              </p>
              <p>
                © {new Date().getFullYear()} VoxChain. Crafted with{" "}
                <i className="mdi mdi-heart text-danger"></i> by Saad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
