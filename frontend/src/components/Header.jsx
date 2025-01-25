import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <header className='fixed top-0 left-0 w-full h-16 bg-base-300 z-10'>
      <nav className='h-full'>
        <div className='navbar h-full'>
          <div className='flex-1'>
            <Link to='/' className='ml-6 text-xs md:text-lg lg:text-xl'>
              Schedule Management
            </Link>
          </div>
          <div className='flex-none'>
            <ul className='menu menu-horizontal px-1'>
              {user && user.isAdmin === true ? (
                <li>
                  <Link to='/admin' className='btn btn-success'>
                    <FaUser /> Admin Panel
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {user ? (
                <li className={user && user.isAdmin === true ? "ml-2" : ""}>
                  <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to='/login' className='btn btn-success'>
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li className='ml-2'>
                    <Link to='/register' className='btn btn-neutral'>
                      <FaUser /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
