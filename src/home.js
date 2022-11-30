import {ThemeProvider} from "@material-ui/core/styles";
import {
  BrowserRouter, Switch, Route, Redirect,
} from "react-router-dom";
import {useEffect} from "react";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/ru";
import MomentUtils from "@date-io/moment";
import theme from "./common/theme";
import SnackBarProvider from "./providers/SnackBars";
import FarmsProvider from "./providers/Farms";
import ProfileProvider from "./providers/Profile";
import Home from "./view/Home";
import hideLoader from "./common/utils/hideLoader";
import DatesProvider from "./providers/Dates";
import CowsProvider from "./providers/Cows";

function HomePage() {
  useEffect(hideLoader, []);
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <ProfileProvider>
          <FarmsProvider>
            <CowsProvider>
              <BrowserRouter>
                <MuiPickersUtilsProvider
                  libInstance={moment}
                  utils={MomentUtils}
                  locale="ru">
                  <DatesProvider>
                    <Switch>
                      <Route path={["/audit", "/contacts", "/settings"]}>
                        <Home />
                      </Route>
                      <Redirect
                        from="/"
                        to="/audit" />
                    </Switch>
                  </DatesProvider>
                </MuiPickersUtilsProvider>
              </BrowserRouter>
            </CowsProvider>
          </FarmsProvider>
        </ProfileProvider>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(<HomePage />, document.getElementById("root"));
