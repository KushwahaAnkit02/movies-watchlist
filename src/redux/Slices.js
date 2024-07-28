import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handleAddMovie,
  handleCreateNewUser,
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

export const Slices = createSlice({
  name: "movies-watchlist",
  initialState: {
    user: [],
    watchlist: [],
    loading: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser?.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(loginUser?.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(getMovies?.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.watchlist = action.payload;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
    builder.addCase(addTowatchlist?.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTowatchlist.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload;
    });
    builder.addCase(addTowatchlist.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error;
    });
  },
});
