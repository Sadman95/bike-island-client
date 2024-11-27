import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const RolePermissionForm = ({ open, onClose, onSubmit }) => {
  const [newPermission, setNewPermission] = useState('');

  const permissionSchema = Yup.object().shape({
    title: Yup.string().required('Role title is required'),
    permissions: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required('Permission title is required'),
        actions: Yup.object().shape({
          create: Yup.boolean(),
          read: Yup.boolean(),
          update: Yup.boolean(),
          delete: Yup.boolean(),
        }),
      }),
    ),
  });

  const initialValues = {
    title: '',
    permissions: [],
  };

  return (
    <Box width={450} p={3}>
      <Typography variant="h5" mb={2}>
        Add New Role
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={permissionSchema}
        onSubmit={(values) => {
          onSubmit(values);
          onClose();
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Stack spacing={3}>
              {/* Role Title */}
              <Field
                as={TextField}
                name="title"
                label="Role Title"
                fullWidth
                required
                error={Boolean(values.errors?.title)}
                helperText={values.errors?.title}
              />

              {/* Add Permission */}
              <Typography variant="h6">Permissions</Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Permission Title"
                  value={newPermission}
                  onChange={(e) => setNewPermission(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (newPermission.trim()) {
                      setFieldValue('permissions', [
                        ...values.permissions,
                        {
                          title: newPermission,
                          actions: { create: false, read: false, update: false, delete: false },
                        },
                      ]);
                      setNewPermission('');
                    }
                  }}
                >
                  Add
                </Button>
              </Stack>

              {/* Display Permissions */}
              <FieldArray
                name="permissions"
                render={(arrayHelpers) => (
                  <>
                    {values.permissions.map((permission, index) => (
                      <Box key={index} p={2} border="1px solid #ccc" borderRadius="8px">
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="subtitle1">{permission.title}</Typography>
                          <IconButton onClick={() => arrayHelpers.remove(index)} color="error">
                            <Delete />
                          </IconButton>
                        </Stack>
                        <Stack direction="row" spacing={2} mt={2}>
                          {['create', 'read', 'update', 'delete'].map((action) => (
                            <FormControlLabel
                              key={action}
                              control={
                                <Checkbox
                                  checked={permission.actions[action]}
                                  onChange={(e) =>
                                    setFieldValue(
                                      `permissions[${index}].actions.${action}`,
                                      e.target.checked,
                                    )
                                  }
                                />
                              }
                              label={action.charAt(0).toUpperCase() + action.slice(1)}
                            />
                          ))}
                        </Stack>
                      </Box>
                    ))}
                  </>
                )}
              />

              {/* Submit Button */}
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Save
                </Button>
                <Button variant="outlined" color="error" fullWidth onClick={onClose}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RolePermissionForm;
