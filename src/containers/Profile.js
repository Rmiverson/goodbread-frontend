import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

const Profile = (props) => {
   return (
      <div className='profile-page'>
         <div className='header'>
            <h2>Profile Page</h2>
            <UserInfoCard user={props.currentUser} />
            <div className='router-link-btn'>
               <Link to='/edituser'>Edit Profile</Link>
            </div>
         </div>
         <Feed posts={props.currentUser.posts} />
      </div>
   )
}

const mapStateToProps = state => ({
   currentUser: state.currentUser
 })

export default connect(mapStateToProps, null)(Profile)