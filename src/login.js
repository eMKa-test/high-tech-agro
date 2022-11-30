import {ThemeProvider} from "@material-ui/core/styles";
import Login from "./view/Login";
import theme from "./common/theme";
import SnackBarProvider from "./providers/SnackBars";

function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <Login />
      </SnackBarProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(<LoginPage />, document.getElementById("root"));
