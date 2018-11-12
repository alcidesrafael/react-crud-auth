import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import RadioGroup from '@material-ui/core/RadioGroup'

import { renderTextField, renderSwitch, renderRadioGroup } from '../components/utils/renderInputs'

const validate = values => {
  const errors = {}
  if (!values.firstName.trim()) {
    errors.firstName = 'Nome é obrigatório'
  }
  if (!values.lastName.trim()) {
    errors.lastName = 'Sobrenome é obrigatório'
  }
  if (!values.email.trim()) {
    errors.email = 'E-mail é obrigatório'
  }
  if (!values.id && !values.password) {
    errors.password = 'Senha é obrigatória'
  }
  return errors
}

const styles = theme => ({
  content: {
    paddingTop: '0 !important',
  },
  divider: {
    marginBottom: theme.spacing.unit,
  },
  switchContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginTop: theme.spacing.unit * 2,
  },
})

const UsersEdit = ({ classes, isAdmin, handleSubmit, onClose, onSave, user }) => (
  <Dialog aria-labelledby="form-dialog-title" open={true} scroll="body" fullWidth>
    <DialogTitle id="form-dialog-title" className={classes.title}>
      {isAdmin ? 'Editar usuário' : 'Visualizar usuário'}
    </DialogTitle>
    <form onSubmit={handleSubmit(onSave)} autoComplete="off">
      <DialogContent className={classes.content}>
        <div className={classes.switchContent}>
          <DialogContentText>Ativar usuário</DialogContentText>
          {isAdmin ? (
            <Field name="active" component={renderSwitch} />
          ) : (
            <Switch name="active" checked={user.active} />
          )}
        </div>
        <Divider className={classes.divider} />
        <div className={classes.radioContent}>
          <DialogContentText>Tipo de usuário</DialogContentText>
          {isAdmin ? (
            <Field name="profile" component={renderRadioGroup}>
              <FormControlLabel value="admin" control={<Radio />} label="Administrador" />
              <FormControlLabel value="user" control={<Radio />} label="Usuário padrão" />
            </Field>
          ) : (
            <RadioGroup name="profile" value={user.profile}>
              <FormControlLabel value="admin" control={<Radio />} label="Administrador" />
              <FormControlLabel value="user" control={<Radio />} label="Usuário padrão" />
            </RadioGroup>
          )}
        </div>
        <Divider className={classes.divider} />
        <div>
          {user && <Field name="id" component={renderTextField} type="hidden" autoComplete="off" />}
          <Field
            name="firstName"
            component={renderTextField}
            label="Nome"
            type="text"
            autoComplete="off"
            fullWidth
            className={classes.input}
            disabled={!isAdmin}
          />
          <Field
            name="lastName"
            component={renderTextField}
            label="Sobrenome"
            type="text"
            autoComplete="off"
            fullWidth
            className={classes.input}
            disabled={!isAdmin}
          />
          <Field
            name="email"
            component={renderTextField}
            label="E-mail"
            type="email"
            autoComplete="off"
            fullWidth
            className={classes.input}
            disabled={!isAdmin}
          />
          {isAdmin && (
            <Field
              name="password"
              component={renderTextField}
              label="Senha"
              type="password"
              autoComplete="off"
              fullWidth
              className={classes.input}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancelar
        </Button>
        {isAdmin && (
          <Button type="submit" color="secondary">
            Salvar
          </Button>
        )}
      </DialogActions>
    </form>
  </Dialog>
)

UsersEdit.propTypes = {
  ...propTypes,
  classes: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      id: ownProps.user ? ownProps.user.id : undefined,
      active: ownProps.user ? ownProps.user.active : true,
      profile: ownProps.user ? ownProps.user.profile : 'user',
      firstName: ownProps.user ? ownProps.user.firstName : '',
      lastName: ownProps.user ? ownProps.user.lastName : '',
      email: ownProps.user ? ownProps.user.email : '',
    },
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'saveUser',
    validate,
  }),
  withStyles(styles)
)

export default enhance(UsersEdit)
