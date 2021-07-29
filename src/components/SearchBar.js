import React from 'react'

const SearchBar = (props) => {
   return(
      <div className="search-bar">
         <label>Search Posts: </label>
         <input type="text" name="search" onChange={props.handleChange} />
      </div>
   )   
}

export default SearchBar