import React from 'react'
import { connect } from 'react-redux'
import { setSelectedUser } from '../actions/actions'
import { Link } from 'react-router-dom'

import Comment from '../components/Comment'

class Post extends React.Component {
   UNSAFE_componentWillMount() {
      this.props.setSelectedUser(this.props.post.user)
    }

   renderComments = () => {
      let comments = this.props.post.comments
      return comments.map(comment => {
         return <Comment key={comment.id} comment={comment} />
      })
   }

   render() {
      return(
         <div className="post">
            <h2>{this.props.post.title}</h2>
            <Link to="/user" >{this.props.post.user.username}</Link>
            <p>{this.props.post.content}</p>
            <div className="comment-section">
               {this.renderComments()}
            </div>
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   setSelectedUser: (user) => dispatch(setSelectedUser(user))
})

export default connect(null, mapDispatchToProps)(Post)