import React from 'react'

const UserInfoCard = (props) => {
   const renderFollow = (arr) => {
      if (arr) {
         return arr.length
      }
   }

   return (
      <div className="user-info-card">
         <h3>{props.user.username}</h3>
         <h5>Following: {renderFollow(props.user.followees)}</h5>
         <h5>Followers: {renderFollow(props.user.followers)}</h5>
         <p>{props.user.user_desc}</p>
      </div>
   )
}

export default UserInfoCard