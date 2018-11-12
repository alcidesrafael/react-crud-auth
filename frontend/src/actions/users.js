import axios from 'axios'
import { getToken } from './auth'

const USER_SERVER = process.env.REACT_APP_USER_SERVER || 'http://localhost:3000/users'

export const getConfig = () => {
  let config = {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  }
  return config
}

/**
 *  FETCH ACTIONS
 */

export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILED = 'FETCH_FAILED'

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
})

export const fetchSuccess = users => ({
  type: FETCH_SUCCESS,
  users,
})

export const fetchFailed = error => ({
  type: FETCH_FAILED,
  error,
})

export const fetchUsers = () => dispatch => {
  dispatch(fetchRequest())
  axios
    .get(USER_SERVER, getConfig())
    .then(response => dispatch(fetchSuccess(response.data)))
    .catch(e => dispatch(fetchFailed('Erro ao carregar lista de usuários!')))
}

/**
 *  SAVE ACTIONS
 */

export const SAVE_REQUEST = 'SAVE_REQUEST'
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_FAILED = 'SAVE_FAILED'

export const saveRequest = () => ({
  type: SAVE_REQUEST,
})

export const saveSuccess = user => ({
  type: SAVE_SUCCESS,
  user,
  info: 'Usuário criado com sucesso!',
})

export const saveFailed = error => ({
  type: SAVE_FAILED,
  error,
})

export const saveUser = user => dispatch => {
  dispatch(saveRequest())
  axios
    .post(USER_SERVER, user, getConfig())
    .then(response => dispatch(saveSuccess(response.data)))
    .catch(e => dispatch(saveFailed('Erro ao tentar salvar usuário!')))
}

/**
 *  UPDATE ACTIONS
 */

export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILED = 'UPDATE_FAILED'

export const updateRequest = () => ({
  type: UPDATE_REQUEST,
})

export const updateSuccess = user => ({
  type: UPDATE_SUCCESS,
  user,
  info: 'Usuário editado com sucesso!',
})

export const updateFailed = error => ({
  type: UPDATE_FAILED,
  error,
})

export const updateUser = user => dispatch => {
  dispatch(updateRequest())
  if (user.id === 1) {
    return dispatch(updateFailed('Este usuário não pode ser alterado!'))
  }
  axios
    .patch(`${USER_SERVER}/${user.id}`, user, getConfig())
    .then(response => dispatch(updateSuccess(response.data)))
    .catch(e => dispatch(updateFailed('Erro ao tentar editar usuário!')))
}

/**
 *  DELETE ACTIONS
 */

export const DELETE_REQUEST = 'DELETE_REQUEST'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILED = 'DELETE_FAILED'

export const deleteRequest = () => ({
  type: DELETE_REQUEST,
})

export const deleteSuccess = id => ({
  type: DELETE_SUCCESS,
  id,
  info: 'Usuário deletado com sucesso!',
})

export const deleteFailed = error => ({
  type: DELETE_FAILED,
  error,
})

export const deleteUser = id => dispatch => {
  dispatch(deleteRequest())
  if (id === 1) {
    return dispatch(deleteFailed('Este usuário não pode ser deletado!'))
  }
  axios
    .delete(`${USER_SERVER}/${id}`, getConfig())
    .then(response => dispatch(deleteSuccess(id)))
    .catch(e => dispatch(deleteFailed('Erro ao tentar deletar usuário!')))
}
