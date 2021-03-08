import React from 'react'
 
class CommentForm extends React.Component {
   render() {
      return(
         <div className="comment-form">
            <form onSubmit={this.props.handleSubmit}>
               <label>{this.props.type} Comment</label>
               <textarea
                  name="content" 
                  rows="5" 
                  cols="30"
                  defaultValue={this.props.value}
                  required="required"
                  maxLength="250"
               ></textarea>
               <input type='submit' value='Submit'/>
            </form>
         </div>
      )
   }
}

export default CommentForm