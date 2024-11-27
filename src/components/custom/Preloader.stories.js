// // Preloader.stories.js

import Preloader from './Preloader

export default {
  title: 'Components/Preloader',
  component: Preloader,
  argTypes: {
    size: { control: { type: 'number', min: 10, max: 200, step: 10 } },
    color: { control: 'color' },
  },
};

export const Default = {
  args: {
    size: 50,
    color: '#4A90E2',
  },
};

export const Large = {
  args: {
    size: 100,
    color: '#FF5722',
  },
};

export const Small = {
  args: {
    size: 30,
    color: '#4CAF50',
  },
};
