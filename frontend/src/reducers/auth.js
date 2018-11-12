import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILED, RECEIVE_USER, LOGOUT_USER } from '../actions/auth'

const auth = (
  state = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    error: {
      status: false,
      message: '',
    },
  },
  action
) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case AUTH_SUCCESS: {
      return {
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
        error: {
          status: false,
          message: '',
        },
      }
    }
    case AUTH_FAILED: {
      return {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: {
          status: true,
          message: action.errorMessage,
        },
      }
    }
    case RECEIVE_USER: {
      return {
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
        error: {
          status: false,
          message: '',
        },
      }
    }
    case LOGOUT_USER: {
      return {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: {
          status: false,
          message: '',
        },
      }
    }
    default:
      return state
  }
}

export default auth
