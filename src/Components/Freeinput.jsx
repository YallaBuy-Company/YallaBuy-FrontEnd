import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';


const options = [
    { label: 'Real Madrid', value: 'real-madrid' },
    { label: 'Barcelona', value: 'barcelona' },
    { label: 'Manchester United', value: 'manchester-united' },
    { label: 'Liverpool', value: 'liverpool' },
    { label: 'Bayern Munich', value: 'bayern-munich' },
    { label: 'Manchester City', value: 'manchester-city' },
    { label: 'Paris Saint-Germain', value: 'paris-saint-germain' },
    { label: 'Chelsea', value: 'chelsea' },
    { label: 'Juventus', value: 'juventus' },
    { label: 'Atletico Madrid', value: 'atletico-madrid' },
    { label: 'Inter Milan', value: 'inter-milan' },
    { label: 'Tottenham Hotspur', value: 'tottenham-hotspur' },
    { label: 'Arsenal', value: 'arsenal' },
    { label: 'AC Milan', value: 'ac-milan' },
    { label: 'Borussia Dortmund', value: 'borussia-dortmund' },
    { label: 'Carles Alcaraz', value: 'carles-alcaraz' },
    { label: 'Novak Djokovic', value: 'novak-djokovic' },
    { label: 'Rafael Nadal', value: 'rafael-nadal' },
    { label: 'Dominic Thiem', value: 'dominic-thiem' },
    { label: 'Stefanos Tsitsipas', value: 'stefanos-tsitsipas' },
    { label: 'Daniil Medvedev', value: 'daniil-medvedev' },
    { label: 'Alexander Zverev', value: 'alexander-zverev' },
    { label: 'Andrey Rublev', value: 'andrey-rublev' },
    { label: 'Matteo Berrettini', value: 'matteo-berrettini' },
    { label: 'Diego Schwartzman', value: 'diego-schwartzman' },
    { label: 'Denis Shapovalov', value: 'denis-shapovalov' },
    { label: 'Felix Auger-Aliassime', value: 'felix-auger-aliassime' },
    { label: 'Jannik Sinner', value: 'jannik-sinner' },
];

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
