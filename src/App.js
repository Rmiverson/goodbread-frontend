import React from 'react'
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
import './App.css';
// import { compose } from 'redux'

class App extends React.Component {

  componentDidMount = () => {
    this.props.userPersistFetch()
  }

  handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    this.props.logoutUser()
  }

  renderLoginPage = () => {
    
    return(<Login currentUser={this.props.currentUser}/>)
  }
  renderSignupPage = () => {
    return(<Signup currentUser={this.props.currentUser}/>)
  }
  renderHomePage = () => {
    return(<Home  />)
  }
  renderSearchPage = () => {
    return(<Search />)
  }
  renderProfilePage = () => {
    return(<Profile />)
  }

  render() {
    return (
      <div className="App">
        <NavBar user={this.props.currentUser} handleLogout={this.handleLogout}/>

        <Switch>
          <Route exact path="/login" render={this.renderLoginPage} />        
          <Route exact path="/signup" render={this.renderSignupPage} />

          {!this.props.currentUser.id && <Redirect to="/login" />}
          <Route exact path="/" render={this.renderHomePage}/>
          <Route exact path="/search" render={this.renderSearchPage}/>
          <Route exact path="/profile" render={this.renderProfilePage}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  userPersistFetch: () => dispatch(userPersistFetch()),
  logoutUser: () => dispatch(logoutUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


