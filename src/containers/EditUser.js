import React, { useState } from 'react'
import EditUserForm from '../components/EditUserForm'
import { connect } from 'react-redux'
import { deleteUser, updateUserFetch } from '../actions/actions'
import { Redirect } from 'react-router-dom'

const EditUser = (props) => {
   const [submitted, setSubmitted] = useState(false)

   const updateSubmit = () => {
      setSubmitted(true)
   }

   const handleDelete = () => {
      props.deleteUser(props.currentUserData.id)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      let userObj = {
         id: props.currentUserData.id,
         username: e.target.username.value,
         user_desc: e.target.userDesc.value
      }

      props.updateUserFetch(userObj, updateSubmit)
   }

   return (
      <div className="edit-user-page">
         <EditUserForm type="Edit Profile" handleSubmit={handleSubmit} username={props.currentUserData.username} userDesc={props.currentUserData.userDesc}/>
         <button onClick={handleDelete} className="delete-btn">Delete Profile</button>
         {!!submitted && <Redirect to="/profile" />}
      </div>
   )
}

const mapStateToProps = state => ({
   currentUserData: state.currentUserData
 })

 const mapDispatchToProps = dispatch => ({
   updateUserFetch: (user, callback) => dispatch(updateUserFetch(user, callback)),
   deleteUser: (userId) => dispatch(deleteUser(userId)) 
 })

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)