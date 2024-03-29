import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { userFollowPostsFetch } from '../store/actions/userActions'
import { Link } from 'react-router-dom'

import Feed from '../containers/Feed'

const Home = (props) => {
   useEffect(() => {
      props.userFollowPostsFetch(props.currentUser)
   },[])

   return (
      <div className="home-page">
         <div className="header">
            <h3>Welcome to GoodBread {props.currentUser.username}!</h3>
            <Link to="/newpost" className="link-btn">New Post</Link>
         </div>

         <div className="home-feed">
            <Feed posts={props.followsPosts} />   
         </div>
      </div>
   )
}

const mapStateToProps = (state) => ({
   currentUser: state.currentUser,
   followsPosts: state.followsPosts
})

const mapDispatchToProps = (dispatch) => ({
   userFollowPostsFetch: (currentUser) => dispatch(userFollowPostsFetch(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)