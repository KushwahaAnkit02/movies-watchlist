import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMovies, loginUser } from "../redux/Slices";
import { Bounce, toast } from "react-toastify";

function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state?.data);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleloginUser = (e) => {
    e.preventDefault();
    if (userDetails.email.length === 0 && userDetails.password.length === 0) {
      alert("all the fields are required");
      return;
    }
    dispatch(loginUser(userDetails)).then((res) => {
      if (!res?.error?.message) {
        dispatch(getMovies("Batman")).then(() => {
          toast.success("loged in succesfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          navigate("/movies");
        });
      } else {
        toast.error(res?.payload, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg p-8 space-y-6 shadow-lg">
        {errors?.message && (
          <div>
            <p>Error:{errors?.message}</p>
          </div>
        )}
        <div className="text-center text-2xl font-bold">
          Login with your Email
        </div>

        <form className="space-y-4" onSubmit={handleloginUser}>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />

          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg">
            Log In
          </button>
        </form>
        <div className="text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
