import React from 'react';
import { Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

export default class MicroPhone extends React.Component{
  state = {
    dataCall: true
  }

  callUser(){
    const { dataCall } = this.state;
    this.setState({
      dataCall: !dataCall
    })
  }
  render(){
    const { dataCall } = this.state;
    return(
      <>
        <div className="box-micro">
          <div className={ dataCall ? "background-run": "" }></div>
          <Button
              className="btn-micro-source"
              type="primary"
              icon={<PhoneOutlined />}
              size="large"
              shape="circle"
              // loading={loadings[1]}
              // disabled={dataSave}
              onClick={() => this.callUser()}
          />
        </div>
      </>
    )
  }
}