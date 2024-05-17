import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

const BajajAreaChartCard = ({ totalIncome, totalExpenses }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;

  const orangeDark = theme.palette.secondary[800];

  useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light'
      }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  return (
    <Card sx={{ bgcolor: 'secondary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                Farm App
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                {(totalIncome - totalExpenses).toLocaleString()}/=
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {totalIncome - totalExpenses >= 0 ? (
            <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
              {(((totalIncome - totalExpenses) / totalExpenses == 0 ? 1 : totalExpenses) * 100).toFixed(2)}% Profit
            </Typography>
          ) : (
            <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
              {(((totalIncome - totalExpenses) / totalExpenses) * 100).toFixed(2)}% Deficit
            </Typography>
          )}
        </Grid>
      </Grid>
      <Chart {...chartData} />
    </Card>
  );
};

BajajAreaChartCard.propTypes = {
  totalIncome: PropTypes.any,
  totalExpenses: PropTypes.any
};

export default BajajAreaChartCard;
