import * as React from 'react';

import styled from '@emotion/styled';

const StyledSvg = styled.svg`
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  fill: ${props => props.fill || 'currentColor'};
  stroke: ${props => props.stroke || 'none'};
  stroke-width: ${props => props.strokeWidth || '0'};
`;

const Visa = ({ width, height, fill, stroke, strokeWidth, ...props }) => (
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={width}
    height={height}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    style={{
      enableBackground: 'new 0 0 24 24',
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M23.11 4.433H.89a.89.89 0 0 0-.89.891v13.353a.89.89 0 0 0 .89.891h22.22a.89.89 0 0 0 .89-.891V5.324a.89.89 0 0 0-.89-.891zM4.708 15.187l-1.313-5.085c-.081-.314-.15-.428-.392-.561-.397-.214-1.05-.415-1.627-.541l.04-.185H4.22c.357 0 .679.238.76.65l.694 3.688L7.39 8.815h1.732l-2.67 6.372H4.708zm3.757 0 1.364-6.372h1.649l-1.364 6.372H8.465zm4.614.101c-.737-.009-1.449-.162-1.834-.339l.298-1.397c.384.179.865.416 1.694.403.474-.008.982-.195.986-.623.002-.28-.212-.48-.855-.792-.625-.305-1.454-.817-1.443-1.734.01-1.24 1.157-2.106 2.786-2.106.634 0 1.145.138 1.542.282l-.289 1.351c-.738-.339-1.389-.316-1.626-.284-.476.061-.694.304-.699.534-.017.752 2.317.844 2.309 2.525-.004 1.323-1.137 2.18-2.869 2.18zm7.173-.101-.199-.952h-2.115l-.343.952h-1.73l2.472-5.905a.75.75 0 0 1 .701-.467h1.407l1.331 6.372h-1.524zm-1.84-2.258h1.367l-.499-2.393-.868 2.393z" />
  </StyledSvg>
);



export default Visa;
