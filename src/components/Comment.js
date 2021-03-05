import React from 'react'
import { connect } from 'react-redux'
import { getCommentFetch, editCommentFetch, deleteCommentFetch } from '../actions/actions'
import CommentForm from './CommentForm'

class Comment extends React.Component {
   state = {
      loading: true,
      edit: false,
      deleted: false,
      comment: {}
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

   renderEditBtn = () => {
      if (this.props.currentUser.id === this.state.comment.user.id) {
         return (
            <div className="comment-edit-delete-btns">
               <button onClick={this.handleEdit}>Edit</button>
               <button onClick={this.handleDelete}>Delete</button>
            </div>
         )
      }
   }

   renderComment = () => {
      return(
         <div className="comment">
            <h5>{this.state.comment.user.username}</h5>
            <p>{this.state.comment.content}</p>
            <p>likes: {this.state.comment.comment_likes.length}</p>
            {this.renderEditBtn()}
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
      this.props.getCommentFetch(this.props.id, this.commentCallback)
   }

}

const mapStateToProps = state => ({
   currentUser: state.currentUser
 })

const mapDispatchToProps = dispatch => ({
   getCommentFetch: (comment, callback) => dispatch(getCommentFetch(comment, callback)),
   editCommentFetch: (comment, callback) => dispatch(editCommentFetch(comment, callback)),
   deleteCommentFetch: (id, callback) => dispatch(deleteCommentFetch(id, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)