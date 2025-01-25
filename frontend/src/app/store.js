import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import scheduleReducer from "../features/schedules/scheduleSlice"
import usersReducer from "../features/users/usersSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
    users: usersReducer,
  },
})

export default store
