import React from 'react'

class PostPreviewCard extends React.Component {

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
         </div>
      )
   }
}

export default PostPreviewCard