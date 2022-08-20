import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { checkTokenExpiry } from './helper/checkTokenExpiry'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {

  useEffect(() => {
    const interval = setInterval(() => {
      if(localStorage.getItem('user')) {
        checkTokenExpiry();
      }
    }, 10000);
  
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
