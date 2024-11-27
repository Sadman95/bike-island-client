import { Chip, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaAsterisk } from 'react-icons/fa';

/**
 * CustomField component displays a labeled field with optional content and
 * a hide/show toggle for sensitive information such as passwords or tokens.
 * It can also render additional children components below the value.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.label] - The label of the field, displayed above the value.
 * @param {string} [props.value] - The value of the field, which can be hidden or shown.
 * @param {Object} [props.styles] - Optional styles to be applied to the Grid container.
 * @param {React.ReactNode} [props.children] - Optional child components to render below the value.
 * @param {boolean} [props.hidden=false] - Whether the value should be hidden by default.
 *                                         When true, the value is replaced with asterisks,
 *                                         and a chip is rendered to toggle between show/hide.
 *
 * @example
 * <CustomField
 *   label="API Token"
 *   value="abc123"
 *   hidden={true}
 * />
 *
 * @returns {JSX.Element} A UI component displaying a label, a value (optionally hidden), and optional child elements.
 */
const CustomField = ({
  label = '',
  value = '',
  children = null,
  styles = null,
  hidden = false,
}) => {
  const [isHide, setIsHide] = useState(hidden);

  return (
    <Grid marginY={6} sx={styles}>
      <Grid item xs={12}>
        {label && (
          <Typography fontSize={24} fontWeight={'bold'} marginBottom={1}>
            {label}
          </Typography>
        )}

        {value && (
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Typography fontSize={16} fontWeight={'medium'}>
              {isHide ? (
                <>
                  {Array.from({ length: value.length }).map((_, index) => (
                    <span key={index}>
                      <FaAsterisk size={10} style={{ marginRight: 2 }} />
                    </span>
                  ))}
                </>
              ) : (
                value
              )}
            </Typography>
            {hidden && (
              <Chip
                size="small"
                label={isHide ? 'Show' : 'Hide'}
                variant="outlined"
                onClick={() => setIsHide(!isHide)}
              />
            )}
          </Stack>
        )}
      </Grid>
      {children}
    </Grid>
  );
};
CustomField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  styles: PropTypes.object,
  children: PropTypes.node,
  hidden: PropTypes.bool,
};

export default CustomField;
