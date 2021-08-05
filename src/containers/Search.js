import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { allPostsFetch } from '../store/actions/postActions'

import Feed from '../containers/Feed'
import SearchBar from '../components/SearchBar'

const Search = (props) => {
   const [loading, setLoading] = useState(true)
   const [search, setSearch] = useState("")

   const searchCallback = () => {
      setLoading(false)
   }

   const handleChange = (e) => {
      setSearch(e.target.value)
   }

   useEffect(() => {
      props.allPostsFetch(searchCallback)
   }, [])

   const renderFeed = () => {
      let posts = props.allPosts
      let filtered = posts.filter(post => {
         let postTitle = post.title.toLowerCase()
         let lowerCaseSearch = search.toLowerCase()
         return postTitle.includes(lowerCaseSearch) ? true : false
      })
      return <Feed posts={filtered}/>
   }

   if (loading) {
      return(
         <span>Loading...</span>
      )
   } else {
      return(
      <div className="Search-page">
         <div className="header">
            <h2>Search Page</h2>
            <SearchBar handleChange={handleChange}/>
         </div>

         <div className="search-feed">
            {renderFeed()}
         </div>
      </div>         
      )
   }
}

const mapStateToProps = state => ({
   allPosts: state.allPosts
})

const mapDispatchToProps = dispatch => ({
   allPostsFetch: (callback) => dispatch(allPostsFetch(callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)