import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, userPersistFetch } from './store/actions/userActions'

import Loading from './components/Loading'

const Signup = lazy(() => import('./containers/Signup'))
const Login = lazy(() => import('./containers/Login'))
const NavBar = lazy(() => import('./components/NavBar'))
const Home = lazy(() => import('./containers/Home'))
const Search = lazy(() => import('./containers/Search'))
const Profile = lazy(() => import('./containers/Profile'))
const NotFound = lazy(() => import('./components/NotFound'))
const Post = lazy(() => import('./containers/Post'))
const User = lazy(() => import('./containers/User'))
const NewPost = lazy(() => import('./containers/NewPost'))
const EditPost = lazy(() => import('./containers/EditPost'))
const EditUser = lazy(() => import('./containers/EditUser'))

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

   // let history = useHistory()

   // console.log(history.location.pathname)
   // console.log(history)
    
   return (
      <Suspense fallback={<Loading sequence="router"/>}>
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
      </Suspense>
   )
}

export default withRouter(Routes)