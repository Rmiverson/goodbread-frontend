import React from 'react'

class UserForm extends React.Component {
   render() {
      return(
         <div className="user-form">
            <h2>{this.props.type}</h2>
            <form onSubmit={this.props.handleSubmit}>
               <div className="form-username-block">
                  <label>Username</label>
                  <input 
                     name='username'
                     placeholder='Username'
                     value={this.props.username}
                     onChange={this.props.handleChange}
                  />
               </div>
               <br />
               <div className="form-password-block">
                  <label>Password</label>
                  <input 
                     name='password'
                     placeholder='password'
                     value={this.props.password}
                     onChange={this.props.handleChange}
                  />
               </div>
               <br />
               <input type='submit' />
            </form>
         </div>
      )
   }
}

export default UserForm