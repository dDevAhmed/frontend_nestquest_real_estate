import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRight } from '../assets/svg/keyboardArrowRightIcon.svg'
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'
const Signin = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(
    {
      email: '',
      password: '',
    }
  )

  const { email, password } = formData;

  // const togglePasswordIcon = () => {
  //   setShowPassword(!showPassword)
  // }

  const onChange = (e) => {
    e.preventDefault()
    setFormData((prevState) => {
      return {
        ...prevState,
        // email: e.target.value,
        // password: e.target.value
        [e.target.id]: e.target.value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential) {
        toast.success('sign in successfully');
        navigate('/')
      }
      // const user = userCredential.user;
      // updateProfile(auth.currentUser, { displayName: fullname });
      // const formDataCopy = { ...formData }
      // delete formDataCopy.password
      // formDataCopy.timeStamp = serverTimestamp();
      // console.log(userCredential);

      // await setDoc(doc(db, 'users', user.uid), formDataCopy);
      // toast.success('sign up successfully')
      // navigate('/')

    } catch (error) {
      console.log(error);
      const errorCode = error.code; 
      const errorMessage = error.message
      toast.error(errorCode.slice(5).replace('/', ' '));
      console.log(error.code.replace('/', ' '));
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back</p>
      </header>
      <form action="" method='' onSubmit={onSubmit}>
        <input type="email" className="emailInput" placeholder="Email" id='email' value={email} onChange={onChange} />
        <div className="flex items-center justify-between passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id='password' value={password} onChange={onChange} />
          <span className='' onClick={() => setShowPassword((prevState) => !prevState)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        <Link to="/forgot-password" className="forgotPasswordLink">Forgot Password?</Link>
        <div className='signInBar'>
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRight fill="#fff" width={"34px"} height={"34px"} />
          </button>
          <Link to="/signup" className="registerLink">
            Sign Up Instead
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signin