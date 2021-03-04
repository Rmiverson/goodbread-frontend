import React from 'react'
import { connect } from 'react-redux'
import { getUserPosts, selectedUserPosts } from '../actions/actions'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

class Profile extends React.Component {
   UNSAFE_componentWillMount() {
      this.props.getUserPosts(this.props.currentUserData)
   }
   
   render() {
      return(
         <div className="profile-page">
            <h2>Profile Page</h2>
            <UserInfoCard user={this.props.currentUserData} />
            <Feed posts={this.props.selectedUserPosts} />
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUserData: state.currentUserData,
   selectedUserPosts: state.selectedUserPosts
 })

 const mapDispatchToProps = dispatch => ({
   getUserPosts: (user) => dispatch(getUserPosts(user))
 })
 

export default connect(mapStateToProps, mapDispatchToProps)(Profile)