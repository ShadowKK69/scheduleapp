import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { createSchedule } from "../features/schedules/scheduleSlice"
import { getUsers, reset } from "../features/users/usersSlice"
import { FaHome } from "react-icons/fa"
import Spinner from "../components/Spinner"

function CreateSchedule() {
  const { user } = useSelector((state) => state.auth)
  const [employee, setEmployee] = useState("")
  const [day, setDay] = useState("Monday")
  const [shift, setShift] = useState({
    start: "",
    end: "",
  })

  console.log(employee, day, shift)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!employee || !day || !shift.start || !shift.end) {
      return toast.error("Please fill out all fields")
    }

    const scheduleData = {
      user: employee,
      week: [
        {
          day,
          shifts: [shift],
        },
      ],
    }

    dispatch(createSchedule({ userId: employee, scheduleData }))
    toast.success("Schedule created successfully!")
  }

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

  if (isLoading) return <Spinner />

  return (
    <>
      {user.isAdmin ? (
        <>
          <div className='flex flex-col items-center justify-center min-h-screen overflow-hidden'>
            <div className='flex flex-col m-6 space-y-10 bg-slate-700 shadow-2xl md:flex-row md:space-y-0 md:m-0 rounded'>
              <div className='p-6 md:p-20'>
                <div className='mb-5 flex flex-row items-center'>
                  <h2 className='ml-2 text-4xl font-bold'>Create Schedule</h2>
                </div>
                <p className='max-w-s-m mb-12 font-light'>
                  Select a employee to create/delete his schedule
                </p>

                <form onSubmit={onSubmit}>
                  <label htmlFor='employee'>
                    <select
                      name='employee'
                      id='employee'
                      onChange={(e) => setEmployee(e.target.value)}
                      className='select select-bordered w-full max-w mb-2'
                    >
                      <option disabled selected>
                        Select an employee
                      </option>
                      {users.map((user) => (
                        <option value={user.id} key={user.id}>
                          {user.name} - {user.id}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label htmlFor='day'>
                    <select
                      name='day'
                      id='day'
                      onChange={(e) => setDay(e.target.value)}
                      className='select select-bordered w-full max-w mb-2'
                    >
                      <option disabled selected>
                        Select a day of the week
                      </option>
                      <option value='Monday'>Monday</option>
                      <option value='Tuesday'>Tuesday</option>
                      <option value='Wednesday'>Wednesday</option>
                      <option value='Thursday'>Thursday</option>
                      <option value='Friday'>Friday</option>
                      <option value='Saturday'>Saturday</option>
                      <option value='Sunday'>Sunday</option>
                    </select>
                  </label>

                  <input
                    type='time'
                    id='start'
                    value={shift.start}
                    onChange={(e) =>
                      setShift({ ...shift, start: e.target.value })
                    }
                    className='input input-bordered w-full max-w mb-2'
                  />

                  <input
                    type='time'
                    id='end'
                    value={shift.end}
                    onChange={(e) =>
                      setShift({ ...shift, end: e.target.value })
                    }
                    className='input input-bordered w-full max-w'
                  />

                  <button
                    type='submit'
                    className='w-full mt-6 btn btn-ghost bg-base-300 text-xs md:text-lg lg:text-xl'
                  >
                    <span>Create</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='hero flex flex-col items-center justify-center min-h-screen overflow-hidden'>
          <div className='text-center hero-content'>
            <div className='max-w'>
              <p className='text-5xl mb-8'>403 - Forbidden!</p>
              <h1 className='text-6xl font-bold mb-8'>
                You don't have access to this page!
              </h1>
              <Link className='btn btn-success btn-lg' to='/'>
                <FaHome className='mr-2' />
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateSchedule
