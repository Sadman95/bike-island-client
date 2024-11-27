import { Add, RestartAlt as ResetIcon, Save as SaveIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useCreateRole, useDeleteRole, useGetRoles, useUpdateRole } from 'api/hooks';
import { FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { spin } from 'components/styled';

/**
 * ========================================
 * RolePermission - role-permission page view
 * ========================================
 */
const RolePermission = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [newPermissionName, setNewPermissionName] = useState('');

  //get all roles api call
  const { data, isPending, isSuccess, isError, error, refetch, isRefetching } = useGetRoles();

  // create role api call
  const {
    mutate: handleCreateRole,
    isPending: isCreateRolePending,
    isSuccess: isCreateRoleSuccess,
    data: roleData,
  } = useCreateRole();

  // update role api call
  const {
    mutate: handleUpdateRole,
    isPending: isUpdateRolePending,
    isSuccess: isUpdateRoleSuccess,
    data: updateRoleData,
  } = useUpdateRole();

  // delete role api call
  const {
    mutate: handleDeleteRole,
    isSuccess: isDeleteSuccess,
    isPending: isDeletePending,
    data: deletedData,
  } = useDeleteRole();

  useEffect(() => {
    if (isSuccess && data) {
      setRoles(data);
      setSelectedRole(data[0]);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isCreateRoleSuccess) {
      toast.success(roleData.data.message);
      refetch();
    }
  }, [isCreateRoleSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deletedData.data.message);
      refetch();
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isUpdateRoleSuccess) {
      toast.success(updateRoleData.data.message);
      refetch();
      // Update roles list
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role._id === updateRoleData.data._id ? updateRoleData.data : role,
        ),
      );

      // Update selectedRole
      if (selectedRole?._id === updateRoleData.data._id) {
        setSelectedRole(updateRoleData.data);
      }
    }
  }, [isUpdateRoleSuccess, updateRoleData]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Role name is required'),
    permissions: Yup.object()
      .default(() => ({}))
      .test(
        'permissions-valid',
        'At least one permission action must be set',
        (permissions) =>
          permissions &&
          Object.values(permissions).some((actions) =>
            Object.values(actions).some((action) => action),
          ),
      ),
  });

  const handleSaveChanges = (values) => {
    if (selectedRole) {
      const updatedRole = {
        name: values.name,
        permissions: values.permissions,
      };
      selectedRole._id
        ? handleUpdateRole({ id: selectedRole._id, updates: updatedRole })
        : handleCreateRole(updatedRole);
    } else {
      toast.error('No role selected to update.');
    }
  };

  const handleAddPermission = (arrayHelpers) => {
    if (newPermissionName.trim() !== '') {
      arrayHelpers.form.setFieldValue(`permissions.${newPermissionName}`, {
        view: false,
        edit: false,
        delete: false,
        add: false,
      });
      selectedRole.permissions = {
        ...selectedRole.permissions,
        [newPermissionName]: {
          view: false,
          edit: false,
          delete: false,
          add: false,
        },
      };
      setNewPermissionName('');
    }
  };

  const handleAddRole = () => {
    if (newRoleName.trim() !== '') {
      const newRole = {
        name: newRoleName,
        permissions: {},
      };
      setRoles((prevRoles) => [...prevRoles, newRole]);
      setSelectedRole(newRole);
      setNewRoleName('');
    }
  };

  // handle delete
  const handleDelete = (id) => {
    if (!id) {
      setRoles(roles.filter(role => role.name.toLowerCase() !== selectedRole.name.toLowerCase()));
      setSelectedRole(data[0]);
      refetch();
    }
    else {
      swal({
        title: 'Are you sure?',
        text: `Are you sure that you want to delete this role-${id}?`,
        icon: 'warning',
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          handleDeleteRole(id);
        }
      });
    }
  };

  return (
    <Box p={3}>
      {isError && (
        <Stack
          alignItems="center"
          justifyContent="center"
          p={2}
          my={2}
          width="100%"
          border="1px dashed lightgray"
          borderRadius={6}
          fontSize={32}
        >
          {error.response.data.message}
        </Stack>
      )}
      {isPending || isCreateRolePending || isUpdateRolePending ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Stack key={index} direction="row" mb={1} spacing={1} height={100} width="100%">
            <Skeleton variant="rectangular" width="20%" height="100%" />
            <Skeleton variant="rectangular" width="80%" height="100%" />
          </Stack>
        ))
      ) : (
        <Box display="flex">
          {/* Roles List */}
          <Box mr={4} width="20%">
            <Typography variant="h6" mb={2}>
              Roles
            </Typography>
            {roles &&
              roles.map((role) => (
                <Button
                  key={role._id}
                  fullWidth
                  variant={selectedRole?._id === role._id ? 'contained' : 'text'}
                  onClick={() => setSelectedRole(role)}
                  sx={{ mb: 1 }}
                >
                  {role.name}
                </Button>
              ))}
            {/* Add New Role */}
            <Box display="flex" flexDirection="column" mt={2}>
              <TextField
                size="small"
                placeholder="New role name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Button variant="contained" onClick={handleAddRole} disabled={!newRoleName.trim()}>
                Add Role
              </Button>
            </Box>
          </Box>

          {/* Permission Table */}
          <Box flex={1}>
            {selectedRole ? (
              <Formik
                enableReinitialize
                initialValues={selectedRole}
                validationSchema={validationSchema}
                onSubmit={handleSaveChanges}
              >
                {({ values }) => (
                  <Form>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">{values.name} › Permissions</Typography>
                      {Object.keys(selectedRole.permissions).length > 0 && (
                        <Stack direction="row" border="1px solid lightgrey" borderRadius={2}>
                          <IconButton
                            disabled={isDeletePending}
                            color="error"
                            onClick={() => handleDelete(selectedRole._id)}
                          >
                            {isDeletePending ? (
                              <GradientCircularProgress size={20} />
                            ) : (
                              <DeleteIcon />
                            )}
                          </IconButton>
                          <IconButton
                            sx={{
                              animation: isRefetching && `${spin} 1s infinite ease reverse`,
                            }}
                            color="default"
                            onClick={() => refetch()}
                          >
                            <ResetIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            type="submit"
                            disabled={isUpdateRolePending || isCreateRolePending}
                          >
                            {isUpdateRolePending || isCreateRolePending ? (
                              <GradientCircularProgress size={20} />
                            ) : (
                              <SaveIcon />
                            )}
                          </IconButton>
                        </Stack>
                      )}
                    </Box>
                    <FieldArray
                      name="permissions"
                      render={(arrayHelpers) => (
                        <>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Permission</TableCell>
                                <TableCell>View</TableCell>
                                <TableCell>Add</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.entries(values.permissions).map(([permission, actions]) => (
                                <TableRow key={permission}>
                                  <TableCell>
                                    <strong>{permission}</strong>
                                  </TableCell>
                                  {['view', 'add', 'edit', 'delete'].map((action) => (
                                    <TableCell key={action}>
                                      <Checkbox
                                        name={`permissions.${permission}.${action}`}
                                        checked={actions[action]}
                                        onChange={() =>
                                          arrayHelpers.form.setFieldValue(
                                            `permissions.${permission}.${action}`,
                                            !actions[action],
                                          )
                                        }
                                      />
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          {/* Add New Permission */}
                          <Box display="flex" mt={2}>
                            <TextField
                              size="small"
                              placeholder="Add new permission"
                              value={newPermissionName}
                              onChange={(e) => setNewPermissionName(e.target.value)}
                              sx={{ mr: 2 }}
                            />
                            <Button
                              variant="contained"
                              onClick={() => handleAddPermission(arrayHelpers)}
                            >
                              <Add />
                            </Button>
                          </Box>
                        </>
                      )}
                    />
                  </Form>
                )}
              </Formik>
            ) : (
              <Stack
                alignItems="center"
                justifyContent="center"
                p={16}
                my={2}
                width="100%"
                border="1px dashed lightgray"
                borderRadius={6}
                fontSize={32}
              >
                <Typography>No role selected</Typography>
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RolePermission;
