import {memo} from "react";
import * as PropTypes from "prop-types";
import {Pagination, PaginationItem} from "@material-ui/lab";
import {makeStyles} from "@material-ui/styles";
import {Button} from "@material-ui/core";
import styles from "./styles";
import Text from "../inputs/Text";
import PaginationLeftActiveIcon from "../icons/paginationLeftActive";
import PaginationLeftUnActiveIcon from "../icons/paginationLeftUnActive";
import PaginationRightActiveIcon from "../icons/paginationRightActive";
import PaginationRightUnActiveIcon from "../icons/paginationRightUnActive";

const useStyles = makeStyles(styles);

function PaginationRow(props) {
  const {
    restItems, pages, count, onChangePage = () => null, page, title = "", limit,
  } = props;
  const classes = useStyles();
  if (pages === 0) {
    return null;
  }

  const titlePagination = `${title} от ${restItems + 1 || 1} до ${page * limit}, всего ${count}`;

  return (
    <div className={classes.paginationRoot}>
      <Text
        size={16}
        weight={700}>
        {titlePagination}
      </Text>
      <Pagination
        siblingCount={0}
        className={classes.paginationStyle}
        shape="rounded"
        page={page}
        onChange={onChangePage}
        count={pages}
        renderItem={(item) => {
          if (item.type === "previous") {
            const {disabled} = item;
            return (
              <Button
                disableRipple
                {...item}
                color="inherit">
                {disabled ? <PaginationLeftUnActiveIcon /> : <PaginationLeftActiveIcon />}
              </Button>
            );
          }
          if (item.type === "next") {
            const {disabled} = item;
            return (
              <Button
                disableRipple
                {...item}
                color="inherit">
                {disabled ? <PaginationRightUnActiveIcon /> : <PaginationRightActiveIcon />}
              </Button>
            );
          }
          return (
            <PaginationItem
              {...item} />
          );
        }} />
    </div>
  );
}

PaginationRow.propTypes = {
  onChangePage: PropTypes.func,
  pages: PropTypes.number,
  page: PropTypes.number,
  count: PropTypes.number,
  limit: PropTypes.number,
  restItems: PropTypes.number,
  title: PropTypes.string,
};

export default memo(PaginationRow);
