import React from "react";
import {withSnackbar} from "notistack";
import {getData} from "../common/api/request";
import {COWS_LIMIT, ERRORS} from "../common/vars";

export const CowsContext = React.createContext({
  cows: [],
  load: false,
});

class CowsProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
      load: false,
    };
  }

  getCows = async (auditId, callback) => {
    try {
      this.setState({load: true, cows: []});
      const res = await getData("/cows", {params: {limit: COWS_LIMIT, auditId}});
      if (res && res?.payload) {
        this.setState({cows: res.payload, load: false}, () => {
          if (typeof callback === "function") {
            callback();
          }
        });
      } else {
        this.setState({load: false});
        this.props.enqueueSnackbar(ERRORS.UNKNOWN, {variant: "error"});
      }
    } catch (err) {
      this.setState({load: false});
      const errMsg = `Ошибка ${err.message}`;
      this.props.enqueueSnackbar(errMsg || ERRORS.UNKNOWN, {variant: "error"});
    }
  }

  get value() {
    return {
      cows: this.state.cows,
      getCows: this.getCows,
      load: this.state.load,
    };
  }

  render() {
    const {children} = this.props;
    return (
      <CowsContext.Provider value={this.value}>
        {children}
      </CowsContext.Provider>
    );
  }
}

CowsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.any,
};

export default withSnackbar(CowsProvider);
