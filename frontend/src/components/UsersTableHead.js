import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  tableCell: {
    '&:nth-child(2)': {
      width: '280px',
    },
    '&:nth-child(3)': {
      width: '180px',
    },
  },
  tableActions: {
    width: '150px',
  },
})

const rows = [
  { id: 'firstName', label: 'Usuário' },
  { id: 'profile', label: 'Tipo de usuário' },
  { id: 'active', label: 'Usuário ativo' },
]

class UsersTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy, classes } = this.props

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                sortDirection={orderBy === row.id ? order : false}
                className={classes.tableCell}
              >
                <Tooltip title="Ordenar" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
          <TableCell key="actions" className={classes.tableActions} />
        </TableRow>
      </TableHead>
    )
  }
}

UsersTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
}

export default withStyles(styles)(UsersTableHead)
