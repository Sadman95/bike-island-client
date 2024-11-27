import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import agent1 from 'api/agent1';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { MdSend } from 'react-icons/md';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const theme = useTheme();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => agent1.Authentication.GetResetPasswordLink(payload),
    onSuccess: (response) => {
      const { message } = response.data;
      toast.success(message, { position: 'top-right' });
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

  const handlForgotPassword = (payload) => {
    mutate(payload);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
      }}
    >
      <Typography color={theme.palette.text.disabled} variant="body1" my={2}>
        Forgot Password
      </Typography>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        })}
        onSubmit={(v) => handlForgotPassword(v)}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
            noValidate
            onSubmit={handleSubmit}
          >
            <FormControl
              fullWidth
              size='small'
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <AnimateButton>
              <Button
                disableElevation
                disabled={isPending}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                endIcon={!isPending && <MdSend />}
                color="secondary"
              >
                {isPending && <GradientCircularProgress />}
              </Button>
            </AnimateButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPassword;
