import PropTypes from 'prop-types';
import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { Box } from '@mui/material';

export default function CreateFlockButton({ onAddClick }) {
  return (
    <Box sx={{ display: { md: 'block' }, paddingLeft: '20px' }}>
      <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<AddIcon />} onClick={onAddClick}>
        Create New Flock
      </Button>
    </Box>
  );
}

CreateFlockButton.propTypes = {
  onAddClick: PropTypes.func
};
