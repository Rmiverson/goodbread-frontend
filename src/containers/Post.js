import React from 'react'
import { connect } from 'react-redux'
import { getPostFetch } from '../actions/actions'
import { Link } from 'react-router-dom'

import Comment from '../components/Comment'

class Post extends React.Component {
   state = {
      loading: true
   }

   renderCallback = (id) => {
      this.setState({ loading: false })
   }

   renderComments = () => {
      let comments = this.props.selectedPost.comments
      return comments.map(comment => {
         return <Comment key={comment.id} comment={comment} />
      })
   }

   renderPost = () => {
      return (
         <div className="post">
            <h2>{this.props.selectedPost.title}</h2>
            <Link to="/user" >{this.props.selectedPost.user.username}</Link>
            <p>{this.props.selectedPost.content}</p>
            <div className="comment-section">
               {this.renderComments()}
            </div>
         </div>         
      )
   }

   render() {
      if (this.state.loading) {
         return (
            <span>Loading...</span>
         )
      } else {
         return(
            <div>
               { this.renderPost() }
            </div>
         )
      }
   }

   componentDidMount() {
      let path = window.location.pathname
      let arr = path.split("/")
      let id = arr[2]
      this.props.getPostFetch(id, this.renderCallback)
   }
}

const mapStateToProps = state => ({
   selectedPost: state.selectedPost
 })

const mapDispatchToProps = dispatch => ({
   getPostFetch: (postId, renderCallback) => dispatch(getPostFetch(postId, renderCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)