import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import UserInfoCard from '../components/UserInfoCard'
import Feed from './Feed'

import { connect } from 'react-redux'
import { followUserFetch, unfollowUserFetch } from '../store/actions/followActions'
import { getUserPosts } from '../store/actions/postActions'
import { getUserInfoFetch } from '../store/actions/userActions'

const User = (props) => {
   const [loading, setLoading] = useState(true)
   const [user, setUser] = useState({})
   
   useEffect(() => {
      let id = props.match.params.userId
      getUserInfo(id)
   }, [])

   const userCallback = (userObj) => {
      setUser(userObj)
      setLoading(false)
   }

   const arrIncludesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   const getUserInfo = (id = user.id) => {
      props.getUserInfoFetch(id, userCallback)
   }

   const handleUnfollow = () => {
      let relationship = {
         follower_id: props.currentUser.id,
         followee_id: user.id
      }
      props.unfollowUserFetch(relationship, getUserInfo)
   }

   const handleFollow = () => {
      let relationship = {
         follower_id: props.currentUser.id,
         followee_id: user.id
      }

      props.followUserFetch(relationship, getUserInfo)
   }

   const renderFollowButton = () => {
      if (user.id === props.currentUser.id) {
         return ""
      } else if (!arrIncludesId(user.followers, props.currentUser.id)) {
         console.log(user.follwers)
         return <button onClick={handleUnfollow} className="link-btn">Unfollow</button>
      } else {
         return <button onClick={handleFollow} className="link-btn">Follow</button>
      }
   }

   if (loading) {
      return (
         <span>Loading...</span>
      )
   } else if (props.currentUser.id === user.id) {
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

const mapStateToProps = state => ({
   currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
   getUserPosts: (user, callback) => dispatch(getUserPosts(user, callback)),
   getUserInfoFetch: (id, callback) => dispatch(getUserInfoFetch(id, callback)),
   followUserFetch: (relationship, callback) => dispatch(followUserFetch(relationship, callback)),
   unfollowUserFetch: (relationship, callback) => dispatch(unfollowUserFetch(relationship, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)