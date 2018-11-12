import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { fetchUser, isAuth } from '../actions/auth'

class PrivateRoute extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.verifyAuth()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isAuthenticated && prevState.loading !== this.state.loading) {
      this.verifyAuth()
    }
  }

  verifyAuth = () => {
    if (!this.props.user && (this.props.isAuthenticated || isAuth())) {
      this.props.dispatch(fetchUser())
    }

    this.setState({ loading: false })
  }

  render() {
    const { user, isAuthenticated, dispatch, component: Component, ...rest } = this.props
    if (this.state.loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            top: '0',
            left: '0',
            backgroundColor: '#ffffff',
            zIndex: '9000',
          }}
        >
          <CircularProgress style={{ color: '#f41f3c' }} size={50} thickness={2} />
        </div>
      )
    }
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: this.props.location,
                },
              }}
            />
          )
        }
      />
    )
  }
}

const mapStateToProps = state => {
  const { user, isAuthenticated } = state.auth
  return {
    user,
    isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
