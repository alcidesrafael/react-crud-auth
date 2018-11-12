import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import compose from 'recompose/compose'

import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import LockIcon from '@material-ui/icons/Lock'

import { renderTextField } from '../components/utils/renderInputs'
import SimpleSnackbar from '../components/utils/simpleSnackbar'

const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  card: {
    minWidth: 300,
    minHeight: 350,
    marginTop: theme.spacing.unit * 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  avatar: {
    marginTop: theme.spacing.unit * 6,
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    padding: '0 1em 1em 1em',
    height: 200,
  },
  input: {
    marginTop: theme.spacing.unit * 2,
  },
  actions: {
    alignSelf: 'baseline',
    padding: '0 1em 1em 1em',
  },
})

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'E-mail é obrigatório'
  }
  if (!values.password) {
    errors.password = 'Senha é obrigatória'
  }
  return errors
}

const Login = ({
  classes,
  handleSubmit,
  authError,
  isLoading,
  snackOpen,
  onLogin,
  onCloseSnackbar,
}) => (
  <React.Fragment>
    <CssBaseline />
    <div className={classes.main}>
      <Card className={classes.card}>
        <div className={classes.avatar}>
          <Avatar className={classes.icon}>
            <LockIcon />
          </Avatar>
        </div>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                name="email"
                component={renderTextField}
                label="E-mail"
                type="email"
                disabled={isLoading}
                fullWidth
              />
            </div>
            <div className={classes.input}>
              <Field
                name="password"
                component={renderTextField}
                label="Senha"
                type="password"
                disabled={isLoading}
                fullWidth
              />
            </div>
          </div>
          <CardActions className={classes.actions}>
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              disabled={isLoading}
              className={classes.button}
              fullWidth
            >
              {isLoading && <CircularProgress size={25} thickness={2} />}
              Entrar
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
    {authError && (
      <SimpleSnackbar
        open={snackOpen}
        closeSnackbar={() => onCloseSnackbar}
        vertical="bottom"
        horizontal="left"
        undo={false}
      >
        {authError.message}
      </SimpleSnackbar>
    )}
  </React.Fragment>
)

Login.propTypes = {
  ...propTypes,
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authError: PropTypes.object.isRequired,
  snackOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onCloseSnackbar: PropTypes.func.isRequired,
}

const enhance = compose(
  reduxForm({
    form: 'signIn',
    validate,
  }),
  withStyles(styles)
)

export default enhance(Login)
