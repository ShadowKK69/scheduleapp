import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createSchedule } from "../features/schedules/scheduleSlice"
import Spinner from "../components/Spinner"
import { getUsers, reset } from "../features/users/usersSlice"

function CreateSchedule() {
  // const { user } = useSelector((state) => state.auth)
  // const { isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.schedule
  // )

  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message)
  //   }

  //   if (isSuccess) {
  //     dispatch(reset())
  //     navigate("/admin")
  //   }

  //   dispatch(reset())
  // }, [dispatch, isError, isSuccess, navigate, message])

  // const onSubmit = (e) => {
  //   e.preventDefault()
  // }

  // if (isLoading) {
  //   return <Spinner />
  // }

  const dispatch = useDispatch()
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  )

  useEffect(() => {
    dispatch(getUsers())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {message}</p>

  return (
    <>
      {/* <ul className='pt-32'>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.id}
          </li>
        ))}
      </ul> */}
      <div className='flex flex-col items-center justify-center min-h-screen overflow-hidden'>
        <div className='flex flex-col m-6 space-y-10 bg-slate-700 shadow-2xl md:flex-row md:space-y-0 md:m-0 rounded'>
          <div className='p-6 md:p-20'>
            <div className='mb-5 flex flex-row items-center'>
              <h2 className='ml-2 text-4xl font-bold'>Create Schedule</h2>
            </div>
            <p className='max-w-s-m mb-12 font-light'>
              Select a user to create/delete his schedule
            </p>
            <form>
              <label htmlFor='user'>
                <select
                  name='user'
                  id='user'
                  onChange={(e) => setUser(e.target.value)}
                  className='select select-bordered w-full max-w'
                >
                  <option disabled selected>
                    Select a user
                  </option>
                  {users.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name} - {user.id}
                    </option>
                  ))}
                </select>
              </label>

              <button className='w-full mt-6 btn btn-ghost bg-base-300 text-xs md:text-lg lg:text-xl'>
                <span>Create</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateSchedule
