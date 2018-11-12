import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

import UsersTable from '../components/UsersTable'
import UsersEdit from '../components/UsersEdit'
import SimpleSnackbar from '../components/utils/simpleSnackbar'

import { saveUser, updateUser, deleteUser } from '../actions/users'

const styles = theme => ({
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 16px 20px -5px rgba(0,0,0,0.1)',
  },
  tabs: {
    justifyContent: 'space-between',
  },
  tab: {
    minHeight: 52,
    width: 120,
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
  },
  buttonWrapper: {
    textAlign: 'right',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
})

class Users extends Component {
  state = {
    newUserOpen: false,
    snackOpen: false,
  }

  componentDidMount() {
    if (this.props.info || this.props.error) {
      this.setState({ snackOpen: true, newUserOpen: false })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.info !== this.props.info || prevProps.error !== this.props.error) {
      if (this.props.info || this.props.error) {
        this.setState({ snackOpen: true, newUserOpen: false })
      }
    }
  }

  handleNewUserClick = () => {
    this.setState({ newUserOpen: true })
  }

  handleNewUserClose = () => {
    this.setState({ newUserOpen: false })
  }

  handleSaveNewUser = user => {
    this.props.dispatch(saveUser(user))
  }

  handleUserUpdate = user => {
    this.props.dispatch(updateUser(user))
  }

  handleUserDelete = id => {
    this.props.dispatch(deleteUser(id))
  }

  closeSnackbar = () => {
    this.setState({
      snackOpen: false,
    })
  }

  render() {
    const { classes, info, error, ...rest } = this.props
    const { newUserOpen, snackOpen } = this.state
    const isAdmin = this.props.user.profile === 'admin' ? true : false
    return (
      <React.Fragment>
        <AppBar position="static" color="default" className={classes.header}>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Tabs
                value={0}
                indicatorColor="secondary"
                textColor="secondary"
                classes={{ flexContainer: classes.tabs }}
              >
                <Tab label="Usuários" className={classes.tab} />
              </Tabs>
            </Grid>
            <Grid item xs={6} className={classes.buttonWrapper}>
              {this.props.user.profile === 'admin' && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleNewUserClick}
                  className={classes.button}
                >
                  Cadastrar
                </Button>
              )}
            </Grid>
          </Grid>
        </AppBar>
        <UsersTable
          {...rest}
          onUserDelete={this.handleUserDelete}
          onUserUpdate={this.handleUserUpdate}
        />
        {newUserOpen && (
          <UsersEdit
            isAdmin={isAdmin}
            onClose={this.handleNewUserClose}
            onSave={this.handleSaveNewUser}
          />
        )}
        <SimpleSnackbar
          open={snackOpen}
          closeSnackbar={() => this.closeSnackbar}
          vertical="bottom"
          horizontal="left"
          undo={false}
        >
          {info || error}
        </SimpleSnackbar>
      </React.Fragment>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  searchInput: PropTypes.string.isRequired,
}

export default withStyles(styles)(Users)
