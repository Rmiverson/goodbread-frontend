import React, { useEffect } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, userPersistFetch } from './store/actions/userActions'

import NavBar from './components/NavBar'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Home from './containers/Home'
import Search from './containers/Search'
import Profile from './containers/Profile'
import EditUser from './containers/EditUser'
import Post from './containers/Post'
import EditPost from './containers/EditPost'
import NewPost from './containers/NewPost'
import User from './containers/User'
import NotFound from './components/NotFound'

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