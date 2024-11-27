import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
import useMediaQuery from '@mui/material/useMediaQuery';

// third party
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { Divider } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import agent1 from 'api/agent1';
import toast from 'react-hot-toast';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import { decrypt } from 'utils/decrypt';

// ===========================|| AUTH - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const customization = useSelector((state) => state.customization);

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

  // sign-up mutation
  const { mutate: regMutation, isPending } = useMutation({
    mutationFn: agent1.Authentication.SignUp,
    onSuccess: (res) => {
      const { message, links, data } = res.data;
      toast.success(message, {
        position: 'top-center',
      });
      navigate(links.verify, {
        replace: true,
        state: {
          email: data.email,
          otp: data.otp,
        },
      });
    },
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'top-right' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

  const css = `
        .hover\\:text-underline:hover {
            text-decoration: underline;
        }
  
        label{
            color: ${theme.palette.text.disabled};
        }

  `;

  return (
    <>
      <style>{css}</style>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}></Grid>

        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography
              color={
                customization.mode == 'light' ? theme.palette.grey[900] : theme.palette.grey[100]
              }
              variant="subtitle1"
            >
              Sign up with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        })}
        onSubmit={(v) =>
          regMutation({
            firstName: v.firstName,
            lastName: v.lastName,
            email: v.email,
            password: v.password,
            confirmPassword: v.confirmPassword,
          })
        }
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            {...others}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={matchDownSM ? 12 : 6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.firstName && errors.firstName)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-firstName-register">
                    First Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-firstName-register"
                    type="firstName"
                    value={values.firstName}
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.firstName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={matchDownSM ? 12 : 6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.lastName && errors.lastName)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-lastName-register">Last Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-lastName-register"
                    type="lastName"
                    value={values.lastName}
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.lastName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
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
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword-register"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
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
                      <Typography
                        color={
                          customization.mode == 'light'
                            ? theme.palette.grey[900]
                            : theme.palette.grey[100]
                        }
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
                    <Typography
                      variant="subtitle1"
                      color={
                        customization.mode == 'light'
                          ? theme.palette.grey[900]
                          : theme.palette.grey[100]
                      }
                    >
                      Agree with &nbsp;
                      <Typography
                        variant="subtitle1"
                        component={Link}
                        to="/terms-conditions"
                        color={
                          customization.mode == 'light'
                            ? theme.palette.grey[900]
                            : theme.palette.grey[100]
                        }
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
              <Button
                disableElevation
                disabled={isPending || !checked}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                {isPending ? <GradientCircularProgress /> : 'Sign up'}
              </Button>
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
            sx={{ textDecoration: 'none' }}
            color={
              customization.mode == 'light' ? theme.palette.grey[900] : theme.palette.grey[100]
            }
          >
            Already have an account?
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthRegister;
