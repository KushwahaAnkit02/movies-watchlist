import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handleAddMovie,
  handleCreateNewUser,
  handleDeleteMovie,
  handleFetchWatcList,
  handleloginUser,
} from "../Authentication";
import { handleGetMovies } from "../components/ApiHandle";

export const createNewUser = createAsyncThunk(
  "createUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await handleCreateNewUser(userDetails);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await handleloginUser(userDetails);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
export const getMovies = createAsyncThunk(
  "movieWatchlist",
  async (title, { rejectWithValue }) => {
    try {
      const response = await handleGetMovies(title);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const fetchWatchList = createAsyncThunk(
  "fetchWatchlist",
  async (data, { rejectWithValue }) => {
    try {
      const response = await handleFetchWatcList(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const addTowatchlist = createAsyncThunk(
  "myWatchlist",
  async (data, { rejectWithValue }) => {
    try {
      const response = await handleAddMovie(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
export const deleteMovieAsyncThunk = createAsyncThunk(
  "deleteMovie",
  async (data, { rejectWithValue }) => {
    try {
      const response = await handleDeleteMovie(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const Slices = createSlice({
  name: "movies-watchlist",
  initialState: {
    user: [],
    watchlist: [],
    movies: [],
    loading: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser?.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.errors = null;
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(loginUser?.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.errors = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getMovies?.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search;
        state.errors = null;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(addTowatchlist?.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(addTowatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = null;
      })
      .addCase(addTowatchlist.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
        state.errors = null;
      })
      .addCase(fetchWatchList.pending, (state, action) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchWatchList.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
        state.errors = null;
      })
      .addCase(fetchWatchList.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(deleteMovieAsyncThunk.pending, (state, action) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(deleteMovieAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = null;
      })
      .addCase(deleteMovieAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});
