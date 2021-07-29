import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import {ReactComponent as ReactLogo} from '../logo.svg'

const NavBar = (props) => {
   return (
      <nav className="navbar">
         <div className="logo">
            <ReactLogo />
         </div>
         
         {!props.currentUser.id ? (
            <>
               <NavLink className="link" to="/">Login</NavLink>
               <NavLink className="link" to="/signup">Signup</NavLink>
            </>
         ) : (
            <>
               <NavLink to="/" exact className="link">Home</NavLink>
               <NavLink to="/search" exact className="link">Search</NavLink>
               <NavLink to="/profile" exact className="link">Profile</NavLink>
               <a href="http://localhost:3001/" className="link logout" onClick={props.handleLogout}>Logout</a>
            </>
         )}
      </nav>
   )
}

const mapStateToProps = state => ({
   currentUser: state.currentUser
})

export default connect(mapStateToProps, null)(NavBar)