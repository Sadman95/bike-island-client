import { IconButton, InputAdornment, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import { useChangePassword } from 'api/hooks';
import CustomField from 'components/custom/CustomField';
import EmailVerification from 'components/email-verification';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoClose, IoSave } from 'react-icons/io5';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { connect, useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import * as Yup from 'yup';

/**
 * =============================
 * Settings - settings view
 * =============================
 */
const Settings = ({ currentUser, ...others }) => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);

  const initialViewState = {
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  };

  const [showPasswords, setShowPasswords] = useState({ ...initialViewState });

  const customization = useSelector((state) => state.customization);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  // change password api call
  const { mutate: changePasswordMutation, isPending } = useChangePassword();

  const css = `
  .hover\\:text-underline:hover {
  text-decoration: underline;
}

  `;

  return (
    <>
      <style>{css}</style>
      <Grid container direction="column">
        {editMode ? (
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={Yup.object().shape({
              oldPassword: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
              newPassword: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
                .test(
                  'passwords-match',
                  'New password must be different from old password',
                  function (value) {
                    return value !== this.parent.oldPassword;
                  },
                ),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Password must match')
                .required('Confirm password is required'),
            })}
            onSubmit={(values, { resetForm }) => {
              changePasswordMutation(
                {
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,
                },
                {
                  onSuccess: () => {
                    setEditMode(!editMode);
                    resetForm();
                  },
                },
              );
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              dirty,
              isValid,
            }) => (
              <form noValidate onSubmit={handleSubmit} {...others}>
                <Grid container mt={2} spacing={2}>
                  <Grid item xs={12} container alignItems="center" justifyContent="end">
                    <IconButton
                      onClick={() => setEditMode(false)}
                      color={customization.mode == 'light' ? 'secondary' : 'primary'}
                    >
                      <IoClose size={24} />
                    </IconButton>
                    {isPending ? (
                      <GradientCircularProgress size={20} />
                    ) : (
                      <IconButton
                        disabled={!(isValid && dirty)}
                        type="submit"
                        color={customization.mode == 'light' ? 'secondary' : 'primary'}
                        sx={{
                          '&:disabled': {
                            color: customization.mode == 'light' ? 'secondary' : 'grey.100',
                            cursor: 'not-allowed',
                          },
                        }}
                      >
                        <IoSave size={24} />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                      sx={{ ...theme.typography.customInput }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-oldPassword-register">
                        Old Password
                      </InputLabel>
                      <OutlinedInput
                        label="Old Password"
                        id="outlined-adornment-oldPassword-register"
                        type={showPasswords.showOldPassword ? 'text' : 'password'}
                        value={values.oldPassword}
                        name="oldPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  showOldPassword: !showPasswords.showOldPassword,
                                })
                              }
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPasswords.showOldPassword ? (
                                <MdVisibility />
                              ) : (
                                <MdVisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        inputProps={{}}
                      />
                      {touched.oldPassword && errors.oldPassword && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-confirmPassword-register"
                        >
                          {errors.oldPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-newPassword-register">
                        New Password
                      </InputLabel>
                      <OutlinedInput
                        label="New Password"
                        id="outlined-adornment-newPassword-register"
                        type={showPasswords.showNewPassword ? 'text' : 'password'}
                        value={values.newPassword}
                        name="newPassword"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changePassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  showNewPassword: !showPasswords.showNewPassword,
                                })
                              }
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPasswords.showNewPassword ? (
                                <MdVisibility />
                              ) : (
                                <MdVisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        inputProps={{}}
                      />
                      {touched.newPassword && errors.newPassword && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-confirmPassword-register"
                        >
                          {errors.newPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                    {strength !== 0 && (
                      <FormControl fullWidth>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Box
                                style={{ backgroundColor: level?.color }}
                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography
                                color={level?.color}
                                variant="subtitle1"
                                fontSize="0.75rem"
                              >
                                {level?.label}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-confirmPassword-register">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-confirmPassword-register"
                        type={showPasswords.showConfirmPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        label="Confirm Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPasswords({
                                  ...showPasswords,
                                  showConfirmPassword: !showPasswords.showConfirmPassword,
                                })
                              }
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPasswords.showConfirmPassword ? (
                                <MdVisibility />
                              ) : (
                                <MdVisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        inputProps={{}}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-confirmPassword-register"
                        >
                          {errors.confirmPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
              </form>
            )}
          </Formik>
        ) : (
          <Grid container>
            <Grid item xs={12} container alignItems="center" justifyContent="end">
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={() => setEditMode(true)}
                  color={customization.mode == 'light' ? 'secondary' : 'primary'}
                >
                  <FiEdit size={24} />
                </IconButton>
              </Box>
            </Grid>
            <Grid xs={12}>
              <CustomField label="Password" value={'********'} />
              {!currentUser?.isVerified && (
                <CustomField label="Verify your email">
                  <EmailVerification />
                </CustomField>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

Settings.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Settings);
