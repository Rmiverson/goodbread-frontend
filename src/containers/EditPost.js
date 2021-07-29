import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPostFetch, updatePostFetch, deletePost } from '../actions/actions'

import PostForm from '../components/PostForm'

const EditPost = (props) => {
   const [loading, setLoading] = useState(true)
   const [post, setPost] = useState('')
   const [submitted, setSubmitted] = useState(false)
   const [deleted, setDeleted] = useState(false)

   useEffect(() => {
      let path = window.location.pathname
      let arr = path.split("/")
      let id = arr[2]

      props.getPostFetch(id, updateLoadingCallback)
   }, [])

   const sanitize = (text) => {
      let sanitized = text.replace("<script>", "")
      sanitized = sanitized.replace("</script>", "")
      return sanitized
   }

   const updateLoadingCallback = (postObj) => {
      setLoading(false)
      setPost(postObj)
   }

   const updateSubmittedCallback = () => {
      setSubmitted(true)
   }

   const updateDeleteCallback = () => {
      setDeleted(true)
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      let newPostObj = {
         id: post.id,
         user_id: props.currentUser.id,
         title: sanitize(e.target.title.value),
         content: sanitize(e.target.content.value)
      }

      props.updatePostFetch(newPostObj, updateSubmittedCallback)
   }

   const handleDelete = () => {
      props.deletePost(post.id, updateDeleteCallback)
   }

   if (loading) {
      return (
         <span>Loading...</span>
      )
   } else {
      return(
         <div className="edit-post-page">
            <PostForm 
               type="Edit Form Page" 
               renderReRoute={() => submitted && <Redirect to={`/post/${post.id}`} />} 
               handleSubmit={handleSubmit} 
               values={   
                  {
                     title: post.title,
                     content: post.content
                  }
               }
            />
            <button onClick={handleDelete} className="delete-btn">Delete</button>
            { !!deleted && <Redirect to={'/profile'} /> }
         </div>
      )
   }
}


// class EditPost extends React.Component {
//    state = {
//       loading: true,
//       post: "",
//       submitted: false,
//       deleted: false
//    }

//    sanitize = (text) => {  
//       let sanitized = text.replace("<script>", "")
//       sanitized = sanitized.replace("</script>", "")
//       return sanitized
//    }

//    updateLoadingCallback = (postObj) => {
//       this.setState({ 
//          loading: false,
//          post: postObj
//       })
//    }

//    updateSubmittedCallback = () => {
//       this.setState({
//          submitted: true
//       })
//    }

//    updateDeleteCallback = () => {
//       this.setState({
//          deleted: true
//       })
//    }

//    handleSubmit = e => {
//       e.preventDefault()

//       let newPostObj = {
//          id: this.state.post.id,
//          user_id: this.props.currentUser.id,
//          title: this.sanitize(e.target.title.value),
//          content: this.sanitize(e.target.content.value)
//       }

//       this.props.updatePostFetch(newPostObj, this.updateSubmittedCallback)      
//    }

   
//    handleDelete = () => {
//       this.props.deletePost(this.state.post.id, this.updateDeleteCallback)
//    }

//    render() {
//       if (this.state.loading) {
//          return (
//             <span>Loading...</span>
//          )
//       } else {
//          return(
//             <div className="edit-post-page">
//                <PostForm 
//                   type="Edit Form Page" 
//                   renderReRoute={() => this.state.submitted && <Redirect to={`/post/${this.state.post.id}`} />} 
//                   handleSubmit={this.handleSubmit} 
//                   values={   
//                      {
//                         title: this.state.post.title,
//                         content: this.state.post.content
//                      }
//                   }
//                />
//                <button onClick={this.handleDelete} className="delete-btn">Delete</button>
//                { this.state.deleted && <Redirect to={'/profile'} /> }
//             </div>
//          )
//       }
//    }

//    componentDidMount() {
//       let path = window.location.pathname
//       let arr = path.split("/")
//       let id = arr[2]

//       this.props.getPostFetch(id, this.updateLoadingCallback)
//    }
// }

const mapStateToProps = state => ({
   currentUser: state.currentUser
 })

const mapDispatchToProps = dispatch => ({
   updatePostFetch: (newPostObj, callback) => dispatch(updatePostFetch(newPostObj, callback)),
   getPostFetch: (postId, postCallback) => dispatch(getPostFetch(postId, postCallback)),
   deletePost: (id, callback) => dispatch(deletePost(id, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)