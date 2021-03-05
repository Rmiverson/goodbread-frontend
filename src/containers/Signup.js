import React from 'react'
import { connect } from 'react-redux'
import { userPostFetch } from '../actions/actions.js'
import { Redirect } from 'react-router-dom'

import UserForm from '../components/UserForm'

class Signup extends React.Component {
   state = {
      username: "",
      password: ""
   }

   handleChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   handleSubmit = e => {
      e.preventDefault()
      this.props.userPostFetch(this.state)
   }

   render() {
      return(
         <div className="signup-form">
            {!!this.props.currentUser.id && <Redirect to="/" />}
            <h2>Signup</h2>
            <UserForm username={this.state.username} password={this.state.password} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
   userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)