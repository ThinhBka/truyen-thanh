import React from "react";
import ReactDOM from "react-dom";

import { Skeleton, Space, Divider, Switch, Form, Radio } from "antd";

class SkeletonPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      active: false,
      size: "default",
      buttonShape: "default",
      avatarShape: "circle"
    }
  }

  handleActiveChange = (checked) => {
    this.setState({ active: checked });
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  handleShapeChange = (prop) => (e) => {
    this.setState({ [prop]: e.target.value });
  };

  render() {
    const { active, size, buttonShape, avatarShape } = this.state;
    const { numberCol, numberRow } = this.props;
    return (
      <>
        {new Array(numberCol).forEach(element1 => {
          <>
            <Space>
              {new Array(numberRow).forEach(element => {
                <Skeleton.Button active={active} size={size} shape={buttonShape} />
              })}
            </Space>
            <Divider />
          </>
        })}
        <br />
        <br />
        <Skeleton.Image />
        <Divider />
        <Form layout="inline" style={{ margin: "16px 0" }}>
          <Form.Item label="Active">
            <Switch checked={active} onChange={this.handleActiveChange} />
          </Form.Item>
          <Form.Item label="Size">
            <Radio.Group value={size} onChange={this.handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Button Shape">
            <Radio.Group
              value={buttonShape}
              onChange={this.handleShapeChange("buttonShape")}
            >
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="round">Round</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Avatar Shape">
            <Radio.Group
              value={avatarShape}
              onChange={this.handleShapeChange("avatarShape")}
            >
              <Radio.Button value="square">Square</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
