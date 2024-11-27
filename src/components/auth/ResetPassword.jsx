import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { Divider } from '@mui/material';
import { useResetPassword } from 'api/hooks';
import { HiExternalLink } from 'react-icons/hi';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';

/**
 * @summary Reset password
 * @returns {import('react').ReactNode}
 */
const ResetPassword = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const customization = useSelector((state) => state.customization);
  const [searchParams] = useSearchParams();

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

  useEffect(() => {
    if (!searchParams.get('token')) {
      navigate('/auth/login', {
        replace: true,
      });
    }
  }, [searchParams]);

  // reset password api call
  const { mutate, isPending, isSuccess, data } = useResetPassword();

  useEffect(() => {
    if (isSuccess && data) {
      navigate(data.data.links.login, {
        replace: true,
      });
    }
  }, [isSuccess, data]);

  const css = `
  .hover\\:text-underline:hover {
  text-decoration: underline;
}
  
    label{
    color: ${theme.palette.text.disabled}
}

  `;

  return (
    <>
      <style>{css}</style>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}></Grid>

        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography color="textSecondary" variant="subtitle1">
              Reset Your Password
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        })}
        onSubmit={(v) =>
          mutate({
            password: v.password,
            confirmPassword: v.confirmPassword,
            token: searchParams.get('token'),
          })
        }
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-register">New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="New Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-confirmPassword-register">
                Re-enter Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword-register"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                name="confirmPassword"
                label="Re-enter Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text-confirmPassword-register">
                  {errors.confirmPassword}
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
                      <Typography color="textDisabled" variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1" color="textSecondary">
                      Agree with &nbsp;
                      <Typography
                        variant="subtitle1"
                        component={Link}
                        to="/terms-conditions"
                        color={theme.palette.grey[900]}
                      >
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isPending || !checked}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {isPending ? <GradientCircularProgress /> : 'Submit'}
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}
      </Formik>
      <Grid item xs={12}>
        <Box margin={1} />
        <Divider />
        <Box margin={1} />
        <Grid item container direction="column" alignItems="center" xs={12}>
          <Typography
            className="hover:text-underline"
            component={Link}
            to="/auth/login"
            variant="subtitle1"
            sx={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            color={customization.mode == 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]}
          >
            {'Login '} <HiExternalLink />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
