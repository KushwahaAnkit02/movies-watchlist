import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignupScreen from "./components/SignupScreen";
import LoginScreen from "./components/LoginScreen";
import { persistor, store } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import MoviesWatchList from "./components/MoviesWatchList";
import MyWatchlist from "./components/MyWatchlist";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/movies" element={<MoviesWatchList />} />
            <Route path="/my-movies" element={<MyWatchlist />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
