import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TableCell, TableRow, Table, TableHead, TableBody, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

const WeightRecordBody = ({ dataItem, onPopup, check }) => (
  <Grid key={dataItem.id} item xs={12} sm={check == 1 ? 12 : 6}>
    <SubCard
      title={dataItem.id}
      secondary={<SecondaryAction title="Add Weight Record" icon={<AddIcon />} onClickIcon={() => onPopup(dataItem.id)} />}
    >
      <Grid container direction="column" spacing={1}>
        <Grid container>
          <Grid item xs={12}>
            {dataItem.weight.length > 0 ? (
              <Paper style={{ height: 200, width: '100%', overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataItem.weight.map((dataItem2, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{dataItem2.date}</TableCell>
                        <TableCell align="center">
                          {dataItem2.weight} {dataItem2.unit}
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
);

WeightRecordBody.propTypes = {
  dataItem: PropTypes.array,
  onPopup: PropTypes.func,
  check: PropTypes.bool
};

export default WeightRecordBody;
