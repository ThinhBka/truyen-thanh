import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Row, Col } from 'antd';
import { Authencation } from "./components/authencation";
import { MenuComponent } from "./components/menu";
import { RegistrationForm, TableSpeaker, EditableTable, DragUpload, MicroPhone } from "./components/device";
import TableTimer from './components/timer'

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/user">
            <Row>
              <Col span={8}><MenuComponent/></Col>
              <Col span={10}><RegistrationForm /></Col>
            </Row>
          </Route>
          <Route exact path="/user/upload">
            <Row>
              <Col span={8}><MenuComponent/></Col>
              <Col span={12}><DragUpload /></Col>
            </Row>
          </Route>
          <Route exact path="/user/micro">
            <Row>
              <Col span={8}><MenuComponent/></Col>
              <Col span={12}><MicroPhone /></Col>
            </Row>
          </Route>
          <Route exact path="/user/source">
            <Row>
              <Col span={8}><MenuComponent/></Col>
              <Col span={12}><EditableTable /></Col>
            </Row>
          </Route>
          <Route exact path="/user/timer">
            <Row>
              <Col span={8}><MenuComponent/></Col>
              <Col span={12}><TableTimer /></Col>
            </Row>
          </Route>
          <Route exact path="/user/speak">
            <Row>
              <Col span={8}><MenuComponent/></Col>
              <Col span={12}><TableSpeaker /></Col>
            </Row>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Row>
              <Col span={12}></Col>
              <Col span={12}><Authencation /></Col>
            </Row>
          </Route>
        </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
