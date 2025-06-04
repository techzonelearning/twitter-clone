import { Button } from '@material-tailwind/react'
import React from 'react'
import { logoutUser } from '../store/auth/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const Home = () => {
  let { error, isLoading, message } = useSelector(state => state.auth)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  async function logoutHandler() {
    let response = await dispatch(logoutUser())
    if (response.payload.status) {
      toast.success(message)
      navigate("/login")

    } else {
      toast.error(error)
    }
  }

  if (isLoading) {
    return <Loader2 className="mx-auto mt-50" size={30} />
  }
  return (
    <div>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  )
}

export default Home