import { useEffect, useState } from 'react';

// project imports
import { gridSpacing } from 'store/constant';
import ExpensesBarChart from './financeHelper/MainExpensesChart';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Axios from 'api';
import PopularCard from './financeHelper/PopularCardExp';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [isBLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({ total: 0, key: [], data: [], totalPerFlock: {} });
  const [value, setValue] = useState('This Week');

  const onChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const callApi = async () => {
      try {
        setIsLoading(true);
        if (value === 'This Week') {
          const result = await Axios.get(`/getCurrentWeekFinancialRecord/expenses`);
          setValues(result.data);
        } else if (value === 'This Month') {
          const result = await Axios.get(`/getCurrentMonthFinancialRecord/expenses`);
          setValues(result.data);
        } else if (value === 'This Year') {
          const result = await Axios.get(`/getCurrentYearFinancialRecord/expenses`);
          setValues(result.data);
        }
        setIsLoading(false);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          console.log(err.response.data.message);
        } else {
          console.log(err.message);
        }
        setLoading(false);
        setIsLoading(false);
      }
    };

    callApi();
  }, [value]);

  return (
    <MainCard title="Farm Expenses Summary">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <ExpensesBarChart values={values} isLoading={isBLoading} onChange={onChange} title="Total Expenses" />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard
                check="expenses"
                data={values.totalPerFlock}
                total={values.total}
                isLoading={isLoading}
                title={`${value} Expenses`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Dashboard;
