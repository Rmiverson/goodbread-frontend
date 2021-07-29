import React from 'react'

const UserForm = (props) => {
   return(
      <div className="user-form">
         <h2>{props.type}</h2>
         <form onSubmit={props.handleSubmit}>            
               <label>Username</label>

               <input 
                  name='username'
                  placeholder='Username'
                  value={props.username}
                  onChange={props.handleChange}
                  required
               />
            
               <label>Password</label>
               <input
                  name='password'
                  placeholder='password'
                  type="password"
                  value={props.password}
                  onChange={props.handleChange}
                  required
               />
            
            <input type='submit' className="submit-btn" value={props.type}/>
         </form>
      </div>
   )   
}

export default UserForm