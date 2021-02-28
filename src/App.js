import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from './actions/actions'
import Signup from './containers/Signup'
import Login from './containers/Login'
import './App.css';

class App extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    this.props.logoutUser()
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
          {this.props.currentUser.username
            ? <button onClick={this.handleClick}>Log Out</button>
            : null
          }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
