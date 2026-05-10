import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Helpers from "../../config/Helpers";

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = Helpers.apiUrl.replace(/\/$/, "") + "/api/login";
      const response = await axios.post(apiUrl, {
        email_or_username: emailOrUsername,
        password,
      });
      if (response.status === 200) {
        navigate("/chatbot");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Login error:", error);
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
              <h4>Sign in</h4>
              <p className="text-muted mb-4">
                Sign in to continue to VoxChain Chatbot.
              </p>
            </div>
            <div className="card">
              <div className="card-body p-4">
                <div className="p-3">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Email or Username</label>
                      <div className="input-group mb-3 bg-light-subtle rounded-3">
                        <span
                          className="input-group-text text-muted"
                          id="basic-addon3"
                        >
                          <i className="ri-user-2-line"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg border-light bg-light-subtle"
                          placeholder="Enter Email or Username"
                          aria-label="Enter Email or Username"
                          aria-describedby="basic-addon3"
                          value={emailOrUsername}
                          onChange={(e) => setEmailOrUsername(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="float-end">
                        <a href="/auth-recoverpw.html" className="text-muted font-size-13">
                          Forgot password?
                        </a>
                      </div>
                      <label className="form-label">Password</label>
                      <div className="input-group mb-3 bg-light-subtle rounded-3">
                        <span className="input-group-text text-muted" id="basic-addon4">
                          <i class="ri-lock-2-line"></i>
                        </span>
                        <input
                          type="password"
                          class="form-control form-control-lg border-light bg-light-subtle"
                          placeholder="Enter Password"
                          aria-label="Enter Password"
                          aria-describedby="basic-addon4"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="alert alert-danger">{errorMessage}</div>
                    )}

                    <div className="form-check mb-4">
                      <input type="checkbox" className="form-check-input" id="remember-check" />
                      <label className="form-check-label" htmlFor="remember-check">
                        Remember me
                      </label>
                    </div>

                    <div class="d-grid">
                      <button class="btn btn-primary waves-effect waves-light" type="submit">
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center">
              <p>
                Don't have an account ?
                <a href="/auth-register.html" class="fw-medium text-primary">
                  {" "}
                  Signup now{" "}
                </a>
              </p>
              <p>
                © {new Date().getFullYear()} VoxChain.
                <i class="mdi mdi-heart text-danger"></i> by Saad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
