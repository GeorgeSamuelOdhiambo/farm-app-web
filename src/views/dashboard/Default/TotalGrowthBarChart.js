import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';

const status = [
  {
    value: 'week',
    label: 'This Week'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

const TotalGrowthBarChart = ({ values, onChange, isLoading, isLoading2 }) => {
  const [value, setValue] = useState('week');
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

  return (
    <>
      {isLoading2 || isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Expenses</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">{values.totalExpenses.toLocaleString()}/=</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Income</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">{values.totalIncome.toLocaleString()}/=</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {values.totalIncome - values.totalExpenses >= 0 ? (
                  <Grid item>
                    <Grid container direction="column" spacing={1}>
                      <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.success.dark }}>
                          Total Growth
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h3" sx={{ color: theme.palette.success.dark }}>
                          {(values.totalIncome - values.totalExpenses).toLocaleString()}/=
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item>
                    <Grid container direction="column" spacing={1}>
                      <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                          Total Deficit
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h3" sx={{ color: theme.palette.orange.dark }}>
                          {(values.totalIncome - values.totalExpenses).toLocaleString()}/=
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setValue(e.target.value);
                    }}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {values.data.length > 0 ? (
                <Chart {...chartData({ values: values })} />
              ) : (
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                  No Records, Key in your expenses and income.
                </Typography>
              )}
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  values: PropTypes.object,
  isLoading2: PropTypes.bool
};

export default TotalGrowthBarChart;
