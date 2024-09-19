import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const navigate = useNavigate()
  const auth = getAuth()
  const [formData, setFormData] = useState({
    fullname: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const onLogOut = () => {
    auth.signOut()
    navigate('/')
  }

  // useEffect(() => {
  //   // console.log('In the useEffect', auth.currentUser);
  //   // setUser(auth.currentUser);

  // }, [])
  // console.log('Outside useEffect', auth.currentUser);

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <button type='button' className="logOut" onClick={onLogOut}>Logout</button>
        {/* {auth.currentUser ? <h1>Welcome {auth.user.displayName}</h1> : <h1>Not Logged In</h1>} */}
      </header>
    </div>
  )
}

export default Profile