import { Checkbox, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { useEffect, useState } from 'react';
import Axios from 'api';

const VaccinationView = () => {
  const [data, setData] = useState([]);
  const [mySmsApi, setPopupData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/getVaccinationPrograms`);
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
  }, []);

  return (
    <MainCard
      title="Vaccination Program For the Flocks"
      secondary={<SecondaryAction link="https://neochickspoultry.com/improved-kienyeji-chicken-vaccination-schedule/" />}
    >
      <Grid container spacing={gridSpacing}>
        {data.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1">{mySmsApi ? mySmsApi : `No Record Found`}</Typography>
          </Grid>
        ) : (
          data.map((dataItem) => (
            <Grid key={dataItem.id} item xs={12}>
              <SubCard title={dataItem.id}>
                <Grid container direction="column" spacing={1}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Paper style={{ height: 300, width: '100%', overflowX: 'auto' }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Date</TableCell>
                              <TableCell align="center">Name</TableCell>
                              <TableCell align="center">Administration</TableCell>
                              <TableCell align="center">Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dataItem.vaccinationDates.map((dataItem2, index) => (
                              <TableRow key={index}>
                                <TableCell align="center">{dataItem2.date}</TableCell>
                                <TableCell align="center">{dataItem2.name}</TableCell>
                                <TableCell align="center">{dataItem2.howToAdminister}</TableCell>
                                <TableCell align="center">{!dataItem2 ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          ))
        )}
      </Grid>
    </MainCard>
  );
};

export default VaccinationView;
