import React from "react";
import { Layout, Menu, Icon } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Map } from "./map/Map";
import { InfoLog } from "./InfoLog";

const { Content, Footer, Sider } = Layout;

export class Dashboard extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1">
                  <Link to="/map">
                    <Icon type="car" />
                    <span>Map</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/info-log">
                    <Icon type="book" />
                    <span>Information Log</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/devices">
                    <Icon type="phone" />
                    <span>Devices</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/settings">
                    <Icon type="setting" />
                    <span>Settings</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content
                style={{ padding: "16px 16px 16px 16px", background: "white" }}
              >
                <Route path="/map">
                  <Map />
                </Route>
                <Route path="/info-log">
                  <InfoLog />
                </Route>
              </Content>
              <Footer style={{ textAlign: "center" }}>Traffixed</Footer>
            </Layout>
          </Layout>
        </Switch>
      </Router>
    );
  }
}
