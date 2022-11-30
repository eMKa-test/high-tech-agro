import {memo} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {Box, IconButton} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import PaginationRow from "../Pagination";
import AddIcon from "../icons/add";

const useStyles = makeStyles(styles);

function Pagination(props) {
  const {
    onChangePageMobile,
    onChangePage,
    phone,
    phoneLandscape,
    page,
    count,
    limit,
    pages,
    title,
    loadNextPage,
  } = props;
  const classes = useStyles();
  if (count <= limit) {
    return null;
  }

  if (!phone && !phoneLandscape) {
    return (
      <Box
        className={classes.inspectionsListPaginationWrapper}>
        <PaginationRow
          title={title}
          page={page}
          count={count}
          limit={limit}
          onChangePage={onChangePage}
          restItems={(page - 1) * limit}
          pages={pages} />
      </Box>
    );
  }
  return (

    <Box className={classes.nextPageWrapper}>
      <IconButton
        onClick={onChangePageMobile}
        className={classes.addIcon}>
        <AddIcon />
        {loadNextPage ? (
          <CircularProgress
            size={68}
            className={classes.nextPageLoader} />
        ) : null}
      </IconButton>
    </Box>
  );
}

Pagination.propTypes = {
  onChangePageMobile: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  phone: PropTypes.bool.isRequired,
  phoneLandscape: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  loadNextPage: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default memo(Pagination);
