import {
  useCallback, memo, createContext, useState,
} from "react";

import moment from "moment";

export const DatesContext = createContext({
  startDate: moment().subtract(30, "day").format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
});

function DatesProvider({children}) {
  const [{startDate, endDate}, setDate] = useState({
    startDate: moment().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });

  const setStartDate = useCallback((newStartDate) => {
    if (moment(newStartDate).isValid()) {
      setDate({endDate, startDate: newStartDate});
    } else {
      throw Error("Не верный формат даты");
    }
  }, [endDate]);

  const setEndDate = useCallback((newEndDate) => {
    if (moment(newEndDate).isValid()) {
      setDate({startDate, endDate: newEndDate});
    } else {
      throw Error("Не верный формат даты");
    }
  }, [startDate]);

  return (
    <DatesContext.Provider
      value={{
        startDate, endDate, setStartDate, setEndDate,
      }}>
      {children}
    </DatesContext.Provider>
  );
}

DatesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(DatesProvider);
