import { Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// project imports
import Axios from 'api';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import VaccineExpenseBody from './financeHelper/VaccineExpensesBody';
import MainCard from 'ui-component/cards/MainCard';
import ExpensesPopupForm from './financeHelper/popup/AddExpenses';

const VaccinationExpenseRecord = () => {
  const [data, setData] = useState([]);
  const [isPopupHealth, setIsPopupHealth] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [mySmsApi, setPopupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/getExpensesRecordVaccines`);
        setData(response.data);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setPopupData(err.response.data.message);
        } else {
          setPopupData(err.message);
        }
        setData([]);
      }
    };
    fetchData();
  }, [isPopupHealth]);

  useEffect(() => {
    setFilteredData(data.filter((item) => item.id.toLowerCase().includes(searchInput.toLowerCase())));
  }, [searchInput, data]);

  const handleIncomePopup = (id) => {
    setIsPopupHealth(!isPopupHealth);
    setSelectedId(id);
  };

  const handleSearchInputChange = (event) => {
    if (event.target.value.trim()) {
      setSearchInput(event.target.value.trim());
    } else {
      setSearchInput('');
    }
  };

  return (
    <>
      {data.length === 0 ? (
        <MainCard title="Your Flock Expenses">
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1">{mySmsApi ? mySmsApi : `No Record Found`}</Typography>
          </Grid>
        </MainCard>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SubCard
                title="Vaccine Expenses'"
                secondary={
                  <TextField label="Search By FlockID" variant="outlined" value={searchInput} onChange={handleSearchInputChange} />
                }
              >
                <Grid container spacing={gridSpacing}>
                  {filteredData.map((dataItem, index) => (
                    <VaccineExpenseBody
                      key={index}
                      sec="vaccine"
                      title="Vaccination Expenses"
                      check={filteredData.length == 1 ? true : false}
                      dataItem={dataItem}
                      onPopup={() => handleIncomePopup(dataItem.id)}
                    />
                  ))}
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
          {isPopupHealth && (
            <ExpensesPopupForm id={selectedId} comment="Add Vaccination Expense" action="vaccine" onClose={() => handleIncomePopup(null)} />
          )}
        </>
      )}
    </>
  );
};

export default VaccinationExpenseRecord;
