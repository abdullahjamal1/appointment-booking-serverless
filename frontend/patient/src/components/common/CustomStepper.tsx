import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CustomStepper({
  steps,
}: {
  steps: { label: string; component: JSX.Element, optional?: Boolean,
  submitButtonLabel?: string,
  onSubmit?: Function
  }[];
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {

    if(steps[activeStep].onSubmit){

      //@ts-ignore
      steps[activeStep].onSubmit();
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      
      <Stepper sx={{width: '50%'}} activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (step.optional) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? 
      (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (

        <div style={{padding: 60}}>
        

            <div style={{width: '100%'}}>
           { steps[activeStep].component }
            </div>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>

            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {/* <Box sx={{ flex: "1 1 auto" }} /> */}
            {steps[activeStep].optional && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button variant='contained' onClick={handleNext}>
              {activeStep === steps.length - 1 ?
               (steps[activeStep].submitButtonLabel ?
                steps[activeStep].submitButtonLabel :
                 "Finish")
                :
                 "Continue"}
            </Button>
          </Box>

        </div>

      )}
    </Box>
  );
}
