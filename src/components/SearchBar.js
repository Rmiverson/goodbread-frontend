import React from 'react'

class SearchBar extends React.Component {
   render() {
      return(
         <div className="search-bar">
            <label>Search Posts:</label>
            <input 
               type="text"
               name="search"
               onChange={this.props.handleChange}
            />
         </div>
      )
   }
}

export default SearchBar