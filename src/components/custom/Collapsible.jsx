import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const Collapsible = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <>
      {children.length < 80 ? (
        <Typography mb="24px" variant="p" component="div" fontWeight="medium" color="GrayText">
          {children}
        </Typography>
      ) : (
        <Box sx={{ position: 'relative', maxWidth: '500px' }}>
          {/* Static content */}
          <Typography
            variant="body1"
            fontWeight="medium"
            color="GrayText"
            component="div"
            sx={{
              maxHeight: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {children.slice(0, 80)}
            {/* Limit initial displayed text */}
          </Typography>

          {/* Additional content that expands */}
          <Box
            sx={{
              maxHeight: expanded ? '300px' : '0px', // Set height when expanded or collapsed
              overflow: 'hidden',
              transition: 'max-height 0.6s ease', // Smooth transition
            }}
          >
            <Typography variant="body1" color="GrayText" component="div">
              {children.slice(80)} {/* Remaining content to expand */}
            </Typography>
          </Box>

          {/* Ellipsis button to toggle expansion */}
          {!expanded ? (
            <Box
              onClick={toggleExpand}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'linear-gradient(to right, transparent, white 70%)',
                padding: '0 8px',
                cursor: 'pointer',
              }}
            >
              <ExpandMore />
            </Box>
          ) : (
            <ExpandLess onClick={toggleExpand} />
          )}
        </Box>
      )}
    </>
  );
};

export default Collapsible;
