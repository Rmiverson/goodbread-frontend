import React from 'react'
import UserInfoCard from '../components/UserInfoCard'
import Feed from './Feed'

import { connect } from 'react-redux'
import { followUserFetch, getUserInfoFetch, getUserPosts,  unfollowUserFetch } from '../actions/actions'

class User extends React.Component {
   state = {
      user: {},
      loading: true
   }

   userCallback = (userObj) => {
      this.setState({
         user: userObj,
         loading: false
      })
   }

   getUserInfo = (id = this.state.user.id) => {
      this.props.getUserInfoFetch(id, this.userCallback)
   }

   arrIncludesId = (arr, id) => {
      return arr.every( element => {
         if (element.id === id) {
            return false
         }
         return true 
      })
   }

   handleUnfollow = e => {
      let relationship = {
         follower_id: this.props.currentUserData.id,
         followee_id: this.state.user.id
      }

      this.props.unfollowUserFetch(relationship, this.getUserInfo)
   }

   handleFollow = e => {
      let relationship = {
         follower_id: this.props.currentUserData.id,
         followee_id: this.state.user.id
      }

      this.props.followUserFetch(relationship, this.getUserInfo)
   }
   
   renderFollowButton = () => {
      let currentUser = this.props.currentUserData
      let selectedUser = this.state.user

      if (selectedUser.id === currentUser.id) {
         return ""
      } else if (!this.arrIncludesId(selectedUser.followers, currentUser.id)) {
         return <button onClick={this.handleUnfollow}>Unfollow</button>
      } else {
         return <button onClick={this.handleFollow}>Follow</button>
      }
   }

   renderProfile = () => {
      return <div className="profile-page">
         <h2>user page</h2>
         {this.renderFollowButton()}
         <UserInfoCard user={this.state.user} />
         <Feed posts={this.state.user.posts} />   
      </div>
   }

   render() {
      if (this.state.loading) {
         return (
            <span>Loading...</span>
         )
      } else {
         return( this.renderProfile() )
      }
   }

   componentDidMount() {
      let path = window.location.pathname
      let arr = path.split("/")
      let id = arr[2]

      this.getUserInfo(id)
   }
}

const mapStateToProps = state => ({
   currentUserData: state.currentUserData
})

const mapDispatchToProps = dispatch => ({
   getUserPosts: (user, callback) => dispatch(getUserPosts(user, callback)),
   getUserInfoFetch: (id, callback) => dispatch(getUserInfoFetch(id, callback)),
   followUserFetch: (relationship, callback) => dispatch(followUserFetch(relationship, callback)),
   unfollowUserFetch: (relationship, callback) => dispatch(unfollowUserFetch(relationship, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)