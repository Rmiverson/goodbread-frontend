import React from 'react'
import { connect } from 'react-redux'
import { userFollowPostsFetch } from '../actions/actions'

import PostPreviewCard from '../components/PostPreviewCard'


class Home extends React.Component {
   componentDidMount() {
      let currentUser = this.props.currentUser
      this.props.userFollowPostsFetch(currentUser)
   }

   renderFeed = () => {
      let posts = this.props.followsPosts
      console.log(posts)
      if (Object.keys(posts).length > 1) {
         return posts.map(post => {
            return (<PostPreviewCard post={post} key={post.id}/>)
         })  
      }
   }

   render() {
      return(
         <div className="home-page">
            <h2>Home Page</h2>
            <div className="feed">
               {this.renderFeed()}
            </div>
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   userFollowPostsFetch: (currentUser) => dispatch(userFollowPostsFetch(currentUser))
})

export default connect(null, mapDispatchToProps)(Home)