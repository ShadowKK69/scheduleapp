import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSchedule } from "../features/schedules/scheduleSlice"
import Spinner from "../components/Spinner"

function Home() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { schedules, isLoading, isError, message } = useSelector(
    (state) => state.schedule
  )

  const userId = user._id

  useEffect(() => {
    if (userId) {
      dispatch(getSchedule(userId))
    }
  }, [dispatch, userId])

  if (isLoading) return <Spinner />

  return (
    <div className='flex flex-col items-center justify-start min-h-screen overflow-hidden'>
      <section className='heading pt-32'>
        <h1>Schedules for {user.name}</h1>
        <p>Here are your schedules:</p>

        {schedules.length > 0 ? (
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule._id}>
                {schedule.week.length > 0 ? (
                  <div className='stats shadow bg-base-200'>
                    {schedule.week.map((daySchedule, index) => (
                      <div className='stat' key={index}>
                        <strong className='stat-value'>
                          {daySchedule.day}:
                        </strong>
                        {daySchedule.shifts.length > 0 ? (
                          <ul className='flex flex-row items-center justify-content'>
                            {daySchedule.shifts.map((shift, idx) => (
                              <li key={idx} className='w-full'>
                                <p>{shift.start}</p>
                                <p>{shift.end}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No shifts available</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No schedule for this week</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No schedules found.</p>
        )}
      </section>
    </div>
  )
}

export default Home
