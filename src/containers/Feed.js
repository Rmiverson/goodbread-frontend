import React from 'react'
import PostPreviewCard from '../components/PostPreviewCard'

class Feed extends React.Component {

   renderFeed = () => {
      let posts = this.props.posts
      if (!!posts && posts.length > 0) {
         return posts.map(post => {
            return (<PostPreviewCard post={post} key={post.id}/>)
         })  
      }
   }

   render(){
      return(
         <div className="user-post-feed">
            {this.renderFeed()}
         </div> 
      )
   }
}

export default Feed