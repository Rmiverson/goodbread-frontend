import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userPostFetch } from '../store/actions/userActions'
import { Redirect } from 'react-router-dom'

import UserForm from '../components/UserForm'
import Landing from '../components/Landing'
import { ReactComponent as ReactLogo } from '../logo.svg'

const Signup = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   const handleChange = (e) => {
      if (e.target.name === 'password') {
         setPassword(e.target.value)
      } else if (e.target.name === 'username') {
         setUsername(e.target.value)
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(userPostFetch(
         {
            username: username,
            password: password
         }
      ))
   }
   
   return (
      <div className="signup-form">
         {!!currentUser.id && <Redirect to="/" />}
         <div className="landing-logo">
            <ReactLogo />
         </div>
         <Landing />
         <UserForm type="Signup" username={username} password={password} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </div>
   )
}

export default Signup