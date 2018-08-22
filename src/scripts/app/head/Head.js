import React from 'react';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import NavItem from '../NavItemActive';
import head from './head.scss';

class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        let sty = head;
        let {userInfo} = this.props;
        let authSet = userInfo?userInfo.authSet:[];
        let showAccount = authSet.indexOf('A-001-000') !=-1;
        let showSystem =  authSet.indexOf('A-001-000') != -1;
        let showAudit =   authSet.indexOf('A-004-000') !=-1;
        let showCompany =  authSet.indexOf('A-009-000') != -1;
        let showSecurity =  authSet.indexOf('A-002-000') !=-1;
        let showVPN =  authSet.indexOf('A-007-001') != -1;
        return (
            <div className={sty.head}>
                <div className={sty.title}>
                    <img src={userInfo["tenant"]["logoUrl"]} style={{ width: "52px" }}/>&nbsp;
                    <span>{userInfo["tenant"]["shortName"]}</span>
                </div>
                <ul className={sty.headNav}>
                    {showAccount && <NavItem to="/app/account/user" activeClassName="head-nav-active">账户管理</NavItem>}
                    {showSystem && <NavItem to="/app/system/basic/config" activeClassName="head-nav-active">系统配置</NavItem>}
                    {showAudit && <NavItem to="/app/audit/log" activeClassName="head-nav-active">日志审计</NavItem>}
                    {showCompany && <NavItem to="/app/company/template" activeClassName="head-nav-active">企业配置</NavItem>}
                    {showSecurity && <NavItem to="/app/security/config/file" activeClassName="head-nav-active">安全配置</NavItem>}
                    {showVPN && <NavItem to="/app/surfing/configure" activeClassName="head-nav-active">无障碍上网</NavItem>}
                    <NavItem to="/monitor" activeClassName="head-nav-active">运行监控</NavItem>
                </ul>
                { userInfo ? <div className={sty.avatar}>
                    <span>{userInfo.nickName}&nbsp;&nbsp;</span>
                    <Avatar size="large" src={userInfo.avatarUrl} />
                </div> : null }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userInfo:state.me.userInfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Head);