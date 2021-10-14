import React, { useEffect } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, userPersistFetch } from './store/actions/userActions'

import Signup from './containers/Signup'
import Login from './containers/Login'
import NavBar from './components/NavBar'
import Home from './containers/Home'
import Search from './containers/Search'
import Profile from './containers/Profile'
import NotFound from './components/NotFound'
import Post from './containers/Post'
import User from './containers/User'
import NewPost from './containers/NewPost'
import EditPost from './containers/EditPost'
import EditUser from './containers/EditUser'

const Routes = (props) => {

   useEffect(async () => {
      props.userPersistFetch()
   }, [])
  
   const handleLogout = (e) => {
      e.preventDefault()
      localStorage.removeItem('token')
      props.logoutUser()
   }
    
   return (
      <>
         <NavBar handleLogout={handleLogout}/>

         <Switch>
            <Route exact path='/login' component={Login} />        
            <Route exact path='/signup' component={Signup} />

            {!props.currentUser.id && <Redirect to="/login" />}
            <Route exact path='/' component={Home} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/profile/edit' component={EditUser} />
            <Route exact path='/post/:postId' component={Post} />
            <Route exact path='/post/:postId/edit' component={EditPost} />
            <Route exact path='/post/new' component={NewPost} />
            <Route exact path='/user/:userId' component={User} />

            <Route component={NotFound} />
         </Switch>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
      currentUser: state.currentUser
   }
}

const mapDispatchToProps = (dispatch) => ({
   userPersistFetch: () => dispatch(userPersistFetch()),
   logoutUser: () => dispatch(logoutUser())    
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))