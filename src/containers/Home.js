import React from 'react'
import { connect } from 'react-redux'
import { userFollowPostsFetch, userInfoFetch } from '../actions/actions'
import { Link } from 'react-router-dom'

import Feed from '../containers/Feed'


class Home extends React.Component {

   render() {
      return(
         <div className="home-page">
            <div className="header">
               {/* <h2>Home</h2> */}
               <h3>Welcome to GoodBread {this.props.currentUser.username}!</h3>
               <Link to="/newpost" className="link-btn">New Post</Link>
            </div>

            <div className="home-feed">
               <Feed posts={this.props.followsPosts} />   
            </div>
         </div>
      )
   }

   componentDidMount() {
      this.props.userFollowPostsFetch(this.props.currentUser)
      this.props.userInfoFetch(this.props.currentUser)
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser,
   followsPosts: state.followsPosts,
   currentUserData: state.currentUserData
})

const mapDispatchToProps = dispatch => ({
   userFollowPostsFetch: (currentUser) => dispatch(userFollowPostsFetch(currentUser)),
   userInfoFetch: (currentUser) => dispatch(userInfoFetch(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)