import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { newPostFetch, setSelectedUser } from '../actions/actions'
import { store } from '../store/store'

import PostForm from '../components/PostForm'

class NewPost extends React.Component {
   state = {
      submitted: false
   }

   emptyValues = {
      title: "",
      content: ""
   }

   UNSAFE_componentWillMount() {
      this.props.setSelectedUser(this.props.currentUser)
   }

   handleSubmit = e => {
      e.preventDefault()

      let newPostObj = {
         user_id: this.props.currentUser.id,
         title: this.sanitize(e.target.title.value),
         content: this.sanitize(e.target.content.value)
      }

      this.props.newPostFetch(newPostObj)
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
         <PostForm renderReRoute={this.renderReRoute} handleSubmit={this.handleSubmit} values={this.emptyValues}/>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser
 })

const mapDispatchToProps = dispatch => ({
   newPostFetch: (newPostObj) => dispatch(newPostFetch(newPostObj)),
   setSelectedUser: (user) => dispatch(setSelectedUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)