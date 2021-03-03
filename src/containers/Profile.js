import React from 'react'
import { connect } from 'react-redux'
import { userInfoFetch } from '../actions/actions'

import UserInfoCard from '../components/UserInfoCard'
import Feed from '../containers/Feed'

class Profile extends React.Component {
   componentDidMount() {
      this.props.userInfoFetch(this.props.currentUser)
   }

   render() {
      return(
         <div className="profile-page">
            <h2>Profile Page</h2>
            <UserInfoCard user={this.props.currentUserData} />
            <Feed posts={this.props.currentUserData.posts} />
         </div>
      )
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