import { useEffect, useState } from 'react';

// material-ui
import { Dialog, DialogContent, Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Axios from 'api';
import MessagePopup from 'views/SuccessErrorPopup';

// const userData = JSON.parse(sessionStorage.getItem('userData'));

const Dashboard = () => {
  const [value, setValue] = useState('week');
  const [values, setValues] = useState({
    totalExpenses: 0,
    key: [],
    data: [],
    totalExpensesPerFlock: {},
    totalIncome: 0,
    totalIncomePerFlock: {}
  });
  const [isLoading, setLoading] = useState(true);
  const [isLoadingFetch, setLoadingFetch] = useState(false);
  const [finance, setFinance] = useState({ income: { total: 0, data: [] }, expenses: { total: 0, data: [] } });
  const [popupData, setPopupData] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exResponse = await Axios.get('getCurrentMonthExpenses');
        const inResponse = await Axios.get('getCurrentMonthIncome');
        const result = await Axios.get('getUserDataDashboard');
        setFinance({ income: inResponse.data, expenses: exResponse.data });
        setUserData(result.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setPopupData(err.response.data.message);
        } else {
          setPopupData(err.message);
        }
        setTimeout(() => {
          setPopupData(null);
          setLoading(false);
        }, 3000);
      }
    };

    fetchData();
  }, []);

  const onChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const callApi = async () => {
      setLoadingFetch(true);
      try {
        if (value === 'week') {
          const result = await Axios.get(`/getDashboardWeeklyExpenses/day`);
          setValues(result.data);
        } else if (value === 'month') {
          const result = await Axios.get(`/getDashboardWeeklyExpenses/week`);
          setValues(result.data);
        } else if (value === 'year') {
          const result = await Axios.get(`/getDashboardWeeklyExpenses/month`);
          setValues(result.data);
        }
        setLoadingFetch(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          console.log(err.response.data.message);
        } else {
          console.log(err.message);
        }
        setLoadingFetch(false);
      }
    };

    callApi();
  }, [value]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {popupData && (
          <Dialog open={true}>
            <DialogContent>
              <MessagePopup message={`${popupData}  try again later`} state="error" />
            </DialogContent>
          </Dialog>
        )}
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard total={!userData ? 0 : userData.totalIncome} isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard info={finance} isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard
                  totalB={!userData ? 0 : userData.totalFlockNumber}
                  totalM={!userData ? 0 : userData.totalMortality}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard
                  totalEI={!userData ? 0 : userData.totalEggsProduction}
                  totalEO={!userData ? 0 : userData.totalEggsOut}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart values={values} onChange={onChange} isLoading={isLoading} isLoading2={isLoadingFetch} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard
              data={{
                totalExpenses: values.totalExpenses,
                totalIncome: values.totalIncome,
                totalIncomePerFlock: values.totalIncomePerFlock,
                totalExpensesPerFlock: values.totalExpensesPerFlock
              }}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
