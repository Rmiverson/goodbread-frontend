import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCommentFetch, editCommentFetch, deleteCommentFetch, commentLikeFetch, commentUnlikeFetch } from '../actions/actions'
import CommentForm from './CommentForm'

class Comment extends React.Component {
   state = {
      loading: true,
      edit: false,
      deleted: false,
      comment: {}
   }

   arrIncludesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   getComment = () => {
      this.props.getCommentFetch(this.props.id, this.commentCallback)
   }

   commentCallback = (commentObj) => {
      this.setState({
         loading: false,
         comment: commentObj
      })
   }

   deleteCommentCallback = () => {
      this.setState({
         comment: {},
         deleted: true
      })
   }

   handleEdit = () => {
      this.setState({edit: true})
   }

   handleDelete = () => {
      this.props.deleteCommentFetch(this.state.comment.id, this.deleteCommentCallback)
   }

   handleCommentSubmit = e => {
      e.preventDefault()

      let comment = {
         id: this.state.comment.id,
         user_id: this.props.currentUser.id,
         post_id: this.state.comment.post.id,
         content: e.target.content.value
      }

      this.props.editCommentFetch(comment, this.commentCallback)

      e.target.content.value = ""
      this.setState({edit: false})
   }

   handleLike = () => {
      let like = {
         user_id: this.props.currentUser.id,
         comment_id: this.state.comment.id
      }

      this.props.commentLikeFetch(like, this.getComment)
   }

   handleUnlike = () => {
      let likeArr = this.state.comment.comment_likes

      let like = likeArr.find(like => like.user_id === this.props.currentUser.id)

      this.props.commentUnlikeFetch(like.id, this.getComment)
   }

   renderEditBtn = () => {
      if (this.props.currentUser.id === this.state.comment.user.id) {
         return (
            <div className="edit-delete-btns">
               <button onClick={this.handleEdit} className="submit-btn">Edit</button>
               <button onClick={this.handleDelete} className="submit-btn">Delete</button>
            </div>
         )
      }
   }

   renderLikeBtn = () => {
      if (this.props.currentUser.id !== this.state.comment.user.id) {
         if (!this.arrIncludesId(this.state.comment.comment_likes, this.props.currentUser.id)) {
            return <button onClick={this.handleUnlike} className="submit-btn">Unlike</button>
         } else {
            return <button onClick={this.handleLike} className="submit-btn">Like</button>
         } 
      } 
   }

   renderComment = () => {
      return(
         <div className="comment">
            <div className="content-header">
               <div className="router-link-btn">
                  <Link to={`/user/${this.state.comment.user.id}`}>{this.state.comment.user.username}</Link>
               </div>
            </div>

            <p>{this.state.comment.content}</p>
            <h5>likes: {this.state.comment.comment_likes.length}</h5>
            <div className="comment-edit-section">
               {this.renderEditBtn()}
               <div className="like-btns">
                  {this.renderLikeBtn()}  
               </div>

            </div>

         </div>
      )      
   }

   render() {
      if (this.state.loading) {
         return (
            <span>Loading...</span>
         )
      } else if (this.state.edit) {
         return( 
            <CommentForm type="Edit" handleSubmit={ this.handleCommentSubmit } value={this.state.comment.content} />
         )
      } else if(this.state.deleted) {
         return (<h5>Comment Deleted</h5>)
      } else {
         return( this.renderComment() )
      }
   }

   componentDidMount() {
      this.getComment()
   }

}

const mapStateToProps = state => ({
   currentUser: state.currentUser
 })

const mapDispatchToProps = dispatch => ({
   getCommentFetch: (comment, callback) => dispatch(getCommentFetch(comment, callback)),
   editCommentFetch: (comment, callback) => dispatch(editCommentFetch(comment, callback)),
   deleteCommentFetch: (id, callback) => dispatch(deleteCommentFetch(id, callback)),
   commentLikeFetch: (comment, callback) => dispatch(commentLikeFetch(comment, callback)),
   commentUnlikeFetch: (id, callback) => dispatch(commentUnlikeFetch(id, callback))

})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)