import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import usersService from "./usersService"

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
}

// Get all users
export const getUsers = createAsyncThunk("users/all", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await usersService.getUsers(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      ;(state.isLoading = false),
        (state.isError = false),
        (state.isSuccess = false)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        ;(state.isLoading = false), (state.isError = true), (state.users = [])
      })
  },
})

export const { reset } = usersSlice.actions
export default usersSlice.reducer
