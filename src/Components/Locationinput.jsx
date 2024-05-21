import React, { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { loadGoogleMapsScript } from '../apis/api';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;


export const Locationinput = ({query,setQuery}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        loadGoogleMapsScript(GOOGLE_MAPS_API_KEY, () => {
            setScriptLoaded(true);
        });
    }, []);

    const autocompleteService = useMemo(() => {
        if (scriptLoaded && window.google) {
            console.log('Google Maps API is available.');
            return new window.google.maps.places.AutocompleteService();
        }
        console.log('Google Maps API is not available yet.');
        return null;
    }, [scriptLoaded]);

    useEffect(() => {
        let active = true;

        if (!autocompleteService || inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        const fetchPredictions = debounce((request, callback) => {
            autocompleteService.getPlacePredictions(request, callback);
        }, 400);

        fetchPredictions({ input: inputValue }, (results) => {
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
    }, [value, inputValue, autocompleteService]);

    const handleDialogToggle = () => {
        setOpen(!open);
    };

    const handleApply = () => {
        setValue(inputValue);
        handleDialogToggle();
    };

    return (
        <>
            <Button onClick={handleDialogToggle} startIcon={<LocationOnIcon />} variant="outlined">
                Select Location
            </Button>
            <Dialog open={open} onClose={handleDialogToggle} PaperProps={{ sx: { minWidth: '30vw' } }}>
                <DialogTitle>Select Location</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        id="google-map-demo"
                        getOptionLabel={(option) =>
                            typeof option === 'string' ? option : option.description
                        }
                        filterOptions={(x) => x}
                        options={options}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        value={value}
                        onChange={(event, newValue) => {
                            setOptions(newValue ? [newValue, ...options] : options);
                            setValue(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            setQuery({...query, location : newInputValue})
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Add a location" fullWidth sx={{ paddingBottom: '24px' }} />
                        )}
                        renderOption={(props, option) => {
                            const matches =
                                option.structured_formatting.main_text_matched_substrings || [];

                            const parts = parse(
                                option.structured_formatting.main_text,
                                matches.map((match) => [match.offset, match.offset + match.length]),
                            );

                            return (
                                <li {...props}>
                                    <Grid container alignItems="center">
                                        <Grid item sx={{ display: 'flex', width: 44 }}>
                                            <LocationOnIcon sx={{ color: 'text.secondary' }} />
                                        </Grid>
                                        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                            {parts.map((part, index) => (
                                                <Typography
                                                    key={index}
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                                >
                                                    {part.text}
                                                </Typography>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogToggle}>Cancel</Button>
                    <Button onClick={handleApply}>Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
