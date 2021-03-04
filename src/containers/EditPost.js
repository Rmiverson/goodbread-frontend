import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updatePostFetch, setSelectedUser } from '../actions/actions'
import { store } from '../store/store'

import PostForm from '../components/PostForm'

class EditPost extends React.Component {
   state = {
      submitted: false
   }

   UNSAFE_componentWillMount() {
      this.props.setSelectedUser(this.props.currentUser)
   }

   handleSubmit = e => {
      e.preventDefault()

      let updatePostObj = {
         user_id: this.props.currentUser.id,
         title: this.sanitize(e.target.title.value),
         content: this.sanitize(e.target.content.value)
      }

      this.props.newPostFetch(updatePostObj)
      store.subscribe(() => this.setState({submitted: true}))       
   }

   sanitize = (text) => {  
      let sanitized = text.replace("<script>", "")
      sanitized = sanitized.replace("</script>", "")
      return sanitized
   }

   renderReRoute = () => {
      return (this.state.submitted && <Redirect to="/post" />)
   }

   render() {
      return(
         <PostForm renderFun={this.renderReRoute} handleSubmit={this.handleSubmit} values={this.selectedPost}/>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser,
   selectedPost: state.selectedPost
 })

const mapDispatchToProps = dispatch => ({
   updatePostFetch: (updatePostObj) => dispatch(updatePostFetch(updatePostObj)),
   setSelectedUser: (user) => dispatch(setSelectedUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)