import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser } from "../redux/Slices";
import Loader from "./Loader";

function SignupScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, errors } = useSelector((state) => state.data);
  console.log(errors,"signup");
  const [userDetails, setUserdetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (
      userDetails?.password.length !== 0 &&
      userDetails?.name.length !== 0 &&
      userDetails?.email.length !== 0 &&
      confirmPassword?.length !== 0
    ) {
      if (userDetails.password !== confirmPassword) {
        alert("Confirm password did not match");
        return;
      } else {
        dispatch(createNewUser(userDetails)).then((res) => {
          if (res.payload) {
            navigate("/movies");
          }
        });
      }
    } else {
      alert("all the fields are required");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg p-8 space-y-6 shadow-lg">
        {errors && (
          <div>
            <p>{errors}</p>
          </div>
        )}
        <div className="text-center text-2xl font-bold">Create Account</div>

        <form className="space-y-4" onSubmit={handleSubmitDetails}>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            value={userDetails?.name}
            onChange={(e) => {
              setUserdetails({ ...userDetails, name: e.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Enter email"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            value={userDetails?.email}
            onChange={(e) => {
              setUserdetails({ ...userDetails, email: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Create password"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            value={userDetails?.password}
            onChange={(e) => {
              setUserdetails({ ...userDetails, password: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          {!loading ? (
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">
              Log In
            </button>
          ) : (
            <div className="w-full bg-blue-600 text-white rounded-lg flex justify-center items-center">
              <Loader />
            </div>
          )}
        </form>
        <div className="text-center">
          Already have an account?
          <Link to="/" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
