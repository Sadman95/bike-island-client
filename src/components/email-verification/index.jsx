import { ContentCopyOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import agent1 from 'api/agent1';
import { DateTime } from 'components/core/DateTime';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyUser } from 'redux/auth.reducer';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import * as Yup from 'yup';

const EmailVerification = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerEnded, setIsTimerEnded] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [otpData, setOtpData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.otp && location.state.email) {
      setOtpData({ email: location.state.email, otp: location.state.otp });
    }
  }, [location.state]);

  // Mutation for getting OTP
  const { mutate: getOtpMutation, isPending } = useMutation({
    mutationFn: (data) => agent1.Authentication.GetOtpVerification(data),
    onSuccess: (res) => {
      const { message, data } = res.data;
      toast.success(message, { position: 'top-center' });
      setOtpData(data);
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || 'Failed to send OTP', { position: 'top-center' });
    },
  });

  // Mutation for verifying OTP
  const { mutate: verifyOtp, isPending: isVerifyLoading } = useMutation({
    mutationFn: (payload) => agent1.Authentication.VerifyOtp(payload),
    onSuccess: (res) => {
      const { message, data, links } = res.data;
      dispatch(verifyUser(data)); // Store user data in Redux
      toast.success(message, { position: 'top-center' });
      navigate(links.login); // Navigate to login page
    },
    onError: (error) => {
      const errorMessages = error.response?.data?.errorMessages || [];
      if (errorMessages.length > 0) {
        errorMessages.forEach(({ message }) => {
          toast.error(message, { position: 'top-right' });
        });
      } else {
        toast.error(error.response?.data?.message || 'An error occurred', {
          position: 'top-right',
        });
      }
    },
  });

  const css = `
    .hover\\:text-underline:hover {
      text-decoration: underline;
    }
    label {
      color: ${theme.palette.text.disabled};
    }
  `;

  useEffect(() => {
    // If the timer has ended, exit
    if (timeLeft <= 0) {
      setIsTimerEnded(true);
      return;
    }

    // Set up the interval to update the timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000 * 60);

    // Cleanup the interval on component unmount or when timer ends
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (otpData && otpData.expiresAt) {
      const number = new DateTime(otpData.expiresAt).getFormatedDistance().match(/\d+/);
      setTimeLeft(parseInt(number[0], 10));
    }
  }, [otpData]);

  return (
    <>
      <style>{css}</style>
      {timeLeft > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px',
            backgroundColor: 'grey.900',
            borderRadius: '6px',
            color: 'grey.100',
            my: 1,
          }}
        >
          <Stack>
            <span>{otpData?.otp}</span>
            <CopyToClipboard
              text={otpData?.otp}
              onCopy={() => {
                toast.success('Copied!', { duration: 800 });
              }}
            >
              <span
                style={{
                  display: 'block',
                }}
              >
                <ContentCopyOutlined size={24} />
              </span>
            </CopyToClipboard>
          </Stack>
          <span>{timeLeft} minutes left</span>
        </Box>
      )}

      {otpData ? (
      // OTP Verification Form
      
        <Formik
          initialValues={{
            otp: otpData.otp || '', // Pre-fill OTP (if provided)
            email: otpData.email || '',
          }}
          validationSchema={Yup.object().shape({
            otp: Yup.string()
              .length(6, 'OTP must be exactly 6 digits')
              .required('OTP is required'),
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
          })}
          onSubmit={async (values, { resetForm }) => {
            verifyOtp({ otp: values.otp, email: values.email });
            resetForm(); // Reset the form after submission
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.otp && errors.otp)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="otp">OTP</InputLabel>
                <OutlinedInput
                  id="otp"
                  value={values.otp}
                  name="otp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="OTP"
                  placeholder="Enter OTP"
                />
                {touched.otp && errors.otp && <FormHelperText error>{errors.otp}</FormHelperText>}
              </FormControl>
              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  disabled={isVerifyLoading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {isVerifyLoading ? <GradientCircularProgress /> : 'VERIFY'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      ) : (
        // Email Form to Get OTP
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
          })}
          onSubmit={async (values, { resetForm }) => {
            await getOtpMutation(values);
            resetForm(); // Reset the form after OTP request
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email"
                  placeholder="Enter your email"
                />
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </FormControl>
              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  disabled={isPending}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {isPending ? <GradientCircularProgress /> : 'SEND OTP'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

EmailVerification.propTypes = {
  email: PropTypes.string,
  otp: PropTypes.string,
};

export default EmailVerification;
