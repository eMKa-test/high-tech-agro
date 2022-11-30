import {memo} from "react";
import * as PropTypes from "prop-types";
import PropertyStepper from "./property";
import ContactStepper from "./contact";
import StepperStatus from "./StepperStatus";
import {contactSteps, propertySteps} from "./helpers";

function Steppers({stepperType, closeModal}) {
  if (stepperType === "contacts") {
    return (
      <ContactStepper onClose={closeModal}>
        {(step) => (<StepperStatus
          activeStep={step}
          headerSteps={contactSteps} />)}
      </ContactStepper>
    );
  }
  return (
    <PropertyStepper onClose={closeModal}>
      {(step) => (<StepperStatus
        activeStep={step}
        headerSteps={propertySteps} />)}
    </PropertyStepper>
  );
}

Steppers.propTypes = {
  stepperType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default memo(Steppers);
