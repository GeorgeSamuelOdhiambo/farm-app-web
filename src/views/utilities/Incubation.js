import PropTypes from 'prop-types';

import { Box, Button, Card, Grid, Typography } from '@mui/material';

import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AddIcon from '@mui/icons-material/Add';

const ColorBox = ({ bgcolor, title, data, dark }) => (
  <>
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          bgcolor,
          color: dark ? 'grey.800' : '#ffffff'
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography>
        )}
        {!title && <Box sx={{ p: 1.15 }} />}
      </Box>
    </Card>
    {data && (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="subtitle2">{data.label}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>
            {data.color}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

ColorBox.propTypes = {
  bgcolor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  dark: PropTypes.bool
};

const data = [{ id: 1 }];

const onAddClick = () => {};

const UI_Incubation = () => (
  <MainCard
    title="Incubation Tabs"
    secondary={
      <Box sx={{ display: { md: 'block' }, paddingLeft: '20px' }}>
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<AddIcon />} onClick={onAddClick}>
          New Incubation Record
        </Button>
      </Box>
    }
  >
    <Grid container spacing={gridSpacing}>
      {data.map((item) => (
        <Grid item xs={12} key={item.id}>
          <SubCard title={`Primary Color ${item.id}`}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <ColorBox bgcolor="primary.light" data={{ label: 'Blue-50', color: '#E3F2FD' }} title="primary.light" dark />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      ))}
    </Grid>
  </MainCard>
);

export default UI_Incubation;
