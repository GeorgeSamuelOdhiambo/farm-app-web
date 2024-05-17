import { useEffect, useState } from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project imports
import Axios from 'api';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import FeedingPopupForm from './utilitiesHelper/AddFeedingRecord';

const VaccinationView = () => {
  const [data, setData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [mySmsApi, setPopupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/getFeedingRecord`);
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
  }, [isPopupOpen]);

  const handleAddRecordPopup = (id) => {
    setIsPopupOpen(!isPopupOpen);
    setSelectedId(id);
  };

  return (
    <>
      <MainCard
        title="Flock Feeding Records"
        secondary={<SecondaryAction link="https://farmhatch.co.ke/homemade-feeds-for-kienyeji-chicken/" />}
      >
        <Grid container spacing={gridSpacing}>
          {data.length === 0 ? (
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="subtitle1">{mySmsApi ? mySmsApi : `No Record Found`}</Typography>
            </Grid>
          ) : (
            data.map((dataItem) => (
              <Grid key={dataItem.id} item xs={12} sm={data.length == 1 ? 12 : 6}>
                <SubCard
                  title={dataItem.id}
                  secondary={
                    <SecondaryAction title="Add Feeding Record" icon={<AddIcon />} onClickIcon={() => handleAddRecordPopup(dataItem.id)} />
                  }
                >
                  <Grid container direction="column" spacing={1}>
                    <Grid container>
                      <Grid item xs={12}>
                        {dataItem.feedingRate.length > 0 ? (
                          <Paper style={{ height: 200, width: '100%', overflowX: 'auto' }}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Period</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {dataItem.feedingRate.map((dataItem2, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      {dataItem2.quantity.number} {dataItem2.quantity.unit}
                                    </TableCell>
                                    <TableCell>{dataItem2.type}</TableCell>
                                    <TableCell>
                                      From {dataItem2.time.from} To {dataItem2.time.to}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Paper>
                        ) : (
                          <Typography sx={{ textAlign: 'center' }} variant="overline" display="block" gutterBottom>
                            No data to Display
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </SubCard>
              </Grid>
            ))
          )}
        </Grid>
      </MainCard>
      {isPopupOpen && <FeedingPopupForm id={selectedId} onClose={() => handleAddRecordPopup(null)} />}
    </>
  );
};

export default VaccinationView;
