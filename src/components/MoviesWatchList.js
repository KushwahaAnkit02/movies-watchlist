import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addTowatchlist, fetchWatchList, getMovies } from "../redux/Slices";
import { MdBookmarkAdd } from "react-icons/md";
import { Bounce, toast } from "react-toastify";

const MoviesWatchList = () => {
  const dispatch = useDispatch();
  const { movies, user, watchlist } = useSelector((state) => state?.data);
  const [movieresponse, setMovieResponse] = useState();
  const [movieTitle, setMovieTitle] = useState("");
  const handleSearchInput = () => {
    if (movieTitle?.length !== 0) {
      dispatch(getMovies(movieTitle)).then((res) => {
        setMovieResponse(res?.payload?.Error);
      });
    }
  };
  const handleSaveMovie = async (data) => {
    if (watchlist.length) {
      const includesObject = watchlist.some(
        (item) => item.imdbID === data.imdbID
      );
      if (!includesObject) {
        dispatch(addTowatchlist({ user, data })).then((res) => {
          if (res?.payload) {
            toast.success("movie added", {
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
      } else {
        toast.warn("movie already added", {
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
      }
    } else {
      dispatch(addTowatchlist({ user, data })).then((res) => {
        dispatch(fetchWatchList(user));
      });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="flex flex-col md:flex-row h-screen">
          <div className="flex-1 p-4 ">
            <div className="text-center mb-8 border-2 border-red-500 rounded-lg bg-red-200">
              <h1 className="text-3xl font-bold">
                Welcome to <span className="text-red-600"> Watchlists</span>
              </h1>
              <p className="">
                Browse movies, add them to watchlists and share them with
                friends.
              </p>
            </div>
            <div className="flex pl-2 justify-center mb-4 w-full rounded-lg border-black border-2 items-center">
              <IoIosSearch size={30} />
              <input
                type="text"
                placeholder="Search"
                className="p-2 outline-none rounded-l-md w-full"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
              />
              <button
                className="bg-red-500 text-white p-2 rounded-r-md"
                onClick={handleSearchInput}
              >
                Search
              </button>
            </div>
            {movies ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies?.map((movie, i) => {
                  return (
                    <div key={i} className="border p-4 rounded-md shadow-xl">
                      <button>
                        <MdBookmarkAdd
                          size={30}
                          onClick={() => handleSaveMovie(movie)}
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
            ) : (
              <div className="justify-center flex pt-8">
                <h1 className="font-bold text-xl">{movieresponse}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesWatchList;
