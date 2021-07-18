import { createBrowserHistory } from "history";
import home from "./home";
import topGuide from "./topGuide";
export const history = createBrowserHistory();

const allRoutes = [...topGuide, ...home];

export default allRoutes;
