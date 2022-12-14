import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() {
    const navigate = useNavigate()
  
    const { user } = useSelector((state) => state.auth)

    console.log(user)
  
    useEffect(() => {
      if (!user) {
        navigate('/login')
      }
    }, [user, navigate ])

    return (
        <>
          <section className="heading">
              <h1>Welcome {user && user.userInfo.name}</h1>
          </section>
        </>
    )
}

export default Dashboard;