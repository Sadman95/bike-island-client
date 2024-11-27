// Add this function outside the component
export const getFontSize = (theme) => {
  if (theme.breakpoints.up('sm')) return '2rem';
  if (theme.breakpoints.up('md')) return '4rem';
  return '1rem';
};
