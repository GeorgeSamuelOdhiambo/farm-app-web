import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TableCell, TableRow, Table, TableHead, TableBody, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

const IncomeRecordBody = ({ dataItem, onPopup, check }) => {
  let totalIncome = 0;

  return (
    <Grid key={dataItem.id} item xs={12}>
      <SubCard
        title={dataItem.id}
        secondary={<SecondaryAction title="Add Income Record" icon={<AddIcon />} onClickIcon={() => onPopup(dataItem.id)} />}
      >
        <Grid container direction="column" spacing={1}>
          <Grid container>
            <Grid item xs={12}>
              {dataItem.income.length > 0 ? (
                <Paper
                  style={check ? { height: 450, width: '100%', overflowX: 'auto' } : { height: 200, width: '100%', overflowX: 'auto' }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Unit</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataItem.income.map((dataItem2, index) => {
                        totalIncome += dataItem2.totalPrice;
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">{dataItem2.date}</TableCell>
                            <TableCell align="center">{dataItem2.unit}</TableCell>
                            <TableCell align="center">{dataItem2.totalPrice}</TableCell>
                            <TableCell align="center">{dataItem2.description}</TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow>
                        <TableCell colSpan={1} />
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                          TOTAL
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                          Ksh {totalIncome}
                        </TableCell>
                        <TableCell colSpan={1} />
                      </TableRow>
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
};

IncomeRecordBody.propTypes = {
  dataItem: PropTypes.object.isRequired,
  onPopup: PropTypes.func.isRequired,
  check: PropTypes.bool
};

export default IncomeRecordBody;
