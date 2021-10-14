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
      dispatch(userFollowPostsFetch(currentUser))
   },[])

   return (
      <div className="home-page">
         <div className="header">
            <h3>Welcome to GoodBread {currentUser.username}!</h3>
            <Link to="/newpost" className="link-btn">New Post</Link>
         </div>

         <div className="home-feed">
            <Feed posts={followsPosts} />   
         </div>
      </div>
   )
}

export default Home