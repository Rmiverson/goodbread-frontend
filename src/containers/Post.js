import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPostFetch, postLikeFetch, postUnlikeFetch } from '../store/actions/postActions'
import { newCommentFetch } from '../store/actions/commentActions'
import { Link } from 'react-router-dom'

import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

const Post = (props) => {
   const [post, setPost] = useState({})

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   useEffect(() => {
      let id = props.match.params.postId
      dispatch(getPostFetch(id, postCallback))
   }, [])

   // callbacks
   const postCallback = useCallback(
      (post) => setPost(post)
   )

   const commentCallback = useCallback(
      () => dispatch(getPostFetch(post.id, postCallback))
   )

   // utils
   const includesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   // handlers
   const handleCommentSubmit = (e) => {
      e.preventDefault()

      dispatch(newCommentFetch(
         {
            user_id: currentUser.id,
            post_id: post.id,
            content: e.target.content.value
         }, 
         commentCallback
      ))
      e.target.content.value = ""
   }

   const handleLike = () => {
      dispatch(postLikeFetch(
         {
            user_id: currentUser.id,
            post_id: post.id
         },
         commentCallback
      ))
   }

   const handleUnlike = () => {
      let likeArr = post.post_likes
      let like = likeArr.find(like => like.user_id === currentUser.id)

      dispatch(postUnlikeFetch(like.id, commentCallback))
   } 

   // renders
   const renderLikeBtn = () => {
      if (currentUser.id !== post.user_id) {
         if (!includesId(post.post_likes, currentUser.id)) {
            return <button onClick={handleUnlike} className="submit-btn">Unlike</button>
         } else {
            return <button onClick={handleLike} className="submit-btn">Like</button>
         }         
      }
   }

   const renderComments = () => {
      let comments = post.comments
      return comments.map(comment => {
         return <Comment key={comment.id} id={comment.id} commentCallback={commentCallback}/>
      })
   }

   const renderEditBtn = () => {
      if (currentUser.id === post.user.id) {
         return (
            <div className="router-edit-btn">
               <Link to={{
                  pathname: `/post/${post.id}/edit`,
                  state: {}
                  }}
               >Edit</Link>
            </div>    
         )
      }
   }

   if (Object.keys(post).length <= 0) {
      return (
         <span>Loading...</span>
      )
   } else {
      return( 
         <div className="post-page">
            <div className="post">
               <h2>{post.title}</h2>
               {renderEditBtn()}
               <div className="router-link-btn">
                  <Link to={`/user/${post.user.id}`} >Author: {post.user.username}</Link>
               </div>
               <h5>Likes: {post.post_likes.length}</h5>
               <p>{post.content}</p>
               <div className="like-btn">
                  {renderLikeBtn()}
               </div>
            </div>
            
            <div className="comment-section">
               <CommentForm type="New" handleSubmit={handleCommentSubmit} value=""/>
               {renderComments()}
            </div>
         </div>
      )
   }
}

export default Post