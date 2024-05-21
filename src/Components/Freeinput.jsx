import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';

// Custom Listbox to limit displayed options
const CustomListbox = React.forwardRef(function CustomListbox(props, ref) {
    const { children, ...other } = props;
    return (
        <List {...other} ref={ref}>
            {React.Children.toArray(children).slice(0, 3)}
        </List>
    );
});

export const Freeinput = () => {
    const [inputValue, setInputValue] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [options, setOptions] = React.useState([]);

    // Fetch data from server
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const leagueResponse = await fetch('http://localhost:3000/leagues/names');
                const teamResponse = await fetch('http://localhost:3000/teams/names');
                
                const leagues = await leagueResponse.json();
                const teams = await teamResponse.json();

                // Combine leagues and teams data with type
                const combinedOptions = [
                    ...leagues.map(league => ({ label: league.name, value: league._id, type: 'League' })),
                    ...teams.map(team => ({ label: team.name, value: team._id, type: 'Team' }))
                ];

                setOptions(combinedOptions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    const handleOptionChange = (event, newOption) => {
        setSelectedOption(newOption);
    };

    return (
        <Autocomplete
            value={selectedOption}
            onChange={handleOptionChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            getOptionLabel={(option) => option.label}
            ListboxComponent={CustomListbox}
            renderOption={(props, option) => (
                <li {...props}>
                    {option.label} ({option.type})
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    variant="outlined"
                />
            )}
        />
    );
};
