import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCommentFetch, editCommentFetch, deleteCommentFetch, commentLikeFetch, commentUnlikeFetch } from '../store/actions/commentActions'
import CommentForm from './CommentForm'

const Comment = (props) => {
   const [loading, setLoading] = useState(true)
   const [edit, setEdit] = useState(false)
   const [deleted, setDeleted] = useState(false)
   const [comment, setComment] = useState({})

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   useEffect(() => {
      getComment()
   }, [])

   //utils
   const includesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   // callbacks
   const getComment = useCallback(
      () => dispatch(getCommentFetch(props.id, commentCallback))
   )

   const commentCallback = useCallback(
      (commentObj) => {
         setComment(commentObj)
         setLoading(false)
      }
   )

   const deleteCommentCallback = useCallback(
      () => {
         setDeleted(true)
         setComment({})
      }
   )

   // handlers
   const handleEdit = () => setEdit(true)
   
   const handleDelete = () => {
      dispatch(deleteCommentFetch(comment.id, deleteCommentCallback))
   }

   const handleCommentSubmit = (e) => {
      e.preventDefault()

      dispatch(editCommentFetch({
         id: comment.id,
         user_id: props.currentUser.id,
         post_id: comment.post.id,
         content: e.target.content.value
      }, commentCallback))

      e.target.content.value = ""
      setEdit(false)
   }

   const handleLike = () => {
      let like = {
         user_id: currentUser.id,
         comment_id: comment.id
      }

      dispatch(commentLikeFetch(like, getComment))
   }

   const handleUnlike = () => {
      let likeArr = comment.comment_likes
      let like = likeArr.find(like => like.user_id === currentUser.id)

      dispatch(commentUnlikeFetch(like.id, getComment))
   }

   const renderEditBtn = () => {
      if (currentUser.id === comment.user.id) {
         return (
            <div className="edit-delete-btns">
               <button onClick={handleEdit} className="submit-btn">Edit</button>
               <button onClick={handleDelete} className="submit-btn">Delete</button>
            </div>
         )
      }
   }

   const renderLikeBtn = () => {
      if (currentUser.id !== comment.user.id) {
         if (!includesId(comment.comment_likes, currentUser.id)) {
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

export default Comment