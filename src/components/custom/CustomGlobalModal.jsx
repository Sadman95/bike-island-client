import { Modal } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * CustomGlobalModal component renders a global modal using Material-UI's Modal.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} [props.open=false] - Controls the visibility of the modal (open or closed).
 * @param {Function} [props.handleClose=() => undefined] - Callback function to handle modal close events.
 * @param {React.ReactNode} [props.children=null] - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} The rendered CustomGlobalModal component.
 */
const CustomGlobalModal = ({ open = false, handleClose = () => undefined, children = null }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {children}
            </Modal>
        </div>
    );
};

CustomGlobalModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.node
};

export default CustomGlobalModal;
