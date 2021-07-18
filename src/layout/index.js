import { Switch, Route } from "react-router-dom";
import LayoutMain from "./LayoutMain";
import NotFound from "@/pages/NotFound/index.js";

const LayoutIndex = () => {
  return (
    <Switch>
      <Route path="/404" component={NotFound}></Route>
      <Route path="/" render={() => <LayoutMain></LayoutMain>}></Route>
    </Switch>
  );
};

export default LayoutIndex;
