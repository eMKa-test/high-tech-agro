import {memo} from "react";
import * as PropTypes from "prop-types";
import {Box, Grid, LinearProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import StepSuccessIcon from "../icons/step-success";
import StepNextIcon from "../icons/step-next";
import StepUnactiveIcon from "../icons/step-unactive";
import Text from "../inputs/Text";
import styles from "./styles";

function renderStepsIcon(count, index) {
  if (index <= count) {
    return <StepSuccessIcon />;
  }
  if (index === count + 1) {
    return <StepNextIcon />;
  }
  return <StepUnactiveIcon />;

}

const useStyles = makeStyles(styles);

function StepperStatus(props) {
  const {activeStep, headerSteps} = props;
  const classes = useStyles();

  return headerSteps.map((item, index) => (
    <Grid
      key={item.label}
      item
      xs={6}
      className={classes.step}>
      <LinearProgress
        className={classes.progressBaseStyle}
        variant="determinate"
        value={activeStep >= index ? 100 : 0} />
      <Box className={classes.stepBody}>
        <span className={classes.stepperIcon}>
          {renderStepsIcon(activeStep, index)}
        </span>
        <Text
          color="#494F5A"
          size={12}
          weight={500}
          lineHeight="16px"
          className={classes.stepperLabel}>
          {item.label}
        </Text>
      </Box>
    </Grid>
  ));
}

StepperStatus.propTypes = {
  activeStep: PropTypes.number,
  headerSteps: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
};

export default memo(StepperStatus);
