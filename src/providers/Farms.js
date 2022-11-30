import React from "react";
import {withSnackbar} from "notistack";
import {getData} from "../common/api/request";
import {ERRORS, FARMS_LIMIT} from "../common/vars";

export const FarmsContext = React.createContext({
  farms: [],
  barns: [],
});

class FarmsProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      farms: [],
      barns: [],
    };
  }

  componentDidMount() {
    this.getFarms();
  }

  getFarms = async () => {
    try {
      const res = await getData("/farms", {params: {limit: FARMS_LIMIT}});
      if (res && Array.isArray(res?.payload)) {
        this.setState({farms: res.payload});
        const barns = [];
        res.payload.forEach((farm) => {
          if (farm?.barns?.length > 0) {
            barns.push(...farm.barns);
          }
        });
        this.setState({barns});
      } else {
        this.props.enqueueSnackbar(ERRORS.UNKNOWN, {variant: "error"});
      }
    } catch (err) {
      const errMsg = `Ошибка ${err.message}`;
      this.props.enqueueSnackbar(errMsg || ERRORS.UNKNOWN, {variant: "error"});
    }
  }

  getProperty = (value, isBarn) => {
    const {farms} = this.state;
    if (farms.length === 0) {
      throw Error("Нет доступных хозяйств");
    }
    let result = null;
    farms.forEach((farm) => {
      if (!isBarn && (farm.uuid === value || farm.slug === value)) {
        result = farm;
        return;
      }
      if (farm?.barns?.length > 0) {
        const match = farm.barns.find(({uuid, slug}) => uuid === value || slug === value);
        if (match) {
          result = match;
        }
      }
    });
    return result || throw Error("Запрашиваемое хозяйство не найдено");
  }

  get value() {
    return {
      farms: this.state.farms,
      barns: this.state.barns,
      getFarms: this.getFarms,
      getProperty: this.getProperty,
    };
  }

  render() {
    const {children} = this.props;
    return (
      <FarmsContext.Provider value={this.value}>
        {children}
      </FarmsContext.Provider>
    );
  }
}

FarmsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.any,
};

export default withSnackbar(FarmsProvider);
