import React from "react";
import {withSnackbar} from "notistack";
import isEmpty from "lodash/isEmpty";
import {getData} from "../common/api/request";
import {ERRORS} from "../common/vars";

export const ProfileContext = React.createContext({
  profile: null,
});

class ProfileProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    try {
      const profile = await getData("/profile");
      if (!isEmpty(profile?.payload)) {
        this.setState({profile: profile.payload});
      } else {
        this.props.enqueueSnackbar(ERRORS.UNKNOWN, {variant: "error"});
      }
    } catch (err) {
      const errMsg = `Ошибка ${err.message}`;
      this.props.enqueueSnackbar(errMsg || ERRORS.UNKNOWN, {variant: "error"});
    }
  };

  get value() {
    return {profile: this.state.profile};
  }

  render() {
    const {children} = this.props;
    return (
      <ProfileContext.Provider value={this.value}>
        {children}
      </ProfileContext.Provider>
    );
  }
}

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.any,
};

export default withSnackbar(ProfileProvider);
