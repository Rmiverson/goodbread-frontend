import React from 'react'
import { Link } from 'react-router-dom'

const PostPreviewCard = (props) => {
   // const previewContent = (content) => {
   //    let str = content
   //    if (str.length > 250) {
   //       str = str.substring(0, 250) + '...'
   //    }
   //    return str
   // }

   return(
      <div className="post-preview-card">
         <h4>{props.post.title}</h4>
         {/* <p>{previewContent(props.post.content)}</p> */}
         <Link to={{
            pathname: `/post/${props.post.id}`,
            state: {}
         }} className="link-btn">Read More</Link>
      </div>
   )   
}

export default PostPreviewCard