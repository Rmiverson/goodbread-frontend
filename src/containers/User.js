import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { followUserFetch, unfollowUserFetch } from '../store/actions/followActions'
import { getUserInfoFetch } from '../store/actions/userActions'

import UserInfoCard from '../components/UserInfoCard'
import Feed from './Feed'

const User = (props) => {
   const [user, setUser] = useState({})

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()
   
   useEffect(() => {
      let id = props.match.params.userId
      getUserInfo(id)
   }, [])

   const includesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   const userCallback = useCallback(
      (userObj) => setUser(userObj)
   )

   const getUserInfo = (id = user.id) => {
      dispatch(getUserInfoFetch(id, userCallback))
   }

   const handleUnfollow = () => {
      dispatch(unfollowUserFetch(
         {
            follower_id: props.currentUser.id,
            followee_id: user.id
         },
         getUserInfo
      ))
   }

   const handleFollow = () => {
      dispatch(followUserFetch(
         {
            follower_id: currentUser.id,
            followee_id: user.id
         },
         getUserInfo
      ))
   }

   const renderFollowButton = () => {
      if (user.id === currentUser.id) {
         return ""
      } else if (!includesId(user.followers, currentUser.id)) {
         return <button onClick={handleUnfollow} className="link-btn">Unfollow</button>
      } else {
         return <button onClick={handleFollow} className="link-btn">Follow</button>
      }
   }

   if (Object.keys(user).length <= 0) {
      return (
         <span>Loading...</span>
      )
   } else if (currentUser.id === user.id) {
      return (
         <Redirect to="/profile" />
      )
   } else {
      return( 
         <div className="profile-page">
            <div className="header">
               <h2>user page</h2>
               {renderFollowButton()}
               <UserInfoCard user={user} />            
            </div>

            <Feed posts={user.posts} />   
         </div>
      )
   }
}

export default User