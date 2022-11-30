import {memo, lazy, Suspense} from "react";
import * as PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import Inspections from "../view/Home/contentViews/Inspections";
import Contacts from "../view/Home/contentViews/Contacts";
import Audit from "../view/Home/contentViews/Audit";
import AuditCow from "../view/Home/contentViews/AuditCow";
import Ills from "../view/Home/contentViews/Settings/Ills";
import UserListView from "../view/UserList";

// const UserListView = lazy(() => import("../view/UserList"));

function ContentRouter(props) {
  const {addCow, closeAddCow, openAddCow} = props;
  return (
    <Suspense fallback={<span />}>
      <Switch>
        <Route
          path="/settings/ills">
          <Ills />
        </Route>
        <Route path="/settings/users">
          <UserListView />
        </Route>
        <Route
          path="/audit/card/:auditId/cow/:cowId">
          <AuditCow />
        </Route>
        <Route
          path="/audit/card/:auditId">
          <Audit
            closeAddCow={closeAddCow}
            addCow={addCow}
            openAddCow={openAddCow} />
        </Route>
        <Route
          path={["/audit", "/audit/:farmId", "/audit/barn/:barnId"]}>
          <Inspections />
        </Route>
        <Route
          path={["/contacts", "/contacts/:farmId/", "/contacts/barn/:barnId"]}>
          <Contacts />
        </Route>
      </Switch>
    </Suspense>
  );
}

ContentRouter.propTypes = {
  addCow: PropTypes.bool.isRequired,
  closeAddCow: PropTypes.func.isRequired,
  openAddCow: PropTypes.func.isRequired,
};

export default memo(ContentRouter);
