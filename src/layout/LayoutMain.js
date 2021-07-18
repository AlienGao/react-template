import React from "react";
import { Layout } from "antd";
import Header from "@/components/Header";
import Content from "@/components/Content";
import "./index.scss";
import SubMenu from "@/components/SubMenu";

const { Sider } = Layout;
const LayoutMain = () => {
  
  // if (!localStorage.getItem("token")) {
  //   const target = `${location.pathname}${location.search}`
  //   let path = "/login"
  //   if (target !== "/") {
  //     path = `${path}?target=${encodeURIComponent(target)}`
  //   }
  //   return <Redirect to={path}></Redirect>
  // }

  return (
    <Layout className="layout">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <SubMenu />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header />
        <Layout.Content className="content-container">
          <Content />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
