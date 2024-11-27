import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * RippleEffect component adds a ripple animation effect to any component upon click.
 * It can wrap around any child element and trigger a ripple effect based on where the user clicks.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The children elements that will trigger the ripple effect when clicked.
 * @param {Function} [props.onClick] - Optional callback function that is executed when the component is clicked.
 * @param {React.ElementType} [props.component="button"] - The component type to render, defaults to 'button'. It can be customized to render any valid HTML or React component.
 * @param {Object} [props.rest] - Additional props to be spread to the root component.
 *
 * @example
 * <RippleEffect component="div" onClick={() => console.log('clicked')}>
 *   Click Me
 * </RippleEffect>
 *
 * @returns {JSX.Element} The rendered RippleEffect component with the ripple animation on click.
 */
const RippleEffect = ({ children, onClick, component: Component = 'button', ...rest }) => {
    const [rippleStyle, setRippleStyle] = React.useState({});

    const handleClick = (event) => {
        const size = Math.max(event.currentTarget.clientWidth, event.currentTarget.clientHeight);
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        setRippleStyle({
            width: `${size}px`,
            height: `${size}px`,
            top: `${y}px`,
            left: `${x}px`
        });

        setTimeout(() => {
            setRippleStyle({});
        }, 600);

        onClick && onClick(event);
    };

    return (
        <Component
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'inherit',
                border: 'none',
                backgroundColor: 'transparent'
            }}
            onClick={handleClick}
            {...rest}
        >
            {children}
            {Object.keys(rippleStyle).length > 0 && (
                <Box
                    sx={{
                        ...rippleStyle,
                        position: 'absolute',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        transform: 'scale(0)',
                        opacity: 1,
                        animation: '$ripple-animation 0.6s linear',
                        '@keyframes ripple-animation': {
                            to: {
                                transform: 'scale(4)',
                                opacity: 0
                            }
                        }
                    }}
                />
            )}
        </Component>
    );
};

RippleEffect.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    component: PropTypes.node,
    rest: PropTypes.object
};

export default RippleEffect;
