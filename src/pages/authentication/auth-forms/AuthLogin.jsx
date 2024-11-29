import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third party
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// project imports

// assets
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { Alert, CircularProgress } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import agent1 from 'api/agent1';
import Google from 'assets/images/icons/social-google.svg';
import { validateJwt } from 'helpers/jwtHelper';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from 'redux/auth.reducer';
import { selectCurrentMode } from 'redux/selector';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import ForgotPassword from './ForgotPassword';

// ============================|| AUTH - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector(selectCurrentMode);
  const [checked, setChecked] = useState(false);
  const [demoCredentials, setDemoCredentials] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect_uri = location.state?.from || '/';
  const payload = location.state?.payload || null;

  // google login mutation
  const { mutate: googleLoginMutation, isPending: isGoogleLoading } = useMutation({
    mutationFn: (res) => agent1.Authentication.GoogleLogin({ code: res.code, rememberMe: checked }),
    onSuccess: (res) => {
      const { message, data } = res.data;
      const user = validateJwt(data.token);
      dispatch(login({ token: data.token, ...user }));
      toast.success(message, {
        position: 'top-center',
      });
      navigate(redirect_uri, {
        state: {
          cartItem: payload,
        },
      });
    },
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            toast.error(message, { position: 'bottom-center' });
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

  const googleHandler = useGoogleLogin({
    onSuccess: (response) => googleLoginMutation({ code: response.code }),
    onError: (error) => {
      throw new Error(error.error, {
        cause: error.error_description,
      });
    },
    flow: 'auth-code',
  });

  // login with credentials mutation
  const { mutate: loginMutation, isPending: isLoginLoading } = useMutation({
    mutationFn: (data) => agent1.Authentication.Login(data),
    onSuccess: (res) => {
      const { message, data } = res.data;

      const user = validateJwt(data.token);

      dispatch(login({ token: data.token, ...user }));

      toast.success(message, {
        position: 'top-center',
      });
      navigate(redirect_uri, {
        replace: true,
      });
    },
    onError: (error) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }) =>
          setTimeout(() => {
            setErrorMessages((prev) => [...prev, message]);
          }, 500),
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-center' });
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleDemoLogin = (type) => {
    if (type === 'user') {
      setDemoCredentials({
        email: 'user@bi.com',
        password: 'user',
      });
    } else if (type === 'admin') {
      setDemoCredentials({
        email: 'admin@bi.com',
        password: 'admin',
      });
    }
  };

  const css = `
  .hover\\:text-underline:hover{
    text-decoration: underline;
  }
  label {
    color: ${theme.palette.text.disabled};
  }
  `;

  return (
    <>
      <style>{css}</style>

      {forgotPassword ? (
        <ForgotPassword />
      ) : (
        <>
          <Grid container direction="column" justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Button
                disableElevation
                fullWidth
                onClick={googleHandler}
                size="large"
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.grey[50],
                  borderColor: theme.palette.grey[300],
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '& > p': {
                      color:
                        customization.mode == 'light'
                          ? theme.palette.primary.main
                          : theme.palette.grey[100],
                    },
                  },
                }}
              >
                {isGoogleLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Box
                      sx={{
                        mr: {
                          xs: 1,
                          sm: 2,
                          width: 20,
                        },
                      }}
                    >
                      <img
                        src={Google}
                        alt="google"
                        width={16}
                        height={16}
                        style={{ marginRight: matchDownSM ? 8 : 16 }}
                      />
                    </Box>
                    <Typography color={theme.palette.common.black}>Sign in with Google</Typography>
                  </>
                )}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                <Button
                  variant="outlined"
                  sx={{
                    cursor: 'unset',
                    m: 2,
                    py: 0.5,
                    px: 7,
                    borderColor: `${customization.mode == 'light' ? theme.palette.grey[100] : theme.palette.grey[900]} !important`,
                    color: `${customization.mode == 'light' ? theme.palette.grey[900] : theme.palette.grey[100]} !important`,
                    fontWeight: 500,
                    borderRadius: `${customization.borderRadius}px`,
                  }}
                  disableRipple
                  disabled
                >
                  OR
                </Button>

                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
              </Box>
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="center">
              <Box sx={{ mb: 2 }}>
                <Typography
                  color={
                    customization.mode == 'light'
                      ? theme.palette.grey[900]
                      : theme.palette.grey[100]
                  }
                  variant="subtitle1"
                >
                  Sign in with Email address
                </Typography>
              </Box>
              {errorMessages.length > 0 && (
                <Stack width={'100%'} direction={'column'} spacing={1} mb={2}>
                  {errorMessages.map((msg, i) => (
                    <Alert
                      onClose={() =>
                        setErrorMessages(errorMessages.filter((_v, indx, _arr) => indx !== i))
                      }
                      key={i}
                      severity="error"
                    >
                      <span dangerouslySetInnerHTML={{ __html: msg }} />
                    </Alert>
                  ))}
                </Stack>
              )}
            </Grid>
          </Grid>

          <Stack container spacing={1} mb={4}>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              color="warning"
              onClick={() => handleDemoLogin('user')}
            >
              Login as Demo User
            </Button>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              color="secondary"
              onClick={() => handleDemoLogin('admin')}
            >
              Login as Demo Admin
            </Button>
          </Stack>

          <Formik
            initialValues={{
              email: demoCredentials?.email || '',
              password: demoCredentials?.password || '',
              rememberMe: checked,
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Invalid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const submitData = { ...values, rememberMe: checked };

              loginMutation(submitData);
              setSubmitting(false);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                {...others}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <FormControl
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    '& .MuiOutlinedInput-root': {
                      bgcolor:
                        customization.mode == 'light'
                          ? theme.palette.grey[50]
                          : theme.palette.grey[700],
                    },
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    label="Email Address"
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    '& .MuiOutlinedInput-root': {
                      bgcolor:
                        customization.mode == 'light'
                          ? theme.palette.grey[50]
                          : theme.palette.grey[700],
                    },
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    placeholder="Enter password"
                    label="Password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="rememberMe"
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    sx={{
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => setForgotPassword(true)}
                    className="hover:text-underline"
                  >
                    Forgot Password?
                  </Typography>
                </Stack>

                {isLoginLoading ? (
                  <GradientCircularProgress style={{ width: '100%', marginBottom: '1rem' }} />
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Sign in
                    </Button>
                  </Box>
                )}
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default AuthLogin;
