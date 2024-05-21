const API_BASE_URL = 'http://localhost:3000/venues/'; // Assuming your Mongo API base URL

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
    return data.map((venue) => venue.name); // Extract venue names
}

async function fetchGames(venue = null, dateFrom, dateTo = null, team = null, league = null) {
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
            ...(!dateTo && { date: dateFrom } || dateTo && { from: dateFrom, to: dateTo }),
            ...(venue && { venue }), // Include venue param if provided
            ...(team && { team }), // Include team param if provided
            ...(league && { league }), // Include league param if provided
        },
        headers: {
            'X-RapidAPI-Key': 'f81950b1femsh74fc12a5ec5b7d1p1d8310jsn713489bce4c2',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
    };

    const response = await fetch(options.url, options);

    if (!response.ok) {
        throw new Error('Failed to fetch games data');
    }

    const data = await response.json();
    return data; // Return the full games data
}

const getGames = async (country = null, city = null, team = null, league = null, dateFrom, dateTo = null) => {
    if (!dateFrom) {
        throw new Error('Date From is mandatory');
    }

    let resMes = '';

    try {
        // Fetch venues based on country and/or city
        if (country) {
            const venues = await fetchVenues(country, city);
            if (venues.length !== 0) {
                resMes = ''+venues.length+'found';
            }
            else {
                const venues = await fetchVenues(country, null);
                if (venues.length !== 0) {
                    resMes = ''+venues.length+'found';
                }
            }
           
            // Make separate API calls for each venue
            const allGames = [];
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

export default { getGames };
