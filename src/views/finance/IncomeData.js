import { Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// project imports
import Axios from 'api';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import IncomeRecordBody from './financeHelper/IncomeRecordBody';
import IncomePopupForm from './financeHelper/popup/AddIncomeRecord';
import MainCard from 'ui-component/cards/MainCard';

const IncomeRecord = () => {
  const [data, setData] = useState([]);
  const [isPopupHealth, setIsPopupHealth] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [mySmsApi, setPopupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/getIncomeRecord`);
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
        <MainCard title="Your Flock Income">
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1">{mySmsApi ? mySmsApi : `No Record Found`}</Typography>
          </Grid>
        </MainCard>
      ) : (
        <>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <SubCard
                title="Income Record per Flock"
                secondary={
                  <TextField label="Search By FlockID" variant="outlined" value={searchInput} onChange={handleSearchInputChange} />
                }
              >
                <Grid container spacing={gridSpacing}>
                  {filteredData.map((dataItem, index) => (
                    <IncomeRecordBody
                      key={index}
                      check={filteredData.length == 1 ? true : false}
                      dataItem={dataItem}
                      onPopup={() => handleIncomePopup(dataItem.id)}
                    />
                  ))}
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
          {isPopupHealth && <IncomePopupForm id={selectedId} onClose={() => handleIncomePopup(null)} />}
        </>
      )}
    </>
  );
};

export default IncomeRecord;
