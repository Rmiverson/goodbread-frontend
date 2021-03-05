import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { newPostFetch } from '../actions/actions'

import PostForm from '../components/PostForm'

class NewPost extends React.Component {
   state = {
      submitted: false,
      postId: ""
   }

   emptyValues = {
      title: "",
      content: ""
   }

   updateIdCallback = (id) => {
      console.log(id)
      this.setState({
         submitted: true,
         postId: id
      })
   }

   handleSubmit = e => {
      e.preventDefault()

      let newPostObj = {
         user_id: this.props.currentUser.id,
         title: this.sanitize(e.target.title.value),
         content: this.sanitize(e.target.content.value)
      }

      this.props.newPostFetch(newPostObj, this.updateIdCallback)      
   }

   sanitize = (text) => {  
      let sanitized = text.replace("<script>", "")
      sanitized = sanitized.replace("</script>", "")
      return sanitized
   }

   renderReRoute = () => {
      return (this.state.submitted && <Redirect to={`/post/${this.state.postId}`} />)
   }

   render() {
      return(
         <PostForm type="New Form Page" renderReRoute={(this.renderReRoute)} handleSubmit={this.handleSubmit} values={this.emptyValues}/>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser,
   selectedPost: state.selectedPost
 })

const mapDispatchToProps = dispatch => ({
   newPostFetch: (newPostObj, callback) => dispatch(newPostFetch(newPostObj, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)