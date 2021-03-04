import React from 'react'
import { connect } from 'react-redux'
import { userFollowPostsFetch } from '../actions/actions'
import { Link } from 'react-router-dom'

import Feed from '../containers/Feed'


class Home extends React.Component {
   componentDidMount() {
      this.props.userFollowPostsFetch(this.props.currentUser)
   }

   render() {
      return(
         <div className="home-page">
            <h2>Home Page</h2>
            <Link to="/newpost">New Post</Link>
            <div className="home-feed">
               <Feed posts={this.props.followsPosts} />   
            </div>
         </div>
      )
   }
}
const mapStateToProps = state => ({
   currentUser: state.currentUser,
   followsPosts: state.followsPosts
})

const mapDispatchToProps = dispatch => ({
   userFollowPostsFetch: (currentUser) => dispatch(userFollowPostsFetch(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)