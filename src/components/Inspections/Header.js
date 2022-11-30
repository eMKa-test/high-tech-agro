import {
  memo, Fragment, useCallback, useState, useContext, useEffect,
} from "react";
import * as PropTypes from "prop-types";
import {
  Box, Button, CircularProgress, IconButton, InputAdornment, TextField,
} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/styles";
import ExpandMore from "@material-ui/icons/ExpandMore";
import classnames from "classnames";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles";
import Text from "../inputs/Text";
import CalendarIcon from "../icons/calendar";
import SearchIcon from "../icons/search";
import CustomButton from "../inputs/CustomButton";
import AddRoundIcon from "../icons/add_round";
import SaveIcon from "../icons/saveLarge";
import DropdownMenu from "../dropdownMenu";
import Modal from "../modals/modal";
import AddInspectionCard from "../Cards/AddInspection";
import DateModal from "../modals/DatePicker";
import {getTimeString, screenMediaRule} from "../../common/utils";
import FilterIcon from "../icons/filter";
import {FarmsContext} from "../../providers/Farms";

const useStyles = makeStyles(styles);

const options = [
  {
    label: "Статистика",
    value: "stats",
  },
  {
    label: "Пересечение",
    value: "crossings",
  },
  {
    label: "Другое",
    value: "other",
  },
];

