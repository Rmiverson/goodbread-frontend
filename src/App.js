import React from 'react'
import './App.css';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, userPersistFetch } from './actions/actions'

import Signup from './containers/Signup'
import Login from './containers/Login'
import NavBar from './components/NavBar'
import Home from './containers/Home'
import Search from './containers/Search'
import Profile from './containers/Profile'
import NotFound from './components/NotFound'
import Post from './containers/Post'
import User from './containers/User'
import NewPost from './containers/NewPost'
import EditPost from './containers/EditPost';
import EditUser from './containers/EditUser';


class App extends React.Component {

  componentDidMount = () => {
    this.props.userPersistFetch()
  }

  handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    this.props.logoutUser()
  }

  render() {
    return (
      <div className="App">
        <NavBar handleLogout={this.handleLogout}/>

        <Switch>
          <Route exact path="/login" render={() => <Login />} />        
          <Route exact path="/signup" render={() => <Signup />} />

          {!this.props.currentUser.id && <Redirect to="/login" />}
          <Route exact path="/" render={() => <Home />}/>
          <Route exact path="/search" render={() => <Search />}/>
          <Route exact path="/profile" render={() => <Profile />}/>
          <Route path='/post/:postId' render={() => <Post />} />
          <Route path='/user/:userId' render={() => <User />} />
          <Route exact path="/newpost" render={() => <NewPost />} />
          <Route path="/editpost/:postId" render={() => <EditPost />} />
          <Route path="/edituser" render={() => <EditUser/> } />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  selectedPost: state.selectedPost
})

const mapDispatchToProps = dispatch => ({
  userPersistFetch: () => dispatch(userPersistFetch()),
  logoutUser: () => dispatch(logoutUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


