import PropTypes from 'prop-types';
import { Alert, Grid, Stack } from '@mui/material';

const MessagePopup = ({ message, state }) => {
  return (
    <Grid item xs={12}>
      <Stack sx={{ width: '100%' }} spacing={1}>
        <Alert variant="filled" severity={state}>
          {message}
        </Alert>
      </Stack>
    </Grid>
  );
};

MessagePopup.propTypes = {
  message: PropTypes.string,
  state: PropTypes.string
};

export default MessagePopup;
