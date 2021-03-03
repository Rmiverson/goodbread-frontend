import React from 'react'
import { setSelectedPost } from '../actions/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class PostPreviewCard extends React.Component {

   handleClick = e => {
      // e.preventDefault()
      this.props.setSelectedPost(this.props.post)
   }

   previewContent = (content) => {
      let str = content
      if (str.length > 250) {
         str = str.substring(0, 250) + '...'
      }
      return str
   }

   render() {
      return(
         <div className="post-preview-card">
            <h3>{this.props.post.title}</h3>
            <p>
               {this.previewContent(this.props.post.content)}
            </p>
            <Link to={'/post'} onClick={this.handleClick}>Read More</Link>
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   setSelectedPost: (post) => dispatch(setSelectedPost(post))
})


export default connect(null, mapDispatchToProps)(PostPreviewCard)