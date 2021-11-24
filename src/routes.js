import React, { useEffect } from 'react'
import { Switch, Route, Redirect, withRouter, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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

const Routes = () => {
   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   useEffect(async () => {
      dispatch(userPersistFetch())
   }, [])
  
   const handleLogout = (e) => {
      e.preventDefault()
      localStorage.removeItem('token')
      dispatch(logoutUser())
   }

   let history = useHistory()

   console.log(history.location.pathname)
   console.log(history)
    
   return (
      <>
         <NavBar handleLogout={handleLogout}/>

         <Switch>
            <Route path='/login' component={Login} />        
            <Route path='/signup' component={Signup} />

            {!currentUser.id && <Redirect to="/login" />}
            <Route exact path='/' component={Home} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/profile/edit' component={EditUser} />
            <Route exact path='/post/:postId' component={Post} />
            <Route exact path='/post/:postId/edit' component={EditPost} />
            <Route exact path='/new-post' component={NewPost} />
            <Route exact path='/user/:userId' component={User} />

            <Route default component={NotFound} />
         </Switch>
      </>
   )
}

export default withRouter(Routes)