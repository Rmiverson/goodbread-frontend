import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { newPostFetch, setSelectedUser } from '../actions/actions'

class NewPost extends React.Component {
   state = {
      submitted: false
   }

   handleSubmit = e => {
      e.preventDefault()

      let newPostObj = {
         user_id: this.props.user.id,
         title: this.sanitize(e.target.title.value),
         content: this.sanitize(e.target.content.value)
      }

      this.props.newPostFetch(newPostObj)
      this.setState({submitted: true})
   }

   sanitize = (text) => {  
      let sanitized = text.replace("<script>", "")
      sanitized = sanitized.replace("</script>", "")
      return sanitized
   }

   render() {
      return(
         <div className="new-post-page">
            <h2>New Form Page</h2>
            <form className="new-post-form" onSubmit={this.handleSubmit}>
               <label>Title</label>
               <input type="text" name="title" id="new-post-title"/>

               <label>Content</label>
               <textarea name="content" rows="20" cols="60" id="new-post-content"></textarea>

               <input type="submit" value="Submit"/>
            </form>
            {this.state.submitted && <Redirect to="/post" />}
         </div>
      )
   }

   UNSAFE_componentWillMount() {
      this.props.setSelectedUser(this.props.user)
   }

}

const mapDispatchToProps = dispatch => ({
   newPostFetch: (newPostObj) => dispatch(newPostFetch(newPostObj)),
   setSelectedUser: (user) => dispatch(setSelectedUser(user))
})

export default connect(null, mapDispatchToProps)(NewPost)