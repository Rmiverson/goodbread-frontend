import React from 'react'

const PostForm = ( {type, renderReRoute, handleSubmit, values} ) => {
   return(
      <div className="new-post-page">
         <h2>{type}</h2>
         <form className="new-post-form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input required type="text" name="title" id="new-post-title" defaultValue={values.title}/>

            <label>Content</label>
            <textarea required name="content" rows="20" cols="60" id="new-post-content" defaultValue={values.content}></textarea>

            <input type="submit" value="Submit" className="submit-btn"/>
         </form>
         { renderReRoute() }
      </div>
   )
}

export default PostForm