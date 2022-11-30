import {memo} from "react";
import * as PropTypes from "prop-types";
import {Switch, Route} from "react-router-dom";
import Properties from "../view/Home/asideViews/Properties";
import Inspection from "../view/Home/asideViews/Inspection";
import Settings from "../view/Home/asideViews/Settings";

function AsideRouter(props) {
  const {
    closeDrawer, addCow, openAddCow, closeAddCow,
  } = props;
  return (
    <Switch>
      <Route
        path={["/settings", "settings/:type"]}>
        <Settings closeDrawer={closeDrawer} />
      </Route>
      <Route
        path="/audit/card/:auditId">
        <Inspection
          addCow={addCow}
          closeAddCow={closeAddCow}
          openAddCow={openAddCow}
          closeDrawer={closeDrawer} />
      </Route>
      <Route
        exact
        path={["/:type", "/:type/:farmId", "/:type/barn/:barn"]}>
        <Properties closeDrawer={closeDrawer} />
      </Route>
    </Switch>
  );
}

AsideRouter.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  closeAddCow: PropTypes.func.isRequired,
  openAddCow: PropTypes.func.isRequired,
  addCow: PropTypes.bool.isRequired,
};

export default memo(AsideRouter);
