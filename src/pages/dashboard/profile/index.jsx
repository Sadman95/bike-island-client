import { CameraAlt, Close, Edit, Save } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useUpdateProfile } from 'api/hooks';
import AddressBook from 'components/address-book';
import CustomField from 'components/custom/CustomField';
import { baseUrlV2 } from 'config/env';
import { ROLES } from 'enums';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { updateInfo } from 'redux/auth.reducer';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import { convertToTitleCase } from 'utils/convert-to-title-case';
import { decrypt } from 'utils/decrypt';
import { objectMapper } from 'utils/object-mapper';
import * as Yup from 'yup';

/**
 * =============================
 * Profile - Profile view
 * =============================
 */
const Profile = ({ currentUser, updateProfile }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [picturePreview, setPicturePreview] = useState(null);
  const [_file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // update user API call
  const {
    mutate: handleUpdateProfile,
    isSuccess,
    isPending,
    data: updatedData,
  } = useUpdateProfile(decrypt(currentUser.id));

  useEffect(() => {
    if (_file) {
      setIsEditing(true);
      setIsChanged(true);
    }
  }, [_file]);

  useEffect(() => {
    if (isSuccess && updatedData) {
      updateProfile(updatedData.data.data);
      setIsEditing(false); // Exit editing mode on successful update
      setIsChanged(false);
    }
  }, [isSuccess, updatedData]);

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    contact: Yup.string()
      .matches(/^\+?[0-9-]+$/, 'Invalid contact number')
      .required('Contact number is required'),
  });

  // Handle Profile Update
  const handleProfileSubmit = (values) => {
    if (_file) {
      values.avatar = _file;
    }
    handleUpdateProfile(values);
  };

  // Compare current form values with initial values
  const hasFormChanged = (initialValues, currentValues) =>
    Object.keys(initialValues).some((key) => initialValues[key] !== currentValues[key]);

  // Handle edit toggle
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setIsChanged(false); // Reset change state when toggling
    if (_file) {
      setFile(null);
      setPicturePreview(baseUrlV2 + '/' + currentUser.avatar);
    }
  };

  // Handle file input for avatar
  const handleChoosePic = (e) => {
    e.preventDefault();
    const input = document.createElement('input');
    input.name = 'avatar';
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg';
    input.click();
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are accepted');
        return;
      }
      setFile(file);
      setPicturePreview(URL.createObjectURL(file));
    };
  };

  return (
    <Box sx={{ mx: 'auto', p: 3 }}>
      {/* Profile Header */}
      <Box sx={{ textAlign: 'center', mb: 3, position: 'relative' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            border: '1px solid lightgrey',
          }}
          src={picturePreview ?? baseUrlV2 + '/' + currentUser.avatar}
        ></Avatar>
        {/* Camera Icon for Avatar */}
        <IconButton
          onClick={(e) => handleChoosePic(e)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 2,
          }}
          component="label"
        >
          <CameraAlt />
        </IconButton>
        <Typography variant="h5" sx={{ mt: 4 }}>
          {`${currentUser.firstName} ${currentUser.lastName}`}
        </Typography>
        <Typography color="text.secondary">{currentUser.email}</Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Profile" />
        {currentUser.role === ROLES.USER && <Tab label="Addresses" />}
      </Tabs>
      <Divider sx={{ my: 2 }} />

      {/* Tab Panels */}
      <Box>
        {/* Profile Tab */}
        {activeTab === 0 && (
          <Box>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              {isPending ? (
                <GradientCircularProgress size={20} />
              ) : (
                <>
                  {isEditing ? (
                    <>
                      {isChanged && (
                        <IconButton
                          onClick={handleProfileSubmit}
                          color="success"
                          aria-label="Save changes"
                        >
                          <Save />
                        </IconButton>
                      )}
                      <IconButton onClick={toggleEdit} color="error" aria-label="Cancel editing">
                        <Close />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={toggleEdit} color="primary" aria-label="Edit profile">
                      <Edit />
                    </IconButton>
                  )}
                </>
              )}
            </Stack>

            {!isEditing ? (
              <Card elevation={0}>
                <CardContent>
                  {Object.keys(
                    objectMapper(currentUser, ['firstName', 'lastName', 'contactNo']),
                  ).map((v, i) => (
                    <CustomField
                      styles={{
                        backgroundColor: (theme) => theme.palette.common.white,
                        p: 2,
                        borderRadius: 2,
                        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                      }}
                      key={i}
                      label={
                        <Typography color={(theme) => theme.palette.grey[600]} variant="overline">
                          {convertToTitleCase(v)}
                        </Typography>
                      }
                      value={currentUser[v]}
                    />
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Formik
                initialValues={{
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName,
                  contact: currentUser.contactNo,
                }}
                validationSchema={validationSchema}
                onSubmit={handleProfileSubmit}
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      <Field
                        as={TextField}
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        error={touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                        onChange={(e) => {
                          handleChange(e);
                          setIsChanged(
                            hasFormChanged(
                              { ...values, [e.target.name]: e.target.value },
                              currentUser,
                            ),
                          );
                        }}
                      />
                      <Field
                        as={TextField}
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        error={touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                        onChange={(e) => {
                          handleChange(e);
                          setIsChanged(
                            hasFormChanged(
                              { ...values, [e.target.name]: e.target.value },
                              currentUser,
                            ),
                          );
                        }}
                      />
                      <Field
                        as={TextField}
                        name="contactNo"
                        label="Contact Number"
                        variant="outlined"
                        fullWidth
                        error={touched.contact && !!errors.contact}
                        helperText={touched.contact && errors.contact}
                        onChange={(e) => {
                          handleChange(e);
                          setIsChanged(
                            hasFormChanged(
                              { ...values, [e.target.name]: e.target.value },
                              currentUser,
                            ),
                          );
                        }}
                      />
                    </Stack>
                  </Form>
                )}
              </Formik>
            )}
          </Box>
        )}

        {/* Addresses Tab */}
        {activeTab === 1 && <AddressBook />}
      </Box>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (payload) => dispatch(updateInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
