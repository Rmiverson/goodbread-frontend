import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPostFetch, updatePostFetch, deletePost } from '../store/actions/postActions'

import PostForm from '../components/PostForm'
import Loading from '../components/Loading'

const EditPost = (props) => {
   const [post, setPost] = useState({})
   const [submitted, setSubmitted] = useState(false)
   const [deleted, setDeleted] = useState(false)

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   useEffect(() => {
      let id = props.match.params.postId
      dispatch(getPostFetch(id, postCallback))
   }, [])

   // utils
   const sanitize = (text) => {
      let sanitized = text.replace('<script>', '')
      sanitized = sanitized.replace('</script>', '')
      return sanitized
   }

   //callbacks
   const postCallback = useCallback(
      (postObj) => setPost(postObj)
   )

   const submitCallback = useCallback(
      () => setSubmitted(true)
   )

   const deleteCallback = useCallback(
      () => setDeleted(true)
   )

   //handlers
   const handleSubmit = (e) => {
      e.preventDefault()

      dispatch(updatePostFetch({
            id: post.id,
            user_id: currentUser.id,
            title: sanitize(e.target.title.value),
            content: sanitize(e.target.content.value)
         },
         submitCallback
      ))
   }

   const handleDelete = () => {
      dispatch(deletePost(post.id, deleteCallback))
   }

   if (Object.keys(post).length <= 0) {
      return <Loading />
   } else {
      return(
         <div className='edit-post-page'>
            <PostForm 
               type='Edit Form Page'
               renderReRoute={() => submitted && <Redirect to={`/post/${post.id}`} />} 
               handleSubmit={handleSubmit} 
               values={{
                 title: post.title,
                 content: post.content
               }}
            />
            <button onClick={handleDelete} className='delete-btn'>Delete</button>
            { !!deleted && <Redirect to={'/profile'} /> }
         </div>
      )
   }
}

export default EditPost