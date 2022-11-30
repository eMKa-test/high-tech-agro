import {Link} from "react-router-dom";
import LogoTitleIcon from "../icons/logo_title";
import LogoIcon from "../icons/logo_dark";

export default ({icon = false}) => {
  return (
    <Link to="/audit">
      {icon ? (
        <LogoIcon />
      ) : (
        <LogoTitleIcon />
      )}
    </Link>
  );
};
