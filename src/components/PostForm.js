import React from 'react'

const PostForm = ( {renderReRoute, handleSubmit, values} ) => {
   return(
      <div className="new-post-page">
         <h2>New Form Page</h2>
         <form className="new-post-form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" name="title" id="new-post-title" defaultValue={values.title}/>

            <label>Content</label>
            <textarea name="content" rows="20" cols="60" id="new-post-content" defaultValue={values.content}></textarea>

            <input type="submit" value="Submit"/>
         </form>
         { renderReRoute() }
      </div>
   )
}

export default PostForm