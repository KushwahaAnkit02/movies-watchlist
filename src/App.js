import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import MoviesWatchList from "./components/MoviesWatchList";
import MyWatchlist from "./components/MyWatchlist";
import SignupScreen from "./components/SignupScreen";
import TailwindLoder from "./components/TailwindLoder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { loading } = useSelector((state) => state.data);
  return (
    <BrowserRouter>
      <TailwindLoder isOpen={loading} />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/movies" element={<MoviesWatchList />} />
        <Route path="/my-movies" element={<MyWatchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
