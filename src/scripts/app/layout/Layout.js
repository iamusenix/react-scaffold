import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NavBar from 'scripts/app/navbar/NavBar';
import Head from 'scripts/app/head/Head';
import Loadable from 'react-loadable';
import AppSpin from 'scripts/app/spin/AppSpin';
import layout from './layout.scss';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        let sty = layout;
        let aa;
        return (
            <div className={sty.right}>
                <Head />
                <NavBar />
                <div className={sty.pageWrap}>
                    <div className={sty.pageContent}>
                        <Switch>
                            <Route path="/monitor" component={
                                Loadable({
                                    loader: () => import(/* webpackChunkName: "monitor" */ 'scripts/app/monitor/Monitor'),
                                    loading: AppSpin
                                })
                            } />
                            <Redirect to="/monitor" />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
export default Layout;

