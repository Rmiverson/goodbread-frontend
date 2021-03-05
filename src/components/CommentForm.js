import React from 'react'
 
class CommentForm extends React.Component {
   render() {
      return(
         <div className="comment-form">
            <form onSubmit={this.props.handleSubmit}>
               <label>New Comment</label>
               <textarea
                  name="content" 
                  rows="5" 
                  cols="30"
               ></textarea>
               <input type='submit' value='Submit'/>
            </form>
         </div>
      )
   }
}

export default CommentForm