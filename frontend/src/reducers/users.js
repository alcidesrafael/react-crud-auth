import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_FAILED,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILED,
} from '../actions/users'

const users = (
  state = {
    isFetching: false,
    isSaving: false,
    isDeleting: false,
    isUpdating: false,
    users: [],
    error: null,
    info: null,
  },
  action
) => {
  switch (action.type) {
    /**
     * FETCH ACTIONS
     */
    case FETCH_REQUEST: {
      return {
        isFetching: true,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        users: [],
        error: null,
        info: null,
      }
    }
    case FETCH_SUCCESS: {
      return {
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        users: action.users,
        error: null,
        info: null,
      }
    }
    case FETCH_FAILED: {
      return {
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        users: [],
        error: action.error,
        info: null,
      }
    }
    /**
     * SAVE ACTIONS
     */
    case SAVE_REQUEST: {
      return {
        ...state,
        isFetching: false,
        isSaving: true,
        isDeleting: false,
        isUpdating: false,
        error: null,
        info: null,
      }
    }
    case SAVE_SUCCESS: {
      return {
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        users: state.users.concat(action.user),
        error: null,
        info: action.info,
      }
    }
    case SAVE_FAILED: {
      return {
        ...state,
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        error: action.error,
        info: null,
      }
    }
    /**
     * UPDATE ACTIONS
     */
    case UPDATE_REQUEST: {
      return {
        ...state,
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: true,
        error: null,
        info: null,
      }
    }
    case UPDATE_SUCCESS: {
      return {
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        users: state.users.filter(user => user.id !== action.user.id).concat(action.user),
        error: null,
        info: action.info,
      }
    }
    case UPDATE_FAILED: {
      return {
        ...state,
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        error: action.error,
        info: null,
      }
    }
    /**
     * DELETE ACTIONS
     */
    case DELETE_REQUEST: {
      return {
        ...state,
        isFetching: false,
        isSaving: false,
        isDeleting: true,
        isUpdating: false,
        error: null,
        info: null,
      }
    }
    case DELETE_SUCCESS: {
      return {
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        users: state.users.filter(user => user.id !== action.id),
        error: null,
        info: action.info,
      }
    }
    case DELETE_FAILED: {
      return {
        ...state,
        isFetching: false,
        isSaving: false,
        isDeleting: false,
        isUpdating: false,
        error: action.error,
        info: null,
      }
    }
    default:
      return state
  }
}

export default users
