import { Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// project imports
import Axios from 'api';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import MortalityRecordBody from './utilitiesHelper/healthAndMortalityHelper/MortalityRecordBody';
import HealthRecordBody from './utilitiesHelper/healthAndMortalityHelper/HealthRecordBody';
import HealthPopupForm from './utilitiesHelper/healthAndMortalityHelper/popup/HealthPopup';
import MortalityPopupRecord from './utilitiesHelper/healthAndMortalityHelper/popup/MortalityPopup';

const HealthRecord = () => {
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState([]);
  const [isPopupMortality, setIsPopupMortality] = useState(false);
  const [isPopupHealth, setIsPopupHealth] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [mySmsApi, setPopupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/getHealthRecord`);
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
  }, [isPopupHealth, isPopupMortality]);

  useEffect(() => {
    setFilteredData(data.filter((item) => item.id.toLowerCase().includes(searchInput.toLowerCase())));
  }, [searchInput, data]);

  const handleMortalityPopup = (id) => {
    setIsPopupMortality(!isPopupMortality);
    setSelectedId(id);
  };

  const handleHealthPopup = (id) => {
    setIsPopupHealth(!isPopupHealth);
    setSelectedId(id);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchInput('');
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <MainCard
        title="Flock Health Records"
        secondary={
          <Tabs value={tabValue} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Health Record and Medication used" />
            <Tab label="Flock Mortality Record" />
          </Tabs>
        }
      >
        {data.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1">{mySmsApi ? mySmsApi : `No Record Found`}</Typography>
          </Grid>
        ) : (
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <SubCard
                title={tabValue === 0 ? 'Health Record' : 'Mortality Record'}
                secondary={
                  <TextField label="Search By FlockID" variant="outlined" value={searchInput} onChange={handleSearchInputChange} />
                }
              >
                <Grid container spacing={gridSpacing}>
                  {tabValue
                    ? filteredData.map((dataItem, index) => (
                        <MortalityRecordBody
                          key={index}
                          check={filteredData.length == 1 ? true : false}
                          dataItem={dataItem}
                          onPopup={() => handleMortalityPopup(dataItem.id)}
                        />
                      ))
                    : filteredData.map((dataItem, index) => (
                        <HealthRecordBody key={index} dataItem={dataItem} onPopup={() => handleHealthPopup(dataItem.id)} />
                      ))}
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        )}
      </MainCard>
      {isPopupMortality && <MortalityPopupRecord id={selectedId} onClose={() => handleMortalityPopup(null)} />}
      {isPopupHealth && <HealthPopupForm id={selectedId} onClose={() => handleHealthPopup(null)} />}
    </>
  );
};

export default HealthRecord;
