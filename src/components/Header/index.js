import { useState, useEffect } from "react";
import { Layout, Menu, } from "antd";
import { Link } from "react-router-dom";
import routes from "@/routers/topGuide";
import styles from "./index.module.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const Header = () => {
  const history = useHistory();
  const selectedMenu = useSelector(({ selectedMenu }) => selectedMenu);
  const [selectKeys, setSelectKeys] = useState(selectedMenu);

  useEffect(() => {
    if (!isEmpty(selectedMenu)) {
      setSelectKeys(selectedMenu[0].match(/^(\/[a-zA-Z]+)?/)[0]);
    }
    // eslint-disable-next-line
  }, [history.location.pathname]);

  const renderMenus = (list) =>
    list.reduce((acc, item, index) => {
      // 不显示 isHidden
      if (item.isHidden) {
        return acc;
      }
      acc.push(
        <Menu.Item key={item.path}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      );
      return acc;
    }, []);

  return (
    <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <Menu
            mode="horizontal"
            theme="dark"
            onSelect={(item) => setSelectKeys([item.key])}
            selectedKeys={selectKeys}
          >
            {renderMenus(routes)}
          </Menu>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
