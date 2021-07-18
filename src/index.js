import React from "react";
import ReactDOM from "react-dom";
import "@/style/index.css";
import "antd/dist/antd.css";
import LayoutMain from "./layout";
import { history } from "@/routers";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import storeConfig from "@/store";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";

const { persistor, store } = storeConfig();
moment.locale("zh-cn");

ReactDOM.render(
  <ConfigProvider
    // 全局设置弹窗容器
    getPopupContainer={(node) => {
      // if (node) {
      //   return node
      // }
      return document.getElementById('BackTopMark');
    }}
    locale={zhCN}
  >
    <Router history={history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LayoutMain />
        </PersistGate>
      </Provider>
    </Router>
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