function Header(props) {
  const {
    updateAudits, startDate, endDate, setEndDate, setStartDate, routeParams, searchText, onSearch, searchLoad,
  } = props;
  const classes = useStyles();
  const {props: colorTheme, text} = useTheme();
  const media = screenMediaRule(1115, "max-width");
  const mediaRightItems = screenMediaRule(1600, "min-width");
  const tablet = screenMediaRule(767);
  const {farms, getProperty} = useContext(FarmsContext);

  const [openCard, setOpenCard] = useState(false);
  const [startDatePicker, setOpenStartDatePicker] = useState(false);
  const [endDatePicker, setOpenEndDatePicker] = useState(false);
  const [filters, setSowFilters] = useState(false);

  const openInspectionCard = useCallback(() => setOpenCard(true), []);
  const closeInspectionCard = useCallback(() => setOpenCard(false), []);

  const openStartDatePicker = useCallback(() => setOpenStartDatePicker(true), []);
  const closeStartDatePicker = useCallback(() => setOpenStartDatePicker(false), []);

  const openEndDatePicker = useCallback(() => setOpenEndDatePicker(true), []);
  const closeEndDatePicker = useCallback(() => setOpenEndDatePicker(false), []);

  const openFilters = useCallback(() => setSowFilters(true), []);
  const closeFilters = useCallback(() => setSowFilters(false), []);

  const onSelectDate = useCallback((newDate) => {
    if (startDatePicker) {
      return setStartDate(newDate);
    }
    return setEndDate(newDate);
  }, [startDatePicker, endDatePicker]);

  const onSelectMenu = useCallback((value) => {
    const link = document.createElement("a");
    link.setAttribute("download", `${value}.xlsx`);
    const params = new URLSearchParams();
    params.append("startDate", startDate);
    params.append("endDate", endDate);
    if (routeParams.farmId) {
      params.append("farm", getProperty(routeParams.farmId).uuid);
    } else {
      params.append("barn", getProperty(routeParams.barnId, true).uuid);
    }
    switch (value) {
      case "crossings":
        link.setAttribute("href", `/api/audit/crossings?${params.toString()}`);
        break;
      case "stats":
        link.setAttribute("href", `/api/audit/stats?${params.toString()}`);
        break;
      default:
        link.setAttribute("href", "#");
    }
    link.click();
  }, [farms, routeParams]);

  const onClear = useCallback(() => {
    onSearch({target: {value: ""}});
  }, [onSearch]);

  useEffect(() => {
    if (!tablet && filters) {
      setSowFilters(false);
    }
  }, [tablet, filters]);

  return (
    <div>
      <div className={classes.headerRoot}>
        <div className={classes.headerLeft}>
          {tablet ? (
            <Box
              mb={1}
              mr={2}>
              <IconButton
                className={classes.filterButton}
                onClick={filters ? closeFilters : openFilters}
                disableRipple
                variant="outlined">
                <FilterIcon active={filters} />
              </IconButton>
            </Box>
          ) : (
            <Fragment>
              <Box
                mb={1}
                mr={2}>
                <Button
                  title="Выбрать начальную дату"
                  onClick={openStartDatePicker}
                  disableRipple
                  className={classes.datePickerButton}
                  variant="outlined"
                  startIcon={<CalendarIcon />}>
                  <Text
                    weight={300}
                    size={14}
                    noWrap
                    color={text.primary}>
                    {getTimeString(startDate)}
                  </Text>
                </Button>
              </Box>
              <Box
                mb={1}
                mr={2}>
                <Button
                  title="Выбрать конечную дату"
                  onClick={openEndDatePicker}
                  disableRipple
                  className={classes.datePickerButton}
                  variant="outlined"
                  startIcon={<CalendarIcon />}>
                  <Text
                    noWrap
                    weight={300}
                    size={14}
                    color={text.primary}>
                    {getTimeString(endDate)}
                  </Text>
                </Button>
              </Box>
              <Box
                mb={1}
                className={classes.searchWrapper}>
                <TextField
                  placeholder="Поиск..."
                  variant="outlined"
                  onChange={onSearch}
                  value={searchText}
                  className={classes.searchInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: searchLoad ? (
                      <InputAdornment position="end">
                        <Box className={classes.searchLoader}>
                          <CircularProgress
                            thickness={1}
                            color="secondary"
                            size={28} />
                        </Box>
                      </InputAdornment>
                    ) : null,
                  }} />
                <IconButton
                  title="Очистить поиск"
                  onClick={onClear}
                  size="small"
                  className={classnames(classes.clearSearchButton, {
                    [classes.clearSearchButtonActive]: searchText,
                  })}>
                  <CloseIcon htmlColor={colorTheme.BLUE.main} />
                </IconButton>
              </Box>
            </Fragment>
          )}
        </div>
        <div className={classes.headerRight}>
          <Box
            mb={1}
            order={mediaRightItems ? 1 : 3}
            mx={mediaRightItems ? 2 : 0}>
            <CustomButton
              title="Добавить осмотр"
              onClick={openInspectionCard}
              size={48}
              bg={colorTheme.ORANGE}>
              <AddRoundIcon />
            </CustomButton>
          </Box>
          {routeParams ? (
            <Box
              mb={1}
              mx={mediaRightItems ? 0 : 2}
              order={2}>
              <DropdownMenu
                onSelect={onSelectMenu}
                list={options}>
                <CustomButton
                  title="Экспорт данных"
                  extStyle={classes.exportDataButton}
                  size={mediaRightItems ? "" : 48}
                  bg={colorTheme.GREY_LIGHT}>
                  <SaveIcon />
                  {mediaRightItems ? (
                    <Fragment>
                      <Text
                        noWrap
                        weight={300}
                        size={14}
                        color={text.primary}>
                        Экспорт
                      </Text>
                      <ExpandMore htmlColor={colorTheme.BLUE.main} />
                    </Fragment>
                  ) : null}
                </CustomButton>
              </DropdownMenu>
            </Box>
          ) : null}
        </div>
      </div>
      {filters ? (
        <div className={classes.filtersWrapper}>
          <Box
            flexGrow={1}
            flexBasis="50%">
            <Button
              title="Выбрать начальную дату"
              onClick={openStartDatePicker}
              disableRipple
              className={classes.datePickerButtonMobile}
              variant="outlined"
              startIcon={<CalendarIcon />}>
              <Text
                weight={300}
                size={14}
                noWrap
                color={text.primary}>
                {getTimeString(startDate)}
              </Text>
            </Button>
          </Box>
          <Box
            flexGrow={1}
            flexBasis="50%">
            <Button
              title="Выбрать конечную дату"
              onClick={openEndDatePicker}
              disableRipple
              className={classes.datePickerButtonMobile}
              variant="outlined"
              startIcon={<CalendarIcon />}>
              <Text
                noWrap
                weight={300}
                size={14}
                color={text.primary}>
                {getTimeString(endDate)}
              </Text>
            </Button>
          </Box>
          <Box flexGrow={1}>
            <Box
              className={classes.searchWrapper}>
              <TextField
                placeholder="Поиск..."
                variant="outlined"
                onChange={onSearch}
                value={searchText}
                className={classes.searchInputMobile}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchText ? (
                    <InputAdornment position="end">
                      <IconButton
                        title="Очистить поиск"
                        onClick={onClear}
                        size="small"
                        className={classnames(classes.clearSearchButtonMobile, {
                          [classes.clearSearchButtonActive]: searchText,
                        })}>
                        <CloseIcon htmlColor={colorTheme.BLUE.main} />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }} />
              {searchLoad ? (
                <Box className={classes.searchLoader}>
                  <CircularProgress
                    thickness={1}
                    color="secondary"
                    size={28} />
                </Box>
              ) : null}
            </Box>
          </Box>
        </div>
      ) : null}
      <Modal
        open={openCard}
        onClose={closeInspectionCard}>
        <AddInspectionCard
          updateAudits={updateAudits}
          onClose={closeInspectionCard} />
      </Modal>
      <DateModal
        maxDate={endDate}
        dateForRange={endDate}
        date={startDate}
        format="YYYY-MM-DD"
        onSelect={onSelectDate}
        dismiss={closeStartDatePicker}
        open={startDatePicker} />
      <DateModal
        disableFuture
        minDate={startDate}
        dateForRange={startDate}
        date={endDate}
        format="YYYY-MM-DD"
        onSelect={onSelectDate}
        dismiss={closeEndDatePicker}
        open={endDatePicker} />
    </div>
  );
}

Header.propTypes = {
  updateAudits: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  routeParams: PropTypes.any,
  searchLoad: PropTypes.bool,
  searchText: PropTypes.string,
};

export default memo(Header);
