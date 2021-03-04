import React from 'react'
import { connect } from 'react-redux'
import { setSelectedUser } from '../actions/actions'
import { Link } from 'react-router-dom'

import Comment from '../components/Comment'

class Post extends React.Component {
   UNSAFE_componentWillMount() {
      this.props.setSelectedUser(this.props.selectedPost.user)
    }

   renderComments = () => {
      let comments = this.props.selectedPost.comments
      return comments.map(comment => {
         return <Comment key={comment.id} comment={comment} />
      })
   }

   render() {
      return(
         <div className="post">
            <h2>{this.props.selectedPost.title}</h2>
            <Link to="/user" >{this.props.selectedPost.user.username}</Link>
            <p>{this.props.selectedPost.content}</p>
            <div className="comment-section">
               {this.renderComments()}
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   selectedPost: state.selectedPost
 })

const mapDispatchToProps = dispatch => ({
   setSelectedUser: (user) => dispatch(setSelectedUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)