// assets
import { TbBrandCampaignmonitor, TbDashboard, TbMessageChatbot, TbUsersGroup } from 'react-icons/tb';

// constant
const icons = { TbDashboard, TbUsersGroup, TbBrandCampaignmonitor, TbMessageChatbot };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'root',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: '',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.TbDashboard,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.TbBrandCampaignmonitor,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
