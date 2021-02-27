import React from 'react'
import { connect } from 'react-redux'
import { userLoginFetch } from '../actions/actions'

import UserForm from '../components/UserForm'

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
      this.props.userPostFetch(this.state)
   }

   render() {
      return(
         <UserForm username={this.state.username} password={this.state.password} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Login)