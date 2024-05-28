const API_BASE_URL = 'http://localhost:3000/venues/'; // Assuming your Mongo API base URL
import axios from 'axios'; // Assuming you have Axios installed

async function fetchVenues(country, city = null) {
  const endpoint = city ? 'cities' : 'countries';
  const url = `${API_BASE_URL}${endpoint}`;
  const params = { country };
  if (city) {
    params.city = city;
  }

  try {
    const response = await axios.get(url, { params });
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data; // Return the data from the server
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
}


async function fetchGames(venue = null, dateFrom, dateTo = null, team = null, league = null) {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';
  
    const params = {
      date: convertDateToAPIFormat(dateFrom), // Convert dateFrom before sending
      ...(venue && { venue }), // Include venue param if provided
      ...(team && { team }), // Include team param if provided
      ...(league && { league }), // Include league param if provided
    };
  
    const headers = {
      'X-RapidAPI-Key': 'f81950b1femsh74fc12a5ec5b7d1p1d8310jsn713489bce4c2',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    };
  
    try {
      const response = await axios.get(url, { params, headers });
      if (!response.data) {
        throw new Error('API request failed: ' + response.data.error);
      }
  
      return response.data.response; // Return the full games data
    } catch (error) {
      console.error('Error fetching games:', error);
      return []; // Return empty array on error
    }
  }
  
  // Function to convert date format
  function convertDateToAPIFormat(dateString) {
    // Assuming your date string is in "day/month/year" format
    const parts = dateString.split('/');
    const year = parts[2];
    const month = String(parts[1]).padStart(2, '0'); // Ensure month has 2 digits
    const day = String(parts[0]).padStart(2, '0'); // Ensure day has 2 digits
    return `${year}-${month}-${day}`;
  }
  

export const getGames = async (country = null, city = null, team = null, league = null, dateFrom, dateTo = null) => {
    if (!dateFrom) {
        throw new Error('Date From is mandatory');
    }

    try {
        const allGames = [];
        let resMes = '';

        // Fetch venues based on country and/or city
        if (country) {
            try {
                const venues = await fetchVenues(country, city);
                if (venues.length !== 0) {
                    resMes = '' + venues.length + ' venues found';
                } else {
                    const venues = await fetchVenues(country, null);
                    if (venues.length !== 0) {
                        resMes = '' + venues.length + ' venues found';
                    }
                }

                // Make separate API calls for each venue
                for (const venueName of venues) {
                    try {
                        const games = await fetchGames(venueName, dateFrom, dateTo, team, league);
                        allGames.push(...games); // Combine games from all venues
                        resMes = `games found for city:${city},`;
                    } catch (error) {
                        console.error('Error fetching games for venue:', venueName, error);
                    }
                }

                if (allGames.length === 0 && city) {
                    const venues = await fetchVenues(country, null);
                    for (const venueName of venues) {
                        try {
                            const games = await fetchGames(venueName, dateFrom, dateTo, team, league);
                            allGames.push(...games); // Combine games from all venues
                        } catch (error) {
                            console.error('Error fetching games for venue:', venueName, error);
                        }
                    }
                    resMes = `No games found for city, games found for country:${country}`;
                }
            } catch (error) {
                console.error('Error fetching venues:', error);
                resMes = 'failed to retrieve venues';
            }
        }

        if (!country || allGames.length === 0 ) {
            const venueName = null;
            try {
            const games = await fetchGames(venueName, dateFrom, dateTo, team, league);
            allGames.push(...games); // Combine games from all venues
            resMes = country ? `no games found for your location, games for date:${dateFrom}`: `games for date:${dateFrom}`;
            } catch(error) {
              console.error('Error fetching venues:', error);
              resMes = 'failed to retrieve venues';
            }

        }


        return { allGames, resMes };
    } catch (error) {
        console.error('Error fetching games:', error);
        return []; // Return empty array on error
    }
};



