import StepperSlider from './index';

export default {
  title: 'Components/StepperSlider',
  component: StepperSlider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const CustomInitialStep = {
  args: {
    initialStep: 2,
  },
};

export const CustomStepDuration = {
  args: {
    stepDuration: 10000,
    autoChange: {},
  },
};

export const DisabledAutoChange = {
  args: {
    autoChange: false,
  },
};
