import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserPosts } from '../actions/actions'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

class Profile extends React.Component {
   state = {
      loading: true
   }

   renderProfile = () => {
      return(
         <div className="profile-page">
            <h2>Profile Page</h2>
            <UserInfoCard user={this.props.currentUserData} />
            <Link to="/edituser">Edit Profile</Link>
            <Feed posts={this.props.selectedUserPosts} />
         </div>
      ) 
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
      this.props.getUserPosts(this.props.currentUserData)
      this.setState({loading:false})
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