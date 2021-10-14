import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { newPostFetch } from '../store/actions/postActions'

import PostForm from '../components/PostForm'

const NewPost = () => {
   const [submitted, setSubmitted] = useState(false)
   const [postId, setPostId] = useState('')

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   const updateIdCallback = useCallback(
      (post) => {
         setPostId(post.id)
         setSubmitted(true)
      }
   )

   const handleSubmit = (e) => {
      e.preventDefault()

      let newPostObj = {
         user_id: currentUser.id,
         title: sanitize(e.target.title.value),
         content: sanitize(e.target.content.value)
      }
      dispatch(newPostFetch(newPostObj, updateIdCallback))
   }

   const sanitize = (text) => {
      let sanitized = text.replace("<script>", "")
      sanitized = sanitized.replace("</script>", "")
      return sanitized
   }

   const renderReRoute = () => {
      return (submitted && <Redirect to={`/post/${postId}`} />)
   }

   return (
      <PostForm 
         type='New Form Page'
         renderReRoute={ renderReRoute }
         handleSubmit={ handleSubmit }
         values={ {
            title: '',
            content: ''
         }}
      />
   )
}

export default NewPost