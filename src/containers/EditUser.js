import React, { useState } from 'react'
import EditUserForm from '../components/EditUserForm'
import { useSelector,useDispatch } from 'react-redux'
import { updateUserFetch, deleteUser } from '../store/actions/userActions'
import { Redirect } from 'react-router-dom'

const EditUser = () => {
   const [submitted, setSubmitted] = useState(false)

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   const handleDelete = () => {
      dispatch(deleteUser(currentUser.id))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      let newUser = { 
         ...currentUser, 
         username: e.target.username.value,
         user_desc: e.target.userDesc.value           
      }
      dispatch(updateUserFetch(newUser))
      setSubmitted(true)
   }

   return (
      <div className="edit-user-page">
         <EditUserForm type="Edit Profile" handleSubmit={handleSubmit} username={currentUser.username} userDesc={currentUser.user_desc}/>
         <button onClick={handleDelete} className="delete-btn">Delete Profile</button>
         {!!submitted && <Redirect to="/profile" />}
      </div>
   )
}

export default EditUser