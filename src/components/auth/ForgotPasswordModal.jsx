import CustomGlobalModal from 'custom/CustomGlobalModal';
import PropTypes from 'prop-types';

/**
 * @summary Forgot password modal
 * @typedef {Object} Payload
 * @property {boolean} open - Modal toggle state
 * @property {Function} setOpen - Modal state setter
 * @property {Node} children - Children
 * @param {Payload}
 * @returns {import('react').ReactNode}
 */
export default function ForgotPasswordModal({ open, setOpen, children }) {
  const handleClose = () => setOpen(false);

  return (
    <CustomGlobalModal open={open} handleClose={handleClose}>
      {children}
    </CustomGlobalModal>
  );
}

ForgotPasswordModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.node,
};
