import React from 'react'
import { connect } from 'react-redux'
import { getPostFetch } from '../actions/actions'
import { Link } from 'react-router-dom'

import Comment from '../components/Comment'

class Post extends React.Component {
   state = {
      loading: true
   }

   postCallback = (id) => {
      this.setState({ loading: false })
   }

   renderComments = () => {
      let comments = this.props.selectedPost.comments
      return comments.map(comment => {
         return <Comment key={comment.id} comment={comment} />
      })
   }

   renderEditBtn = () => {
      if (this.props.currentUser.id === this.props.selectedPost.user.id) {
         return <Link to={`/editpost/${this.props.selectedPost.id}`}>Edit</Link>
      }
   }

   renderPost = () => {
      return (
         <div className="post">
            <h2>{this.props.selectedPost.title}</h2>
            {this.renderEditBtn()}
            <br/>
            <Link to={`/user/${this.props.selectedPost.user.id}`} >{this.props.selectedPost.user.username}</Link>
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
      this.props.getPostFetch(id, this.postCallback)
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser,
   selectedPost: state.selectedPost
 })

const mapDispatchToProps = dispatch => ({
   getPostFetch: (postId, postCallback) => dispatch(getPostFetch(postId, postCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)