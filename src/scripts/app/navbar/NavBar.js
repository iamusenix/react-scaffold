import React from 'react';
import NavItem from '../NavItemActive';
import navbar from './navbar.scss';

let sty = navbar;

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className={sty.navBar}>
                <ul className={sty.wrap}>
                    <NavItem to="/monitor">目录一</NavItem>
                    {/* <NavItem to="/record">目录二</NavItem> */}
                </ul>
            </div>
        );
    }
}

export default NavBar;

