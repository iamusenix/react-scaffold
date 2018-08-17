import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Login from 'scripts/app/login/Login';
import Register from 'scripts/app/register/Register';

class PublicLayout extends React.Component {
    render() {
        return (
            <Switch>                   
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Redirect to="/login" />
            </Switch>
        );
    }
}

export default PublicLayout;

