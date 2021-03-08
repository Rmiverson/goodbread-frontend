import React from 'react'
import { connect } from 'react-redux'
import { allPostsFetch } from '../actions/actions'

import Feed from '../containers/Feed'
import SearchBar from '../components/SearchBar'

class Search extends React.Component {
   state = {
      loading: true,
      search: ""
   }

   searchCallback = () => {
      this.setState({
         loading: false
      })
   }

   handleChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   renderFeed = () => {
      let posts = this.props.allPosts

      let filtered = posts.filter(post => {
         let postTitle = post.title.toLowerCase()
         let search = this.state.search.toLowerCase()
         return postTitle.includes(search) ? true : false
      })

      return <Feed posts={filtered}/>
   }

   renderSearchPage = () => {
      return (
         <div className="Search-page">
            <div className="header">
               <h2>Search Page</h2>
               <SearchBar handleChange={this.handleChange}/>
            </div>

            <div className="search-feed">
               {this.renderFeed()}
            </div>
         </div>
      )
   }

   render() {
      if (this.state.loading) {
         return (
            <span>Loading...</span>
         )
      } else {
         return( this.renderSearchPage() )
      }
   }

   componentDidMount() {
      this.props.allPostsFetch( this.searchCallback )
   }
}

const mapStateToProps = state => ({
   allPosts: state.allPosts
})

const mapDispatchToProps = dispatch => ({
   allPostsFetch: (callback) => dispatch(allPostsFetch(callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)