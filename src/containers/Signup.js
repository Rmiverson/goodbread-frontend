import React, { useState } from 'react'
import { connect } from 'react-redux'
import { userPostFetch } from '../store/actions/userActions'
import { Redirect } from 'react-router-dom'

import UserForm from '../components/UserForm'
import Landing from '../components/Landing'
import {ReactComponent as ReactLogo} from '../logo.svg'

const Signup = (props) => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const handleChange = (e) => {
      if (e.target.name === 'password') {
         setPassword(e.target.value)
      } else if (e.target.name === 'username') {
         setUsername(e.target.value)
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      props.userPostFetch({
         username: username,
         password: password
      })
   }
   
   return (
      <div className="signup-form">
         {!!props.currentUser.id && <Redirect to="/" />}
         <div className="landing-logo">
            <ReactLogo />
         </div>
         <Landing />
         <UserForm type="Signup" username={username} password={password} handleChange={handleChange} handleSubmit={handleSubmit}/>
      </div>
   )
}

const mapStateToProps = (state) => ({
   currentUser: state.currentUser
})

const mapDispatchToProps = (dispatch) => ({
   userPostFetch: (userInfo) => dispatch(userPostFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)