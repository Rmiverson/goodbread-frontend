import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user, handleLogout}) => {
   return (
      <div>
         <nav className="navbar">
            {!user.id ? (
               <>
                  <NavLink className="link" to="/">Login</NavLink>
                  <NavLink className="link" to="/signup">Signup</NavLink>
               </>
            ) : (
               <>
                  <NavLink
                     to="/"
                     exact
                     className="link"
                  >Home</NavLink>
                  <NavLink
                     to="/search"
                     exact
                     className="link"
                  >Search</NavLink>
                  <NavLink
                     to="/profile"
                     exact
                     className="link"
                  >Profile</NavLink>
                  <a href="http://localhost:3001/" className="link" onClick={handleLogout}>Logout</a>
               </>
            )}
         </nav>
      </div>
   )
}

export default NavBar