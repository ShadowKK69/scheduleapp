import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateSchedule from "./pages/CreateSchedule"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<PrivateRoute />}>
            <Route path='/admin' element={<CreateSchedule />} />
          </Route>
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
