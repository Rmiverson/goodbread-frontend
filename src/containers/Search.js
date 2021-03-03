import React from 'react'
import { connect } from 'react-redux'
import { allPostsFetch } from '../actions/actions'

import PostPreviewCard from '../components/PostPreviewCard'

class Search extends React.Component {
   componentDidMount() {
      let currentUser = this.props.currentUser
      this.props.allPostsFetch(currentUser)
   }

   renderFeed = () => {
      let posts = this.props.allPosts
      // console.log(posts)
      if (Object.keys(posts).length > 1) {
         return posts.map(post => {
            return (<PostPreviewCard post={post} key={post.id}/>)
         })  
      }
   }

   render() {
      return(
         <div className="Search-page">
            <h2>Search Page</h2>
            <div className="search-feed">
               {this.renderFeed()}
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser,
   allPosts: state.allPosts
})

const mapDispatchToProps = dispatch => ({
   allPostsFetch: (currentUser) => dispatch(allPostsFetch(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)