import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports;
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ExpAreaChartCard from './BajajAreaChartCardExp';

const PopularCard = ({ check, data, isLoading, title, total }) => {
  const theme = useTheme();

  const itemsPerPage = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedKey, setExpandedKey] = useState(null);

  const totalPages = Math.ceil(Object.keys(data).length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setExpandedKey(null); // Reset expanded key when changing page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setExpandedKey(null); // Reset expanded key when changing page
    }
  };

  const handleExpandClick = (key) => {
    setExpandedKey(expandedKey === key ? null : key);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">{title}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {Object.keys(data).length > 0 ? (
                <>
                  <Grid item xs={12} sx={{ pt: '16px !important' }}>
                    <ExpAreaChartCard total={total} />
                  </Grid>
                  <Grid item xs={12}>
                    {data &&
                      Object.keys(data)
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((key) => (
                          <>
                            <Grid container direction="column">
                              <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                  <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                      {key}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                      <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                          {check == 'income' ? data[key].toLocaleString() : data[key].total.toLocaleString()}/=
                                        </Typography>
                                      </Grid>
                                      <Grid item>
                                        {check == 'expenses' && (
                                          <Avatar
                                            variant="rounded"
                                            sx={{
                                              width: 16,
                                              height: 16,
                                              borderRadius: '5px',
                                              backgroundColor: theme.palette.success.light,
                                              color: theme.palette.success.dark,
                                              ml: 2
                                            }}
                                            onClick={() => handleExpandClick(key)}
                                          >
                                            {expandedKey === key ? (
                                              <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                            ) : (
                                              <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                            )}
                                          </Avatar>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              {check == 'expenses' && expandedKey === key && (
                                <Grid item sx={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
                                  <Typography variant="subtitle1" color="inherit">
                                    Vaccine Expenses: {data[key].vaccine.toLocaleString()}/=
                                  </Typography>
                                  <Typography variant="subtitle1" color="inherit">
                                    Other Expenses: {data[key].other.toLocaleString()}/=
                                  </Typography>
                                  <Typography variant="subtitle1" color="inherit">
                                    Feeds Expenses: {data[key].feeds.toLocaleString()}/=
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>
                            <Divider sx={{ my: 1.5 }} />
                          </>
                        ))}
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h3" sx={{ textAlign: 'center' }}>
                    No Records
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
          {Object.keys(data).length > 0 && (
            <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'space-between' }}>
              <Button size="small" disableElevation onClick={handlePreviousPage}>
                <ChevronLeftOutlinedIcon />
                Back
              </Button>
              <Button size="small" disableElevation onClick={handleNextPage}>
                Next
                <ChevronRightOutlinedIcon />
              </Button>
            </CardActions>
          )}
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object,
  title: PropTypes.string.isRequired,
  total: PropTypes.any,
  check: PropTypes.string
};

export default PopularCard;
