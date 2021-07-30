import React from 'react'

const PostForm = (props) => {
   return(
      <div className="new-post-page">
         <h2>{props.type}</h2>
         <form className="new-post-form" onSubmit={props.handleSubmit}>
            <label>Title</label>
            <input required type="text" name="title" id="new-post-title" defaultValue={props.values.title}/>

            <label>Content</label>
            <textarea required name="content" rows="20" cols="60" id="new-post-content" defaultValue={props.values.content}></textarea>

            <input type="submit" value="Submit" className="submit-btn"/>
         </form>
         {props.renderReRoute()}
      </div>
   )
}

export default PostForm