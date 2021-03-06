import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserPosts } from '../actions/actions'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

class Profile extends React.Component {
   state = {
      loading: true,
      posts: []
   }

   postsCallback = (postsArr) =>  {
      this.setState({
         loading:false,
         posts: postsArr
      })
   }

   renderProfile = () => {
      return(
         <div className="profile-page">
            <h2>Profile Page</h2>
            <UserInfoCard user={this.props.currentUserData} />
            <Link to="/edituser">Edit Profile</Link>
            <Feed posts={this.state.posts} />
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
      this.props.getUserPosts(this.props.currentUserData, this.postsCallback)
   }
}

const mapStateToProps = state => ({
   currentUserData: state.currentUserData
 })

 const mapDispatchToProps = dispatch => ({
   getUserPosts: (user, callback) => dispatch(getUserPosts(user, callback))
 })
 

export default connect(mapStateToProps, mapDispatchToProps)(Profile)