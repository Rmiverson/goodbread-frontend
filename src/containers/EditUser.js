import React, { useState } from 'react'
import EditUserForm from '../components/EditUserForm'
import { connect } from 'react-redux'
import { updateUserFetch, deleteUser } from '../store/actions/userActions'
import { Redirect } from 'react-router-dom'

const EditUser = (props) => {
   const [submitted, setSubmitted] = useState(false)

   const handleDelete = () => {
      props.deleteUser(props.currentUser.id)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      let newUser = { 
         ...props.currentUser, 
         username: e.target.username.value,
         user_desc: e.target.userDesc.value           
      }

      props.updateUserFetch(newUser)
      setSubmitted(true)
   }

   return (
      <div className="edit-user-page">
         <EditUserForm type="Edit Profile" handleSubmit={handleSubmit} username={props.currentUser.username} userDesc={props.currentUser.user_desc}/>
         <button onClick={handleDelete} className="delete-btn">Delete Profile</button>
         {!!submitted && <Redirect to="/profile" />}
      </div>
   )
}

const mapStateToProps = state => ({
   currentUser: state.currentUser
 })

 const mapDispatchToProps = dispatch => ({
   updateUserFetch: (user) => dispatch(updateUserFetch(user)),
   deleteUser: (userId) => dispatch(deleteUser(userId)) 
 })

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)