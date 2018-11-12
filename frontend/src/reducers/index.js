import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import app from './app'
import users from './users'

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  app,
  users,
})

export default rootReducer
