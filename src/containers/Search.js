import React from 'react'
import { connect } from 'react-redux'
import { allPostsFetch } from '../actions/actions'

import Feed from '../containers/Feed'

class Search extends React.Component {
   componentDidMount() {
      this.props.allPostsFetch(this.props.currentUser)
   }

   render() {
      return(
         <div className="Search-page">
            <h2>Search Page</h2>
            <div className="search-feed">
               <Feed posts={this.props.allPosts} />
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.currentUser,
   allPosts: state.allPosts
})

const mapDispatchToProps = dispatch => ({
   allPostsFetch: (currentUser) => dispatch(allPostsFetch(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)