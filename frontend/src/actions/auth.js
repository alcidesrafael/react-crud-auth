import axios from 'axios'
import decode from 'jwt-decode'

const AUTH_SERVER = process.env.REACT_APP_AUTH_SERVER || 'http://localhost:3000/auth'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILED = 'AUTH_FAILED'
export const RECEIVE_USER = 'RECEIVE_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export const loginRequest = () => ({
  type: AUTH_REQUEST,
})

export const loginSuccess = user => {
  setToken(user.accessToken)
  return {
    type: AUTH_SUCCESS,
    user,
  }
}

export const loginFailed = errorMessage => ({
  type: AUTH_FAILED,
  errorMessage,
})

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
})

export const isAuth = () => {
  const token = getToken()
  return !!token && !isTokenExpired(token)
}

export const isTokenExpired = token => {
  try {
    const decoded = decode(token)
    if (decoded.exp < Date.now() / 1000) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

export const setToken = token => {
  localStorage.setItem('jwt_token', token)
}

export const getToken = () => {
  return localStorage.getItem('jwt_token')
}

export const removeToken = () => {
  localStorage.removeItem('jwt_token')
}

export const fetchUser = () => dispatch => {
  if (!isAuth()) {
    dispatch(loginFailed('Você não está autenticado!'))
  }

  let user = decode(getToken())
  dispatch(receiveUser(user))
}

export const userLogin = auth => dispatch => {
  dispatch(loginRequest())
  return axios
    .post(`${AUTH_SERVER}/login`, auth)
    .then(response => {
      if (response.data.active) {
        dispatch(loginSuccess(response.data))
      } else {
        dispatch(loginFailed('Usuário está desativado'))
      }
    })
    .catch(e => dispatch(loginFailed('Falha na autenticação! Usuário e/ou senha inválido(s).')))
}

export const logout = () => dispatch => {
  removeToken()
  dispatch({ type: LOGOUT_USER })
}
