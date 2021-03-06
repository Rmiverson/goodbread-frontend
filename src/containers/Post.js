import React from 'react'
import { connect } from 'react-redux'
import { getPostFetch, newCommentFetch, postLikeFetch, postUnlikeFetch } from '../actions/actions'
import { Link } from 'react-router-dom'

import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

class Post extends React.Component {
   state = {
      loading: true,
      post: {}
   }

   postCallback = (post) => {
      this.setState({ 
         loading: false,
         post: post
      })
   }

   commentCallback = () => {
      this.props.getPostFetch(this.state.post.id, this.postCallback)
   }

   renderComments = () => {
      let comments = this.state.post.comments
      return comments.map(comment => {
         return <Comment key={comment.id} id={comment.id} commentCallback={this.commentCallback}/>
      })
   }

   renderEditBtn = () => {
      if (this.props.currentUser.id === this.state.post.user.id) {
         return <Link to={`/editpost/${this.state.post.id}`}>Edit</Link>
      }
   }

   handleCommentSubmit = e => {
      e.preventDefault()

      let comment = {
         user_id: this.props.currentUser.id,
         post_id: this.state.post.id,
         content: e.target.content.value
      }

      this.props.newCommentFetch(comment, this.commentCallback)

      e.target.content.value = ""
   }

   handleLike = e => {
      let likeObj = {
         user_id: this.props.currentUser.id,
         post_id: this.state.post.id
      }

      this.props.postLikeFetch(likeObj, this.commentCallback)
   }

   handleUnlike = e => {
      let likeArr = this.state.post.post_likes

      let like = likeArr.find(like => like.user_id === this.props.currentUser.id)

      this.props.postUnlikeFetch(like.id, this.commentCallback)
   }  

   renderFollowBtn = () => {
      let currentUser = this.props.currentUser

      if (!this.arrIncludesId(this.state.post.post_likes, currentUser.id)) {
         return <button onClick={this.handleUnlike}>Unlike</button>
      } else {
         return <button onClick={this.handleLike}>Like</button>
      }
   }

   arrIncludesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   renderPost = () => {
      return (
         <div className="post">
            <h2>{this.state.post.title}</h2>
            {this.renderEditBtn()}
            <br/>
            <Link to={`/user/${this.state.post.user.id}`} >{this.state.post.user.username}</Link>
            <p>{this.state.post.content}</p>
            <p>Likes: {this.state.post.post_likes.length}</p>
            {this.renderFollowBtn()}
            <div className="comment-section">
               <CommentForm type="New" handleSubmit={this.handleCommentSubmit} value=""/>
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
         return( this.renderPost() )
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
   currentUser: state.currentUser
 })

const mapDispatchToProps = dispatch => ({
   getPostFetch: (postId, postCallback) => dispatch(getPostFetch(postId, postCallback)),
   newCommentFetch: (comment, commentCallback) => dispatch(newCommentFetch(comment, commentCallback)),
   postLikeFetch: (likeObj, callback) => dispatch(postLikeFetch(likeObj, callback)),
   postUnlikeFetch: (id, callback) => dispatch(postUnlikeFetch(id, callback))

})

export default connect(mapStateToProps, mapDispatchToProps)(Post)