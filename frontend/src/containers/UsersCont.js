import React, { Component } from 'react'
import { connect } from 'react-redux'

import Users from '../pages/Users'
import { setPageTitle, setSearchPlaceholder } from '../actions/app'
import { fetchUsers } from '../actions/users'

class UsersCont extends Component {
  state = {
    title: 'Gerenciar usuários',
    searchPlaceholder: 'Buscar usuários...',
  }

  componentDidMount() {
    this.props.dispatch(setPageTitle(this.state.title))
    this.props.dispatch(setSearchPlaceholder(this.state.searchPlaceholder))
    this.props.dispatch(fetchUsers())
  }

  render() {
    return <Users {...this.props} />
  }
}

const mapStateToProps = state => {
  const { isFetching, isSaving, isDeleting, isUpdating, users, info, error } = state.users
  const { user } = state.auth
  const { searchInput } = state.app
  return {
    isFetching,
    isSaving,
    isDeleting,
    isUpdating,
    users,
    info,
    error,
    user,
    searchInput,
  }
}

export default connect(mapStateToProps)(UsersCont)
