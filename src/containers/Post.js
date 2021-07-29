import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPostFetch, newCommentFetch, postLikeFetch, postUnlikeFetch } from '../actions/actions'
import { Link } from 'react-router-dom'

import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'

const Post = (props) => {
   const [loading, setLoading] = useState(true)
   const [post, setPost] = useState({})

   useEffect(() => {
      let path = window.location.pathname
      let arr = path.split("/")
      let id = arr[2]
      props.getPostFetch(id, postCallback)
   }, [])

   const postCallback = (post) => {
      setPost(post)
      setLoading(false)
   }

   const commentCallback = () => {
      getPostFetch(post.id, postCallback)
   }

   const arrIncludesId = (arr, id) => {
      return arr.every( element => {
         if (element.user_id === id) {
            return false
         }
         return true 
      })
   }

   const handleCommentSubmit = (e) => {
      e.preventDefault()

      let comment = {
         user_id: props.currentUser.id,
         post_id: post.id,
         content: e.target.content.value
      }

      props.newCommentFetch(comment, commentCallback)
      e.target.content.value = ""
   }

   const handleLike = () => {
      let likeObj = {
         user_id: props.currentUser.id,
         post_id: post.id
      }

      postLikeFetch(likeObj, this.commentCallback)
   }

   const handleUnlike = () => {
      let likeArr = post.post_likes
      let like = likeArr.find(like => like.user_id === props.currentUser.id)

      props.postUnlikeFetch(like.id, commentCallback)
   } 

   const renderLikeBtn = () => {
      let currentUser = props.currentUser

      if (props.currentUser.id !== post.user_id) {
         if (!arrIncludesId(post.post_likes, currentUser.id)) {
            return <button onClick={handleUnlike} className="submit-btn">Unlike</button>
         } else {
            return <button onClick={handleLike} className="submit-btn">Like</button>
         }         
      }
   }

   const renderComments = () => {
      let comments = post.comments
      return comments.map(comment => {
         return <Comment key={comment.id} id={comment.id} commentCallback={commentCallback}/>
      })
   }

   const renderEditBtn = () => {
      if (props.currentUser.id === post.user.id) {
         return (
            <div className="router-edit-btn">
               <Link to={`/editpost/${post.id}`}>Edit</Link>
            </div>    
         )
      }
   }

   if (loading) {
      return (
         <span>Loading...</span>
      )
   } else {
      return( 
         <div className="post-page">
            <div className="post">
               <h2>{post.title}</h2>
               {renderEditBtn()}
               <div className="router-link-btn">
                  <Link to={`/user/${post.user.id}`} >Author: {post.user.username}</Link>
               </div>
               <h5>Likes: {post.post_likes.length}</h5>
               <p>{post.content}</p>
               <div className="like-btn">
                  {renderLikeBtn()}
               </div>
            </div>
            
            <div className="comment-section">
               <CommentForm type="New" handleSubmit={handleCommentSubmit} value=""/>
               {renderComments()}
            </div>
         </div>
      )
   }
}

// class Post extends React.Component {
//    state = {
//       loading: true,
//       post: {}
//    }

//    postCallback = (post) => {
//       this.setState({ 
//          loading: false,
//          post: post
//       })
//    }

//    commentCallback = () => {
//       this.props.getPostFetch(this.state.post.id, this.postCallback)
//    }

//    arrIncludesId = (arr, id) => {
//       return arr.every( element => {
//          if (element.user_id === id) {
//             return false
//          }
//          return true 
//       })
//    }

//    handleCommentSubmit = e => {
//       e.preventDefault()

//       let comment = {
//          user_id: this.props.currentUser.id,
//          post_id: this.state.post.id,
//          content: e.target.content.value
//       }

//       this.props.newCommentFetch(comment, this.commentCallback)

//       e.target.content.value = ""
//    }

//    handleLike = () => {
//       let likeObj = {
//          user_id: this.props.currentUser.id,
//          post_id: this.state.post.id
//       }

//       this.props.postLikeFetch(likeObj, this.commentCallback)
//    }

//    handleUnlike = () => {
//       let likeArr = this.state.post.post_likes
//       let like = likeArr.find(like => like.user_id === this.props.currentUser.id)

//       this.props.postUnlikeFetch(like.id, this.commentCallback)
//    }  

//    renderLikeBtn = () => {
//       let currentUser = this.props.currentUser

//       if (this.props.currentUser.id !== this.state.post.user_id) {
//          if (!this.arrIncludesId(this.state.post.post_likes, currentUser.id)) {
//             return <button onClick={this.handleUnlike} className="submit-btn">Unlike</button>
//          } else {
//             return <button onClick={this.handleLike} className="submit-btn">Like</button>
//          }         
//       }

//    }

//    renderComments = () => {
//       let comments = this.state.post.comments
//       return comments.map(comment => {
//          return <Comment key={comment.id} id={comment.id} commentCallback={this.commentCallback}/>
//       })
//    }

//    renderEditBtn = () => {
//       if (this.props.currentUser.id === this.state.post.user.id) {
//          return (
//             <div className="router-edit-btn">
//                <Link to={`/editpost/${this.state.post.id}`}>Edit</Link>
//             </div>    
//          )
            
//       }
//    }

//    renderPost = () => {
//       return (
//          <div className="post-page">
//             <div className="post">
//                <h2>{this.state.post.title}</h2>
//                {this.renderEditBtn()}
//                <div className="router-link-btn">
//                   <Link to={`/user/${this.state.post.user.id}`} >Author: {this.state.post.user.username}</Link>
//                </div>
//                <h5>Likes: {this.state.post.post_likes.length}</h5>
//                <p>{this.state.post.content}</p>
//                <div className="like-btn">
//                   {this.renderLikeBtn()}
//                </div>
//             </div>
            
//             <div className="comment-section">
//                <CommentForm type="New" handleSubmit={this.handleCommentSubmit} value=""/>
//                {this.renderComments()}
//             </div>
//          </div>         
//       )
//    }

//    render() {
//       if (this.state.loading) {
//          return (
//             <span>Loading...</span>
//          )
//       } else {
//          return( this.renderPost() )
//       }
//    }

//    componentDidMount() {
//       let path = window.location.pathname
//       let arr = path.split("/")
//       let id = arr[2]
//       this.props.getPostFetch(id, this.postCallback)
//    }
// }

const mapStateToProps = state => ({
   currentUser: state.currentUser
 })

const mapDispatchToProps = dispatch => ({
   getPostFetch: (postId, postCallback) => dispatch(getPostFetch(postId, postCallback)),
   newCommentFetch: (comment, commentCallback) => dispatch(newCommentFetch(comment, commentCallback)),
   postLikeFetch: (likeObj, callback) => dispatch(postLikeFetch(likeObj, callback)),
   postUnlikeFetch: (id, callback) => dispatch(postUnlikeFetch(id, callback))

})

export default connect(mapStateToProps, mapDispatchToProps)(Post)