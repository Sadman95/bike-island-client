import { Grid, Stack, Typography } from '@mui/material';
import DummyLoginBg from 'assets/images/dummy-login.jpg';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from 'ui-component/Logo';
// import GoogleSignIn from 'views/utilities/GoogleSignIn';
import { ChevronLeft } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import AuthCardWrapper from 'components/auth/AuthCardWrapper';
import AuthWrapper from 'components/auth/AuthWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/selector';

const css = `
  body {
    overflow-y: hidden;
    height: 100vh;
  }
  .text-hover-underline:hover{
    text-decoration: underline;
    cursor: pointer;
  }
`;

/**
 * ============================================
 * Auth page - renders auth component as outlet
 * ============================================
 */
const Auth = () => {
  const theme = useTheme();
  const customization = useSelector(selectCurrentMode);
  const navigate = useNavigate();

  return (
    <>
      <style>{css}</style>
      <AuthWrapper>
        <Grid container sx={{ minHeight: '100vh', overflow: 'hidden' }}>
          <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
            <img
              src={DummyLoginBg}
              alt="authLoginBg"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={5} sx={{ height: '100vh', overflow: 'auto' }}>
            <Grid container direction="column" justifyContent="flex-end" sx={{ height: '100vh' }}>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: 'calc(100vh - 68px)' }}
                >
                  <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                    <AuthCardWrapper>
                      <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction={{ xs: 'column-reverse', md: 'row' }}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Grid item>
                              <Stack alignItems="center" justifyContent="center" spacing={1}>
                                <Logo />
                                <Typography
                                  variant="caption"
                                  fontSize="16px"
                                  textAlign="center"
                                  color={
                                    customization.mode == 'light'
                                      ? theme.palette.grey[800]
                                      : theme.palette.common.white
                                  }
                                >
                                  Enter your credentials to continue
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Outlet />
                        </Grid>
                      </Grid>
                    </AuthCardWrapper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
            </Grid>
            <Stack
              maxWidth={'max-content'}
              marginLeft={'auto'}
              direction={'row'}
              p={2}
              fontWeight={'bold'}
              position={'sticky'}
              bottom={0}
              right={0}
              onClick={() => navigate(-1)}
              sx={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.common.white,
                },
              }}
            >
              <ChevronLeft />
              <span>Back</span>
            </Stack>
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  );
};

export default Auth;
