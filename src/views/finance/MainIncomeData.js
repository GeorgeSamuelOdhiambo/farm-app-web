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
          const result = await Axios.get(`/getCurrentWeekFinancialRecord/income`);
          setValues(result.data);
        } else if (value === 'This Month') {
          const result = await Axios.get(`/getCurrentMonthFinancialRecord/income`);
          setValues(result.data);
        } else if (value === 'This Year') {
          const result = await Axios.get(`/getCurrentYearFinancialRecord/income`);
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
    <MainCard title="Farm Income Summary">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <ExpensesBarChart values={values} isLoading={isBLoading} onChange={onChange} title="Total Income" />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard
                check="income"
                data={values.totalPerFlock}
                total={values.total}
                isLoading={isLoading}
                title={`${value} Income`}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Dashboard;
