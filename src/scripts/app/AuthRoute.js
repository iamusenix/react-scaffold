import React from 'react';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import AppSpin from 'scripts/app/spin/AppSpin';
import Layout from 'scripts/app/layout/Layout';
import PublicLayout from 'scripts/app/layout/PublicLayout';

class AuthRoute extends React.Component {
    componentDidMount() {
        let { checkAuthInfo } = this.props;
        checkAuthInfo();
    }
    render() {
        const { authInfo, appMap } = this.props.me;
        if (!authInfo ||(authInfo.access_token && !appMap)) {
            return <Route path="/" component={AppSpin} />;
        } else if (authInfo.access_token) {
            return (
                <Switch>
                    <Route path="/monitor" component={Layout} />
                    <Redirect to="/monitor" />
                </Switch>
            );
        } else {
            return <Route path="/" component={PublicLayout} />;
        }
    }
}

function mapStateToProps(state) {
    return {
        me: state.me
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkAuthInfo: () => {
            dispatch({ type: 'CHECK_AUTHINFO' });
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));