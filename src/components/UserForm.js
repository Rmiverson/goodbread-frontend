import React from 'react'

class UserForm extends React.Component {

   render() {
      return(
         <div className="user-form">
            <h2>{this.props.type}</h2>
            <form onSubmit={this.props.handleSubmit}>            
                  <label>Username</label>
   
                  <input 
                     name='username'
                     placeholder='Username'
                     value={this.props.username}
                     onChange={this.props.handleChange}
                  />
               
                  <label>Password</label>
                  <input 
                     name='password'
                     placeholder='password'
                     type="password"
                     value={this.props.password}
                     onChange={this.props.handleChange}
                  />
               
               <input type='submit' />
            </form>
         </div>
      )
   }
}

export default UserForm