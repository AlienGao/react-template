import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import routes from "@/routers/home";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenuKey } from "@/store/selectedMenu/action";
import { useHistory } from "react-router";
// import Config from "@/config";

const SubMenu = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedMenu = useSelector(({ selectedMenu }) => selectedMenu);
  const [, setSelectKeys] = useState(selectedMenu);

  // 将路由合并到一个数组中
  const routeList = (routes) => {
    return routes.reduce((acc, item) => {
      acc.push(item);
      if (item.children !== undefined) {
        acc.push(...routeList(item.children));
      }
      return acc;
    }, []);
  };

  // 设置侧边栏子菜单默认只展开一项
  const hasChildrenMenu = routeList(routes).filter((item) => item.children);
  const rootSubmenuKeys = hasChildrenMenu.map((r) => r.path);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // 用于设置侧边栏激活态 local storage保存目前选中的菜单
  useEffect(() => {
    // selectedKeys格式 ["/my-trial我的审批"]
    const routerListRoute = routeList(routes).find(
      (item) => item.path === history.location.pathname
    );
    if (routerListRoute) {
      dispatch(setMenuKey([routerListRoute.path + routerListRoute.name]));
    }
    // 设置侧边栏子菜单默认展开
    const isChildRoute = hasChildrenMenu.find((item) =>
      item.children.find((i) => i.path === history.location.pathname)
    );
    if (isChildRoute) {
      setOpenKeys([isChildRoute.path]);
    }
    // eslint-disable-next-line
  }, [history.location.pathname]);

  const renderMenus = (list) =>
    list.reduce((acc, item, index) => {
      if (item.isHidden) {
        return acc;
      }

      if (item.children === undefined) {
        acc.push(
          <Menu.Item key={item.path + item.name}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        );
        return acc;
      }

      acc.push(
        <Menu.SubMenu key={`${item.path}`} title={item.name}>
          {renderMenus(item.children)}
        </Menu.SubMenu>
      );
      return acc;
    }, []);

  return (
    <div className={styles.subMenu}>
      <Link
        style={{ display: "inline-block", height: 60 }}
        to={"/guide/monitoring"}
        onClick={() => setSelectKeys(["/monitoring实时监控"])}
      >
        {/* <img alt="logo" style={{ height: "40px" }} />
        <span style={{ color: "#fff", marginLeft: "10px" }}>
          {Config.title}
        </span> */}
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        style={{ height: "100%" }}
        onSelect={(item) => setSelectKeys([item.key])}
        selectedKeys={selectedMenu}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        {renderMenus(routes)}
      </Menu>
    </div>
  );
};

export default SubMenu;
