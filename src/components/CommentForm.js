import React from 'react'
 
const CommentForm = (props) => {
   return(
      <div className="comment-form">
         <form onSubmit={props.handleSubmit}>
            <label>{props.type} Comment</label>
            <textarea
               name="content" 
               rows="5" 
               cols="30"
               defaultValue={props.value}
               required
               maxLength="250"
            ></textarea>
            <input type='submit' value='Submit' className="submit-btn"/>
         </form>
      </div>
   )   
}

export default CommentForm