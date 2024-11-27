import { Delete, FilterList, Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  capitalize,
  Checkbox,
  IconButton,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { alpha } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import PersistentDrawer from 'components/drawers/persistant-drawer';
import FilterOptions from 'components/filter-options';
import PropTypes from 'prop-types';
import * as React from 'react';
import { convertToTitleCase } from 'utils/convert-to-title-case';

function EnhancedTableToolbar(props) {
  const { selected, numSelected, handleBulkDelete, title, options, handleApplyFilters } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      <PersistentDrawer open={open} onClose={() => setOpen(false)} anchor="right">
        {open && <FilterOptions options={options} onApplyFilters={handleApplyFilters} />}
      </PersistentDrawer>

      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {capitalize(title)}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleBulkDelete(selected)}>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list" onClick={() => setOpen(true)}>
          <IconButton>
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleBulkDelete: PropTypes.func,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  handleApplyFilters: PropTypes.func,
};

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    title,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="normal">Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function DataTable({
  title = '',
  data,
  pagination = null,
  order = 'asc',
  setOrder,
  orderBy = 'createdAt',
  setOrderBy,
  handleBulkDelete = () => null,
  handleView = () => null,
  handleDelete = () => null,
  filters = null,
  setFilters = () => null,
}) {
  const [page, setPage] = React.useState(0);


  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // handle select filters
  const handleApplyFilters = ({ searchTerm, selectedFields }) => {
    setFilters({ searchTerm, selectedFields });
  };

  // Dynamically create columns based on keys in the data
  const columnKeys =
    filters && filters.selectedFields.length > 0
      ? filters.selectedFields
      : data && data[0]
        ? Object.keys(data[0])
        : null;
  const columns =
    data.length > 0
      ? columnKeys.map((key) => ({
          id: key,
          label: convertToTitleCase(key), // Capitalize the first letter
          minWidth: 150,
          align: 'left', // Example alignment condition
        }))
      : [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        width: 
          `${100 - document.getElementById('#dashboard-drawer')?.clientWidth * 100 / window.innerWidth}%`,
        overflow: 'hidden',
        border: '1px solid lightgrey',
        borderRadius: 3,
      }}
    >
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleBulkDelete={handleBulkDelete}
        selected={selected}
        title={title}
        handleApplyFilters={handleApplyFilters}
        options={
          data &&
          data[0] &&
          Object.keys(data[0]).map((key) => ({
            value: key,
            label: convertToTitleCase(key),
          }))
        }
      />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            title={title}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            headCells={columns}
          />
          {/* <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead> */}
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const isItemSelected = selected.includes(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={(event) => handleClick(event, row.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell padding="normal">
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled button group"
                    >
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(row.id);
                        }}
                      >
                        <Visibility />
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(row.id);
                        }}
                      >
                        <Delete />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
}
