import React from 'react'

class UserInfoCard extends React.Component {

   renderFollow = (arr) => {
      if (arr) {
         return arr.length
      }
   }

   render() {
      return(
         <div className="user-info-card">
            <h3>{this.props.user.username}</h3>
            <h5>Following: {this.renderFollow(this.props.user.followees)}</h5>
            <h5>Followers: {this.renderFollow(this.props.user.followers)}</h5>
            <p>{this.props.user.user_desc}</p>
         </div>
   )
   }

}

export default UserInfoCard