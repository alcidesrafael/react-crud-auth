import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import EditIcon from '@material-ui/icons/Edit'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import EyeIcon from '@material-ui/icons/RemoveRedEye'

import UsersTableHead from './UsersTableHead'
import UsersEdit from './UsersEdit'
import { stableSort, getSorting } from './utils/sortingFuncs'
import { Menu, Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 900,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableCell: {
    color: 'rgba(0, 0, 0, .7)',
    fontSize: '.9rem',
  },
  actionDelete: {
    width: '150px',
  },
  hidden: {
    display: 'none',
  },
})

class UsersTable extends Component {
  state = {
    order: 'asc',
    orderBy: 'username',
    page: 0,
    rowsPerPage: 10,
    rowHovered: null,
    anchorEl: null,
    actionRow: null,
    editUserOpen: false,
    userSelected: null,
  }

  handleMouseEnter = id => {
    let numberId = parseInt(id)
    this.setState({ rowHovered: numberId })
  }

  handleMouseLeave = () => {
    this.setState({ rowHovered: null })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  handleEditUserClick = user => {
    this.setState({ editUserOpen: true, userSelected: user })
  }

  handleEditUserClose = () => {
    this.setState({ editUserOpen: false, userSelected: null })
  }

  handleUpdateUser = user => {
    if (user.firstName) {
      user.firstName = user.firstName.trim()
    }
    if (user.lastName) {
      user.lastName = user.lastName.trim()
    }
    if (user.email) {
      user.email = user.email.trim()
    }

    this.props.onUserUpdate(user)
    this.handleEditUserClose()
  }

  handleActionsClick = (event, id) => {
    this.setState({ anchorEl: event.currentTarget, actionRow: id })
  }

  handleActionsClose = () => {
    this.setState({ anchorEl: null, actionRow: null })
  }

  handleDeleteUser = () => {
    this.props.onUserDelete(this.state.actionRow)
    this.handleActionsClose()
  }

  render() {
    const {
      classes,
      isFetching,
      isSaving,
      isDeleting,
      isUpdating,
      user,
      users,
      searchInput,
    } = this.props
    const {
      order,
      orderBy,
      rowsPerPage,
      page,
      rowHovered,
      anchorEl,
      editUserOpen,
      userSelected,
    } = this.state
    const isLoading = isFetching || isSaving || isDeleting || isUpdating ? true : false
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.lenght - page * rowsPerPage)
    const isAdmin = user.profile === 'admin' ? true : false
    const usersFiltered = users.filter(user =>
      user.firstName.toLowerCase().includes(searchInput.toLowerCase())
    )
    const emptyData = usersFiltered.length > 0 ? false : true
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <UsersTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>Carregando...</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              ) : emptyData ? (
                <TableRow>
                  <TableCell>Nenhum usuário encontrado.</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              ) : (
                stableSort(usersFiltered, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    return (
                      <TableRow
                        hover
                        onMouseEnter={e => this.handleMouseEnter(e.target.parentNode.id)}
                        onMouseLeave={e => this.handleMouseLeave()}
                        onDoubleClick={() => this.handleEditUserClick(n)}
                        tabIndex={-1}
                        key={n.id}
                        id={n.id}
                        className={classes.tableRow}
                      >
                        <TableCell className={classes.tableCell}>
                          {n.firstName + ' ' + n.lastName}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {n.profile === 'admin' ? 'Administrador' : 'Usuário padrão'}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {n.active ? 'Sim' : 'Não'}
                        </TableCell>
                        {this.props.user.profile === 'admin' ? (
                          <TableCell>
                            <IconButton
                              style={rowHovered !== n.id ? { visibility: 'hidden' } : {}}
                              onClick={() => this.handleEditUserClick(n)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-owns={anchorEl ? 'more-actions' : undefined}
                              aria-haspopup="true"
                              style={rowHovered !== n.id ? { visibility: 'hidden' } : {}}
                              onClick={e => this.handleActionsClick(e, n.id)}
                            >
                              <MoreHorizIcon />
                            </IconButton>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <IconButton
                              style={rowHovered !== n.id ? { visibility: 'hidden' } : {}}
                              onClick={() => this.handleEditUserClick(n)}
                            >
                              <EyeIcon />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={'Linhas por página:'}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Página Anterior',
          }}
          nextIconButtonProps={{
            'aria-label': 'Próxima Página',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Menu
          id="more-actions"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleActionsClose}
          className={classes.menuActions}
        >
          <MenuItem onClick={this.handleDeleteUser} className={classes.actionDelete}>
            <DeleteIcon />
            <Typography>Excluir</Typography>
          </MenuItem>
        </Menu>
        {editUserOpen && (
          <UsersEdit
            isAdmin={isAdmin}
            user={userSelected}
            onClose={this.handleEditUserClose}
            onSave={this.handleUpdateUser}
          />
        )}
      </Paper>
    )
  }
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  onUserDelete: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
}

export default withStyles(styles)(UsersTable)
