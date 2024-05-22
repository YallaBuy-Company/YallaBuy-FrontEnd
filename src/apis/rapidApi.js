const API_BASE_URL = 'http://localhost:3000/venues/'; // Assuming your Mongo API base URL
import axios from 'axios'; // Assuming you have Axios installed


async function fetchVenues(country, city = null) {
    const endpoint = city ? 'cities' : 'countries';
    const url = `${API_BASE_URL}${endpoint}`;
    const params = { country };
    if (city) {
        params.city = city;
    }

    const response = await fetch(url, {
        method: 'GET',
        params,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch venues');
    }

    const data = await response.json();
    return data; // Return the list of apiId of all the relevant venues
}

async function fetchGames(venue = null, dateFrom, dateTo = null, team = null, league = null) {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';

    const params = {
        date: dateFrom, // Assuming API uses 'date' for dateFrom
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


        return response.data.response; // Return the full games data
    } catch (error) {
        console.error('Error fetching games:', error);
        return []; // Return empty array on error
    }
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
            const venues = await fetchVenues(country, city);
            if (venues.length !== 0) {
                resMes = '' + venues.length + 'found';
            }
            else {
                const venues = await fetchVenues(country, null);
                if (venues.length !== 0) {
                    resMes = '' + venues.length + 'found';
                }
            }

            // Make separate API calls for each venue

            for (const venueName of venues) {
                const games = await fetchGames(venueName, dateFrom, dateTo, team, league);
                allGames.push(...games); // Combine games from all venues
                resMes = 'games found';
            }
            if (allGames.length === 0) {
                const venues = await fetchVenues(country, null);
                for (const venueName of venues) {
                    const games = await fetchGames(venueName, dateFrom, dateTo, team, league);
                    allGames.push(...games); // Combine games from all venues
                }
                resMes = 'games for country found';
            }
        }

        if (allGames.length === 0) {
            const venueName = null;
            const games = await fetchGames(venueName, dateFrom, dateTo, team, league);
            allGames.push(...games); // Combine games from all venues
        }


        return { allGames, resMes };
    } catch (error) {
        console.error('Error fetching games:', error);
        return []; // Return empty array on error
    }
};


