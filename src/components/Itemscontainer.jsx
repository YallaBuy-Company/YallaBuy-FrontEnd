// src/components/Itemscontainer.jsx
import React, { useState, useMemo, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { UserContext } from './UserContext';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const Itemscontainer = ({ rows = [], resmes }) => {
  const { userMode, user, favoriteGames, setFavoriteGames } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('formattedDate');


  const handleFavoriteToggle = async (row) => {
    if (userMode === 'guest') {
      alert('Please log in to favorite events.');
      return;
    }

    try {
      if (isFavorite(row)) {
        await handleFavorite(row, false);
        setFavoriteGames(favoriteGames.filter((favorite) => favorite.id !== row.id));
      } else {
        await handleFavorite(row, true);
        setFavoriteGames([...favoriteGames, row]);
      }
    } catch (error) {
      alert('An error occurred while updating favorites.');
    }
  };

  const handleFavorite = async (row, isAdd) => {
    try {
      let response;
      if (isAdd) {
        response = await axios.put(`/favorites/${user.id}`, { event: row });
      } else {
        response = await axios.delete(`/favorites/${user.id}`, { data: { eventId: row.id } });
      }

      if (response.status === 200) {
        if (isAdd) {
          alert('Event favorited successfully!');
        } else {
          alert('Event unfavorited successfully!');
        }
      } else {
        alert('Failed to update favorites.');
      }
    } catch (error) {
      alert('An error occurred while updating favorites.');
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const formatTableData = (data) => {
    if (!data) {
      return [];
    }

    return data.map((game) => {
      const fixture = game.fixture;
      const teams = game.teams;
      return {
        formattedDate: new Date(fixture.date).toLocaleDateString(),
        team1: teams.home.name,
        team2: teams.away.name,
        venue: fixture.venue.name,
        city: fixture.venue.city,
        id: fixture.id, // assuming `game` object has an `id` field
      };
    });
  };

  const sortedRows = useMemo(() => {
    const formattedData = formatTableData(rows);
    console.log('Formatted Data:', formattedData); // Debugging log
    return formattedData.slice().sort((a, b) => {
      switch (sortBy) {
        case 'formattedDate':
          return new Date(a.formattedDate) - new Date(b.formattedDate);
        case 'team1':
          return a.team1.localeCompare(b.team1);
        case 'team2':
          return a.team2.localeCompare(b.team2);
        default:
          return 0;
      }
    });
  }, [rows, sortBy]);

  return (
    <>
      <Select value={sortBy} onChange={handleSortChange}>
        <MenuItem value="formattedDate">Date</MenuItem>
        <MenuItem value="team1">Team 1</MenuItem>
        <MenuItem value="team2">Team 2</MenuItem>
      </Select>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.formattedDate}</TableCell>
                <TableCell>{row.team1}</TableCell>
                <TableCell>{row.team2}</TableCell>
                <TableCell>{row.venue}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>
                  <button onClick={() => handleFavoriteToggle(row)}>
                    {isFavorite(row) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={sortedRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

Itemscontainer.propTypes = {
  rows: PropTypes.array.isRequired,
  resmes: PropTypes.string,
};
