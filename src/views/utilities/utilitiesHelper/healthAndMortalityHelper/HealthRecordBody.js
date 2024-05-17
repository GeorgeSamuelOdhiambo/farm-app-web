import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TableCell, TableRow, Table, TableHead, TableBody, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

const HealthRecordBody = ({ dataItem, onPopup }) => (
  <Grid key={dataItem.id} item xs={12}>
    <SubCard
      title={dataItem.id}
      secondary={<SecondaryAction title="Add Health Record" icon={<AddIcon />} onClickIcon={() => onPopup(dataItem.id)} />}
    >
      <Grid container direction="column" spacing={1}>
        <Grid container>
          <Grid item xs={12}>
            {dataItem.illness.length > 0 ? (
              <Paper style={{ height: 200, width: '100%', overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Medication</TableCell>
                      <TableCell align="center">Symptom</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataItem.illness.map((dataItem2, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{dataItem2.date}</TableCell>
                        <TableCell align="center">{dataItem2.medication}</TableCell>
                        <TableCell align="center">{dataItem2.symptom}</TableCell>
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
);

HealthRecordBody.propTypes = {
  dataItem: PropTypes.array,
  onPopup: PropTypes.func
};

export default HealthRecordBody;
