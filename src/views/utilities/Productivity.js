import { Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// project imports
import Axios from 'api';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import WeightRecordBody from './utilitiesHelper/productivityHelper/WeightRecordBody';
import EggRecordBody from './utilitiesHelper/productivityHelper/EggProductionBody';
import AddEggProductionRecord from './utilitiesHelper/productivityHelper/popup/EggProductionPopup';
import AddWeightRecord from './utilitiesHelper/productivityHelper/popup/WeightRecordPopup';

const ProductivityRecord = () => {
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
        const response = await Axios.get(`/getProductivityRecord`);
        console.log(response.data);
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
        title="Productivity Records"
        secondary={
          <Tabs value={tabValue} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Egg Production" />
            <Tab label="Flock Weight" />
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
                title={tabValue === 0 ? 'Flock Egg Production' : 'Flock Weight Record'}
                secondary={
                  <TextField label="Search By FlockID" variant="outlined" value={searchInput} onChange={handleSearchInputChange} />
                }
              >
                <Grid container spacing={gridSpacing}>
                  {tabValue
                    ? filteredData.map((dataItem, index) => (
                        <WeightRecordBody
                          key={index}
                          dataItem={dataItem}
                          check={filteredData.length == 1 ? true : false}
                          onPopup={() => handleMortalityPopup(dataItem.id)}
                        />
                      ))
                    : filteredData.map((dataItem, index) => (
                        <EggRecordBody
                          key={index}
                          check={filteredData.length == 1 ? true : false}
                          dataItem={dataItem}
                          onPopup={() => handleHealthPopup(dataItem.id)}
                        />
                      ))}
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        )}
      </MainCard>
      {isPopupMortality && <AddWeightRecord id={selectedId} onClose={() => handleMortalityPopup(null)} />}
      {isPopupHealth && <AddEggProductionRecord id={selectedId} onClose={() => handleHealthPopup(null)} />}
    </>
  );
};

export default ProductivityRecord;
