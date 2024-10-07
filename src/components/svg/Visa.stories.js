import Visa from './Visa';

export default {
  title: 'Components/SVG/Visa',
  component: Visa,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    fill: { control: 'color' },
    stroke: { control: 'color' },
    strokeWidth: { control: 'number' },
  },
};

export const Default = {
  args:{
    width:100,
    height:100,
    fill:'#000000',
    stroke:'#e50c0c',
    strokeWidth:0,
  },
};

export const CustomSize = {
  args: {
    width: 256,
    height: 256,
  },
};

export const CustomColor = {
  args: {
    width: 512,
    height: 512,
    fill: '#1a1a1a',
    stroke: '#1a1a1a',
  },
};

export const SmallSize = {
  args: {
    width: 24,
    height: 24,
    fill: '#1a1a1a',
    stroke: '#1a1a1a',
  },
};
