import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  TextField,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/selector';

/**
 * CustomSelect component renders a searchable dropdown list with selectable options.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.options - The list of options to display in the dropdown.
 * @param {string} props.searchQuery - The search query to filter options.
 * @param {Function} props.setSearchQuery - Function to update the search query state.
 * @param {boolean} props.isLoading - If true, shows loading skeletons instead of the list.
 * @param {Array} props.selectedOption - The currently selected options.
 * @param {Function} props.handleSelection - Callback function to handle option selection.
 * @param {boolean} props.toggleDropDown - Controls the visibility of the dropdown list.
 * @param {Function} props.setToggleDropDown - Function to toggle the dropdown open/close state.
 * @param {string} props.placeholder - Placeholder text for the search input.
 *
 * @returns {JSX.Element} The rendered CustomSelect component.
 */
const CustomSelect = ({
  options,
  setSearchQuery,
  searchQuery,
  isLoading,
  selectedOption,
  toggleDropDown,
  setToggleDropDown,
  handleSelection,
  placeholder,
}) => {
  const customization = useSelector(selectCurrentMode);

  const theme = useTheme();
  const handleToggleDropDown = () => {
    setToggleDropDown(!toggleDropDown);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          marginBottom: theme.spacing(1),
          width: '100%',
        }}
      >
        <TextField
          placeholder={placeholder}
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          fullWidth
        />
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: customization.mode == 'dark' ? 'secondary.dark' : theme.palette.grey[400],
          }}
          onClick={() => handleToggleDropDown()}
        >
          {!toggleDropDown ? <MdArrowDropDown size={32} /> : <MdArrowDropUp size={32} />}
        </Box>
      </Box>
      {(toggleDropDown || searchQuery) && (
        <>
          {isLoading ? (
            <Box sx={{ width: '100%' }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : (
            <List
              dense
              sx={{
                width: '100%',
                backgroundColor: '#ebebeb',
                borderRadius: theme.spacing(1),
                maxHeight: theme.spacing(15),
                border: '1px solid #b6b6b6',
                padding: theme.spacing(1),
                overflowY: 'scroll',
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#e9e9e9',
                  display: 'none',
                  borderRadius: '10px',
                },
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',

                '&::-webkit-scrollbar': {
                  width: '0.2em',
                },
              }}
            >
              {options?.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem
                    key={value._id}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={(e) => handleSelection(value, e.target.checked)}
                        inputProps={{ 'aria-labelledby': labelId }}
                        checked={selectedOption?.find((opt) => opt._id === value._id)}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText id={labelId} primary={value.groupName} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          )}
        </>
      )}
    </Box>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  setSelectedOption: PropTypes.func,
  selectedOption: PropTypes.array,
  toggleDropDown: PropTypes.bool,
  setToggleDropDown: PropTypes.func,
  handleSelection: PropTypes.func,
  placeholder: PropTypes.string,
};

export default CustomSelect;
