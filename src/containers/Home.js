import React from 'react'
import { connect } from 'react-redux'
import { userFollowPostsFetch } from '../actions/actions'


class Home extends React.Component {
   componentDidMount() {
      let currentUser = this.props.currentUser
      // console.log(this.props.followsPosts)
      this.props.userFollowPostsFetch(currentUser)
   }

   renderFeed = () => {
      let posts = this.props.followsPosts
   }

   render() {
      return(
         <div className="home-page">
            <h2>Home Page</h2>
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   userFollowPostsFetch: (currentUser) => dispatch(userFollowPostsFetch(currentUser))
})

export default connect(null, mapDispatchToProps)(Home)