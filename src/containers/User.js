import React from 'react'
import UserInfoCard from '../components/UserInfoCard'
import Feed from './Feed'

import { connect } from 'react-redux'
import { getUserPosts, userInfoFetch } from '../actions/actions'

class User extends React.Component {
   state = {
      update: false,
      loading: true
   }

   updateComponent = () => {
      this.setState((prevState) => ({
         update: !prevState.update
      }))
   }

   arrIncludesId = (arr, id) => {
      return arr.every( element => {
         if (element.id === id) {
            return false
         }
         return true 
      })
   }

   renderFollowButton = () => {
      let currentUser = this.props.currentUserData
      let selectedUser = this.props.selectedUser

      if (!this.arrIncludesId(currentUser.followees, selectedUser.id)) {
         return <button onClick={this.handleUnfollow}>Unfollow</button>
      } else {
         return <button onClick={this.handleFollow}>Follow</button>
      }
   }

   handleUnfollow = e => {
      let currentUser = this.props.currentUserData
      let selectedUser = this.props.selectedUser

      let relationship = {
         follower_id: currentUser.id,
         followee_id: selectedUser.id
      }
      
      const token = localStorage.token
      if (token) {
         return fetch('http://localhost:3000/api/v1/relationships', {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(relationship)
         })
         .then(resp => resp.json())
         .then(data => {
            this.props.userInfoFetch(this.props.currentUserData)
            this.updateComponent()
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }

   handleFollow = e => {
      let currentUser = this.props.currentUserData
      let selectedUser = this.props.selectedUser

      let relationship = {
         follower_id: currentUser.id,
         followee_id: selectedUser.id
      }
      
      const token = localStorage.token
      if (token) {
         return fetch('http://localhost:3000/api/v1/relationships', {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
               Accept: 'application/json'
            },
            body: JSON.stringify(relationship)
         })
         .then(resp => resp.json())
         .then(data => {
            this.props.userInfoFetch(this.props.currentUserData)
            this.updateComponent()
            // console.log(data.message)
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }

   render() {
      return(
         <div className="profile-page">
            <h2>user page</h2>
            {this.renderFollowButton()}
            <UserInfoCard user={this.props.selectedUser} /> {/* update card when follow/unfollow */}
            <Feed posts={this.props.selectedUserPosts} />   
         </div>
      )
   }

   componentDidMount() {
      this.props.getUserPosts(this.props.currentUserData)
      this.setState({loading: false})
   }
}

const mapStateToProps = state => ({
   selectedUser: state.selectedUser,
   currentUserData: state.currentUserData,
   selectedUserPosts: state.selectedUserPosts
})

const mapDispatchToProps = dispatch => ({
   getUserPosts: (user) => dispatch(getUserPosts(user)),
   userInfoFetch: (currentUser) => dispatch(userInfoFetch(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)