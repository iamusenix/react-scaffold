import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }
    onClickMenu(e){
        let { to} = this.props;
        let isMonitor = to.indexOf('/monitor')!= -1;
        if(!isMonitor){
            location.href = to;
            e.preventDefault();
        }
    }
    render() {
        let { to, activeClassName, children } = this.props;
        return <Route path={to} children={({ match }) => (
            <li className={ match ? activeClassName || 'nav-active' : '' }>
                <NavLink onClick={this.onClickMenu.bind(this)} to={to}>{children}</NavLink>
            </li>
        )}/>;
    }
}

export default NavItem;