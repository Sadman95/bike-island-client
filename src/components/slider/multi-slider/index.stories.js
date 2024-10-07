import MultiSlider from './index';

export default {
  title: 'Components/MultiSlider',
  component: MultiSlider,
  tags: ['autodocs'],
  argTypes: {
    itemsPerSlide: { control: 'number' },
    initialStep: { control: 'number' },
    stepDuration: { control: 'number' },
    autoChange: { control: 'boolean' },
    swipeable: { control: 'boolean' },
  },
};

export const Default = {
  itemsPerSlide: 3,
  initialStep: 0,
  stepDuration: 5000,
  autoChange: false,
  swipeable: false,
};

export const AutoChange = {
  itemsPerSlide: 3,
  initialStep: 0,
  stepDuration: 5000,
  autoChange: true,
  swipeable: false,
};

export const FourItemsPerSlide = {
  itemsPerSlide: 4,
  initialStep: 0,
  stepDuration: 5000,
  autoChange: false,
  swipeable: false,
};

export const FastAutoChange = {
  itemsPerSlide: 3,
  initialStep: 0,
  stepDuration: 2000,
  autoChange: true,
  swipeable: false,
};
