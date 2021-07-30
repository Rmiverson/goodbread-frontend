import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCommentFetch, editCommentFetch, deleteCommentFetch, commentLikeFetch, commentUnlikeFetch } from '../actions/actions'
import CommentForm from './CommentForm'

const Comment = (props) => {
   const [loading, setLoading] = useState(true)
   const [edit, setEdit] = useState(false)
   const [deleted, setDeleted] = useState(false)
   const [comment, setComment] = useState({})

   useEffect(() => {
      getComment()
   }, [])

   const arrIncludesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   const getComment = () => {
      props.getCommentFetch(props.id, commentCallback)
   }

   const commentCallback = (commentObj) => {
      setComment(commentObj)
      setLoading(false)
   }

   const deleteCommentCallback = () => {
      setComment({})
      setDeleted(true)
   }

   const handleEdit = () => setEdit(true)
   
   const handleDelete = () => {
      props.deleteCommentFetch(comment.id, deleteCommentCallback)
   }

   const handleCommentSubmit = (e) => {
      e.preventDefault()

      let comment = {
         id: comment.id,
         user_id: props.currentUser.id,
         post_id: comment.post.id,
         content: e.target.content.value
      }

      props.editCommentFetch(comment, commentCallback)
      e.target.content.value = ""
      setEdit(false)
   }

   const handleLike = () => {
      let like = {
         user_id: props.currentUser.id,
         comment_id: comment.id
      }

      props.commentLikeFetch(like, getComment)
   }

   const handleUnlike = () => {
      let likeArr = comment.comment_likes
      let like = likeArr.find(like => like.user_id === props.currentUser.id)

      props.commentUnlikeFetch(like.id, getComment)
   }

   const renderEditBtn = () => {
      if (props.currentUser.id === comment.user.id) {
         return (
            <div className="edit-delete-btns">
               <button onClick={handleEdit} className="submit-btn">Edit</button>
               <button onClick={handleDelete} className="submit-btn">Delete</button>
            </div>
         )
      }
   }

   const renderLikeBtn = () => {
      if (props.currentUser.id !== comment.user.id) {
         if (!arrIncludesId(comment.comment_likes, props.currentUser.id)) {
            return <button onClick={handleUnlike} className="submit-btn">Unlike</button>
         } else {
            return <button onClick={handleLike} className="submit-btn">Like</button>
         } 
      } 
   }
   
   if (loading) {
      return (
         <span>Loading...</span>
      )
   } else if (edit) {
      return( 
         <CommentForm type="Edit" handleSubmit={handleCommentSubmit} value={comment.content} />
      )
   } else if(deleted) {
      return (<h5>Comment Deleted</h5>)
   } else {
      return(
         <div className="comment">
            <div className="content-header">
               <div className="router-link-btn">
                  <Link to={`/user/${comment.user.id}`}>{comment.user.username}</Link>
               </div>
            </div>

            <p>{comment.content}</p>
            <h5>likes: {comment.comment_likes.length}</h5>
            <div className="comment-edit-section">
               {renderEditBtn()}
               <div className="like-btns">
                  {renderLikeBtn()}  
               </div>
            </div>
         </div>
      )
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