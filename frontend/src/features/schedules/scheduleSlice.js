import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import scheduleService from "./scheduleService"

const initialState = {
  schedules: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Create new schedule
export const createSchedule = createAsyncThunk(
  "schedule/create",
  async ({ userId, scheduleData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await scheduleService.createSchedule(userId, scheduleData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get schedules
export const getSchedule = createAsyncThunk(
  "schedule/get",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await scheduleService.getSchedule(userId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    reset: (state) => {
      ;(state.isLoading = false),
        (state.isError = false),
        (state.isSuccess = false)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSchedule.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createSchedule.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(createSchedule.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    builder.addCase(getSchedule.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.schedules = action.payload
    })
    builder.addCase(getSchedule.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  },
})

export const { reset } = scheduleSlice.actions
export default scheduleSlice.reducer
