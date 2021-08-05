import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { newPostFetch } from '../store/actions/postActions'

import PostForm from '../components/PostForm'

const NewPost = (props) => {
   const [submitted, setSubmitted] = useState(false)
   const [postId, setPostId] = useState('')

   let emptyValues = {
      title: '',
      content: ''
   }

   const updateIdCallback = (post) => {
      setPostId(post.id)
      setSubmitted(true)
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      let newPostObj = {
         user_id: props.currentUser.id,
         title: sanitize(e.target.title.value),
         content: sanitize(e.target.content.value)
      }
      props.newPostFetch(newPostObj, updateIdCallback)
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
      <PostForm type='New Form Page' renderReRoute={(renderReRoute)} handleSubmit={handleSubmit} values={emptyValues}/>
   )
}

const mapStateToProps = state => ({
   currentUser: state.currentUser
 })

const mapDispatchToProps = dispatch => ({
   newPostFetch: (newPostObj, callback) => dispatch(newPostFetch(newPostObj, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)