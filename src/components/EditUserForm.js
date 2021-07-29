import React from 'react'

const EditUserForm = (props) => {
   return(
      <div className="edit-user-form">
         <h2>{props.type}</h2>
         <form onSubmit={props.handleSubmit}>
            <label>Username</label>
            <input 
               name='username'
               placeholder='Username'
               defaultValue={props.username}
               required
            />
            <label>User Description</label>
            <textarea 
               name="userDesc" 
               rows="20" 
               cols="60" 
               id="user-description" 
               defaultValue={props.userDesc}
               required
            ></textarea>
            <input type='submit' className="submit-btn"/>
         </form>
      </div>
   )   
}

export default EditUserForm