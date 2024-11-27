import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PropTypes from 'prop-types';

/**
 * CustomDatePicker component to render a date picker with Day.js adapter.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string|React.ReactNode} [props.label=null] - The label displayed alongside the DatePicker.
 * @param {Function} [props.onChange=() => undefined] - Callback function when the date changes.
 * @param {Date|null} [props.defaultValue=null] - The default value for the date picker.
 *
 * @returns {JSX.Element} The rendered CustomDatePicker component.
 */
const CustomDatePicker = ({ defaultValue = null, label = null, onChange = () => undefined }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'MobileDatePicker', 'DesktopDatePicker', 'StaticDatePicker']}>
                <DemoItem label={label}>
                    <DatePicker onChange={onChange} defaultValue={defaultValue} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
};

CustomDatePicker.propTypes = {
    label: PropTypes.node,
    onChange: PropTypes.func,
    defaultValue: PropTypes.instanceOf(Date)
};

export default CustomDatePicker;
