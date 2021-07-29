import React from 'react'
import PostPreviewCard from '../components/PostPreviewCard'

const Feed = (props) => {
   const renderFeed = () => {
      let posts = props.posts
      if (!!posts && posts.length > 0) {
         return posts.map(post => {
            return (<PostPreviewCard post={post} key={post.id}/>)
         })
      } 
   }

   return (
      <div className="feed">
         {renderFeed()}
      </div>      
   )
}

export default Feed