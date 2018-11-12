import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import LoginCont from '../containers/LoginCont'
import UsersCont from '../containers/UsersCont'
import AppLayout from '../components/AppLayout'

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={LoginCont} />
    <AppLayout>
      <PrivateRoute exact path="/users" component={UsersCont} />
      <Redirect from="*" to="/users" />
    </AppLayout>
  </Switch>
)

export default Routes
