import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { logout } from '../actions/auth'
import { setSearchInput } from '../actions/app'

const styles = theme => ({
  root: {
    width: '100%',
    color: 'black',
  },
  header: {
    boxShadow: 'none',
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 0,
      '&:focus': {
        width: 200,
      },
    },
  },
  inputInputActive: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
  },
  accountMenu: {
    [theme.breakpoints.up('sm')]: {
      borderRadius: 0,
    },
  },
  accountWrapper: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      textAlign: 'left',
      marginLeft: 10,
      marginRight: 30,
    },
  },
  name: {
    marginTop: -theme.spacing.unit,
  },
  profile: {
    fontSize: '12px',
    lineHeight: 1,
  },
  menuItem: {
    width: '160px',
  },
})

class AppLayout extends Component {
  state = {
    anchorEl: null,
  }

  componentDidMount() {
    document.title = this.props.pageTitle
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageTitle !== this.props.pageTitle) {
      document.title = this.props.pageTitle
    }
  }

  handleSearchInput = event => {
    let key = event.target.value
    this.props.dispatch(setSearchInput(key))
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogout = () => {
    this.props.dispatch(logout())
  }

  render() {
    const { classes, pageTitle, searchPlaceholder, searchInput, user, children } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static" className={classes.header} color="default">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <ArrowBackIcon color="secondary" />
              </IconButton>
              <Typography className={classes.title} variant="h5" color="inherit" noWrap>
                {pageTitle}
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon color="secondary" />
                </div>
                <InputBase
                  placeholder={searchPlaceholder}
                  value={searchInput}
                  onChange={e => this.handleSearchInput(e)}
                  classes={{
                    root: classes.inputRoot,
                    input: searchInput.length > 0 ? classes.inputInputActive : classes.inputInput,
                  }}
                />
              </div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
                className={classes.accountMenu}
              >
                <AccountCircle color="secondary" fontSize="large" />
                <div className={classes.accountWrapper}>
                  <Typography className={classes.name} variant="subtitle1" color="inherit" noWrap>
                    {user && user.firstName}
                  </Typography>
                  <Typography
                    className={classes.profile}
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                  >
                    {user && user.profile === 'admin' ? 'Administrador' : 'Usuário padrão'}
                  </Typography>
                </div>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleLogout} className={classes.menuItem}>
                  Sair
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          {children}
        </div>
      </React.Fragment>
    )
  }
}

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  pageTitle: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  searchInput: PropTypes.string.isRequired,
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const mapStateToProps = state => {
  const { pageTitle, searchPlaceholder, searchInput } = state.app
  const { user } = state.auth
  return {
    pageTitle,
    searchPlaceholder,
    searchInput,
    user,
  }
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)

export default enhance(AppLayout)
