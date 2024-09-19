import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase.config'
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRight } from '../assets/svg/keyboardArrowRightIcon.svg'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(
    {
      fullname: '',
      email: '',
      password: '',
    }
  )

  const { fullname, email, password } = formData;
  const navigate = useNavigate()

  const togglePasswordIcon = () => {
    setShowPassword(!showPassword)
  }
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: fullname });
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timeStamp = serverTimestamp();
      console.log(userCredential);
      // console.log(user);

      // await setDoc(doc(db, "users", user.uid), {
      //   name: "Los Angeles",
      //   state: "CA",
      //   country: "USA"
      // });

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      toast.success('sign up successfully')
      navigate('/')

    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message
      toast.error(errorCode.slice(5).replace('/', ' '));
      console.log(error.code.slice(5).replace('/', ' '));
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Register</p>
      </header>
      <form action="" method='' onSubmit={onSubmit}>
        <input type="text" className="nameInput" placeholder="Name" id='fullname' value={fullname} onChange={onChange} />
        <input type="email" className="emailInput" placeholder="Email" id='email' value={email} onChange={onChange} />
        <div className="flex items-center justify-between passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id='password' value={password} onChange={onChange} />
          <span className='' onClick={() => setShowPassword((prevState) => !prevState)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        <div className='signInBar'>
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRight fill="#fff" width={"34px"} height={"34px"} />
          </button>
          <Link to="/signin" className="registerLink">
            Sign Ip Instead
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup