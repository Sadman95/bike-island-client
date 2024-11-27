import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';

const Drawer = ({ anchor = 'left', children = null, trigger }) => {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {children}
        </Box>
    );

    return (
        <Fragment key={anchor}>
            {trigger && trigger({ onClick: toggleDrawer(anchor, true) })}
            <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
                {list(anchor)}
            </SwipeableDrawer>
        </Fragment>
    );
};

Drawer.propTypes = {
    anchor: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    children: PropTypes.node,
    trigger: PropTypes.func.isRequired
};

export default Drawer;
