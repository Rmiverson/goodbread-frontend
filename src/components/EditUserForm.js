import React from 'react'

class EditUserForm extends React.Component {

   render() {
      return(
         <div className="edit-user-form">
            <h2>{this.props.type}</h2>
            <form onSubmit={this.props.handleSubmit}>
               <label>Username</label>
               <input 
                  name='username'
                  placeholder='Username'
                  defaultValue={this.props.username}
                  required
               />
               <label>User Description</label>
               <textarea 
                  name="userDesc" 
                  rows="20" 
                  cols="60" 
                  id="user-description" 
                  defaultValue={this.props.userDesc}
                  required
               ></textarea>
               <input type='submit' className="submit-btn"/>
            </form>
         </div>
      )
   }
}

export default EditUserForm