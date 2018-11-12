import { PAGE_TITLE, SEARCH_PLACEHOLDER, SEARCH_INPUT } from '../actions/app'

const app = (
  state = {
    pageTitle: 'App',
    searchPlaceholder: 'Buscar...',
    searchInput: '',
  },
  action
) => {
  switch (action.type) {
    case PAGE_TITLE: {
      return {
        ...state,
        pageTitle: action.title,
      }
    }
    case SEARCH_PLACEHOLDER: {
      return {
        ...state,
        searchPlaceholder: action.placeholder,
      }
    }
    case SEARCH_INPUT: {
      return {
        ...state,
        searchInput: action.input,
      }
    }
    default:
      return state
  }
}

export default app
