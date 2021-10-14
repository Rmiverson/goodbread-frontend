import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allPostsFetch } from '../store/actions/postActions'

import Feed from '../containers/Feed'
import SearchBar from '../components/SearchBar'

const Search = () => {
   const [search, setSearch] = useState("")

   const allPosts = useSelector((state) => state.allPosts)
   const dispatch = useDispatch()

   const handleChange = (e) => {
      setSearch(e.target.value)
   }

   useEffect(() => {
      dispatch(allPostsFetch())
   }, [])

   const renderFeed = () => {
      let filtered = allPosts.filter((post) => {
         let postTitle = post.title.toLowerCase()
         let lowerCaseSearch = search.toLowerCase()
         return postTitle.includes(lowerCaseSearch) ? true : false
      })
      return <Feed posts={filtered}/>
   }

   if (allPosts.length <= 0) {
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

export default Search