import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { FaSignInAlt } from "react-icons/fa"
import Spinner from "../components/Spinner"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/")
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen overflow-hidden'>
      <div className='flex flex-col m-6 space-y-10 bg-slate-700 shadow-2xl md:flex-row md:space-y-0 md:m-0 rounded'>
        <div className='p-6 md:p-20'>
          <div className='mb-5 flex flex-row items-center'>
            <FaSignInAlt size={30} />
            <h2 className='ml-2 text-4xl font-bold'>Log In</h2>
          </div>
          <p className='max-w-s-m mb-12 font-light'>
            Please log in to have access to your schedule
          </p>
          <form onSubmit={onSubmit}>
            <label className='input input-bordered flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
              </svg>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={onChange}
                className='grow'
                placeholder='Email'
                required
              />
            </label>

            <label className='input input-bordered flex items-center gap-2 mt-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                  clipRule='evenodd'
                />
              </svg>
              <input
                type='password'
                className='grow'
                id='password'
                name='password'
                onChange={onChange}
                value={password}
                placeholder='Password'
                required
              />
            </label>

            <button className='w-full mt-6 btn btn-ghost bg-base-300 text-xs md:text-lg lg:text-xl'>
              <span>Enter</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-7'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#ffffff'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <line x1='5' y1='12' x2='19' y2='12' />
                <line x1='13' y1='18' x2='19' y2='12' />
                <line x1='13' y1='6' x2='19' y2='12' />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
