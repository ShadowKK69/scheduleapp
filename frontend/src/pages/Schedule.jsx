import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSchedule, reset } from "../features/schedules/scheduleSlice"
import Spinner from "../components/Spinner"

function Home() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { schedules, isLoading, isSuccess } = useSelector(
    (state) => state.schedule
  )

  const userId = user._id

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
    }

    dispatch(getSchedule(userId))
  }, [dispatch, userId])

  if (isLoading) return <Spinner />

  return (
    <div className='flex flex-col items-center justify-start min-h-screen overflow-hidden'>
      <section className='flex flex-col items-center justify-center pt-32'>
        <h1>Schedules for {user.name}</h1>

        {schedules.length > 0 ? (
          <ul className='flex flex-row gap-6 mt-6'>
            {schedules.map((schedule) => (
              <li key={schedule._id}>
                {schedule.week.length > 0 ? (
                  <div className='stats shadow bg-slate-700'>
                    {schedule.week.map((daySchedule, index) => (
                      <div className='stat' key={index}>
                        <strong className='stat-value'>
                          {daySchedule.day}:
                        </strong>
                        {daySchedule.shifts.length > 0 ? (
                          <ul className='flex flex-col items-center justify-content gap-2 mt-3'>
                            {daySchedule.shifts.map((shift, idx) => (
                              <li
                                key={idx}
                                className='flex flex-row p-2 w-full gap-4 justify-center items-center rounded bg-slate-600'
                              >
                                <p>{shift.start}</p>
                                <span>-</span>
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
