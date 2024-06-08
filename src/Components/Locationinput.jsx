import React, { useState, useEffect, useMemo, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material';
import { Chip } from '@mui/material';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export const Locationinput = ({ query, setQuery }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(
          { ...request, language: 'en' }, // Set language to 'en' for English
          callback
        );
      }, 400),
    []
  );
  

  let geocoder = null;

  useEffect(() => {
    
    let active = true;
    if (typeof window !== 'undefined' && !loaded.current) {
      // ... script loading logic
      loaded.current = true;
    }

  
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (navigator.geolocation) {
        const status = await navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // Use latitude and longitude to fetch initial location data (optional)
            console.log('User location:', latitude, longitude);
  
            // Fetch city and country information based on the user's current location
            const address = `${latitude},${longitude}`;
            const { city, country } = await reverseGeocode(address);
            setQuery({ ...query, location: address, city, country });
  
            console.log(`Location permission granted ,city:${city} , country:${country}`);
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
  
        if (status !== navigator.permissions.GRANTED) {
          console.log('Location permission denied');
        }
      } else {
        console.log('Geolocation is not supported by this browser');
      }
    };
  
    // Request location permission only once on component mount
    requestLocationPermission();
  }, []);
  
  const handleDialogToggle = () => {
    setOpen(!open);
  };

  const handleApply = () => {
    setValue(inputValue);
    handleDialogToggle();
  };

  const reverseGeocode = async (address) => {
      if (!address) {
        return { city: '', country: '' };
      }
    // Create geocoder only if it's not already created
    if (!geocoder && window.google) {
      geocoder = new window.google.maps.Geocoder();
    }

    if (!geocoder) {
      return { city: '', country: '' }; // Handle case where geocoder couldn't be created
    }
    try {
      
      const {results} = await geocoder.geocode({ address, language: 'en' });
      let r = results[0]
      if (!results || !results[0]) {
        console.error('Geocoding failed: No results found');
        return { city: '', country: '' }; // Handle no results scenario
      }
      const addressComponents = results[0].address_components;
      const city = addressComponents.find(
        (component) => component.types.includes('locality')
      )?.long_name || '';
      const country = addressComponents.find(
        (component) => component.types.includes('country')
      )?.long_name;

      return { city, country };
    } catch (error) {
      console.error('Error fetching location details:', error);
      return { city: '', country: '' }; // Handle errors gracefully
    }
  };
  
  const handleLocationChange = async (event,newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    if (newValue) {
      const { city, country } = await reverseGeocode(newValue.description);
      setValue(newValue);
      setQuery({ ...query, location: newValue.description, city, country });
    } else {
      setValue(newValue);
      setQuery({ ...query, location: '', city: '', country: '' });
    }
  };

  const [chipLabel, setChipLabel] = useState('Select Location');

  useEffect(() => {
    const hasLocation = query.country && query.location.trim() !== '';
    const newChipLabel = hasLocation ? `${query.country},${query.city}` : 'Select Location';
    setChipLabel(newChipLabel);
  }, [query.location]);

  const handleChooseLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = `${latitude},${longitude}`;
          const { city, country } = await reverseGeocode(address);
          setQuery({ ...query, location: address, city, country });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    }
  };

  const handleCleanLocation = () => {
    setQuery({ ...query, location: '', city: '', country: '' });
  };

  return (
    <>
      <Chip onClick={handleDialogToggle} label={chipLabel} icon={<LocationOnIcon />} variant="outlined" />

      <Dialog open={open} onClose={handleDialogToggle} PaperProps={{ sx: { minWidth: '30vw' } }}>
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="google-map-demo"
            sx={{ width: 300 }}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            onChange={handleLocationChange}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Add a location" fullWidth />
            )}
            renderOption={(props, option) => {
              const matches =
                option.structured_formatting.main_text_matched_substrings || [];

              const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match) => [match.offset, match.offset + match.length])
              );
              
              return (
                <li key={props.key} {...props}>
                <Grid container alignItems="center">
                    <Grid item sx={{ display: 'flex', width: 44 }}>
                      <LocationOnIcon sx={{ color: 'text.secondary' }} />
                    </Grid>
                    <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}

                      <Typography variant="body2" color="text.secondary">
                        {option.structured_formatting.secondary_text}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
          />
        <Chip onClick={handleChooseLocation} label="Choose Your Location" variant="outlined" />
        <Chip onClick={handleCleanLocation} label="Clean Location" variant="outlined" /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogToggle}>Cancel</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
