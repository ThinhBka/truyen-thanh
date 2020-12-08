import React from 'react';
import ReactDOM from 'react-dom';

import { Upload, message, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class DragUpload extends React.Component{
  render() {
    return(
      <>
        <Dragger {...props} style={{ maxHeight: 200, marginTop: 60, marginLeft: 0, marginBottom: 20, padding: 10 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
        <br/>
        <div className="upload-source">Nguồn Phát: </div>
        <Select defaultValue="computer" style={{ width: 120 }} onChange={handleChange} disabled>
          {/* {
            tags.map(item => <Option value={item.id}>{item.name}</Option>)
          } */}
        </Select>
        <br/>
        <div className="upload-source">Trình Phát</div>
        <audio controls>
          <source src="horse.ogg" type="audio/ogg"/>
          <source src="horse.mp3" type="audio/mpeg"/>
        </audio>
      </>
    )
  }
}