import Grid from '@mui/material/Grid';
import { Datetoggle } from './Datetoggle';
import { Locationinput } from './Locationinput';
import { Freeinput } from './Freeinput';

export const Generalsearch = () => {
    return (
        <Grid container spacing={2}>
            {/* Free input */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Freeinput />
            </Grid>

            {/* Location input */}
            <Grid item xs={12} sm={6}>
                <Locationinput />
            </Grid>

            {/* Date toggle */}
            <Grid item xs={12} sm={6}>
                <Datetoggle />
            </Grid>
        </Grid>
    );
}
