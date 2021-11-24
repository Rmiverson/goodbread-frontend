import React, { useEffect } from 'react'
import {  useSelector, useDispatch  } from 'react-redux'
import { userFollowPostsFetch } from '../store/actions/userActions'
import { Link } from 'react-router-dom'

import Feed from '../containers/Feed'

const Home = () => {
   const currentUser = useSelector((state) => state.currentUser)
   const followsPosts = useSelector((state) => state.followsPosts)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(userFollowPostsFetch(currentUser.id))
   },[])

   // console.log(followsPosts)
   // console.log(currentUser.id)
   // console.log(JSON.parse(localStorage.state).currentUser.id)
   // console.log(localStorage)

   
   if (!currentUser.id) {
      return (
         <span>Loading...</span>
      )
   } else {
      return (
         <div className="home-page">
            <div className="header">
               <h3>Welcome to GoodBread {currentUser.username}!</h3>
               <Link to="/new-post" className="link-btn">New Post</Link>
            </div>
            <Feed posts={followsPosts} />   
         </div>
      )
   }      
}

export default Home