import {
  memo, useState, useCallback, useEffect,
} from "react";
import moment from "moment";
import classnames from "classnames";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {DatePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import DatePickerLeftIcon from "../icons/datePickerLeftIcon";
import DatePickerRightIcon from "../icons/datePickerRightIcon";
import {datePickerStyles as styles} from "./styles";
import {formDate} from "./helpers";

const useStyles = makeStyles(styles);

function DateModal(props) {
  const {
    open,
    dismiss = null,
    onSelect = null,
    onOpen = null,
    disablePast = undefined,
    disableFuture = undefined,
    autoOk = false,
    format = "",
    minDate = undefined,
    maxDate = undefined,
    date,
    dateForRange = false,
  } = props;
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  const handleDateChange = useCallback((dateValue) => {
    setSelectedDate(dateValue);
    if (typeof onSelect === "function") {
      const response = format ? dateValue.format(format) : dateValue.toDate();
      onSelect(response);
    }
  }, [onSelect, format]);

  const renderDay = useCallback((_date, _selected, currentlyMonth) => {
    const active = _selected.isSame(_date);
    const currentDay = formDate(_date) === formDate(moment());
    let disabled = false;
    let stylesRule = {};
    let disableDay = false;

    if (minDate || maxDate) {
      let firstDay = false;
      let lastDay = false;
      const rangeDays = minDate
        ? _date.isBetween(minDate, formDate(_selected))
        : _date.isBetween(formDate(_selected), maxDate);
      if (minDate) {
        disableDay = _date.isBefore(minDate);
        if (formDate(_selected) !== minDate) {
          firstDay = formDate(_date) === minDate;
          lastDay = active;
        }
      }
      if (maxDate) {
        disableDay = _date.isAfter(maxDate);
        if (formDate(_selected) !== maxDate) {
          firstDay = active;
          lastDay = formDate(_date) === maxDate;
        }
      }
      stylesRule = {
        [classes.rangeDays]: rangeDays,
        [classes.currentDay]: currentDay,
        [classes.selectedFirstDay]: firstDay,
        [classes.selectedLastDay]: lastDay,
        [classes.selectedDay]: active,
      };
    } else {
      disabled = !currentlyMonth;
      stylesRule = {
        [classes.currentDay]: currentDay,
        [classes.selectedDay]: active,
      };
    }

    if (disableFuture) {
      disabled = _date.isAfter(moment());
    }
    if (disablePast) {
      disabled = _date.isBefore(moment());
    }

    return (
      <div className={classnames(classes.wrapperDay, stylesRule)}>
        <Button
          disabled={disabled || disableDay || !currentlyMonth}
          className={classnames(classes.day)}>
          {_date.format("D")}
        </Button>
      </div>
    );
  }, [dateForRange, minDate, maxDate, date, disableFuture, disablePast]);

  return (
    <DatePicker
      cancelLabel="Отмена"
      okLabel="Выбрать"
      minDate={minDate}
      maxDate={maxDate}
      autoOk={autoOk}
      disablePast={disablePast}
      disableFuture={disableFuture}
      DialogProps={{
        className: classes.root,
      }}
      renderDay={renderDay}
      TextFieldComponent={() => null}
      leftArrowIcon={<DatePickerLeftIcon />}
      rightArrowIcon={<DatePickerRightIcon />}
      onClose={dismiss}
      open={open}
      onOpen={onOpen}
      disableToolbar
      variant="dialog"
      value={selectedDate}
      onChange={handleDateChange}
      animateYearScrolling />
  );
}

DateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  onOpen: PropTypes.func,
  format: PropTypes.string,
  autoOk: PropTypes.bool,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.instanceOf(moment)]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.instanceOf(moment)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.instanceOf(moment)]),
  dateForRange: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.instanceOf(moment)]),
};

export default memo(DateModal);
