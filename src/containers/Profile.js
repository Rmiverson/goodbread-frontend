import React from 'react'
import { connect } from 'react-redux'
import { currentUserData, userInfoFetch } from '../actions/actions'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

class Profile extends React.Component {
   state = {
      selectedUserPosts: {}
   }

   getUserPosts = () => {
      const token = localStorage.token
      const userId = this.props.currentUser.id
      if (token) {
         return fetch('http://localhost:3000/api/v1/userposts/' + userId, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            if (data.message) {
               console.log(data.message)
            } else {
               this.setState({
                  selectedUserPosts: data
               })
            }
         })
      }
   }

   render() {
      return(
         <div className="profile-page">
            <h2>Profile Page</h2>
            <UserInfoCard user={this.props.currentUserData} />
            <Feed posts={this.state.selectedUserPosts} />
         </div>
      )
   }

   componentDidMount() {
      this.props.userInfoFetch(this.props.currentUser)
      this.getUserPosts()
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser,
   currentUserData: state.currentUserData
 })

 const mapDispatchToProps = dispatch => ({
   userInfoFetch: (currentUser) => dispatch(userInfoFetch(currentUser))
 })
 

export default connect(mapStateToProps, mapDispatchToProps)(Profile)