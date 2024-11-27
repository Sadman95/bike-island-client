// assets
import { TbDashboard, TbUsersGroup, TbBrandCampaignmonitor, TbMessageChatbot } from 'react-icons/tb';

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
            id: 'groups',
            title: 'Groups',
            type: 'item',
            url: '/groups',
            icon: icons.TbUsersGroup,
            breadcrumbs: false
        },
        {
            id: 'campaigns',
            title: 'Campaigns',
            type: 'item',
            url: '/campaigns',
            icon: icons.TbBrandCampaignmonitor,
            breadcrumbs: false
        },
        {
            id: 'chat',
            title: 'Chat',
            type: 'item',
            url: '/chat',
            icon: icons.TbMessageChatbot,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
