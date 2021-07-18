import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import routerConfig from "@/routers/home";

const CusContent = () => {
  const renderRouteItem = (item) => (
    <Route
      key={item.path}
      path={item.path}
      component={item.component ? item.component : null}
    ></Route>
  );

  const renderRouteList = (list) =>
    list.reduce((acc, item) => {
      if (item.children === void 0) {
        acc.push(renderRouteItem(item));
        return acc;
      }

      item.children.forEach((subItem) => {
        acc.push(renderRouteItem(subItem));
      });
      return acc;
    }, []);

  return (
    <Layout.Content
      style={{
        margin: "30px 16px 0",
        overflow: "auto",
        background: "#fff",
        position: "relative",
      }}
      id="BackTopMark"
    >
      <Switch>
        <Redirect exact from="/" to={routerConfig[0].path}></Redirect>
        <Redirect exact path="/guide" to={routerConfig[0].path}></Redirect>
        {/* 增加视频路由 同时改变侧边栏 */}
        <Redirect exact path="/videos" to="/404"></Redirect>
        {renderRouteList(routerConfig)}
        <Redirect to="/404"></Redirect>
      </Switch>
    </Layout.Content>
  );
};

export default CusContent;
