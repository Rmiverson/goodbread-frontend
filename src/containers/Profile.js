import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserPosts } from '../store/actions/postActions'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

const Profile = () => {
   const [posts, setPosts] = useState([])

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getUserPosts(currentUser.id, postCallback))
   }, [])

   const postCallback = useCallback(
      (data) => setPosts(data)
   )

   
   return (
      <div className='profile-page'>
         <div className='header'>
            <h2>Profile Page</h2>
            <UserInfoCard user={currentUser} />
            <div className='router-link-btn'>
               <Link to='/edituser'>Edit Profile</Link>
            </div>
         </div>
         <Feed posts={posts} />
      </div>
   )
}

export default Profile