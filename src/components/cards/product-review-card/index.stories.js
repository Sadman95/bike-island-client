// stories/ProductReviewCard.stories.js
import ProductReviewCard from './index';

export default {
  title: 'Components/cards/ProductReviewCard',
  component: ProductReviewCard,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
};

export const Default = {
  args: {
    userAvatar: 'N',
    userName: 'Nazmul I.',
    createdAt: '13 Nov 2022',
    comment: `This is an excellent AC/DC light. Received within two days of ordering. 
              Thanks Walton Premier Mart! Still don't know how long it will back up... 
              Hope it doesn't disappoint me. The user experience was satisfactory.`,
    images: [
      'https://via.placeholder.com/60', // Dummy images for preview
      'https://via.placeholder.com/60',
      'https://via.placeholder.com/60',
      'https://via.placeholder.com/60',
      'https://via.placeholder.com/60',
    ],
    likes: 0,
  },
};
