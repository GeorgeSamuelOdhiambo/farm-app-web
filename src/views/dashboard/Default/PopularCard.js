import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import BajajAreaChartCard from './BajajAreaChartCard';
import { gridSpacing } from 'store/constant';

const PAGE_SIZE = 6;

const PopularCard = ({ data, isLoading }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Object.keys(data.totalExpensesPerFlock).length / PAGE_SIZE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const paginatedData = Object.keys(data.totalExpensesPerFlock).slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const [expandedKey, setExpandedKey] = useState(null);

  const handleExpandClick = (key) => {
    setExpandedKey((prevKey) => (prevKey === key ? null : key));
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
                    <Typography variant="h4">Flock Financial</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {Object.keys(data.totalIncomePerFlock).length > 0 ? (
                <>
                  <Grid item xs={12} sx={{ pt: '16px !important' }}>
                    <BajajAreaChartCard totalIncome={data.totalIncome} totalExpenses={data.totalExpenses} />
                  </Grid>
                  <Grid item xs={12}>
                    {data &&
                      paginatedData.map((id) => (
                        <>
                          <Grid container direction="column" key={id}>
                            <Grid item>
                              <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1" color="inherit">
                                    {id}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                      {data.totalIncomePerFlock[id] - data.totalExpensesPerFlock[id] >= 0 ? (
                                        <Typography variant="subtitle1" sx={{ color: 'success.dark' }}>
                                          {(data.totalIncomePerFlock[id] - data.totalExpensesPerFlock[id]).toLocaleString()}/=
                                        </Typography>
                                      ) : (
                                        <Typography variant="subtitle1" sx={{ color: theme.palette.orange.dark }}>
                                          {(data.totalIncomePerFlock[id] - data.totalExpensesPerFlock[id]).toLocaleString()}/=
                                        </Typography>
                                      )}
                                    </Grid>
                                    <Grid item>
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
                                        onClick={() => handleExpandClick(id)}
                                      >
                                        {expandedKey === id ? (
                                          <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                        ) : (
                                          <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                        )}
                                      </Avatar>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            {expandedKey === id && (
                              <Grid item sx={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
                                <Typography variant="subtitle2" color="inherit">
                                  Expenses {data.totalExpensesPerFlock[id].toLocaleString()}/=
                                </Typography>
                                <Typography variant="subtitle2" color="inherit">
                                  Income {data.totalIncomePerFlock[id].toLocaleString()}/=
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
          {Object.keys(data.totalIncomePerFlock).length > 0 && (
            <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
              <Button size="small" onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button size="small" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
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
  data: PropTypes.object
};

export default PopularCard;
