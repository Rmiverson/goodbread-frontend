import React, { useState, useEffect } from 'react'
import UserInfoCard from '../components/UserInfoCard'
import Feed from './Feed'

import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { currentUserData, getUser } from '../store/actions/userActions'
import { getUserPosts } from '../store/actions/postActions'
import { followUserFetch, unfollowUserFetch } from '../store/actions/followActions'

const User = (props) => {
   const [loading, setLoading] = useState(true)
   const [user, setUser] = useState({})
   
   useEffect(() => {
      let path = window.location.pathname
      let arr = path.split("/")
      let id = arr[2]
      let user = getUser(id)
      console.log('hit')
      setUser(user)
      setLoading(false)
   }, [])

   const arrIncludesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   const handleUnfollow = () => {
      let relationship = {
         follower_id: props.currentUserData.id,
         followee_id: user.id
      }
      props.unfollowUserFetch(relationship)
   }

   const handleFollow = () => {
      let relationship = {
         follower_id: props.currentUserData.id,
         followee_id: user.id
      }

      props.followUserFetch(relationship)
   }

   const renderFollowButton = () => {
      let currentUser = props.currentUser
      let selectedUser = user

      if (selectedUser.id === currentUser.id) {
         return ""
      } else if (!arrIncludesId(selectedUser.followers, currentUser.id)) {
         return <button onClick={handleUnfollow} className="link-btn">Unfollow</button>
      } else {
         return <button onClick={handleFollow} className="link-btn">Follow</button>
      }
   }

   if (loading) {
      return (
         <span>Loading...</span>
      )
   } else {
      return(   
         <div className="profile-page">
         {!currentUserData.id && <Redirect to="/profile" />}
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

const mapStateToProps = state => ({
   currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
   getUser: (id) => dispatch(getUser(id)),
   getUserPosts: (user, callback) => dispatch(getUserPosts(user, callback)),
   followUserFetch: (relationship, callback) => dispatch(followUserFetch(relationship, callback)),
   unfollowUserFetch: (relationship, callback) => dispatch(unfollowUserFetch(relationship, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)