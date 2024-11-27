import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import agent1 from 'api/agent1';
import { useDeleteUser, useGetRoles, useGetTeams } from 'api/hooks';
import { Field, Form, Formik } from 'formik';
import { socket } from 'helpers/socket';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import * as Yup from 'yup';

const AddMemberSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role: Yup.string().required('Role is required'),
});

/**
 * ========================================
 * Teams - team members view
 * ========================================
 */
const Teams = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // get team members api call
  const { data: teams, isSuccess: getTeamsSuccess, refetch } = useGetTeams();

  useEffect(() => {
    if (teams && getTeamsSuccess) {
      setTeamMembers(teams);
    }
  }, [teams, getTeamsSuccess]);

  useEffect(() => {
    // Listen for updates from the server
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // get roles api call
  const { data, isSuccess } = useGetRoles();

  // add member api call
  const { mutate: handleAddMember, isPending } = useMutation({
    mutationFn: agent1.Authentication.SignUp,
    onSuccess: (res) => {
      const { message, links, data } = res.data;
      toast.success(message, {
        position: 'top-center',
      });
      handleModalToggle();
      refetch();
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

  // delete member api call
  const {
    mutate: handleDelete,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deletedData,
  } = useDeleteUser();

  useEffect(() => {
    if (isDeleteSuccess && deletedData) {
      refetch();
    }
  }, [isDeleteSuccess, deletedData]);

  useEffect(() => {
    if (data?.length > 0 && isSuccess) {
      setRoles(data);
    }
  }, [data, isSuccess]);

  // Filtered members based on search query
  const filteredMembers = teamMembers.filter((member) =>
    `${member.firstName} ${member.lastName} ${member.email} ${member.role}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Teams
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          placeholder="Search user from the list"
          size="small"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, marginRight: '16px' }}
        />
        <Button variant="contained" color="primary" onClick={handleModalToggle}>
          Add Member
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role.toUpperCase()}</TableCell>
                <TableCell>
                  <Chip
                    label={onlineUsers.includes(member._id) ? 'Online' : 'Offline'}
                    color={onlineUsers.includes(member._id) ? 'success' : 'error'}
                    variant="contained"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    disabled={isDeletePending}
                    onClick={() => {
                      swal({
                        title: 'Are you sure?',
                        text: `Are you sure that you want to delete this member-${member._id}?`,
                        icon: 'warning',
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          handleDelete(member._id);
                          socket.emit('delete-user', member._id);
                        }
                      });
                    }}
                  >
                    {isDeletePending ? <GradientCircularProgress size={20} /> : <DeleteIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Member Modal */}
      <Modal open={isModalOpen} onClose={handleModalToggle}>
        <Box
          p={4}
          bgcolor="white"
          borderRadius={2}
          boxShadow={24}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Add New Member</Typography>
            <IconButton onClick={handleModalToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: 'TM1234',
              role: '',
            }}
            validationSchema={AddMemberSchema}
            onSubmit={(values, { resetForm }) => {
              handleAddMember({ ...values, isTeamMember: true, confirmPassword: values.password });
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="First Name"
                    name="firstName"
                    variant="outlined"
                    size="small"
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    size="small"
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    size="small"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Password"
                    name="password"
                    variant="outlined"
                    size="small"
                    value="TM1234"
                    InputProps={{
                      readOnly: true, // Makes it non-editable
                    }}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={Select}
                    fullWidth
                    name="role"
                    variant="outlined"
                    size="small"
                    error={touched.role && !!errors.role}
                    displayEmpty
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    {roles.length > 0 &&
                      roles.map((role) => (
                        <MenuItem key={role._id} value={role.name.toLowerCase()}>
                          {role.name}
                        </MenuItem>
                      ))}
                  </Field>
                  {touched.role && errors.role && (
                    <Typography color="error" variant="caption">
                      {errors.role}
                    </Typography>
                  )}
                </Box>
                <Button
                  disabled={isPending}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '16px' }}
                >
                  {isPending ? <GradientCircularProgress size={20} /> : 'Add Member'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default Teams;
