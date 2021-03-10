import React from 'react'
import { connect } from 'react-redux'
import { userLoginFetch } from '../actions/actions'
import { Redirect } from 'react-router-dom'

import UserForm from '../components/UserForm'
import Landing from '../components/Landing'

import {ReactComponent as ReactLogo} from '../logo.svg'

class Login extends React.Component {
   state = {
      username: "",
      password: ""
   }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   handleSubmit = (e) => {
      e.preventDefault()
      this.props.userLoginFetch(this.state)
   }


   render() {
      return(
         <div className="login-form">
            {!!this.props.currentUser.id && <Redirect to="/" />}
            <div className="landing-logo">
               <ReactLogo />
            </div>
            <Landing />
            <UserForm type="Login" username={this.state.username} password={this.state.password} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
         </div>
      )   
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
   userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)