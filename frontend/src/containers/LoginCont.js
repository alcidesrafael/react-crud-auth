import React, { Component } from 'react'
import { connect } from 'react-redux'

import Login from '../pages/Login'
import { userLogin, isAuth } from '../actions/auth'

class LoginCont extends Component {
  state = {
    snackOpen: false,
    pageTitle: 'Login',
  }

  componentDidMount() {
    if (this.props.isAuthenticated || isAuth()) {
      this.props.history.push('/')
    }
    document.title = this.state.pageTitle
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated || isAuth()) {
      this.props.history.push('/')
    }
  }

  closeSnackbar = () => {
    this.setState({
      snackOpen: false,
    })
  }

  login = auth => {
    this.props.dispatch(userLogin(auth)).then(() => {
      if (this.props.authError.status) {
        this.setState({ snackOpen: true })
      }
    })
  }

  render() {
    return (
      <Login
        {...this.props}
        snackOpen={this.state.snackOpen}
        onCloseSnackbar={this.closeSnackbar}
        onLogin={this.login}
      />
    )
  }
}

const mapStateToProps = state => {
  const { isLoading, isAuthenticated, error } = state.auth
  return {
    isLoading,
    isAuthenticated,
    authError: error,
  }
}

export default connect(mapStateToProps)(LoginCont)
