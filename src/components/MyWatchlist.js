import React from "react";
import { IoIosSearch } from "react-icons/io";
import { FaMinusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovieAsyncThunk, fetchWatchList } from "../redux/Slices";
import { Bounce, toast } from "react-toastify";
import Sidebar from "./Sidebar";

const MyWatchlist = () => {
  const dispatch = useDispatch();
  const { user, watchlist } = useSelector((state) => state?.data);
  const deleteMovie = (movie) => {
    dispatch(deleteMovieAsyncThunk({ user, movie })).then((res) => {
      if (!res.payload) {
        toast.success("deleted succesfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        dispatch(fetchWatchList(user));
      }
    });
  };

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="flex flex-col md:flex-row h-screen">
          <div className="flex-1 p-4 ">
            <div className="p-4 mb-8 rounded-lg h-40 relative">
              <h1 className="text-3xl font-bold">
                My <span className="text-red-600">Watchlists</span>
              </h1>
              <p className="absolute bottom-4 ">
                Browse movies, add them to watchlists and share them with
                friends.
              </p>
            </div>
            {watchlist && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {watchlist?.map((movie, i) => {
                  return (
                    <div key={i} className="border p-4 rounded-md shadow-xl">
                      <button>
                        <FaMinusSquare
                          size={30}
                          color="red"
                          onClick={() => deleteMovie(movie)}
                        />
                      </button>
                      <img
                        src={movie?.Poster}
                        alt={movie?.Title}
                        className="w-full rounded-md mb-4"
                      />
                      <h2 className="text-xl font-semibold">{movie.Title}</h2>
                      <p>{movie?.Year}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWatchlist;
