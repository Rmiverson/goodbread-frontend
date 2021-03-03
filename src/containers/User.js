import React from 'react'
import UserInfoCard from '../components/UserInfoCard'
import Feed from './Feed'

class User extends React.Component {
   state = {
      selectedUserPosts: {}
   }

   componentDidMount() {
      console.log(this.props.user)
      this.getUserPosts()
   }

   getUserPosts = () => {
      const token = localStorage.token
      const userId = this.props.user.id
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
            <h2>user page</h2>
            <UserInfoCard user={this.props.user} />
            <Feed posts={this.state.selectedUserPosts} />   
         </div>

      )
   }
}

export default User