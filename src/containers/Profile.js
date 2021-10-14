import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

const Profile = () => {
   const currentUser = useSelector((state) => state.currentUser)

   return (
      <div className='profile-page'>
         <div className='header'>
            <h2>Profile Page</h2>
            <UserInfoCard user={currentUser} />
            <div className='router-link-btn'>
               <Link to='/edituser'>Edit Profile</Link>
            </div>
         </div>
         <Feed posts={currentUser.posts} />
      </div>
   )
}

export default Profile