import { ArrowForward, Delete, Edit, MoreVert, Refresh, Visibility } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  NativeSelect,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useGetStats } from 'api/hooks';
import ChartCard from 'components/cards/chart-card';
import StatsCard from 'components/cards/stats-card';
import _BarChart from 'components/chart/bar-chart';
import _PieChart from 'components/chart/pie-chart';
import { spin, StyledMenu } from 'components/styled';
import { baseUrlV2 } from 'config/env';
import { MONTHS } from 'constants';
import { ORDER_STAT } from 'enums';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import { transformOrdersData, transformUsersData } from 'transformers';
import { convertToTitleCase } from 'utils/convert-to-title-case';
import { nearestEqual } from 'utils/nearest-equal';

/**
 * =============================
 * Dashboard - Dashboard view
 * =============================
 */
const Dashboard = ({ currentUser }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [year, setYear] = useState(null);
  const chartCardRef = useRef(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [columns, setColumns] = useState(null);
  const theme = useTheme();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, isPending, isSuccess, refetch, isRefetching } = useGetStats();

  const updateChartWidth = useCallback(() => {
    if (chartCardRef.current) {
      setChartWidth(chartCardRef.current.clientWidth);
    }
  }, [chartCardRef]);

  useEffect(() => {
    if (data && isSuccess) {
      setDashboardData((prevData) => ({
        ...prevData,
        ...data.data,
        sales: {
          data: data.data.orders.data.filter(
            (order) => order.paymentId && order.status == ORDER_STAT.APPROVED,
          ),
          total: data.data.orders.data.filter(
            (order) => order.paymentId && order.status == ORDER_STAT.APPROVED,
          ).length,
        },
      }));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (dashboardData) {
      
      setSalesData(
        transformOrdersData(
          dashboardData.orders.data.filter(
            (order) => order.status == ORDER_STAT.APPROVED
          ),
        ),
      );
      const transformedUsersData = transformUsersData(dashboardData.users.data);
      setUsersData(transformedUsersData);

      // Set initial year based on available data
      const initialYear = nearestEqual(Object.keys(transformedUsersData), new Date().getFullYear());
      setYear(initialYear);

      // Dynamically create columns based on keys in the data

      let cols = null;
      if (dashboardData.orders.data.length > 0) {
        const { _id, image, items, createdAt, __v, ...keys } = dashboardData.orders.data[0];
        cols = Object.keys(keys).map((key) => ({
          id: key,
          label: convertToTitleCase(key), // Capitalize the first letter
          minWidth: 150,
          align: 'left', // Example alignment condition
          format: (value) => `$${value}`,
        }));
        setColumns(cols);
      }
    }
  }, [dashboardData]);

  useEffect(() => {
    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    return () => window.removeEventListener('resize', updateChartWidth);
  }, [updateChartWidth, chartWidth, salesData, usersData]);

  const memoizedSalesSeries = useMemo(
    () =>
      salesData?.map((v) => {
        const [year, monthlyTotals] = Object.entries(v)[0];
        return {
          data: monthlyTotals,
          label: year,
        };
      }),
    [salesData],
  );

  // Year change handler
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <Stack drirection="row" alignItems="end" justifyContent="flex-end" spacing={1}>
        <Refresh
          onClick={() => refetch()}
          sx={{
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            animation: isRefetching && `${spin} 1s infinite ease`,
            '&:hover': {
              backgroundColor: theme.palette.grey[200],
              borderRadius: 100,
            },
          }}
        />
      </Stack>
      <Grid container spacing={2} my={1}>
        {isPending
          ? Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Skeleton variant="rectangular" height={140} />
            </Grid>
          ))
          : dashboardData &&
            Object.entries(dashboardData).map(([key, data]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <StatsCard
                  description={`${convertToTitleCase(key)}`}
                  title={`${convertToTitleCase(key)}`}
                  percentage={`${data.total / 100}`}
                  value={data.total}
                />
              </Grid>
            ))}
      </Grid>
      <Grid container spacing={2} my={2}>
        <>
          {salesData && salesData.length > 0 && (
            <Grid item xs={12} md={6}>
              <ChartCard
                title={
                  <Typography variant="h6" fontWeight="bold">
                    Sales Chart
                  </Typography>
                }
                ref={chartCardRef}
              >
                <_BarChart
                  height={500}
                  width={chartWidth}
                  series={memoizedSalesSeries}
                  xAxis={[
                    {
                      data: MONTHS.map((m) => m.slice(0, 3)),
                      scaleType: 'band',
                    },
                  ]}
                />
              </ChartCard>
            </Grid>
          )}
          {usersData && (
            <Grid item xs={12} md={6}>
              <ChartCard
                title="Users"
                headerComponent={() => (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Users Traffic
                    </Typography>
                    <NativeSelect
                      value={year}
                      onChange={handleYearChange}
                      inputProps={{
                        name: 'year',
                        id: 'uncontrolled-native',
                      }}
                    >
                      {usersData &&
                        Object.keys(usersData).map((label) => (
                          <option key={label} value={label}>
                            {label}
                          </option>
                        ))}
                    </NativeSelect>
                  </Box>
                )}
                ref={chartCardRef}
              >
                <_PieChart width={chartWidth} data={usersData && usersData[String(year)]} />
              </ChartCard>
            </Grid>
          )}
        </>
      </Grid>

      {dashboardData && (
        <Grid container spacing={2} my={2}>
          <>
            {dashboardData.orders.data.length > 0 && (
              <Grid item xs={12} md={8}>
                <ChartCard
                  title={
                    <Typography variant="h6" fontWeight="bold">
                      Recent Orders
                    </Typography>
                  }
                  ref={chartCardRef}
                >
                  <Box
                    sx={{
                      width: '100%',
                      overflow: 'hidden',
                      border: '1px solid lightgrey',
                      borderRadius: 3,
                    }}
                  >
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns &&
                              columns.map(({ _id, image, __V, ...column }) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dashboardData.orders.data
                            // .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                            // .slice(0, 7)
                            .map(({ image, _id, __v, ...row }) => (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns &&
                                  columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      mt: 1,
                    }}
                  >
                    <Button
                      onClick={() => {
                        navigate('/dashboard/manage-orders', {
                          replace: true,
                          preventScrollReset: false,
                        });
                      }}
                      endIcon={<ArrowForward />}
                      sx={{ mt: 2, color: 'text.secondary', textTransform: 'none' }}
                    >
                      View all
                    </Button>
                  </Box>
                </ChartCard>
              </Grid>
            )}
            {dashboardData.cycles.data.length > 0 && (
              <Grid item xs={12} md={4}>
                <Box
                  sx={{ p: 2, borderRadius: 2, boxShadow: 1, backgroundColor: 'background.paper' }}
                >
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Latest products
                  </Typography>
                  <List>
                    {dashboardData.cycles.data
                      // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      // .slice(0, 7)
                      .map((product, index) => (
                        <Fragment key={product._id}>
                          <ListItem
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="options"
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                disableElevation
                                onClick={handleClick}
                              >
                                <MoreVert />
                              </IconButton>
                            }
                          >
                            <StyledMenu
                              id="demo-customized-menu"
                              MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose} disableRipple>
                                <Edit />
                                Edit
                              </MenuItem>
                              <MenuItem onClick={handleClose} disableRipple>
                                <Visibility />
                                View
                              </MenuItem>
                              <MenuItem onClick={handleClose} disableRipple>
                                <Delete />
                                Delete
                              </MenuItem>
                            </StyledMenu>
                            <ListItemAvatar>
                              <Avatar
                                variant="rounded"
                                src={`${baseUrlV2 + '/' + product.productImg}`}
                                sx={{ width: 50, height: 50, borderRadius: 1 }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={product.productTitle}
                              secondary={`Added on ${new Date(product.createdAt).toLocaleDateString()}`}
                              primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                          </ListItem>
                          {index < dashboardData.cycles.data.length - 1 && <Divider />}
                        </Fragment>
                      ))}
                  </List>
                  <Button
                    endIcon={<ArrowForward />}
                    sx={{ mt: 2, color: 'text.secondary', textTransform: 'none' }}
                  >
                    View all
                  </Button>
                </Box>
              </Grid>
            )}
          </>
        </Grid>
      )}
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Dashboard);
