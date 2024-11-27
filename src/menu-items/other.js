// assets
import { TbBrandChrome, TbHelp } from 'react-icons/tb';

// constant
const icons = { TbBrandChrome, TbHelp };

// ==============================|| DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'documentation',
      title: 'Documentation',
      url: '/documentation',
      type: 'item',
      icon: icons.TbHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
