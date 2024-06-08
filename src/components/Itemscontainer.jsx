import * as React from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useContext, useEffect } from 'react';
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

export const Itemscontainer = ({ rows = [], resmes }) => { // Default to an empty array if rows is undefined
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortBy, setSortBy] = React.useState('formattedDate');
  const navigate = useNavigate();
  const { userMode, favoriteGames, token, setFavoriteGames, email } = useContext(UserContext);
  const [localFavorites, setLocalFavorites] = useState([]);

  useEffect(() => {
    setLocalFavorites(favoriteGames.map(game => game.id));
  }, [favoriteGames]);

  // Log userId and token to ensure they are available
  useEffect(() => {
    console.log('email:', email);
    console.log('token:', token);
  }, [email, token]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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

  // Function to transform API response data into table rows
  const formatTableData = (data) => {
    if (!data) {
      return []; // Return an empty array if data or data.response is undefined
    }

    return data.map((game) => {
      const fixture = game.fixture;
      const teams = game.teams;
      return {
        formattedDate: new Date(fixture.date).toLocaleDateString(), // Assuming 'date' has the full date string
        team1: teams.home.name,
        team2: teams.away.name,
        location: `${fixture.venue?.city || 'NA'}`, // Use venue.city if available, 'NA' otherwise
        venue: `${fixture.venue?.name || 'NA'}`, // Assuming price information is not available, replace with actual price logic
        id: `${fixture.id}`
      };
    });
  };

  const sortedRows = useMemo(() => {
    const formattedData = formatTableData(rows);
    return formattedData.sort((a, b) => {
      if (sortBy === 'formattedDate') {
        return new Date(a.formattedDate) - new Date(b.formattedDate);
      } else if (sortBy === 'price') {
        return a.price - b.price; // Assuming 'price' is a property of the game object
      }
      return 0;
    });
  }, [rows, sortBy]);

  const isFavorite = (row) => {
    return localFavorites.includes(row.id);
  };

  const addFavoriteGame = async (game) => {
    try {
      const response = await axios.put(`http://localhost:3000/users/favorites/${email}`, game, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding favorite game:', error);
      throw error;
    }
  };

  const removeFavoriteGame = async (gameId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/favorites/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { gameId }
      });
      return response.data;
    } catch (error) {
      console.error('Error removing favorite game:', error);
      throw error;
    }
  };

  const handleFavoriteToggle = async (row) => {
    if (userMode !== 'user') {
      alert('You must be logged in to perform this operation.');
      return;
    }

    try {
      let updatedFavorites;
      if (isFavorite(row)) {
        // Remove from favorites
        await removeFavoriteGame(row.id);
        updatedFavorites = favoriteGames.filter(game => game.id !== row.id);
        setLocalFavorites(updatedFavorites.map(game => game.id));
      } else {
        // Check if the game is already in favoriteGames
        const existingFavorite = favoriteGames.find(game => game.id === row.id);
        if (existingFavorite) {
          alert('This game is already in your favorites.');
          return;
        }

        // Add to favorites
        await addFavoriteGame(row);
        updatedFavorites = [...favoriteGames, row];
        setLocalFavorites([...localFavorites, row.id]);
      }
      // Update context state
      setFavoriteGames(updatedFavorites);
    } catch (error) {
      console.error('Error updating favorite games:', error);
    }
  };


  const handleBuyTicket = (row) => {
    const queryParams = {
      date: row.formattedDate,
      location: row.location,
      team1: row.team1,
      team2: row.team2,
    };

    const searchParams = new URLSearchParams(queryParams).toString();
    navigate(`/ticket?${searchParams}`);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{}} aria-label="custom pagination table">
          <TableRow>
            <TableCell colSpan={1} style={{ padding: '10px' }}>
              Sort by:
              <Select
                value={sortBy}
                onChange={handleSortChange}
                style={{ marginLeft: '10px' }}
              >
                <MenuItem value="formattedDate">Date</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </TableCell>
            <TableCell colSpan={5} style={{ padding: '10px' }}>
              {resmes}
            </TableCell>
          </TableRow>
          <TableBody>
            {(rowsPerPage > 0
              ? sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sortedRows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.formattedDate}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.team1} vs {row.team2}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.location}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.venue}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <button onClick={() => handleFavoriteToggle(row)}>
                    {isFavorite(row) ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
                  </button>
                </TableCell>

                <TableCell style={{ width: 160 }} align="right">
                  <button onClick={() => handleBuyTicket(row)}>Buy Ticket</button>
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
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
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
