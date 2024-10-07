import {
  Box,
  Step,
  StepButton,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { featuredCycles } from '../../../backend/_mockdata';

const ColorlibConnector = styled(StepConnector)(({ theme, orientation }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: orientation === 'vertical' ? 22 : 0,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: orientation === 'vertical' ? 96 : 1,
    width: orientation === 'vertical' ? 1 : 96,
    border: 0,
    margin: orientation === 'vertical' ? '0 10px' : '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[100],
    }),
  },
}));

const StepperSlider = ({
  orientation = 'horizontal',
  autoChange = false,
  initialStep = 0,
  stepDuration = 3000,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = Array.from(
    { length: featuredCycles.length },
    (_, index) => index
  );

  useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep]);

  useEffect(() => {
    if (autoChange) {
      const interval = setInterval(() => {
        setActiveStep((prevStep) => (prevStep + 1) % steps.length);
      }, stepDuration);
      return () => clearInterval(interval);
    }
  }, [autoChange, stepDuration]);

  const handleStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      position="relative"
      overflow="hidden"
    >
      {/* Left side: Cycle display */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="cycle-container"
      >
        <SwitchTransition mode="out-in">
          <CSSTransition key={activeStep} classNames="fade" timeout={500}>
            <img
              width="100%"
              height="600px"
              src={featuredCycles[activeStep].featuredImage}
              alt={featuredCycles[activeStep].category}
              loading="lazy"
            />
          </CSSTransition>
        </SwitchTransition>
      </Box>

      {/* Right side: Vertical stepper */}
      <Box
        sx={{
          padding: 4,
          height: orientation === 'vertical' ? '100%' : 'auto',
          width: orientation === 'horizontal' ? '100%' : 'auto',
          position: 'absolute',
          right: orientation === 'vertical' ? '0' : 'auto',
          bottom: orientation === 'horizontal' ? '0' : 'auto',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          opacity: 0.8,
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation={orientation}
          nonLinear
          connector={<ColorlibConnector orientation={orientation} />}
          sx={{
            width: orientation === 'horizontal' ? '96%' : 'auto',
            overflow: 'hidden',
          }}
        >
          {featuredCycles.map((cycle, index) => (
            <Step key={cycle.id}>
              <StepButton onClick={() => handleStep(index)}>
                <StepLabel
                  StepIconProps={{
                    style: {
                      color: activeStep === index && '#fff',
                      backgroundColor: activeStep === index && '#2196f3',
                      borderRadius: '50%',
                      border: '2px solid #2196f3',
                      width: '30px',
                      height: '30px',
                      fontSize: '24px',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  {cycle.category}
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default StepperSlider;
