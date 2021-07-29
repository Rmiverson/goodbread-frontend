import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserPosts } from '../actions/actions'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

const Profile = (props) => {
   const [loading, setLoading] = useState(true)
   const [posts, setPosts] = useState([])

   const postsCallback = (postsArr) => {
      setLoading(false)
      setPosts(postsArr)
   }

   useEffect(() => {
      props.getUserPosts(props.currentUserData, postsCallback)
   }, [])

   if (loading) {
      return (
         <span>Loading...</span>
      )
   } else {
      return (
         <div className='profile-page'>
            <div className='header'>
               <h2>Profile Page</h2>
               <UserInfoCard user={props.currentUserData} />
               <div className='router-link-btn'>
                  <Link to='/edituser'>Edit Profile</Link>
               </div>
            </div>
            <Feed posts={posts} />
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUserData: state.currentUserData
 })

 const mapDispatchToProps = dispatch => ({
   getUserPosts: (user, callback) => dispatch(getUserPosts(user, callback))
 })
 

export default connect(mapStateToProps, mapDispatchToProps)(Profile)