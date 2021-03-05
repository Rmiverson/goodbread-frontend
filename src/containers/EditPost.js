import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPostFetch, updatePostFetch, deletePost } from '../actions/actions'

import PostForm from '../components/PostForm'

class EditPost extends React.Component {
   state = {
      loading: true,
      submitted: false,
      deleted: false,
      postId: ""
   }

   values = {
      title: this.props.selectedPost.title,
      content: this.props.selectedPost.content
   }

   updateLoadingCallback = (id) => {
      this.setState({ loading: false })
   }

   updateSubmittedCallback = () => {
      this.setState({
         submitted: true
      })
   }

   updateDeleteCallback = () => {
      this.setState({
         deleted: true
      })
   }

   handleSubmit = e => {
      e.preventDefault()

      let newPostObj = {
         id: this.props.selectedPost.id,
         user_id: this.props.currentUser.id,
         title: this.sanitize(e.target.title.value),
         content: this.sanitize(e.target.content.value)
      }

      this.props.updatePostFetch(newPostObj, this.updateSubmittedCallback)      
   }

   sanitize = (text) => {  
      let sanitized = text.replace("<script>", "")
      sanitized = sanitized.replace("</script>", "")
      return sanitized
   }

   renderForm = () => {
      return(
         <PostForm type="Edit Form Page" renderReRoute={() => this.state.submitted && <Redirect to={`/post/${this.props.selectedPost.id}`} />} handleSubmit={this.handleSubmit} values={this.values}/>
      )
   }

   renderDelete = () => {
      return(
         <button onClick={this.handleDelete}>Delete</button>
      )
   }

   handleDelete = () => {
      this.props.deletePost(this.props.selectedPost.id, this.updateDeleteCallback)
   }

   render() {
      if (this.state.loading) {
         return (
            <span>Loading...</span>
         )
      } else {
         return(
            <div className="edit-post-page">
               { this.renderForm() }
               { this.renderDelete() }
               { this.state.deleted && <Redirect to={'/profile'} /> }
            </div>
         )
      }
   }

   componentDidMount() {
      let path = window.location.pathname
      let arr = path.split("/")
      let id = arr[2]

      this.props.getPostFetch(id, this.updateLoadingCallback)
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser,
   selectedPost: state.selectedPost
 })

const mapDispatchToProps = dispatch => ({
   updatePostFetch: (newPostObj, callback) => dispatch(updatePostFetch(newPostObj, callback)),
   getPostFetch: (postId, postCallback) => dispatch(getPostFetch(postId, postCallback)),
   deletePost: (id, callback) => dispatch(deletePost(id, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)