import React from 'react';
import { Spin } from 'antd';

class AppSpin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    render() {
        const style = {
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center'
        };
        return (
            <div style={style}>
                <Spin size="large" />
            </div>
        );
    }
}
export default AppSpin;

