import React from 'react'
import EditUserForm from '../components/EditUserForm'
import { connect } from 'react-redux'
import { deleteUser, updateUserFetch } from '../actions/actions'
import { Redirect } from 'react-router-dom'

class EditUser extends React.Component {
   state = {
      submitted: false
   }

   updateSubmit = () => {
      this.setState({submitted: true})
   }

   handleDelete = () => {
      this.props.deleteUser(this.props.currentUserData.id)
   }

   handleSubmit = e => {
      e.preventDefault()
      let userObj = {
         id: this.props.currentUserData.id,
         username: e.target.username.value,
         user_desc: e.target.userDesc.value
      }
      this.props.updateUserFetch(userObj, this.updateSubmit)
   }

   renderForm = () => {
      return <EditUserForm type="Edit Profile" handleSubmit={this.handleSubmit} username={this.props.currentUserData.username} userDesc={this.props.currentUserData.user_desc} />
   }

   renderRedirect = () => {
      if (this.state.submitted) {
         return <Redirect to="/profile"/>         
      }
   }

   renderDelete = () => {
      return <button onClick={this.handleDelete}>Delete Profile</button>
   }

   render() {
      return (
         <div className="edit-user-page">
            {this.renderForm()}
            {this.renderDelete()}
            {this.renderRedirect()}
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUserData: state.currentUserData
 })

 const mapDispatchToProps = dispatch => ({
   updateUserFetch: (user, callback) => dispatch(updateUserFetch(user, callback)),
   deleteUser: (userId) => dispatch(deleteUser(userId)) 
 })

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)