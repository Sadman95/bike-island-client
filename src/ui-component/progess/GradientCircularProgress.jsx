import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

export const GradientCircularProgress = ({ height = 0, width = 0, size = 16 }) => {
    return (
        <>
            <svg width={width} height={height}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress size={size} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </>
    );
};

GradientCircularProgress.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    size: PropTypes.number
};
